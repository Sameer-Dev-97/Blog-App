// PostDetail.jsx
// Full-page view for a single blog post, accessed via /post/:id.
// Displays the title, author, date, category tags, and full content split into paragraphs.
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById, deletePost, toggleLike, selectLikedPostIds } from "../store/postsSlice";
import { useTheme } from "../context/ThemeContext";

// Category-to-color mapping for tag chips (same palette as PostCard).
const CATEGORY_COLORS = {
  React: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  Redux: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  JavaScript: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
  Engineering: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
  default: "bg-parchment text-ink-700 border-ink-200 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600",
};

function getCategoryColor(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;
}

// Formats an ISO date string into a long-form readable date (e.g. "April 29, 2026").
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function PostDetail() {
  const { id } = useParams(); // post ID from the route (/post/:id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useTheme();

  const post = useSelector(selectPostById(id));
  const likedPostIds = useSelector(selectLikedPostIds);
  const isLiked = likedPostIds.includes(id);

  // Guard: show a not-found state if the post doesn't exist (e.g. was deleted).
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 bg-parchment dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <h2 className="font-display text-2xl text-ink-800 dark:text-zinc-200 mb-2">Post not found</h2>
        <p className="text-ink-500 dark:text-zinc-400 mb-6">This post may have been deleted or doesn't exist.</p>
        <Link to="/" className="btn-primary inline-flex">Back to Home</Link>
      </div>
    );
  }

  // Toggles the like state and shows a contextual toast message.
  const handleLike = () => {
    dispatch(toggleLike(post.id));
    addToast(isLiked ? "Removed your like." : "You liked this post!", isLiked ? "info" : "success");
  };

  // Asks for confirmation before permanently deleting the post and redirecting home.
  const handleDelete = () => {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      dispatch(deletePost(post.id));
      addToast("Post deleted.", "error");
      navigate("/");
    }
  };

  // Split content on blank lines to render each paragraph separately.
  const paragraphs = post.content.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-500 dark:text-zinc-400 hover:text-ink-900 dark:hover:text-zinc-100
                   transition-colors mb-8 group">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="group-hover:-translate-x-0.5 transition-transform">
          <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Back to index
      </Link>

      <article className="bg-white dark:bg-zinc-800 border border-ink-100 dark:border-zinc-700 rounded-sm shadow-sm overflow-hidden transition-colors duration-300">

        {/* Header */}
        <div className="p-8 pb-6 border-b border-ink-50 dark:border-zinc-700">
          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.categories.map((cat) => (
                <span key={cat} className={`tag-chip ${getCategoryColor(cat)}`}>{cat}</span>
              ))}
            </div>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-950 dark:text-zinc-100 leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-ink-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-parchment dark:bg-zinc-700 border border-ink-200 dark:border-zinc-600
                              flex items-center justify-center font-display font-bold text-ink-700 dark:text-zinc-300 text-xs">
                {post.author?.[0]?.toUpperCase() || "A"}
              </div>
              <span className="font-medium text-ink-700 dark:text-zinc-300">{post.author}</span>
            </div>
            <span className="text-ink-300 dark:text-zinc-600">·</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Action bar */}
        <div className="px-8 py-3 bg-parchment/50 dark:bg-zinc-900/50 border-b border-ink-100 dark:border-zinc-700
                        flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm border
                       transition-all duration-200 text-sm font-medium group/like
                       ${isLiked
                         ? "text-terracotta border-terracotta bg-red-50 dark:bg-red-900/20"
                         : "border-ink-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-ink-700 dark:text-zinc-300 hover:text-terracotta hover:border-terracotta hover:bg-red-50 dark:hover:bg-red-900/20"
                       }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="group-hover/like:scale-125 transition-transform">
              <path d="M7 12s-5.5-3.5-5.5-7a3.5 3.5 0 0 1 5.5-2.866A3.5 3.5 0 0 1 12.5 5C12.5 8.5 7 12 7 12z"
                stroke="currentColor" strokeWidth="1.3" fill={isLiked ? "currentColor" : "none"}/>
            </svg>
            {isLiked ? "Unlike" : "Like"} · {post.likes}
          </button>

          <div className="flex items-center gap-2">
            <Link to={`/edit/${post.id}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-sm border border-ink-200 dark:border-zinc-600
                         bg-white dark:bg-zinc-800 text-ink-700 dark:text-zinc-300
                         hover:text-cobalt hover:border-cobalt hover:bg-blue-50 dark:hover:bg-blue-900/20
                         transition-all duration-200 text-sm font-medium">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8.5 1.5l2 2-6 6H2.5v-2l6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              Edit
            </Link>
            <button onClick={handleDelete}
              className="flex items-center gap-1.5 px-4 py-2 rounded-sm border border-ink-200 dark:border-zinc-600
                         bg-white dark:bg-zinc-800 text-ink-700 dark:text-zinc-300
                         hover:text-terracotta hover:border-terracotta hover:bg-red-50 dark:hover:bg-red-900/20
                         transition-all duration-200 text-sm font-medium">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 3h9M4 3V2h4v1M4.5 5.5v3.5M7.5 5.5v3.5M2.5 3l.5 6.5h6l.5-6.5"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose-ink dark:prose-ink">
            {paragraphs.map((para, i) => (
              <p key={i} className="mb-5 text-ink-700 dark:text-zinc-300 leading-8">{para}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-ink-50 dark:border-zinc-700 bg-parchment/30 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-parchment dark:bg-zinc-700 border border-ink-200 dark:border-zinc-600
                              flex items-center justify-center font-display font-bold text-ink-800 dark:text-zinc-200 text-sm">
                {post.author?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-800 dark:text-zinc-200">{post.author}</p>
                <p className="text-xs text-ink-400 dark:text-zinc-500">Author</p>
              </div>
            </div>
            <p className="text-xs text-ink-400 dark:text-zinc-500">{post.likes} {post.likes === 1 ? "like" : "likes"}</p>
          </div>
        </div>
      </article>

      <div className="mt-6 flex justify-between items-center">
        <Link to="/" className="btn-ghost flex items-center gap-2 text-sm">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          All posts
        </Link>
        <Link to="/new" className="btn-primary text-sm">Write new post</Link>
      </div>
    </div>
  );
}
