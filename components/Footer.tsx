'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t border-brand-blush/30 py-12 bg-linear-to-br from-brand-blush/10 via-brand-sky/10 to-brand-sage/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Grid: brand spans 2 columns on md+ to balance spacing */}
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* BRAND (wider) */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Compass className="h-7 w-7 text-brand-teal" />
              </motion.div>
              <span className="font-bold text-2xl bg-linear-to-r from-brand-teal to-brand-sky bg-clip-text text-transparent">
                TourGuide
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 max-w-xs">
              Making software easier to learn, one tour at a time.
            </p>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base text-slate-800">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/#features" className="hover:text-brand-teal transition-colors">Features</Link></li>
              <li><Link href="/docs" className="hover:text-brand-teal transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-base text-slate-800">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about#team" className="hover:text-brand-teal transition-colors">About Us</Link></li>
              <li><Link href="/about#team" className="hover:text-brand-teal transition-colors">Contact</Link></li>
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
