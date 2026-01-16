# Exercise 10: React New Features

## 1. How does the new concurrency work and what is the main difference from the old React rendering model?

React’s new concurrent rendering allows React to **interrupt, pause, resume, or cancel rendering tasks**. This makes rendering non-blocking.

**Old model:** Rendering was synchronous and blocked the UI until finished.
**New model:** Rendering is interruptible and prioritised, keeping the UI responsive.

---

## 2. What is a `<Suspense>` component and where should it be used?

`<Suspense>` is used to show a **fallback UI** (like a loader) while waiting for async data or lazy-loaded components.

**Example:** Wrapping lazy-loaded routes or data-fetching components:

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <UserProfile />
</Suspense>
```

---

## 3. When should you use SSR and when not?

**Use SSR when:**

* You need **search engine optimisation (SEO)**.
* Fast first-paint is important.
* Content must be visible before JavaScript loads.

**Do NOT use SSR when:**

* The page is **highly interactive** (dashboards, admin panels).
* SEO is not important.
* Client-side rendering is enough.

---

## 4. What is a `useTransition()` hook and where should it be used?

`useTransition()` lets you mark certain state updates as **non-urgent**, improving responsiveness.

**Use it when:** Heavy UI updates (e.g., filtering a large list) should not block typing or clicks.

---

## 5. What is a `useId` hook and where should it be used?

`useId()` generates **unique, stable IDs** for accessibility.

**Use it for:**

* Form fields (`label` + `input` association)
* ARIA attributes

---

## 6. What is a `useOptimistic()` hook and where should it be used?

`useOptimistic()` provides **instant, temporary state updates** before an async action completes.

**Use case examples:**

* Adding comments
* Updating message lists
* Optimistic shopping cart updates

---

## 7. What is a `useActionState()` hook and where should it be used?

`useActionState()` helps manage form states when using **React Server Actions**.

It tracks:

* Loading state
* Error state
* Success response

Use it when handling server-side form submissions.

---

## 8. What is the `use` API and where should it be used?

The `use` API lets components **directly await promises**, automatically integrating with Suspense.

**Use it in:**

* React Server Components
* Async data fetching boundaries

---

## 9. What are React Server Components and where should they be used?

React Server Components (RSCs) run **on the server**, not in the browser.

**Benefits:**

* Smaller client bundle size
* Secure server-side data fetching
* Faster rendering

**Use for:**

* Data-heavy components (product lists, dashboards)
* Pages with frequent server data

---

## 10. Mention one additional new feature and explain why it is good.

**React Server Actions** (React 19) allow components to call server-side functions **without building a separate API**.

**Why it’s good:**

* Less boilerplate
* Safer server interactions
* Cleaner form handling
