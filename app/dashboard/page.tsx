'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Compass,
  Plus,
  Users,
  Code,
  Trash2,
  Edit,
  BarChart,
  Loader2,
  LogOut,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BackgroundDecoration from '@/components/dashboard/background-deco';
import { useEffect, useState } from 'react';
import CreateTourModal from '@/components/dashboard/create-tour-modal';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import supabase from '@/supabase';
import { Tour } from '@/types/tours';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { logout } from '@/api/actions/auth';

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export default function DashboardPage() {
  const [openCreateTourDialog, setOpenCreateTourDialog] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  // const [error, setError] = useState('');
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchTours();
    }
  }, [user, authLoading, router]);

  const stats = [
    {
      title: 'Active Tours',
      value: tours.filter((t) => t.is_active).length,
      icon: Compass,
      color: 'from-brand-teal to-brand-sky',
      textColor: 'text-brand-teal',
      bgColor: 'bg-brand-teal/5',
    },
    // {
    //   title: 'Total Views',
    //   value: '0',
    //   icon: Eye,
    //   color: 'from-brand-sky to-brand-blush',
    //   textColor: 'text-brand-sky',
    //   bgColor: 'bg-brand-sky/5',
    // },
    {
      title: 'Inactive Tours',
      value: tours.filter((t) => !t.is_active).length,
      icon: CheckCircle,
      color: 'from-brand-sage to-brand-teal',
      textColor: 'text-brand-sage',
      bgColor: 'bg-brand-sage/5',
    },
  ];

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('Tours')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (err) {
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTour = async (tourId: string) => {
    try {
      const { error } = await supabase.from('Tours').delete().eq('id', tourId);

      if (error) throw error;
      fetchTours();
    } catch (err) {
      console.error('Error deleting tour:', err);
    }
  };

  const toggleTourActive = async (tour: Tour) => {
    try {
      if (!tour.steps || tour.steps.length < 5) {
        toast.error('Tour steps must be 5 to be able to activate/diactivate');
      } else {
        const { error } = await supabase
          .from('Tours')
          .update({ is_active: !tour.is_active })
          .eq('id', tour.id);

        if (error) throw error;
        fetchTours();
      }
    } catch (err) {
      console.error('Error updating tour:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <CreateTourModal
        showNewTourDialog={openCreateTourDialog}
        setShowNewTourDialog={setOpenCreateTourDialog}
      />

      <div className='min-h-screen bg-linear-to-br from-brand-sky/10 via-white to-brand-sage/10'>
        <BackgroundDecoration />

        <div className='container mx-auto px-4 py-8'>
          {/* Header */}
          <motion.div
            className='mb-8'
            initial='initial'
            animate='animate'
            variants={fadeIn}
          >
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div>
                <h1 className='text-4xl font-bold bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent mb-2'>
                  Dashboard
                </h1>
                <p className='text-slate-600'>
                  Manage your onboarding tours and track performance
                </p>
              </div>
              <Button
                onClick={async () => await logout()}
                variant={'destructive'}
                className='text-white'
              >
                <LogOut className='mr-2 h-5 w-5' />
                Logout
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'
            initial='initial'
            animate='animate'
            variants={{
              animate: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card
                  className={`${stat.bgColor} backdrop-blur-sm border-2 border-white/50 shadow-lg transition-all duration-300 overflow-hidden`}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div
                        className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className='h-7 w-7 text-white' />
                      </div>
                    </div>
                    <h3 className='text-sm font-medium text-slate-600 mb-1'>
                      {stat.title}
                    </h3>
                    <p className='text-4xl font-bold text-slate-900 mb-2'>
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial='initial' animate='animate' variants={fadeIn}>
            <Card className='bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-xl overflow-hidden'>
              <CardHeader className='bg-linear-to-r from-brand-sky/5 to-brand-blush/5 border-b flex flex-col gap-5 md:flex-row md:justify-between'>
                <div>
                  <CardTitle className='flex items-center gap-2'>
                    <Compass className='h-6 w-6 text-brand-teal' />
                    Your Tours
                  </CardTitle>
                  <CardDescription>
                    Create and manage your onboarding experiences
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setOpenCreateTourDialog(true)}
                  className='bg-linear-to-r from-brand-blush via-brand-teal to-brand-sky hover:from-brand-blush/90 hover:to-brand-sky/90 text-white px-6 h-12 rounded-full shadow-lg shadow-brand-blush/20'
                >
                  <Plus className='mr-2 h-5 w-5' />
                  Create New Tour
                </Button>
              </CardHeader>

              <CardContent className='p-12'>
                {tours.length === 0 ? (
                  <div className='text-center max-w-md mx-auto space-y-6'>
                    <div className='w-24 h-24 bg-linear-to-br from-brand-teal/10 to-brand-sky/10 rounded-full flex items-center justify-center mx-auto'>
                      <Compass className='h-12 w-12 text-brand-teal/60' />
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold text-slate-900 mb-2'>
                        No tours yet
                      </h3>
                      <p className='text-slate-600'>
                        Create your first onboarding tour to guide users through
                        your product!
                      </p>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                      <Button
                        onClick={() => setOpenCreateTourDialog(true)}
                        className='bg-linear-to-r from-brand-teal to-brand-sky text-white hover:from-brand-teal/90 hover:to-brand-sky/90 shadow-lg'
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Create Your First Tour
                      </Button>
                      <Link href='/docs'>
                        <Button
                          variant='outline'
                          className='border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10'
                        >
                          View Documentation
                        </Button>
                      </Link>
                    </div>

                    {/* Quick Start Tips */}
                    <div className='mt-8 p-6 bg-linear-to-br from-brand-blush/5 to-brand-sky/5 rounded-2xl border-2 border-brand-blush/20'>
                      <h4 className='font-semibold text-slate-900 mb-3 flex items-center gap-2'>
                        <Users className='h-5 w-5 text-brand-blush' />
                        Quick Start Tips
                      </h4>
                      <ul className='text-sm text-slate-600 space-y-2 text-left'>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='h-4 w-4 text-brand-teal mt-0.5 shrink-0' />
                          <span>Create a tour with at least 5 steps</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='h-4 w-4 text-brand-sky mt-0.5 shrink-0' />
                          <span>
                            Use CSS selectors to target specific elements
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='h-4 w-4 text-brand-sage mt-0.5 shrink-0' />
                          <span>Test your tour before activating it</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='h-4 w-4 text-brand-blush mt-0.5 shrink-0' />
                          <span>Embed the script tag on your website</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {tours.map((tour) => (
                      <Card
                        key={tour.id}
                        className='hover:shadow-lg transition-shadow'
                      >
                        <CardHeader>
                          <div className='flex justify-between items-start mb-2'>
                            <CardTitle className='text-xl'>
                              {tour.name}
                            </CardTitle>
                            <Badge
                              variant={tour.is_active ? 'default' : 'secondary'}
                            >
                              {tour.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <CardDescription>
                            {tour.description || 'No description'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-wrap gap-2 mb-4'>
                            <Link href={`/dashboard/tours/${tour.id}`}>
                              <Button size='sm' variant='outline'>
                                <Edit className='h-4 w-4 mr-1' />
                                Edit
                              </Button>
                            </Link>
                            <Link
                              href={`/dashboard/tours/${tour.id}/analytics`}
                            >
                              <Button size='sm' variant='outline'>
                                <BarChart className='h-4 w-4 mr-1' />
                                Analytics
                              </Button>
                            </Link>
                            <Link href={`/dashboard/tours/${tour.id}/embed`}>
                              <Button size='sm' variant='outline'>
                                <Code className='h-4 w-4 mr-1' />
                                Embed
                              </Button>
                            </Link>
                          </div>
                          <div className='flex gap-2'>
                            <Button
                              size='sm'
                              variant={tour.is_active ? 'secondary' : 'default'}
                              className='flex-1'
                              onClick={() => toggleTourActive(tour)}
                            >
                              {tour.is_active ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              size='sm'
                              variant='destructive'
                              onClick={() => deleteTour(tour.id)}
                            >
                              <Trash2 className='h-4 w-4 text-white' />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
