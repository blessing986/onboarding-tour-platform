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
import { ArrowLeft, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/auth-context';
import { Tour } from '@/types/tours';
import BackgroundDecoration from '@/components/dashboard/background-deco';

export default function EmbedPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const tourId = params.id as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const widgetFunction = `
  const widget = initOnboard({
      tourId: ${tour?.id},
      secret_key: '${user?.id}',
      resume: true
    });
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
            Embed this tour on your website
          </p>
        </div>

        {!tour.is_active && (
          <Alert className='mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-900'>
            <AlertDescription>
              This tour is currently inactive. Activate it from the tour editor
              to make it visible to your users.
            </AlertDescription>
          </Alert>
        )}

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>Embeddable Script</CardTitle>
                  <CardDescription>
                    Add this code to your HTML file, right before the closing
                    &lt;/body&gt; tag or in your react app
                  </CardDescription>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(embedCode)}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className='mr-2 h-4 w-4' />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto'>
                <pre className='text-sm'>
                  <code>{embedCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>NPM Package</CardTitle>
                  <CardDescription>
                    Install and use the TourGuide widget as an NPM package
                  </CardDescription>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(npmCode)}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className='mr-2 h-4 w-4' />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto'>
                <pre className='text-sm'>
                  <code>{npmCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>React Integration Example</CardTitle>
                  <CardDescription>
                    Example of using TourGuide in a React application
                  </CardDescription>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(reactCode)}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className='mr-2 h-4 w-4' />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto'>
                <pre className='text-sm'>
                  <code>{reactCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
              <CardDescription>
                Customize the tour behavior with these options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      tourId
                    </code>
                    <p className='text-sm text-muted-foreground mt-1'>
                      Your unique tour identifier (required)
                    </p>
                  </div>
                  <div>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      secret_key
                    </code>
                    <p className='text-sm text-muted-foreground mt-1'>
                      Your user id (required)
                    </p>
                  </div>
                  <div>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      resume
                    </code>
                    <p className='text-sm text-muted-foreground mt-1'>
                      Adds resume button to the steps (default: true)
                    </p>
                  </div>
                  <div>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      styles
                    </code>
                    <p className='text-sm text-muted-foreground mt-1'>
                      Customizable widget styles, you can change the styles to
                      suite your need
                    </p>
                  </div>
                  <div>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      onEvent
                    </code>
                    <p className='text-sm text-muted-foreground mt-1'>
                      Callback when tour completes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900'>
            <CardContent className='p-6'>
              <h3 className='font-semibold mb-2'>Need Help?</h3>
              <p className='text-sm text-muted-foreground mb-4'>
                Check out our documentation for detailed integration guides and
                examples.
              </p>
              <Link href='/docs'>
                <Button variant='outline' size='sm'>
                  View Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
