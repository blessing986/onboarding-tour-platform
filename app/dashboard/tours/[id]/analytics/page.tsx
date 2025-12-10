'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/supabase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Loader2, CheckCircle2, XCircle, Eye, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { Tour } from '@/types/tours';
// import BackgroundDecoration from '@/components/dashboard/background-deco'; // Replaced with inline styles
import { motion } from 'framer-motion';

type AnalyticsData = {
  totalViews: number;
  totalCompleted: number;
  totalSkipped: number;
  uniqueSessions: number;
  stepViews: Record<string, number>;
};

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export default function AnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const tourId = params.id as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    totalCompleted: 0,
    totalSkipped: 0,
    uniqueSessions: 0,
    stepViews: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && tourId) {
      fetchData();
    }
  }, [user, authLoading, tourId, router]);

  const stats = [
    // {
    //   title: 'Total Views',
    //   value: 0,
    //   icon: Eye,
    //   color: 'from-brand-teal to-brand-sky',
    //   textColor: 'text-brand-teal',
    //   bgColor: 'bg-brand-teal/5',
    // },
    {
      title: 'Completion Rate',
      value: '0',
      icon: CheckCircle2,
      color: 'from-brand-sky to-brand-blush',
      textColor: 'text-brand-sky',
      bgColor: 'bg-brand-sky/5',
    },
    {
      title: 'Skipped Rate',
      value: '0%',
      icon: XCircle,
      color: 'from-brand-sage to-brand-teal',
      textColor: 'text-brand-sage',
      bgColor: 'bg-brand-sage/5',
    },
  ];

  const fetchData = async () => {
    try {
      const [tourData, analyticsData] = await Promise.all([
        supabase.from('Tours').select('*').eq('id', tourId).maybeSingle(),
        supabase.from('TourAnalytics').select('*').eq('id', tourId),
      ]);

      if (tourData.error) throw tourData.error;
      if (!tourData.data) {
        router.push('/dashboard');
        return;
      }

      setTour(tourData.data);

      if (analyticsData.data) {
        const data = analyticsData.data;
        const uniqueSessions = new Set(data.map((d) => d.session_id)).size;
        const totalViews = data.filter(
          (d) => d.event_type === 'started'
        ).length;
        const totalCompleted = data.filter(
          (d) => d.event_type === 'completed'
        ).length;
        const totalSkipped = data.filter(
          (d) => d.event_type === 'skipped'
        ).length;

        const stepViews: Record<string, number> = {};
        data
          .filter((d) => d.event_type === 'step_viewed' && d.step_id)
          .forEach((d) => {
            stepViews[d.step_id!] = (stepViews[d.step_id!] || 0) + 1;
          });

        setAnalytics({
          totalViews,
          totalCompleted,
          totalSkipped,
          uniqueSessions,
          stepViews,
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20'>
        <Loader2 className='h-8 w-8 animate-spin text-brand-teal' />
      </div>
    );
  }

  if (!user || !tour) {
    return null;
  }

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900 selection:bg-brand-teal/20 selection:text-brand-teal'>
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className='container mx-auto px-4 py-8 max-w-5xl relative z-10'>
        <div className='mb-6'>
          <Link href={`/dashboard`}>
            <Button variant='ghost' size='sm' className="rounded-full border-2 border-brand-teal/20 text-slate-700 hover:border-brand-teal hover:text-brand-teal hover:bg-white bg-white/50 backdrop-blur-sm transition-all duration-300">
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent mb-2'>
            {tour.name}
          </h1>
          <p className='text-xl text-slate-600'>
            Analytics and performance insights
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-6 mb-8'>
          {stats.map((s, i) => {
            return (
              <motion.div key={i} variants={fadeIn} initial="initial" animate="animate" transition={{ delay: i * 0.1 }}>
                <Card
                  className={`rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-brand-teal/30 transition-all duration-300 h-full`}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div
                        className={`w-14 h-14 rounded-2xl bg-linear-to-br ${s.color} flex items-center justify-center shadow-lg`}
                      >
                        <s.icon className='h-7 w-7 text-white' />
                      </div>
                    </div>
                    <h3 className='text-sm font-bold uppercase tracking-wide text-slate-500 mb-1'>
                      {s.title}
                    </h3>
                    <p className='text-4xl font-extrabold text-slate-900 mb-2'>
                      {s.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-slate-100/50 pb-6">
            <CardTitle className="text-xl font-bold text-slate-900">Step Performance</CardTitle>
            <CardDescription className="text-slate-600">
              View count for each step in your tour
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            {!tour.steps || tour.steps.length === 0 ? (
              <p className='text-slate-500 text-center py-8 text-lg'>
                No steps configured yet
              </p>
            ) : (
              <div className='space-y-4 grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 gap-6'>
                {tour.steps &&
                  tour.steps.map((step, index) => {
                    const views = analytics.stepViews[step.id] || 0;
                    const viewRate =
                      analytics.totalViews > 0
                        ? Math.round((views / analytics.totalViews) * 100)
                        : 0;

                    return (
                      <motion.div 
                        whileHover={{ y: -4 }}
                        key={step.id} 
                        className='group flex flex-col justify-between rounded-2xl border border-white/60 bg-white/40 p-5 shadow-sm hover:shadow-md hover:border-brand-teal/30 transition-all duration-300'
                      >
                        <div className='mb-4'>
                            <div className='flex items-center gap-2 mb-3'>
                                <Badge variant='outline' className="bg-white border-brand-teal/20 text-brand-teal shadow-xs">
                                    Step {index + 1}
                                </Badge>
                            </div>
                            <h4 className='font-bold text-slate-800 line-clamp-1'>{step.title}</h4>
                            <p className='text-xs text-slate-500 mt-1 line-clamp-2 min-h-[2.5em]'>
                                {step.content}
                            </p>
                        </div>
                        <div className="mt-auto">
                            <div className='flex items-end justify-between mb-2'>
                                <div>
                                    <div className='text-2xl font-bold text-slate-900'>{views}</div>
                                    <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>
                                        Views
                                    </p>
                                </div>
                                <div className='text-right'>
                                    <div className='text-lg font-bold text-brand-teal'>{viewRate}%</div>
                                    <p className='text-xs text-slate-400'>Retention</p>
                                </div>
                            </div>
                            <div className='w-full bg-slate-100 rounded-full h-2 mt-1 overflow-hidden shadow-inner'>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${viewRate}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className='bg-linear-to-r from-brand-teal to-brand-sky h-2 rounded-full'
                            />
                            </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        {analytics.totalViews === 0 && (
          <Card className='mt-8 rounded-3xl border-0 bg-linear-to-r from-brand-sky via-blue-500 to-brand-teal text-white shadow-xl overflow-hidden relative'>
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             
            <CardContent className='p-8 md:p-12 relative z-10 flex flex-col items-center text-center'>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                 <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className='text-2xl font-bold mb-3'>No Analytics Data Yet</h3>
              <p className='text-white/90 max-w-lg leading-relaxed mb-8 text-lg'>
                Your tour hasn&apos;t received any views yet. Make sure your
                tour is active and properly embedded on your website.
              </p>
              <Link href={`/dashboard/tours/${tourId}/embed`}>
                <Button size="lg" className='bg-white text-brand-teal hover:bg-white/90 border-0 rounded-full shadow-lg font-bold px-8 h-12'>
                  View Embed Code
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
