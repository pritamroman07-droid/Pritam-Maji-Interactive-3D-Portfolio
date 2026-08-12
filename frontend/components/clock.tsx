"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs text-muted tabular-nums" suppressHydrationWarning>
      {time || "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
    </span>
  );
}
