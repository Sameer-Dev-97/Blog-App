// NewPost.jsx
// Page for creating a new blog post.
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addPost } from "../store/postsSlice";
import { useTheme } from "../context/ThemeContext";
import PostForm from "../components/PostForm";

export default function NewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useTheme();

  // Dispatches the new post and redirects home after creation.
  const handleSubmit = (values) => {
    dispatch(addPost(values));
    addToast("Post published successfully!", "success");
    navigate("/");
  };

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
      <div className="mb-8">
        <p className="section-label mb-1">Create</p>
        <h1 className="font-display text-3xl font-bold text-ink-950 dark:text-zinc-100">New Post</h1>
        <div className="mt-3 h-0.5 w-12 bg-terracotta rounded-full" />
      </div>
      <div className="bg-white dark:bg-zinc-800 border border-ink-100 dark:border-zinc-700 rounded-sm shadow-sm p-8 transition-colors duration-300">
        <PostForm onSubmit={handleSubmit} isEdit={false} />
      </div>
    </div>
  );
}
