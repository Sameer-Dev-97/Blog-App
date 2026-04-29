// EditPost.jsx
// Page for editing an existing blog post.
// Reads the post `id` from the URL, loads the post from Redux, and renders
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById, updatePost } from "../store/postsSlice";
import { useTheme } from "../context/ThemeContext";
import PostForm from "../components/PostForm";

export default function EditPost() {
  const { id } = useParams(); // post ID from the route (/edit/:id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useTheme();

  const post = useSelector(selectPostById(id));

  // Guard: show a friendly message if the post no longer exists.
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <h2 className="font-display text-2xl text-ink-800 dark:text-zinc-200 mb-2">Post not found</h2>
        <p className="text-ink-500 dark:text-zinc-400 mb-6">This post may have been deleted.</p>
        <Link to="/" className="btn-primary inline-flex">Back to Home</Link>
      </div>
    );
  }

  // Merges the edited values into the existing post and navigates to the detail view.
  const handleSubmit = (values) => {
    dispatch(updatePost({ id, ...values }));
    addToast("Post updated successfully!", "success");
    navigate(`/post/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <Link to={`/post/${id}`} className="inline-flex items-center gap-2 text-sm text-ink-500 dark:text-zinc-400 hover:text-ink-900 dark:hover:text-zinc-100
                   transition-colors mb-8 group">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="group-hover:-translate-x-0.5 transition-transform">
          <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Back to post
      </Link>
      <div className="mb-8">
        <p className="section-label mb-1">Editing</p>
        <h1 className="font-display text-3xl font-bold text-ink-950 dark:text-zinc-100 line-clamp-2">{post.title}</h1>
        <div className="mt-3 h-0.5 w-12 bg-cobalt rounded-full" />
      </div>
      <div className="bg-white dark:bg-zinc-800 border border-ink-100 dark:border-zinc-700 rounded-sm shadow-sm p-8 transition-colors duration-300">
        <PostForm initialValues={post} onSubmit={handleSubmit} isEdit={true} />
      </div>
    </div>
  );
}
