'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-14 bg-linear-to-br from-brand-blush/10 via-brand-sky/10 to-brand-sage/10 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Compass className="h-7 w-7 text-[#2A1E5C]" />
              </motion.div>
              <span className="font-bold text-2xl bg-linear-to-br from-[#2A1E5C] via-[#2A1E5Cee] to-[#2A1E5Ccc] bg-clip-text text-transparent">
                TourGuide
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Making software easier to learn, one tour at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/#features" className="hover:text-brand-teal transition-colors">Features</Link></li>
              <li><Link href="/sign-up" className="hover:text-brand-teal transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about#team" className="hover:text-brand-teal transition-colors">About Us</Link></li>
              <li><Link href="/about#team-members" className="hover:text-brand-teal transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/demo.html" className="hover:text-brand-teal transition-colors">Demo</Link></li>
              <li><Link href="/docs" className="hover:text-brand-teal transition-colors">Documentation</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} TourGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
