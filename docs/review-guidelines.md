# GearBoard — Review Guidelines

## API conventions

### Route chaining

Routes must use method chaining. Flag any imperative route registration.

```ts
// WRONG — breaks Hono RPC type inference
const postRoute = new Hono();
postRoute.get("/:id", ...);

// CORRECT
const postRoute = new Hono()
  .get("/:id", ...)
  .post("/", ...);
```

### One file per endpoint

Every endpoint must have its own DTO file and service file under `dto/` and `service/`.
Flag any service or DTO that handles more than one endpoint.

### Validation

- Input must always go through `zValidator("param" | "query" | "json", Schema, validationHook)`.
- Flag any handler that calls `c.req.param()`, `c.req.query()`, or `c.req.json()` directly instead of `c.req.valid()`.

### Response shape

All responses must use `successResponse()` or `errorResponse()` from `common/utils/response.ts`.
Flag any handler that returns a raw object directly via `c.json({...})` without these helpers.

### Error handling

Throw typed errors (`NotFoundError`, `ForbiddenError`, `UnauthorizedError`, `BadRequestError`, `ConflictError`).
Flag any service that returns `null` or a plain error object instead of throwing.

### Generated files

Flag any changes inside `apps/api/generated/`. These files must never be edited manually.

---

## Frontend conventions

### Data fetching

Components must not import or call `client` from `api-client.ts` directly.
All data fetching must go through hooks in `shared/hooks/`.
Flag any component that calls `client.api.*` directly.

### Hook naming

- GETs: `useGet<Resource>` (e.g. `useGetPostById`, `useGetPostList`)
- Mutations: `useCreate<Resource>`, `useUpdate<Resource>`, `useDelete<Resource>`

Flag hooks named outside this pattern.

### No axios

Flag any new import of `axios` or `fetch` wrappers. The only HTTP layer is the Hono RPC client.

### Path alias

All imports within `apps/web/src` must use `@/`. Flag relative `../../` imports that cross feature boundaries.

### Shared UI components

New UI components added to `shared/components/` must have a `.stories.tsx` file.

---

## General

### TypeScript

- Flag use of `any` (ESLint enforces this on the API side, but double-check the web side).
- Flag missing return types on exported functions in `apps/api/src`.

### Prisma schema

- Every soft-deletable model must filter `deletedAt: null` in all queries.
- Flag any `prisma.*` call in a service file — DB access must go through the repository layer.

### Secrets

Flag any hardcoded secrets, API keys, or credentials in source files.
