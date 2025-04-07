Execute in different shells
Bun

```sh
bun i
cp .env.example .env
bun run dev:db-up
bun run db:migrate
bun run db:seed
bun run dev:zero
bun run dev:ui
```

Your application will be available at `http://localhost:5173`.
