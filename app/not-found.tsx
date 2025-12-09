'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Compass, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-sky/10 via-white to-brand-sage/10 flex items-center justify-center px-4">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-blush/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-sky/15 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-2xl w-full"
        initial="initial"
        animate="animate"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-xl overflow-hidden">
          <CardContent className="p-12 text-center">
            {/* 404 Icon */}
            <motion.div variants={fadeIn} className="mb-8">
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 bg-linear-to-br from-brand-blush/20 via-brand-teal/20 to-brand-sky/20 rounded-full absolute inset-0 blur-xl"
                ></motion.div>
                <div className="relative w-32 h-32 bg-linear-to-br from-brand-teal via-brand-blush to-brand-sky rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Search className="h-16 w-16 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Error Code */}
            <motion.div variants={fadeIn}>
              <h1 className="text-8xl font-bold bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent mb-4">
                404
              </h1>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Page Not Found</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Oops! The page you're looking for seems to have wandered off the tour.
                Let's get you back on track.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/">
                <Button className="bg-linear-to-r from-brand-teal to-brand-sky hover:from-brand-teal/90 hover:to-brand-sky/90 text-white px-6 h-12 rounded-full shadow-lg">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 px-6 h-12 rounded-full"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              variants={fadeIn}
              className="mt-12 p-6 bg-linear-to-br from-brand-blush/5 to-brand-sky/5 rounded-2xl border-2 border-brand-blush/20"
            >
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center justify-center gap-2">
                <Compass className="h-5 w-5 text-brand-blush" />
                Quick Links
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/about">
                  <Button variant="ghost" size="sm" className="hover:bg-brand-sky/10 hover:text-brand-sky">
                    About
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="ghost" size="sm" className="hover:bg-brand-teal/10 hover:text-brand-teal">
                    Documentation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" size="sm" className="hover:bg-brand-blush/10 hover:text-brand-blush">
                    Contact
                  </Button>
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
