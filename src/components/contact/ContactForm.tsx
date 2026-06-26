"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import type { ContactFormData } from "@/types";

interface ContactFormProps {
  propertyId?: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

const fields = [
  { key: "name" as const, label: "Full Name", icon: User, type: "text", placeholder: "John Smith", required: true },
  { key: "email" as const, label: "Email Address", icon: Mail, type: "email", placeholder: "john@example.com", required: true },
  { key: "phone" as const, label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 XXXXX XXXXX", required: false },
];

export function ContactForm({ propertyId }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    propertyId: propertyId ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(key: keyof ContactFormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800"
          >
            <CheckCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Message sent!</p>
              <p className="text-xs mt-0.5">An agent will reach out within 24 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        {fields.map(({ key, label, icon: Icon, type, placeholder, required }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 transition-shadow ${
                  errors[key] ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-brand-primary/30"
                }`}
              />
            </div>
            <AnimatePresence>
              {errors[key] && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 flex items-center gap-1 text-xs text-red-500 overflow-hidden"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors[key]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {propertyId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Reference</label>
            <input
              type="text"
              value={form.propertyId}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400"
            />
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Message <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell us about your requirements..."
              className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 transition-shadow resize-none ${
                errors.message ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-brand-primary/30"
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 flex items-center gap-1 text-xs text-red-500 overflow-hidden"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading || submitted}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-4 font-semibold text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {loading ? "Sending…" : submitted ? "Message Sent!" : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
}
