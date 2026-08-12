import { Router } from "express";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type GHWeek = { contributionDays: { date: string; contributionCount: number }[] };
type GHResponse = {
  data?: { user?: { contributionsCollection?: { contributionCalendar?: { weeks?: GHWeek[] } } } };
};

const router = Router();

router.get("/", async (req, res) => {
  const username = (req.query.username as string) || "pritamroman07-droid";

  const query = `query($user: String!) {
    user(login: $user) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}`,
      },
      body: JSON.stringify({ query, variables: { user: username } }),
      signal: AbortSignal.timeout(8000),
    });

    const data = (await response.json()) as GHResponse;
    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (weeks && weeks.length > 0) {
      const contributions: Day[] = weeks.flatMap((w) =>
        w.contributionDays.map((d) => {
          const count = d.contributionCount;
          return {
            date: d.date,
            count,
            level: (count === 0 ? 0 : Math.min(4, 1 + Math.floor(count / 3))) as Day["level"],
          };
        }),
      );
      const total = contributions.reduce((s, d) => s + d.count, 0);
      return res.json({ ok: true, contributions, totalContributions: total });
    }

    return res.status(404).json({ ok: false, error: "no-data" });
  } catch {
    return res.status(502).json({ ok: false, error: "github-unavailable" });
  }
});

export default router;
