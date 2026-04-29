import { createSlice } from "@reduxjs/toolkit";

// Load state from localStorage
const loadState = () => {
  try {
    const data = localStorage.getItem("postsState");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error loading state", e);
    return null;
  }
};

const savedState = loadState();

const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React: A Modern Guide",
    categories: ["React", "JavaScript"],
    content: `React has transformed the way we think about building user interfaces...`,
    likes: 14,
    createdAt: "2025-12-15T10:30:00Z",
    author: "Alex Rivers",
  },
  {
    id: "2",
    title: "Redux Toolkit: Simplifying State Management",
    categories: ["Redux", "React", "State Management"],
    content: `Redux has long been the gold standard for state management...`,
    likes: 22,
    createdAt: "2025-12-20T14:15:00Z",
    author: "Sam Chen",
  },
  {
    id: "3",
    title: "ES6+ Features Every Developer Must Know",
    categories: ["JavaScript", "ES6", "Web Development"],
    content: `Modern JavaScript has evolved enormously...`,
    likes: 19,
    createdAt: "2025-12-28T09:00:00Z",
    author: "Jordan Blake",
  },
  {
    id: "4",
    title: "CSS Grid & Flexbox: Layout Superpowers",
    categories: ["Design", "Web Development"],
    content: `For years, CSS layout was an exercise in creative hacking...`,
    likes: 31,
    createdAt: "2026-01-05T11:45:00Z",
    author: "Maya Patel",
  },
  {
    id: "5",
    title: "The Art of Clean Code in JavaScript",
    categories: ["JavaScript", "Best Practices", "Engineering"],
    content: `Clean code isn't about being clever — it's about being clear...`,
    likes: 27,
    createdAt: "2026-01-12T16:30:00Z",
    author: "Chris Morgan",
  },
];

//  Use saved state OR fallback
const initialState = savedState || {
  posts: initialPosts,
  likedPostIds: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        id: Date.now().toString(),
        likes: 0,
        createdAt: new Date().toISOString(),
        ...action.payload,
      };
      state.posts.unshift(newPost);
    },

    updatePost: (state, action) => {
      const idx = state.posts.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.posts[idx] = { ...state.posts[idx], ...action.payload };
      }
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      state.likedPostIds = state.likedPostIds.filter(
        (id) => id !== action.payload
      );
    },

    toggleLike: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (!post) return;

      const alreadyLiked = state.likedPostIds.includes(postId);

      if (alreadyLiked) {
        post.likes = Math.max(0, post.likes - 1);
        state.likedPostIds = state.likedPostIds.filter(
          (id) => id !== postId
        );
      } else {
        post.likes += 1;
        state.likedPostIds.push(postId);
      }
    },
  },
});

export const { addPost, updatePost, deletePost, toggleLike } =
  postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (id) => (state) =>
  state.posts.posts.find((p) => p.id === id);
export const selectLikedPostIds = (state) => state.posts.likedPostIds;

export default postsSlice.reducer;