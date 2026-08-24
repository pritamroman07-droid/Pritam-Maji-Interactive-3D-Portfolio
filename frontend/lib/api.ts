export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = (await res.json()) as T & { ok?: boolean; error?: string };
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  sendContact(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return request<{ ok: true }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getVisitors() {
    return request<{ ok: true; visitors: number }>("/api/visitor");
  },

  incrementVisitors() {
    return request<{ ok: true; visitors: number }>("/api/visitor", { method: "POST" });
  },

  getStats() {
    return request<{ ok: true; visitors: number; messages: number }>("/api/stats");
  },

  login(username: string, password: string) {
    return request<{ ok: true; token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  getMessages(token: string) {
    return request<{
      ok: true;
      messages: {
        id: string;
        name: string;
        email: string;
        subject: string;
        message: string;
        createdAt: string;
      }[];
    }>("/api/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteMessage(token: string, id: string) {
    return request<{ ok: true }>(`/api/messages/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export const resumeDownloadUrl = "/Pritam_Maji_Resume.pdf";
