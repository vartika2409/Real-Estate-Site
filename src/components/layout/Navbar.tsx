"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, LogOut, UserCircle } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { SignInModal } from "@/components/auth/SignInModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  function handleLogout() {
    supabase.auth.signOut();
    setIsOpen(false);
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-primary">
              <Home className="h-6 w-6 text-brand-accent" />
              <span>LuxEstate</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-brand-primary font-semibold"
                        : "text-slate-600 hover:text-brand-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop right section */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="rounded-lg border border-brand-primary px-5 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10 transition-colors"
              >
                List Your Property
              </Link>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-brand-primary/10 px-3 py-2">
                    <UserCircle className="h-4 w-4 text-brand-primary shrink-0" />
                    <span className="text-sm font-medium text-brand-primary max-w-[140px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-primary" onClick={() => setIsOpen(false)}>
                  <Home className="h-5 w-5 text-brand-accent" />
                  <span>LuxEstate</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto p-4 border-t border-slate-100 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg bg-brand-primary py-3 text-center text-sm font-semibold text-white hover:bg-brand-primary/90 transition-colors"
                >
                  List Your Property
                </Link>

                {user ? (
                  <div className="flex items-center justify-between rounded-lg bg-brand-primary/10 px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <UserCircle className="h-4 w-4 text-brand-primary shrink-0" />
                      <span className="text-sm font-medium text-brand-primary truncate">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className="ml-2 p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setIsOpen(false); setShowModal(true); }}
                    className="block w-full rounded-lg border border-brand-primary py-3 text-center text-sm font-semibold text-brand-primary hover:bg-brand-primary/10 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth modal */}
      <AnimatePresence>
        {showModal && <SignInModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}
