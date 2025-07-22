pnpm create vite@latest -t react-ts p2
pnpm add -D prettier eslint-config-prettier @types/node
pnpm add react-router zustand ky msw uuid tailwindcss @tailwindcss/vite
echo '@import "tailwindcss";' > src/index.css
# edit .prettierrc, eslint.config.js, tsconfig.app.json, tsconfig.json, vite.config.ts
pnpm dlx shadcn@latest init
pnpm dlx shadcn add button input label
pnpm dlx msw init public --save
