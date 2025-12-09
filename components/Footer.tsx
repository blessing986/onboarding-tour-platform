'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t border-brand-blush/30 py-12 bg-linear-to-br from-brand-blush/10 via-brand-sky/10 to-brand-sage/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Compass className="h-6 w-6 text-brand-teal" />
              </motion.div>
              <span className="font-bold text-xl bg-linear-to-r from-brand-teal to-brand-sky bg-clip-text text-transparent">TourGuide</span>
            </div>
            <p className="text-sm text-slate-600">
              Making software easier to learn, one tour at a time.
            </p>
          </div>
          {[
              {
                header: "Product",
                links: [
                  { name: "Features", href: "/#features" },
                  { name: "Documentation", href: "/docs" }
                ]
              },
              {
                header: "Resources",
                links: [
                  { name: "API Reference", href: "/docs/api" },
                  { name: "Guides", href: "/docs/api/examples" }
                ]
              },
              {
                header: "Company",
                links: [
                  { name: "About Us", href: "/about#team" },
                  { name: "Contact", href: "/about#team" }
                ]
              }
          ].map((col, i) => (
              <div key={i}>
                  <h4 className="font-bold mb-4 text-slate-900">{col.header}</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                      {col.links.map((link, j) => (
                          <li key={j}><Link href={link.href} className="hover:text-brand-teal transition-colors">{link.name}</Link></li>
                      ))}
                  </ul>
              </div>
          ))}
        </div>
        <div className="border-t border-slate-100 mt-12 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2024 TourGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
