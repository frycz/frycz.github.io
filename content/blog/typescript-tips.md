---
title: "TypeScript Tips for Better Code"
date: "2024-04-05"
slug: "typescript-tips"
---

TypeScript has become my go-to language for building reliable software. Here are some patterns and practices that have improved my codebase quality.

## Use Strict Mode

Always enable `strict: true` in your `tsconfig.json`. It catches entire classes of bugs at compile time:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

## Prefer Type Inference

Let TypeScript infer types when possible. Explicit types are good for function signatures and public APIs, but internal variables often don't need them:

```typescript
// Good
const users = await fetchUsers();

// Unnecessary
const users: User[] = await fetchUsers();
```

## Use Discriminated Unions

Instead of optional fields, use discriminated unions to model different states:

```typescript
// Before
type Response = {
  status: "success" | "error";
  data?: User;
  error?: string;
};

// After
type Response =
  | { status: "success"; data: User }
  | { status: "error"; error: string };
```

Now TypeScript knows that `data` exists when `status === "success"`.

## Avoid `any` Like the Plague

Using `any` defeats the purpose of TypeScript. When you truly don't know the type, use `unknown` and narrow it:

```typescript
function process(data: unknown) {
  if (typeof data === "string") {
    // TypeScript knows data is a string here
    return data.toUpperCase();
  }
  throw new Error("Invalid data type");
}
```

## Write Utility Types

Create reusable utility types for common patterns:

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

type AsyncResult<T, E = Error> = Promise<Result<T, E>>;
```

These small investments pay dividends across your codebase.
