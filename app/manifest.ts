import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pritam Maji — Full Stack Developer",
    short_name: "Pritam.Maji",
    description:
      "Portfolio of Pritam Maji, a full stack developer and creative designer.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}