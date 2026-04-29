// PostForm.jsx
// Reusable form component used by both the New Post and Edit Post pages.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm({ initialValues = {}, onSubmit, isEdit = false }) {
  const navigate = useNavigate();

  // Controlled state for each form field.
  const [title, setTitle] = useState(initialValues.title || "");
  const [author, setAuthor] = useState(initialValues.author || "");
  // Categories are stored as a comma-separated string for easy text input.
  const [categories, setCategories] = useState(
    initialValues.categories ? initialValues.categories.join(", ") : ""
  );
  const [content, setContent] = useState(initialValues.content || "");
  // Field-level validation error messages keyed by field name.
  const [errors, setErrors] = useState({});

  // Returns an object of validation errors; empty object means the form is valid.
  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!author.trim()) e.author = "Author is required";
    if (!content.trim()) e.content = "Content is required";
    return e;
  };

  // Validates the form, then parses categories and calls the onSubmit callback.
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // Split the comma-separated categories string into a trimmed array.
    const parsedCats = categories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    onSubmit({ title: title.trim(), author: author.trim(), categories: parsedCats, content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Title */}
      <div>
        <label className="block section-label mb-2">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
          placeholder="Write a compelling title…"
          className={`input-field font-display text-lg ${errors.title ? "border-terracotta focus:border-terracotta" : ""}`}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-terracotta font-medium">{errors.title}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block section-label mb-2">Author *</label>
        <input
          type="text"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setErrors((p) => ({ ...p, author: "" })); }}
          placeholder="Your name…"
          className={`input-field ${errors.author ? "border-terracotta focus:border-terracotta" : ""}`}
        />
        {errors.author && (
          <p className="mt-1 text-xs text-terracotta font-medium">{errors.author}</p>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block section-label mb-2">Categories</label>
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="React, JavaScript, Engineering…"
          className="input-field"
        />
        <p className="mt-1.5 text-xs text-ink-400 dark:text-zinc-500">Comma-separated values</p>
      </div>

      {/* Content */}
      <div>
        <label className="block section-label mb-2">Content *</label>
        <textarea
          value={content}
          onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: "" })); }}
          placeholder="Start writing your post…"
          rows={14}
          className={`input-field resize-none leading-relaxed ${errors.content ? "border-terracotta focus:border-terracotta" : ""}`}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-terracotta font-medium">{errors.content}</p>
        )}
        <p className="mt-1 text-xs text-ink-400 dark:text-zinc-500 text-right">
          {content.length} characters
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="btn-primary">
          {isEdit ? "Save Changes" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
