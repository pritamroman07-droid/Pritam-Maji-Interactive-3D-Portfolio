# 3D Model Placeholder

The hero scene ships with an abstract "glowing core" by default.

To replace it with a 3D version of your photo:

1. Convert your photo to a 3D model (.glb/.gltf) using:
   - [CSM](https://www.csm.ai) (photo to 3D, seconds)
   - [Meshy](https://www.meshy.ai) or [Luma Genie](https://lumalabs.ai)
2. Drop the file in this folder, e.g. `public/models/pritam.glb`
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_MODEL_URL=/models/pritam.glb
   ```
4. Restart the dev server.

The scene auto-renders your model (scale/position tuned in
`components/three/hero-scene.tsx` → `HeroModel`).
