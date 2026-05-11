"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, FileText, Lock, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IamTermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export function IamTermsModal({ isOpen, onAccept }: IamTermsModalProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [scanStatus, setScanStatus] = useState("Initializing...");

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setScanStatus("Validating IAM Access...");
      
      const statusTimer = setTimeout(() => setScanStatus("Decrypting Security Tokens..."), 700);
      const statusTimer2 = setTimeout(() => setScanStatus("Establishing Secure Tunnel..."), 1400);

      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 2100);
      return () => {
        clearTimeout(timer);
        clearTimeout(statusTimer);
        clearTimeout(statusTimer2);
      };
    } else {
      setIsScanning(true);
      setTermsChecked(false);
      setPrivacyChecked(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleAccept = () => {
    if (termsChecked && privacyChecked) {
      setIsSubmitting(true);
      setTimeout(() => {
        onAccept();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0B0C10]/80 backdrop-blur-xl p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#41bf63]/30 bg-[#0B0C10] shadow-[0_0_80px_rgba(65,191,99,0.2)] p-8"
          >
            {/* Top glowing edge */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#41bf63] to-transparent opacity-80" />

            {isScanning ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-8">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <Loader2 className="h-12 w-12 text-[#41bf63] animate-spin" strokeWidth={3} />
                  <div className="absolute inset-0 rounded-full border-2 border-[#41bf63] animate-ping opacity-20" />
                  <div className="absolute inset-0 rounded-full border border-[#41bf63]/40 animate-[pulse_2s_infinite]" />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-base font-black uppercase tracking-[0.3em] text-[#41bf63] animate-pulse">{scanStatus}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Security Layer v4.2</p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#41bf63]/10 border border-[#41bf63]/20">
                    <ShieldCheck className="h-6 w-6 text-[#41bf63]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wider text-white">Security Compliance</h2>
                    <p className="text-xs text-slate-400 mt-1">Please accept the IAM user policies to proceed.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded border-2 border-white/20 bg-white/5 transition-all group-hover:border-white/50">
                      <input 
                        type="checkbox" 
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        className="peer absolute inset-0 opacity-0 cursor-pointer z-10" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center scale-0 transition-transform duration-200 peer-checked:scale-100 bg-[#41bf63] rounded-[2px] border-none">
                        <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block mb-0.5">
                        Dashboard Terms & Conditions
                      </span>
                      <span className="text-[10px] text-slate-400">
                        I agree to abide by the Teleroot acceptable use policy and standard operating procedures for IAM level access.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded border-2 border-white/20 bg-white/5 transition-all group-hover:border-white/50">
                      <input 
                        type="checkbox" 
                        checked={privacyChecked}
                        onChange={(e) => setPrivacyChecked(e.target.checked)}
                        className="peer absolute inset-0 opacity-0 cursor-pointer z-10" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center scale-0 transition-transform duration-200 peer-checked:scale-100 bg-[#41bf63] rounded-[2px] border-none">
                        <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block mb-0.5">
                        Data Privacy & Security Policy
                      </span>
                      <span className="text-[10px] text-slate-400">
                        I acknowledge that all actions performed within the dashboard are logged and monitored for compliance.
                      </span>
                    </div>
                  </label>
                </div>

                <button
                  onClick={handleAccept}
                  disabled={!termsChecked || !privacyChecked || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#41bf63] py-3 text-xs font-black uppercase tracking-[0.15em] text-black transition-all hover:bg-[#bce628] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Enter Dashboard
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
