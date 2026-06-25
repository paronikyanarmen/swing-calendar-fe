# CLAUDE.md — Vite + React + TypeScript Best Practices

This file guides Claude when working in this codebase. Follow these conventions consistently.

---

## Code Generation Philosophy

- Write the **minimum code necessary** to solve the problem — no more, no less
- Prefer editing existing code over adding new code
- Delete code rather than commenting it out
- Avoid scaffolding files, folders, or abstractions "just in case" — add them when actually needed (YAGNI)
- Don't add boilerplate, placeholder comments, or TODO stubs unless explicitly asked
- Resist the urge to generalize — solve the specific case first; abstract only when a second real use case appears
- If something can be done with a native browser API or existing dependency, don't add a new one
- Short, obvious code needs no comments — only comment the *why*, never the *what*

---

## Project Stack

- **Bundler:** Vite
- **UI:** React 18+
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3
- **State & Data Fetching:** TanStack Query (React Query v5)
- **Testing:** Vitest + React Testing Library

---

## TypeScript

- Always use **strict mode** (`"strict": true` in `tsconfig.json`)
- Prefer `interface` for object shapes, `type` for unions/intersections and utility types
- Never use `any` — use `unknown` and narrow with type guards instead
- Avoid type assertions (`as`) unless absolutely necessary; add a comment explaining why
- Export types alongside their related modules, not in a separate `types/` barrel
- Use `satisfies` operator to validate literals against a type without widening

```ts
// ✅ Good
interface User {
  id: string;
  name: string;
}

type Status = "idle" | "loading" | "error" | "success";

// ❌ Avoid
const data = response as any;
```

---

## React Components

- Use **function components** exclusively — no class components
- One component per file; filename matches the component name (PascalCase)
- Keep components small and focused — extract logic into custom hooks
- Prefer **named exports** for components; use default exports only for route-level pages
- Co-locate component styles, tests, and hooks in the same folder

```
src/
  components/
    UserCard/
      UserCard.tsx
      UserCard.test.tsx
      useUserCard.ts
```

---

## Hooks

- Prefix all custom hooks with `use`
- Extract any stateful or side-effect logic from components into dedicated hooks
- Keep hooks single-responsibility — one concern per hook
- Never call hooks conditionally or inside loops

```ts
// ✅ Good — logic lives in the hook, component stays clean
function useUserProfile(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  // fetch logic...
  return { user };
}
```

---

## State Management & Data Fetching

All server state and backend calls use **TanStack Query (React Query v5)**. Do not use `useEffect` + `useState` for data fetching.

### Setup

```ts
// src/main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute default
      retry: 1,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <Calendar />
</QueryClientProvider>
```

### Queries (reading data)

- Always define query functions in a dedicated `api.ts` file per feature — not inline in hooks
- Use `queryKey` arrays that fully describe the data (include filters, IDs, params)
- Co-locate `useQuery` calls in custom hooks, not directly in components

```ts
// src/features/users/api.ts
export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// src/features/users/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./api";

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
  });
}
```

### Mutations (writing data)

- Use `useMutation` for all create/update/delete operations
- Always invalidate relevant query keys in `onSuccess`
- Handle errors in `onError` — never swallow mutation failures silently

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./api";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
}
```

### Query Keys

- Centralize query keys to avoid typos and make invalidation reliable

```ts
// src/features/users/queryKeys.ts
export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => ["users", id] as const,
  list: (filters: UserFilters) => ["users", "list", filters] as const,
};
```

### Rules

- Use TanStack Query for **all** backend calls — no raw `useEffect` fetching
- Keep `queryClient` interactions (invalidation, prefetching) in hooks, not components
- Use `enabled` option to conditionally run queries instead of conditional hook calls
- Prefer `staleTime` tuning over disabling caching entirely
- Local UI state (`useState`) is still fine for non-server state (modals, form inputs, toggles)

---

## File & Folder Structure

```
src/
  assets/          # Static files (images, fonts, icons)
  components/      # Shared, reusable UI components
  features/        # Feature-based modules (self-contained)
    auth/
      components/
      hooks/
      api.ts
      index.tsx     # Public API of the feature
  hooks/           # Calendar-wide custom hooks
  pages/           # Route-level page components
  types/           # Shared global TypeScript types only
  main.tsx
  Calendar.tsx
```

- Use **feature folders** for domain logic — keep features self-contained
- Each feature exports a clean public API via `index.tsx`
- Avoid deeply nested imports — use path aliases (e.g. `@/components/...`)

---

## Path Aliases

Configure in both `vite.config.ts` and `tsconfig.json`:

```ts
// vite.config.ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
```

```json
// tsconfig.json
"paths": {
  "@/*": ["./src/*"]
}
```

---

## Vite Configuration

- Keep `vite.config.ts` minimal — only add plugins you actually use
- Use `vite-tsconfig-paths` plugin to sync TS path aliases automatically
---

## Imports & Exports

- Use **absolute imports** via path aliases (`@/`) — never use deep relative paths like `../../../`
- Group imports: external libs → internal modules → relative files → types
- Avoid barrel `index.tsx` files that re-export everything — they hurt tree-shaking and discoverability
- Import types with `import type` to keep runtime bundles clean

```ts
// ✅ Good import order
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/Button";
import { useAuth } from "@/features/auth";

