// ToastContainer.jsx
// Renders the stack of active toast notifications in the bottom-right corner of the screen.
// Reads the `toasts` array from ThemeContext and maps each entry to a styled notification.
import { useTheme } from "../context/ThemeContext";

export default function ToastContainer() {
  // toasts: array of active toast objects { id, message, type}
  // removeToast: removes a toast by its id
  const { toasts, removeToast } = useTheme();

  // Render nothing when there are no active toasts.
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-5 py-3.5 rounded-sm shadow-lg
            font-body text-sm font-medium animate-slide-up
            ${toast.type === "success"
              ? "bg-sage text-white"
              : toast.type === "error"
              ? "bg-terracotta text-white"
              : "bg-cobalt text-white"
            }
          `}
        >
          <span>
            {toast.type === "success" ? "✓" : toast.type === "error" ? "✗" : "ℹ"}
          </span>
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
