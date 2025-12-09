'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Eye,
  CheckCircle,
  Clock,
  Compass,
  Plus,
  BarChart,
  Code,
  Edit,
  Trash2,
  TrendingUp,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function DashboardPage() {
  const [tours] = useState<any[]>([]);

  const stats = [
    {
      title: 'Active Tours',
      value: '0',
      icon: Compass,
      change: 'Get started',
      color: 'from-brand-teal to-brand-sky',
      textColor: 'text-brand-teal',
      bgColor: 'bg-brand-teal/5'
    },
    {
      title: 'Total Views',
      value: '0',
      icon: Eye,
      change: 'Coming soon',
      color: 'from-brand-sky to-brand-blush',
      textColor: 'text-brand-sky',
      bgColor: 'bg-brand-sky/5'
    },
    {
      title: 'Completion Rate',
      value: '0%',
      icon: CheckCircle,
      change: 'No data yet',
      color: 'from-brand-sage to-brand-teal',
      textColor: 'text-brand-sage',
      bgColor: 'bg-brand-sage/5'
    },
    {
      title: 'Avg. Time',
      value: '0m',
      icon: Clock,
      change: 'Start tracking',
      color: 'from-brand-blush to-brand-teal',
      textColor: 'text-brand-blush',
      bgColor: 'bg-brand-blush/5'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-sky/10 via-white to-brand-sage/10">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-blush/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-sky/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-slate-600">Manage your onboarding tours and track performance</p>
            </div>
            <Link href="/dashboard/tours/new">
              <Button className="bg-linear-to-r from-brand-blush via-brand-teal to-brand-sky hover:from-brand-blush/90 hover:to-brand-sky/90 text-white px-6 h-12 rounded-full shadow-lg shadow-brand-blush/20">
                <Plus className="mr-2 h-5 w-5" />
                Create New Tour
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeIn}>
              <Card className={`${stat.bgColor} backdrop-blur-sm border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
                  <p className={`text-xs ${stat.textColor} font-medium flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tours List - Empty State */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-xl overflow-hidden">
            <CardHeader className="bg-linear-to-r from-brand-sky/5 to-brand-blush/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-brand-teal" />
                Your Tours
              </CardTitle>
              <CardDescription>Create and manage your onboarding experiences</CardDescription>
            </CardHeader>
            <CardContent className="p-12">
              <div className="text-center max-w-md mx-auto space-y-6">
                <div className="w-24 h-24 bg-linear-to-br from-brand-teal/10 to-brand-sky/10 rounded-full flex items-center justify-center mx-auto">
                  <Compass className="h-12 w-12 text-brand-teal/60" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No tours yet</h3>
                  <p className="text-slate-600">Create your first onboarding tour to guide users through your product!</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/dashboard/tours/new">
                    <Button className="bg-linear-to-r from-brand-teal to-brand-sky text-white hover:from-brand-teal/90 hover:to-brand-sky/90 shadow-lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Tour
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline" className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10">
                      View Documentation
                    </Button>
                  </Link>
                </div>

                {/* Quick Start Tips */}
                <div className="mt-8 p-6 bg-linear-to-br from-brand-blush/5 to-brand-sky/5 rounded-2xl border-2 border-brand-blush/20">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-brand-blush" />
                    Quick Start Tips
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-teal mt-0.5 shrink-0" />
                      <span>Create a tour with at least 5 steps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-sky mt-0.5 shrink-0" />
                      <span>Use CSS selectors to target specific elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-sage mt-0.5 shrink-0" />
                      <span>Test your tour before activating it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-blush mt-0.5 shrink-0" />
                      <span>Embed the script tag on your website</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
