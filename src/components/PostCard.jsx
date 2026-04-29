// PostCard.jsx
// Displays a summary card for a single blog post in the post list.
// Shows the post's categories, title, an excerpt of the content, author, and date.

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, deletePost, selectLikedPostIds } from "../store/postsSlice";
import { useTheme } from "../context/ThemeContext";

// Maps known category names to their Tailwind color classes for the tag chip.
const CATEGORY_COLORS = {
  React: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  Redux: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  JavaScript: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
  Engineering: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
  default: "bg-parchment text-ink-700 border-ink-200 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600",
};

// Returns the Tailwind color class string for a given category name.
function getCategoryColor(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;
}

// Formats an ISO date string into a human-readable date (e.g. "Apr 29, 2026").
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

// Truncates text to `len` characters and appends an ellipsis if it exceeds the limit.
function excerpt(text, len = 130) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text;
}

// PostCard component receives a `post` object and an `index` for staggered animation delay.
export default function PostCard({ post, index }) {
  const dispatch = useDispatch();
  const { addToast } = useTheme();
  // Retrieve the list of post IDs the user has liked from Redux store.
  const likedPostIds = useSelector(selectLikedPostIds);
  const isLiked = likedPostIds.includes(post.id);

  // Toggles the like state for this post and shows a toast notification.
  const handleLike = (e) => {
    e.preventDefault();
    dispatch(toggleLike(post.id));
    addToast(
      isLiked
        ? `Unliked "${post.title.slice(0, 30)}…"`
        : `Liked "${post.title.slice(0, 30)}…"`,
      isLiked ? "info" : "success"
    );
  };

  // Prompts for confirmation then dispatches a delete action and shows a toast.
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm(`Delete "${post.title}"?`)) {
      dispatch(deletePost(post.id));
      addToast("Post deleted.", "error");
    }
  };

  return (
    <article
      className="card animate-slide-up group"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
    >
      <Link to={`/post/${post.id}`} className="block p-6 pb-4">
        {/* Categories */}
        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 3).map((cat) => (
              <span key={cat} className={`tag-chip ${getCategoryColor(cat)}`}>
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-zinc-100 leading-snug mb-2
                       group-hover:text-terracotta transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-ink-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">
          {excerpt(post.content)}
        </p>
      </Link>

      {/* Footer */}
      <div className="px-6 pb-5 flex items-center justify-between border-t border-ink-50 dark:border-zinc-700 pt-3">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs font-medium text-ink-700 dark:text-zinc-300">{post.author}</p>
            <p className="text-xs text-ink-400 dark:text-zinc-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Like / Unlike toggle */}
          <button
            onClick={handleLike}
            title={isLiked ? "Unlike this post" : "Like this post"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm 
                       transition-all duration-200 text-xs font-medium group/like
                       ${isLiked
                         ? "text-terracotta bg-red-50 dark:bg-red-900/20 border border-terracotta/30"
                         : "text-ink-500 dark:text-zinc-400 hover:text-terracotta hover:bg-red-50 dark:hover:bg-red-900/20"
                       }`}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
              className="group-hover/like:scale-110 transition-transform">
              <path d="M6.5 11s-5-3.134-5-6.5a3 3 0 0 1 5-2.236A3 3 0 0 1 11.5 4.5C11.5 7.866 6.5 11 6.5 11z"
                stroke="currentColor" strokeWidth="1.3" fill={isLiked ? "currentColor" : "none"}/>
            </svg>
            {post.likes}
          </button>

          {/* Edit */}
          <Link
            to={`/edit/${post.id}`}
            onClick={(e) => e.stopPropagation()}
            title="Edit post"
            className="p-1.5 rounded-sm text-ink-400 dark:text-zinc-500 hover:text-cobalt hover:bg-blue-50 dark:hover:bg-blue-900/20
                       transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M9.5 1.5l2 2-7 7H2.5v-2l7-7z"
                stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Delete */}
          <button
            onClick={handleDelete}
            title="Delete post"
            className="p-1.5 rounded-sm text-ink-400 dark:text-zinc-500 hover:text-terracotta hover:bg-red-50 dark:hover:bg-red-900/20
                       transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 3.5h9M5 3.5v-1h3v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7h6l.5-7"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
