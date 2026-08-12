import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          background: "linear-gradient(135deg, #050505 0%, #0c0f1e 55%, #1a0b2e 100%)",
          fontFamily: "sans-serif",
          color: "#f0f2f8",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(99,102,241,0.55), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              border: "2px solid rgba(56,189,248,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 900,
              background: "linear-gradient(135deg, #38bdf8, #a855f7)",
              WebkitBackgroundClip: "text",
              color: "#38bdf8",
            }}
          >
            P
          </div>
          <div style={{ fontSize: "28px", color: "#a5aaba" }}>Pritam Maji · Portfolio</div>
        </div>
        <div
          style={{
            fontSize: "76px",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            fontSize: "76px",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            backgroundImage: "linear-gradient(90deg, #38bdf8, #a855f7, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          & Creative Designer
        </div>
        <div style={{ marginTop: "28px", fontSize: "22px", color: "#a5aaba" }}>
          Next.js · Three.js · TypeScript · Node.js · MongoDB
        </div>
      </div>
    ),
    { ...size },
  );
}