import type { User } from "./types";
```

---

## Error Handling

- Use **Error Boundaries** to catch render errors at feature/page boundaries
- Handle async errors explicitly — don't let promises fail silently
- Provide user-facing fallback UI for loading and error states
- Type error objects properly — never catch `e` and use it as `any`

```ts
// ✅ Typed error handling
try {
  await submitForm(data);
} catch (error) {
  if (error instanceof ApiError) {
    setErrorMessage(error.message);
  }
}
```

---

## Testing

All tests use **Vitest** as the runner and **React Testing Library (RTL)** for component testing.

### Setup

```ts
// vite.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom";
```

### File Naming & Location

- Co-locate tests with the file they test: `UserCard.test.tsx` next to `UserCard.tsx`
- Name hook tests: `useUser.test.ts`

### Writing Tests

- Test **behavior and user interactions** — not implementation details or internal state
- Query elements the way users find them: by role, label, or text — never by class name or test ID unless unavoidable
- Use `userEvent` over `fireEvent` for realistic interaction simulation

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

test("shows error when submitted empty", async () => {
  render(<LoginForm />);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});
```

### Testing with TanStack Query

Wrap components that use `useQuery` or `useMutation` in a test `QueryClientProvider`:

```tsx
// src/test/wrapper.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "@/test/wrapper";
import { useUser } from "./useUser";

test("fetches user by id", async () => {
  const { result } = renderHook(() => useUser("1"), { wrapper: createWrapper() });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.name).toBe("Alice");
});
```

### Mocking

- Use **MSW (Mock Service Worker)** to mock API calls — don't mock `fetch` directly
- Use `vi.mock()` for module mocks; `vi.spyOn()` for spying on specific functions
- Reset mocks between tests with `vi.clearAllMocks()` in `beforeEach` or via Vitest config

```ts
// src/test/server.ts
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({ id: params.id, name: "Alice" });
  })
);
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom";
import { server } from "./server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Rules

- Never test implementation details — no assertions on state variables or internal methods
- Avoid snapshot tests for logic-heavy components — they break too easily and obscure intent
- Keep tests focused: one behaviour per test
- Don't test third-party libraries — trust them and test your own integration with them

---

## Tailwind CSS

### Setup
Tailwind is configured via `tailwind.config.ts`. Always set the `content` paths correctly so unused classes are purged in production:

```ts
// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Add custom tokens here — don't override defaults unless necessary
    },
  },
  plugins: [],
};
```

Import Tailwind in your global CSS entry point (e.g. `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Class Usage

- Apply utility classes directly in JSX — no separate CSS files needed for most cases
- Keep class lists readable — break long `className` strings across lines or extract with `clsx`/`cn`
- Never construct class names dynamically with string interpolation — Tailwind's purger won't detect them

```tsx
// ✅ Good — static full class names
const isActive = true;
<div className={isActive ? "bg-blue-500" : "bg-gray-200"} />

// ❌ Bad — dynamic construction breaks purging
<div className={`bg-${color}-500`} />
```

---

### Combining Classes with `clsx` / `cn`

Use a `cn()` utility to merge classes conditionally. The standard pattern uses `clsx` + `tailwind-merge`:

```ts
// src/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// ✅ Clean conditional classes
<button
  className={cn(
    "px-4 py-2 rounded font-medium transition-colors",
    isLoading && "opacity-50 cursor-not-allowed",
    variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
  )}
>
  Submit
</button>
```

---

### Extracting Reusable Styles

Avoid repeating long class strings — extract into a component or a `@layer components` block:

```css
/* src/index.css — for truly global, reusable patterns only */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors;
  }
}
```

Prefer **React components** over `@layer components` for anything interactive or parameterized:

```tsx
// ✅ Better — a typed, reusable Button component
interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded font-medium transition-colors",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-gray-100 text-gray-800 hover:bg-gray-200"
      )}
    >
      {children}
    </button>
  );
}
```

---

### Responsive Design

Use Tailwind's mobile-first breakpoint prefixes. Always design for mobile first, then layer larger breakpoints:

```tsx
// ✅ Mobile-first responsive layout
<div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
  ...
</div>
```

Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)

---

### Dark Mode

Enable `darkMode: "class"` in `tailwind.config.ts` for class-based toggling:

```tsx
// Apply dark variants alongside light ones
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  ...
</div>
```

---

### Design Tokens & Customization

- Define custom colors, spacing, and fonts under `theme.extend` — don't replace the default scale
- Use semantic naming for custom tokens (e.g. `brand`, `surface`, `muted`) not raw values
- Avoid arbitrary values (`w-[347px]`) unless truly one-off — if used more than twice, add it to config

```ts
// tailwind.config.ts — extending with semantic tokens
theme: {
  extend: {
    colors: {
      brand: {
        50: "#eff6ff",
        500: "#3b82f6",
        900: "#1e3a8a",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
},
```

---

### Tailwind Pitfalls to Avoid

| Pitfall | Preferred Alternative |
|---|---|
| Dynamic class construction (`bg-${color}-500`) | Full static class names with conditionals |
| Duplicating long class strings across files | Extract into a component |
| Overusing `@layer components` | Use React components instead |
| Arbitrary values everywhere | Add recurring values to `theme.extend` |
| Ignoring `tailwind-merge` | Use `cn()` to avoid class conflicts |

---

## Code Style

- Use **ESLint** with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `@typescript-eslint`
- Enable `react-hooks/exhaustive-deps` lint rule — always satisfy hook dependency arrays
- Prefer early returns to reduce nesting in components and functions
- Avoid magic numbers — name constants clearly


