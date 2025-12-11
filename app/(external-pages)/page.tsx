'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Compass,
  Zap,
  Shield,
  BarChart,
  Code,
  Layers,
  ArrowRight,
  Play,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProductTourIllustration } from '@/components/ProductTourIllustration';
import Script from 'next/script';
import { useState } from 'react';
import { CreativeFeatureCard } from '@/components/dashboard/creative-feature-card';

const fadeInUp = {
  initial: { opacity: 0, y: 60, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const [onboardReady, setOnboardReady] = useState(false);

  const startDemoTour = () => {
    if (!onboardReady) return;

    const init = (
      window as Window & {
        initOnboard?: (config: object) => { start: () => void };
      }
    ).initOnboard;

    if (typeof init !== 'function') {
      console.error('initOnboard not found');
      return;
    }

    const widget = init({
      tourId: 22,
      secret_key: '25a70b72-d19b-4758-91a4-ff0d98d90609',
      resume: true,
      styles: {
        tooltip: {
          backgroundColor: '#fff1f2',
          color: '#881337',
          borderRadius: '20px',
          border: '2px solid #fecdd3',
          boxShadow: '0 10px 25px -5px rgba(244, 63, 94, 0.2)',
          padding: '20px',
        },
        button: {
          backgroundColor: '#e11d48',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: '8px 16px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
        },
        buttonHover: {
          backgroundColor: '#be123c',
          transform: 'scale(1.05)',
        },
        pagination: {
          color: '#aeaeae',
          activeColor: '#e11d48',
        },
        closeButton: {
          color: '#fda4af',
        },
      },
    });

    if (widget && typeof widget.start === 'function') {
      widget.start();
    } else {
      console.warn('Widget returned but no start() method found', widget);
    }
  };

  return (
    <>
      <Script
        src='https://embeddable-tour-platform.vercel.app/onboard.iife.js'
        strategy='afterInteractive'
        onLoad={() => {
          setOnboardReady(true);
        }}
      />

      <div className='relative w-full overflow-hidden bg-gray-100'>
        <motion.div
          className='absolute top-0 left-0 right-0 bottom-0 z-10 overflow-hidden pointer-events-none'
        >
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#CC336365] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
          <div className='absolute top-0 right-1/4 w-96 h-96 bg-[#CC336365] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
          <div className='absolute -bottom-32 left-1/3 w-96 h-96 bg-[#CC336365] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>

          {/* Wave SVG */}
          <div className='absolute bottom-0 left-0 w-full'>
            <svg
              className='w-full h-64'
              viewBox='0 0 1440 320'
              preserveAspectRatio='none'
            >
              <path
                fill='#ffffff'
                fillOpacity='0.3'
                d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
              ></path>
            </svg>
          </div>
        </motion.div>

        <section className='container mx-auto px-4 py-12 relative'>
          <motion.div
            className='text-center space-y-8 max-w-4xl mx-auto'
            initial='initial'
            animate='animate'
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Badge
                variant='outline'
                className='text-sm hover:scale-105 transition-transform cursor-default border-amber-500 text-slate-900 bg-amber-50/80 backdrop-blur-sm px-4 py-1.5 shadow-lg'
              >
                <Zap className='h-3 w-3 mr-2 fill-amber-500 text-amber-500' />
                Embeddable Onboarding Made Easy
              </Badge>
            </motion.div>

            <motion.h1
              className='text-5xl md:text-7xl font-bold tracking-tight text-[#20063B]'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              id='hero'
            >
              Guide Your Users
              <br />
              <motion.span
                // className='text-[#20063B]'
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                Through Every Step
              </motion.span>
            </motion.h1>

            <motion.p
              className='text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed'
              variants={fadeInUp}
            >
              Create beautiful, interactive onboarding tours that help new users
              discover the power of your product.
            </motion.p>

            <motion.div
              className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'
              variants={fadeInUp}
            >
              <Link href='/sign-up'>
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  id='get-started'
                >
                  <Button
                    size='lg'
                    className='text-lg px-8 h-14 bg-[#2A1E5C] hover:bg-[#2A1E5C]/80 text-white rounded-full transition-all duration-300 cursor-pointer'
                  >
                    Get Started Free
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button
                  size='lg'
                  variant='outline'
                  onClick={startDemoTour}
                  disabled={!onboardReady}
                  className='text-lg px-8 h-14 border-2 border-[#2A1E5C] text-[#2A1E5C] rounded-full shadow-lg transition-all duration-300 cursor-pointer hover:bg-[#2A1E5C] hover:text-white'
                >
                  <Play className='mr-2 h-4 w-4 fill-[#2A1E5C]' />
                  View Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <ProductTourIllustration />
          </motion.div>
        </section>

        <section id='features' className='container mx-auto px-4 py-12'>
          <motion.div
            className='text-center mb-20'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className='text-4xl font-bold mb-4 text-[#20063B]'
              id='features-header'
            >
              {' '}
              Our Features
            </h2>
            <p className='text-xl text-slate-600'>
              Everything you need to create amazing experiences for your users.
            </p>
          </motion.div>

          <motion.div
            className='grid md:grid-cols-3 gap-8 mb-12'
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, margin: '-100px' }}
          >
            <CreativeFeatureCard
              title='Interactive Tours'
              description='Create step-by-step tours that guide users through your product.'
              icon={Compass}
              stickerText='GUIDE • TEACH • SHOW'
              colorClass='text-rose-500'
              bgClass='bg-brand-blush/50'
              features={['Multi-step guided tours', 'Smart element targeting']}
            />

            <CreativeFeatureCard
              title='Easy Integration'
              description='Add tours to any website with a simple script tag.'
              icon={Zap}
              stickerText='FAST • EASY • FRIENDLY'
              colorClass='text-amber-600'
              bgClass='bg-amber-100'
              features={['No dependencies', 'Lightweight bundle']}
            />

            <CreativeFeatureCard
              title='Analytics & Insights'
              description='Track user engagement and optimize for better results.'
              icon={BarChart}
              stickerText='TRACK • DATA • GROW'
              colorClass='text-blue-600'
              bgClass='bg-brand-sky/50'
              features={['Completion rates', 'User behavior tracking']}
            />

            <CreativeFeatureCard
              title='Secure & Private'
              description='Enterprise-grade security with end-to-end encryption.'
              icon={Shield}
              stickerText='SAFE • SECURE • TRUST'
              colorClass='text-emerald-600'
              bgClass='bg-emerald-50'
              features={['End-to-end encryption', 'Privacy-first design']}
            />

            <CreativeFeatureCard
              title='Customizable'
              description='Match your brand with full styling control and themes.'
              icon={Layers}
              stickerText='STYLE • THEME • BRAND'
              colorClass='text-violet-500'
              bgClass='bg-violet-200'
              features={['Custom CSS themes', 'Flexible layouts']}
            />

            <CreativeFeatureCard
              title='Developer First'
              description='Built with a powerful API and TypeScript support.'
              icon={Code}
              stickerText='CODE • BUILD • LAUNCH'
              colorClass='text-slate-600'
              bgClass='bg-slate-100'
              features={['TypeScript support', 'Comprehensive docs']}
            />
          </motion.div>
        </section>

        <section
          id='how-it-works'
          className='container mx-auto px-4 py-12 relative overflow-hidden'
        >
          <div className='absolute inset-0 -z-10'>
            <svg
              className='absolute top-0 left-0 w-full h-full opacity-30'
              viewBox='0 0 1440 320'
              preserveAspectRatio='none'
            >
              <path
                fill='#f3e8ff'
                fillOpacity='0.5'
                d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
              ></path>
            </svg>
          </div>

          <motion.div
            className='text-center mb-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id='how-it-works-header'
          >
            <h2 className='text-4xl font-bold mb-3 text-slate-900'>
              How It Works
            </h2>
            <p className='text-2xl text-slate-600 max-w-2xl mx-auto'>
              Get Started in{' '}
              <span className='text-[#2A1E5C] '>3 Simple Steps</span>
            </p>
          </motion.div>

          <div className='relative max-w-6xl mx-auto'>
            <div className='hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gray-500 rounded-full z-10 opacity-30' />

            <div className='grid md:grid-cols-3 gap-12'>
              {[
                {
                  step: '01',
                  title: 'Design The Flow',
                  desc: 'Customize your tour by defining its steps, content, and how it interacts with your UI.',
                  icon: Compass,
                  color: 'text-brand-blush',
                  gradient: 'from-brand-blush to-rose-400',
                  delay: 0,
                },
                {
                  step: '02',
                  title: 'Embed Snippet',
                  desc: "Copy a block of JavaScript code and paste it into your application's codebase.",
                  icon: Code,
                  color: 'text-amber-600',
                  gradient: 'from-amber-500 to-orange-400',
                  delay: 0.2,
                },
                {
                  step: '03',
                  title: 'Track & Optimize',
                  desc: 'Watch as users engage with your tours. Analyze drop-off points and improve retention.',
                  icon: BarChart,
                  color: 'text-brand-sky',
                  gradient: 'from-brand-sky to-blue-500',
                  delay: 0.4,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className='relative group'
                >
                  {/* Card */}
                  <div className='flex flex-col items-center text-center'>
                    {/* Icon Circle */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      className={`w-24 h-24 rounded-full bg-gray-200 backdrop-blur-2xl p-1 mb-8 relative z-10`}
                    >
                      <div className='w-full h-full rounded-full flex items-center justify-center'>
                        <item.icon className={`w-10 h-10 ${item.color}`} />
                      </div>
                      <div
                        className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-r ${item.gradient} flex items-center justify-center text-white font-bold text-sm `}
                      >
                        {item.step}
                      </div>
                    </motion.div>

                    <div className='bg-white/60 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-2 w-full'>
                      <h3 className='text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#2A1E5C] transition-colors'>
                        {item.title}
                      </h3>
                      <p className='text-slate-600 leading-relaxed'>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className='flex justify-center mt-16'
          >
            <Link href='/docs'>
              <Button
                variant='outline'
                className='h-14 px-8 rounded-full border-2 border-[#2A1E5C] text-[#2A1E5C] hover:bg-[#2A1E5C] hover:text-white transition-all duration-300 text-lg font-semibold shadow-lg cursor-pointer'
                id='docs'
              >
                Read Documentation
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className='container mx-auto px-4 py-12'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className='max-w-5xl mx-auto overflow-hidden border-0 shadow-2xl rounded-3xl'>
              <div className='bg-linear-to-br from-[#2A1E5C] via-[#2A1E5Cee] to-[#2A1E5Ccc] backdrop-blur-2xl p-12 md:p-20 text-center relative overflow-hidden'>
                <motion.div
                  className='absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl'
                  animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className='absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl'
                  animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className='w-20 h-20 mx-auto mb-8 text-white relative z-10'
                >
                  <Compass className='w-full h-full drop-shadow-lg' />
                </motion.div>

                <motion.h2
                  className='text-4xl md:text-5xl font-bold text-white mb-6 relative z-10'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Ready to transform your onboarding?
                </motion.h2>
                <motion.p
                  className='text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Join thousands of developers creating better user experiences
                  with TourGuide.
                </motion.p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center relative z-10'>
                  <Link href='/sign-up'>
                    <motion.div
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size='lg'
                        className='w-full sm:w-auto text-lg px-8 h-14 bg-white text-[#2A1E5C] hover:bg-white/90 border-0 rounded-full font-bold shadow-xl transition-all duration-300 cursor-pointer'
                      >
                        Get Started
                        <ArrowRight className='ml-2 h-5 w-5' />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </>
  );
}
