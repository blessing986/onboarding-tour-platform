'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Compass, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { logout } from '@/api/actions/auth';

export function DashboardHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Left */}
        <Link href="/dashboard" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Compass className="h-6 w-6 text-brand-teal" />
          </motion.div>
          <span className="font-bold text-xl group-hover:text-brand-teal transition-colors">TourGuide</span>
        </Link>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
              {isActive('/dashboard') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        </div>

        {/* User Email & Logout Button - Right */}
        <div className="hidden md:flex items-center gap-4">
          {user?.email && (
            <span className="text-sm text-slate-600">{user.email}</span>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={async () => await logout()}
              size="sm"
              variant="destructive"
              className="bg-rose-600/90 hover:bg-rose-600 text-white rounded-full px-6"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg hover:bg-brand-teal/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-brand-teal" />
          ) : (
            <Menu className="h-6 w-6 text-brand-teal" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t bg-white/95 backdrop-blur-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-brand-teal/20 text-brand-teal'
                    : 'text-slate-600 hover:bg-brand-teal/10'
                }`}
              >
                Dashboard
              </Link>
              {user?.email && (
                <div className="px-4 py-2 text-sm text-slate-600 bg-slate-50 rounded-lg">
                  {user.email}
                </div>
              )}
              <Button
                onClick={async () => {
                  setIsMobileMenuOpen(false);
                  await logout();
                }}
                variant="destructive"
                className="w-full bg-rose-600/90 hover:bg-rose-600 text-white rounded-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
