# 📝 The Inkwell — React + Redux Blog Application

A beautiful, fully-featured Blog Post Application built with **React**, **Redux Toolkit**, and **Context API** for state management, styled with **Tailwind CSS**.

---

## 🚀 Features

- 📋 **List all blog posts** with search and category filtering
- 🔍 **View post details** author info, category, and full content
- ✍️ **Create new posts** with title, Author, categories, and content
- ✏️ **Edit existing posts** with pre-filled form
- 🗑️ **Delete posts** with confirmation dialog
- ❤️ **Like posts** — tracked in global Redux state
- 🌗 **Light / Sepia theme toggle** via Context API
- 🔔 **Toast notifications** for all user actions

---



## 📦 Local Setup Steps

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd blog-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```


---




## 🔄 Redux vs Context API Usage

### Redux Toolkit — Global Application State

Redux is used for **blog post data** — the core domain state of the application.

**Why Redux?**
- Posts are accessed and mutated across multiple pages (list, detail, edit)
- Actions like `addPost`, `updatePost`, `deletePost`, `likePost` need to be traceable
- Redux DevTools enable time-travel debugging for all state transitions
- `createSlice` eliminates boilerplate while keeping actions predictable

**Redux handles:**
- `posts[]` array — the source of truth for all blog content
- CRUD actions: `addPost`, `updatePost`, `deletePost`, `likePost`
- Selectors: `selectAllPosts`, `selectPostById`

### Context API — Cross-cutting Concerns

Context API is used for **UI-level state** that cuts across many components but doesn't belong in the domain model.

**Why Context?**
- Lightweight — no reducers or action creators needed
- Perfect for UI preferences like theme mode
- Toast notification queue is ephemeral and UI-only

**Context handles:**
- `theme` — "light" or "sepia" mode toggle
- `toasts[]` — temporary notification queue with auto-dismiss
- `addToast()` / `removeToast()` helpers consumed by any component

---





##  Assumptions

1. **No backend required** — all post data is maintained in Redux store (in-memory). Data resets on page refresh. For persistence, `localStorage` integration can be added to the Redux store.  
2. **Authentication not required** — all users can create, edit, delete, and like posts.  
3. **Likes are user-specific and support toggle behavior (like/unlike)** — ensuring accurate like counts.  
4. **Preloaded demo data** — some posts are already available as sample data for initial display and testing purposes.  
5. **Single-page application** — uses React Router with `BrowserRouter`. For Azure Static Web Apps.  