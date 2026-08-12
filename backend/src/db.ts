import { promises as fs } from "node:fs";
import path from "node:path";
import { MongoClient } from "mongodb";
import { config } from "./config";

/**
 * Storage abstraction.
 *
 * If MONGODB_URI is set, all data lives in MongoDB.
 * Otherwise the API transparently falls back to a local JSON
 * file (data/db.json) — ideal for local development.
 */

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

type FileStore = {
  visitors: number;
  messages: ContactMessage[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "db.json");

/* ── MongoDB adapter ─────────────────────────────────────────── */

let mongoClientPromise: Promise<MongoClient> | null = null;

function getMongoClient() {
  if (!config.mongoUri) return null;
  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    }).connect();
  }
  return mongoClientPromise;
}

async function getMongoDb() {
  const client = await getMongoClient();
  if (!client) return null;
  return client.db("portfolio");
}

const mongo = {
  async saveMessage(message: ContactMessage): Promise<void> {
    const db = await getMongoDb();
    if (!db) throw new Error("no-db");
    await db.collection("messages").insertOne(message as never);
  },
  async listMessages(): Promise<ContactMessage[]> {
    const db = await getMongoDb();
    if (!db) throw new Error("no-db");
    const docs = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();
    return docs as unknown as ContactMessage[];
  },
  async deleteMessage(id: string): Promise<void> {
    const db = await getMongoDb();
    if (!db) throw new Error("no-db");
    await db.collection("messages").deleteOne({ id });
  },
  async getVisitors(): Promise<number> {
    const db = await getMongoDb();
    if (!db) throw new Error("no-db");
    const doc = await db.collection("counters").findOneAndUpdate(
      { key: "visitors" },
      { $inc: { value: 0 } },
      { returnDocument: "after", upsert: true },
    );
    return (doc?.value ?? 0) as number;
  },
  async incrementVisitors(): Promise<number> {
    const db = await getMongoDb();
    if (!db) throw new Error("no-db");
    const doc = await db.collection("counters").findOneAndUpdate(
      { key: "visitors" },
      { $inc: { value: 1 } },
      { returnDocument: "after", upsert: true },
    );
    return (doc?.value ?? 0) as number;
  },
};

/* ── JSON file adapter ───────────────────────────────────────── */

async function readFileStore(): Promise<FileStore> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as FileStore;
  } catch {
    return { visitors: 0, messages: [] };
  }
}

async function writeFileStore(store: FileStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

const file = {
  async saveMessage(message: ContactMessage): Promise<void> {
    const store = await readFileStore();
    store.messages.unshift(message);
    await writeFileStore(store);
  },
  async listMessages(): Promise<ContactMessage[]> {
    const store = await readFileStore();
    return store.messages;
  },
  async deleteMessage(id: string): Promise<void> {
    const store = await readFileStore();
    store.messages = store.messages.filter((m) => m.id !== id);
    await writeFileStore(store);
  },
  async getVisitors(): Promise<number> {
    const store = await readFileStore();
    return store.visitors;
  },
  async incrementVisitors(): Promise<number> {
    const store = await readFileStore();
    store.visitors += 1;
    await writeFileStore(store);
    return store.visitors;
  },
};

/* ── Public API ──────────────────────────────────────────────── */

const useMongo = Boolean(config.mongoUri);

export async function saveMessage(message: ContactMessage): Promise<void> {
  if (useMongo) {
    try {
      await mongo.saveMessage(message);
      return;
    } catch {
      // fall back to file store on Mongo failure
    }
  }
  await file.saveMessage(message);
}

export async function listMessages(): Promise<ContactMessage[]> {
  if (useMongo) {
    try {
      return await mongo.listMessages();
    } catch {
      // fall through to file store
    }
  }
  return file.listMessages();
}

export async function deleteMessage(id: string): Promise<void> {
  if (useMongo) {
    try {
      await mongo.deleteMessage(id);
      return;
    } catch {
      // fall through to file store
    }
  }
  await file.deleteMessage(id);
}

export async function getVisitors(): Promise<number> {
  if (useMongo) {
    try {
      return await mongo.getVisitors();
    } catch {
      // fall through to file store
    }
  }
  return file.getVisitors();
}

export async function incrementVisitors(): Promise<number> {
  if (useMongo) {
    try {
      return await mongo.incrementVisitors();
    } catch {
      // fall through to file store
    }
  }
  return file.incrementVisitors();
}
