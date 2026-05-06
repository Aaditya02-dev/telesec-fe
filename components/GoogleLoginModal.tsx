"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (email: string) => void;
}

export function GoogleLoginModal({ isOpen, onClose, onSelect }: GoogleLoginModalProps) {
  const accounts = [
    { name: "John Doe", email: "john.doe@gmail.com", avatar: "JD" },
    { name: "Work Account", email: "j.doe@teleroot.io", avatar: "TR" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[360px] overflow-hidden rounded-lg bg-white text-slate-900 shadow-2xl"
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <svg className="h-8 w-8" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h2 className="text-center text-xl font-medium mb-1">Sign in</h2>
              <p className="text-center text-sm text-slate-600 mb-6">to continue to TeleRoot</p>

              <div className="space-y-1">
                {accounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => onSelect(account.email)}
                    className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-slate-50 transition-colors border-t border-slate-100 first:border-0"
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                      {account.avatar}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{account.name}</div>
                      <div className="text-xs text-slate-500">{account.email}</div>
                    </div>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-slate-50 transition-colors border-t border-slate-100">
                  <div className="h-8 w-8 rounded-full bg-transparent border border-slate-200 flex items-center justify-center text-slate-500">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium">Use another account</div>
                </button>
              </div>
            </div>
            <div className="p-4 bg-slate-50 text-[11px] text-slate-500 flex justify-between">
              <div className="flex gap-4">
                <span>English (United States)</span>
              </div>
              <div className="flex gap-4">
                <span>Help</span>
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
