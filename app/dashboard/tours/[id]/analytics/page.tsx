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
import { ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { Tour } from '@/types/tours';
import BackgroundDecoration from '@/components/dashboard/background-deco';
import { motion } from 'framer-motion';

type AnalyticsData = Tour & {
  completion_rate: number;
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
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
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
      value: `${analytics?.completion_rate}%`,
      icon: CheckCircle2,
      color: 'from-brand-sky to-brand-blush',
      textColor: 'text-brand-sky',
      bgColor: 'bg-brand-sky/5',
    },
    {
      title: 'Skipped Rate',
      value: `${
        Number(analytics?.completion_rate) === 0
          ? 0
          : 100 - Number(analytics?.completion_rate)
      }%`,
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
        supabase
          .from('TourAnalytics')
          .select('*')
          .eq('id', tourId)
          .eq('user_id', user?.id)
          .maybeSingle(),
      ]);

      if (tourData.error) throw tourData.error;
      if (!tourData.data) {
        router.push('/dashboard');
        return;
      }

      setTour(tourData.data);

      if (!analyticsData.data) {
        return;
      } else {
      }

      setAnalytics(analyticsData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!user || !tour) {
    return null;
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-brand-sky/10 via-white to-brand-sage/10'>
      <BackgroundDecoration />
      <div className='container mx-auto px-4 py-8 max-w-5xl'>
        <div className='mb-6'>
          <Link href={`/dashboard`}>
            <Button variant='ghost' size='sm'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className='mb-8'>
          <h1 className='text-4xl font-bold bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent mb-2'>
            {tour.name}
          </h1>
          <p className='text-muted-foreground'>
            Analytics and performance insights
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6 mb-8'>
          {stats.map((s, i) => {
            return (
              <motion.div key={i} variants={fadeIn}>
                <Card
                  className={`${s.bgColor} backdrop-blur-sm border-2 border-white/50 shadow-lg transition-all duration-300 overflow-hidden`}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div
                        className={`w-14 h-14 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center shadow-lg`}
                      >
                        <s.icon className='h-7 w-7 text-white' />
                      </div>
                    </div>
                    <h3 className='text-sm font-medium text-slate-600 mb-1'>
                      {s.title}
                    </h3>
                    <p className='text-4xl font-bold text-slate-900 mb-2'>
                      {s.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step Performance</CardTitle>
            <CardDescription>
              View count for each step in your tour
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!tour.steps || tour.steps.length === 0 ? (
              <p className='text-muted-foreground text-center py-8'>
                No steps configured yet
              </p>
            ) : (
              <div className='space-y-4 grid md:grid-cols-2 lg:grid-cols-3 space-x-5'>
                {tour.steps &&
                  tour.steps.map((step, index) => {
                    const views = step.step_viewed;
                    const viewRate =
                      Number(analytics?.completion_rate) > 0
                        ? Math.round(
                            (views / Number(analytics?.completion_rate)) * 100
                          )
                        : 0;

                    return (
                      <div key={step.id} className='border rounded-lg p-4'>
                        <div className='flex items-start justify-between mb-2'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <Badge variant='outline'>Step {index + 1}</Badge>
                              <h4 className='font-semibold'>{step.title}</h4>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                              {step.content}
                            </p>
                          </div>
                          <div className='text-right ml-4'>
                            <div className='text-2xl font-bold'>{views}</div>
                            <p className='text-xs text-muted-foreground'>
                              {viewRate}% reached
                            </p>
                          </div>
                        </div>
                        <div className='w-full bg-muted rounded-full h-2 mt-3'>
                          <div
                            className='bg-blue-600 h-2 rounded-full transition-all'
                            style={{ width: `${viewRate}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        {analytics?.completion_rate === 0 && (
          <Card className='mt-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900'>
            <CardContent className='p-6'>
              <h3 className='font-semibold mb-2'>No Analytics Data Yet</h3>
              <p className='text-sm text-muted-foreground mb-4'>
                Your tour hasn&apos;t received any views yet. Make sure your
                tour is active and properly embedded on your website.
              </p>
              <Link href={`/dashboard/tours/${tourId}/embed`}>
                <Button variant='outline' size='sm'>
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
