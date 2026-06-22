"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

const PROPERTY_TYPES = ["Houses", "Apartments", "Villas", "Studios", "Commercial"];
const QUICK_LINKS = [
  { label: "Browse Listings", href: "/listings" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "List Your Property", href: "/contact" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900 text-slate-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <Home className="h-6 w-6 text-brand-accent" />
            <span>LuxEstate</span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Your trusted partner in finding exceptional properties. We deliver world-class service with a personal touch.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-3 w-3 text-brand-accent" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Property Types</h3>
          <ul className="space-y-2">
            {PROPERTY_TYPES.map((type) => (
              <li key={type}>
                <Link
                  href={`/listings?type=${type.replace(/s$/, "")}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-3 w-3 text-brand-accent" />
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 text-slate-400">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-accent" />
              <span>200 Main Street, Suite 400<br />Austin, TX 78701</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <Phone className="h-4 w-4 shrink-0 text-brand-accent" />
              <a href="tel:+15125550100" className="hover:text-white transition-colors">+1 (512) 555-0100</a>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <Mail className="h-4 w-4 shrink-0 text-brand-accent" />
              <a href="mailto:hello@luxestate.com" className="hover:text-white transition-colors">hello@luxestate.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} LuxEstate. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
