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
import {
  ArrowLeft,
  Loader2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Terminal,
  PlayCircle,
  Settings,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/auth-context';
import { Tour } from '@/types/tours';
// import BackgroundDecoration from '@/components/dashboard/background-deco'; // Commented out to use the CSS background instead

export default function EmbedPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const tourId = params.id as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const widgetFunction = `
  const widget = window.initOnboard({
      tourId: ${tour?.id},
      secret_key: '${user?.id}',
      resume: true
    });

  widget?.start()
`;

  const embedCode = `
  <script src="https://embeddable-tour-platform.vercel.app/onboard.iife.js"></script>
  <script>
    ${widgetFunction}
  </script>  
    `;

  const npmCode = `npm i embeddable-tour-platform
`;

  const reactCode = `import { useEffect } from 'react';

function App() {
  useEffect(() => {
    ${widgetFunction}

    widget?.start()
  }, []);

  return <div>Your App Content</div>;
}`;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && tourId) {
      fetchTour();
    }
  }, [user, authLoading, tourId, router]);

  const fetchTour = async () => {
    try {
      const { data, error } = await supabase
        .from('Tours')
        .select('*')
        .eq('id', tourId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        router.push('/dashboard');
        return;
      }
      setTour(data);
    } catch (err) {
      console.error('Error fetching tour:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || loading) {
    return (
      <div className='min-h-screen w-full bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-brand-teal' />
      </div>
    );
  }

  if (!user || !tour) {
    return null;
  }
  const cardStyle =
    'rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300';
  const headerTextStyle = 'text-2xl font-bold text-slate-900';
  const subTextStyle = 'text-slate-600 leading-relaxed';

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900 selection:bg-brand-teal/20 selection:text-brand-teal'>
      <div className='absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30'></div>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30'></div>
        <div className='absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-30'></div>
      </div>

      <div className='container mx-auto px-4 py-12 max-w-5xl relative z-10'>
        <div className='mb-6'>
          <Link href={`/dashboard`}>
            <Button
              variant='ghost'
              size='sm'
              className='rounded-full border-2 border-brand-teal/20 text-slate-700 hover:border-brand-teal hover:text-brand-teal hover:bg-white bg-white/50 backdrop-blur-sm transition-all duration-300'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className='mb-8 text-center md:text-left'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4'>
            {tour.name}
          </h1>
          <p className='text-xl text-slate-600 max-w-2xl leading-relaxed'>
            Embed this tour on your website
          </p>
        </div>

        {!tour.is_active && (
          <Alert className='mb-8 rounded-2xl border-amber-200 bg-amber-50 text-amber-900 shadow-md'>
            <AlertTriangle className='h-5 w-5 text-amber-600' />
            <AlertTitle className='text-amber-800 font-bold ml-2'>
              Tour Inactive
            </AlertTitle>
            <AlertDescription className='ml-2 text-amber-700'>
              This tour is currently inactive. Activate it from the tour editor
              to make it visible to your users.
            </AlertDescription>
          </Alert>
        )}

        <div className='space-y-6'>
          <Card className={cardStyle}>
            <CardHeader className='pb-2'>
              <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
                <div className='flex items-start space-x-4'>
                  <div className='p-3 rounded-2xl bg-brand-blush/20 text-rose-600'>
                    <Code2 className='h-6 w-6' />
                  </div>
                  <div>
                    <CardTitle className={headerTextStyle}>
                      Embeddable Script
                    </CardTitle>
                    <CardDescription className={subTextStyle}>
                      Add this code to your HTML file, right before the closing
                      &lt;/body&gt; tag or in your react app
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(embedCode)}
                  className='rounded-full border-2 border-rose-100 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors'
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className='mr-2 h-4 w-4 text-emerald-500' />
                      <span className='text-emerald-600 font-medium'>
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy Snippet
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='mt-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-50 p-6 rounded-2xl overflow-x-auto shadow-inner'>
                <pre className='text-sm font-mono text-blue-200'>
                  <code>{embedCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className={cardStyle}>
            <CardHeader className='pb-2'>
              <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
                <div className='flex items-start space-x-4'>
                  <div className='p-3 rounded-2xl bg-amber-100 text-amber-600'>
                    <Terminal className='h-6 w-6' />
                  </div>
                  <div>
                    <CardTitle className={headerTextStyle}>
                      NPM Package
                    </CardTitle>
                    <CardDescription className={subTextStyle}>
                      Install and use the TourGuide widget as an NPM package
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(npmCode)}
                  className='rounded-full border-2 border-amber-100 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-colors'
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className='mr-2 h-4 w-4 text-emerald-500' />
                      <span className='text-emerald-600 font-medium'>
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy Command
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='mt-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-50 p-6 rounded-2xl overflow-x-auto shadow-inner'>
                <pre className='text-sm font-mono text-amber-200'>
                  <code>{npmCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className={cardStyle}>
            <CardHeader className='pb-2'>
              <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
                <div className='flex items-start space-x-4'>
                  <div className='p-3 rounded-2xl bg-brand-sky/20 text-blue-600'>
                    <PlayCircle className='h-6 w-6' />
                  </div>
                  <div>
                    <CardTitle className={headerTextStyle}>
                      React Integration
                    </CardTitle>
                    <CardDescription className={subTextStyle}>
                      Example of using TourGuide in a React application.
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(reactCode)}
                  className='rounded-full border-2 border-blue-100 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors'
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className='mr-2 h-4 w-4 text-emerald-500' />
                      <span className='text-emerald-600 font-medium'>
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='mt-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-50 p-6 rounded-2xl overflow-x-auto shadow-inner'>
                <pre className='text-sm font-mono text-emerald-200'>
                  <code>{reactCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardStyle} border-brand-teal/30`}>
            <CardHeader>
              <div className='flex items-center space-x-4 mb-2'>
                <div className='p-3 rounded-2xl bg-violet-200 text-violet-600'>
                  <Settings className='h-6 w-6' />
                </div>
                <CardTitle className={headerTextStyle}>
                  Configuration Options
                </CardTitle>
              </div>
              <CardDescription className={subTextStyle}>
                Customize the tour behavior with these options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {[
                    {
                      key: 'tourId',
                      desc: 'Your unique tour identifier (required)',
                    },
                    { key: 'secret_key', desc: 'Your user id (required)' },
                    {
                      key: 'resume',
                      desc: 'Adds resume button to the steps (default: true)',
                    },
                    {
                      key: 'styles',
                      desc: 'Customizable widget styles object',
                    },
                    {
                      key: 'onEvent',
                      desc: 'Callback function when tour completes',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='p-4 rounded-2xl bg-white/50 border border-white/60 hover:border-brand-teal/40 transition-colors'
                    >
                      <code className='bg-brand-teal/10 text-brand-teal px-2 py-1 rounded-md text-sm font-mono font-bold border border-brand-teal/20'>
                        {item.key}
                      </code>
                      <p className='text-sm text-slate-600 mt-2 leading-snug'>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='rounded-3xl border-0 bg-linear-to-r from-brand-sky via-blue-500 to-brand-teal text-white shadow-xl overflow-hidden relative'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16'></div>
            <CardContent className='p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6'>
              <div>
                <h3 className='text-2xl font-bold mb-2'>Need Help?</h3>
                <p className='text-white/90 max-w-lg leading-relaxed'>
                  Check out our documentation for detailed integration guides
                  and examples.
                </p>
              </div>
              <Link href='/docs'>
                <Button
                  size='lg'
                  className='bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-full shadow-lg font-semibold px-8 h-12'
                >
                  Read Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
