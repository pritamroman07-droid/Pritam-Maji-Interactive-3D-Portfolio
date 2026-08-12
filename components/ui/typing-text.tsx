"use client";

import { useEffect, useState } from "react";

export function TypingText({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1800,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-accent animate-typeblink" />
    </span>
  );
}
