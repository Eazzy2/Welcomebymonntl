import React from "react";
import { Check, Info, X, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "party";
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all ${
              toast.type === "success"
                ? "bg-[#131b2e]/90 text-teal-300 border-teal-500/30"
                : toast.type === "party"
                ? "bg-[#1d142d]/90 text-purple-300 border-purple-500/30"
                : "bg-[#111827]/90 text-sky-300 border-sky-500/30"
            }`}
          >
            <div className="mt-0.5">
              {toast.type === "success" ? (
                <Check className="w-5 h-5 text-teal-400" />
              ) : toast.type === "party" ? (
                <PartyPopper className="w-5 h-5 text-purple-400" />
              ) : (
                <Info className="w-5 h-5 text-sky-400" />
              )}
            </div>
            <div className="flex-1 text-sm font-medium pr-1 text-gray-200">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
