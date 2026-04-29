import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="font-mono text-5xl text-ink-300 dark:text-zinc-600 mb-4">404</p>
      <h2 className="font-display text-2xl text-ink-800 dark:text-zinc-200 mb-2">Page not found</h2>
      <a href="/" className="btn-primary inline-flex mt-4">Go Home</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}
