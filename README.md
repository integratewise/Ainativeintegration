# AI-NATIVE INTEGRATION

**Repository:** [github.com/integratewise/Ainativeintegration](https://github.com/integratewise/Ainativeintegration)

This is the IntegrateWise **AI-NATIVE INTEGRATION** frontend (React + Vite + TypeScript). Agent and architecture notes live in [`AGENTS.md`](./AGENTS.md).

**Design (Figma):** [AI-NATIVE-INTEGRATION](https://www.figma.com/design/HIgld0ReGFWf4pK8g3TXgw/AI-NATIVE-INTEGRATION)

## Running the code

1. `npm i` — install dependencies  
2. `npm run dev` — dev server (see `vite.config.ts` for port)

## Git (local first — no pull from cloud)

Use this **only** when this folder is the source of truth and you do **not** want to merge history from GitHub:

```bash
git init
git remote add origin https://github.com/integratewise/Ainativeintegration.git
git add -A
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

If the remote already has commits and `push` is rejected, resolve with your team (e.g. force push only if you intend to replace the remote). **Do not** run `git pull` if you want to avoid bringing cloud history into this copy.

## Contributing

Clone from GitHub, create a branch, and open a PR against `main`.
