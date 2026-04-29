// PostList.jsx
// Home page that lists all blog posts.
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts } from "../store/postsSlice";
import PostCard from "../components/PostCard";

export default function PostList() {
  const posts = useSelector(selectAllPosts);
  const [search, setSearch] = useState("");

  // Re-filters the post list whenever the search query or posts array changes.
  const filtered = useMemo(() => {
    let result = [...posts];
    if (search.trim()) {
      const q = search.toLowerCase();
      // Match against title, body content, and any category tag.
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, search]);

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80&auto=format&fit=crop"
          alt="Ink and writing"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%", filter: "brightness(0.5) saturate(0.75)" }}
        />

        {/* Light mode gradient — fades to cream */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(15,10,6,0.3) 0%, rgba(15,10,6,0.5) 55%, rgba(250,248,243,1) 100%)",
          }}
        />
        {/* Dark mode gradient — fades to dark bg */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background: "linear-gradient(to bottom, rgba(8,6,4,0.35) 0%, rgba(8,6,4,0.6) 55%, rgba(26,23,20,1) 100%)",
          }}
        />

       
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-terracotta" />

        {/* Hero text*/}
        <div
          className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-center"
          style={{ paddingBottom: "48px" }}
        >
          <p
            className="font-mono text-xs tracking-widest uppercase mb-2 animate-fade-in"
            style={{ color: "rgba(240,235,224,0.65)" }}
          >
            Welcome to
          </p>

          <h1
            className="font-display font-bold leading-none mb-3 animate-slide-up"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#faf8f3",
              textShadow: "0 2px 20px rgba(0,0,0,0.55)",
              animationDelay: "60ms",
              animationFillMode: "both",
            }}
          >
            The Inkwell
          </h1>

          <p
            className="text-sm max-w-md leading-relaxed animate-slide-up"
            style={{
              color: "rgba(240,235,224,0.75)",
              animationDelay: "130ms",
              animationFillMode: "both",
            }}
          >
            A curated space for thoughts on web development, design, and engineering.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">

       
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 dark:text-zinc-500"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts…"
              className="input-field pl-9 py-2.5 text-sm"
            />
          </div>

          {/* Post count badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="section-label">
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
              {search && ` for "${search}"`}
            </span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-ink-400 dark:text-zinc-500 hover:text-terracotta transition-colors"
              >
                ✕ clear
              </button>
            )}
          </div>
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-14 h-14 bg-parchment dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-ink-400 dark:text-zinc-500">
                <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="font-display text-xl text-ink-700 dark:text-zinc-300 mb-2">No posts found</h3>
            <p className="text-ink-400 dark:text-zinc-500 text-sm mb-6">
              {search ? "Try different search terms." : "Be the first to write something."}
            </p>
            <Link to="/new" className="btn-primary inline-flex">Write a Post</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
