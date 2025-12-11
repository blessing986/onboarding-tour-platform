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
  CheckCircle2,
  Play,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProductTourIllustration } from '@/components/ProductTourIllustration';
import Script from 'next/script';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const CircularText = ({
  text,
  className,
  id,
}: {
  text: string;
  className?: string;
  id: string;
}) => {
  const pathId = `circlePath-${id}`;
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className='w-full h-full'
      >
        <svg viewBox='0 0 100 100' className='w-full h-full overflow-visible'>
          <path
            id={pathId}
            d='M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0'
            fill='transparent'
          />
          <text className='text-[8px] font-bold uppercase tracking-wider fill-current'>
            <textPath href={`#${pathId}`} startOffset='0%'>
              {text} • {text} •
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
};

interface CreativeCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  stickerText: string;
  colorClass: string;
  bgClass: string;
  features: string[];
}

const CreativeFeatureCard = ({
  title,
  description,
  icon: Icon,
  stickerText,
  colorClass,
  bgClass,
  features,
}: CreativeCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className='group relative h-full flex flex-col overflow-hidden rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-brand-teal/50 transition-all duration-300'
    >
      <div className='relative h-32 bg-linear-to-br from-brand-blush via-brand-teal to-brand-sky overflow-hidden'>
        <motion.div
          className='absolute inset-0'
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className='absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full' />
          <div className='absolute bottom-2 left-2 w-12 h-12 bg-white/20 rounded-full' />
        </motion.div>

        {/* Wave Separator */}
        <div className='absolute -bottom-px left-0 w-full leading-0'>
          <svg
            className='w-full h-8 text-white fill-current opacity-90'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
          >
            <path d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'></path>
          </svg>
        </div>
      </div>

      {/* 2. ROTATING STICKER */}
      <div className='absolute top-20 left-1/2 transform -translate-x-1/2 z-20'>
        <motion.div
          className={`relative w-20 h-20 rounded-full ${bgClass} shadow-2xl flex items-center justify-center border-4 border-white`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <CircularText
            text={stickerText}
            className={colorClass}
            id={title.replace(/\s+/g, '-').toLowerCase()}
          />
          <Icon className={`w-7 h-7 ${colorClass}`} />
        </motion.div>
      </div>

      {/* 3. CONTENT SECTION */}
      <div className='pt-12 pb-6 px-6 flex-1 flex flex-col bg-white/80 backdrop-blur-sm relative z-10'>
        <h3 className='text-lg font-bold text-center text-slate-900 mb-2 group-hover:text-brand-teal transition-colors'>
          {title}
        </h3>
        <p className='text-slate-600 text-center mb-6 text-xs leading-relaxed'>
          {description}
        </p>

        {/* Feature List */}
        <ul className='space-y-2 mt-auto'>
          {features.map((item, i) => (
            <li key={i} className='flex items-start text-xs text-slate-600'>
              <CheckCircle2 className={`h-4 w-4 mr-2 shrink-0 ${colorClass}`} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// let demoStarted = false;
export default function Home() {
  // const router = useRouter();
  const [onboardReady, setOnboardReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

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

      <div className='relative w-full overflow-hidden bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900 selection:bg-brand-teal/20 selection:text-brand-teal'>
        <motion.div
          className='absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden pointer-events-none'
          style={{ y: backgroundY, opacity }}
        >
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
          <div className='absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
          <div className='absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>

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
              className='text-5xl md:text-7xl font-bold tracking-tight text-slate-900'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              id='hero'
            >
              Guide Your Users
              <br />
              <motion.span
                className='bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent'
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
                    className='text-lg px-8 h-14 bg-linear-to-r from-brand-blush via-brand-teal to-brand-sky hover:from-brand-blush/90 hover:via-brand-teal/90 hover:to-brand-sky/90 text-white shadow-xl shadow-brand-blush/30 rounded-full transition-all duration-300 cursor-pointer'
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
                  className='text-lg px-8 h-14 border-2 border-brand-teal bg-white/80 hover:bg-brand-teal hover:text-white backdrop-blur-sm text-brand-teal rounded-full shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50'
                >
                  <Play className='mr-2 h-4 w-4 fill-brand-teal' />
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
              className='text-4xl font-bold mb-4 text-slate-900'
              id='features-header'
            >
              {' '}
              Our Features
            </h2>
            <p className='text-xl text-slate-600'>
              Everything you need to create amazing experiences
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
              stickerText='FAST • QUICK • EASY'
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
              stickerText='SAFE • SECURE • PROTECT'
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
              stickerText='CODE • BUILD • SHIP'
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
            <h2 className='text-4xl font-bold mb-6 text-slate-900'>
              How It Works
            </h2>
            <p className='text-2xl text-slate-600 max-w-2xl mx-auto'>
              Get Started in{' '}
              <span className='text-brand-teal '>3 Simple Steps</span>
            </p>
          </motion.div>

          <div className='relative max-w-6xl mx-auto'>
            <div className='hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-linear-to-r from-brand-blush via-brand-teal to-brand-sky rounded-full -z-10 opacity-30' />

            <div className='grid md:grid-cols-3 gap-12'>
              {[
                {
                  step: '01',
                  title: 'Build Visually',
                  desc: 'Use our point-and-click editor to select elements on your site and add helpful tooltips.',
                  icon: Compass,
                  color: 'text-brand-blush',
                  gradient: 'from-brand-blush to-rose-400',
                  delay: 0,
                },
                {
                  step: '02',
                  title: 'Embed Snippet',
                  desc: "Copy a block of JavaScript code and paste it into your application's head tag.",
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
                      className={`w-24 h-24 rounded-full bg-linear-to-br ${item.gradient} p-1 shadow-xl mb-8 relative z-10`}
                    >
                      <div className='w-full h-full bg-white rounded-full flex items-center justify-center'>
                        <item.icon className={`w-10 h-10 ${item.color}`} />
                      </div>
                      <div
                        className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-r ${item.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white`}
                      >
                        {item.step}
                      </div>
                    </motion.div>

                    <div className='bg-white/60 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-full'>
                      <h3 className='text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-teal transition-colors'>
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
                className='h-14 px-8 rounded-full border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 text-lg font-semibold shadow-lg cursor-pointer'
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
              <div className='bg-linear-to-br from-brand-teal via-brand-blush to-brand-sky p-12 md:p-20 text-center relative overflow-hidden'>
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
                        className='w-full sm:w-auto text-lg px-8 h-14 bg-white text-brand-teal hover:bg-white/90 border-0 rounded-full font-bold shadow-xl transition-all duration-300 cursor-pointer'
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
