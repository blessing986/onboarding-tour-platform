
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Lightbulb, Heart, ArrowRight, Zap, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const CircularText = ({ text, className }: { text: string, className?: string }) => (
  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="w-full h-full"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <path
          id="circlePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="transparent"
        />
        <text className="text-[11px] font-bold uppercase tracking-widest fill-current">
          <textPath href="#circlePath" startOffset="0%">
            {text} • {text} • {text} •
          </textPath>
        </text>
      </svg>
    </motion.div>
  </div>
);

// --- THE CREATIVE CARD COMPONENT ---
interface CreativeCardProps {
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stickerText: string;
  colorClass: string;
  bgClass: string;   
}

const CreativeCard = ({ category, title, description, icon: Icon, stickerText, colorClass, bgClass }: CreativeCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-brand-teal/50 transition-all duration-300"
    >
      {/* 1. TOP VISUAL SECTION */}
      <div className="relative h-32 bg-linear-to-br from-brand-blush via-brand-teal to-brand-sky overflow-hidden">

        {/* Animated circles */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full" />
          <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/20 rounded-full" />
        </motion.div>

        {/* Top Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/90 backdrop-blur-sm text-brand-teal hover:bg-white font-bold tracking-wider text-xs">
            {category}
          </Badge>
        </div>

        {/* The Wave Separator */}
        <div className="absolute -bottom-px left-0 w-full leading-0">
           <svg className="w-full h-8 text-white fill-current opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
           </svg>
        </div>
      </div>

      {/* 2. THE ROTATING STICKER (Overlapping Middle) */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          className={`relative w-20 h-20 rounded-full ${bgClass} shadow-2xl flex items-center justify-center border-4 border-white`}
          whileHover={{ scale: 1.15, rotate: 45 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Rotating Text Ring */}
          <CircularText text={stickerText} className={colorClass} />
          {/* Static Center Icon */}
          <Icon className={`w-7 h-7 ${colorClass}`} />
        </motion.div>
      </div>

      {/* 3. CONTENT SECTION */}
      <div className="pt-12 pb-6 px-6 flex-1 flex flex-col text-center bg-white/80 backdrop-blur-sm relative z-10">
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-teal transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 mb-6 leading-relaxed text-xs">
          {description}
        </p>

        <div className="mt-auto">
          <motion.div
            className="inline-flex items-center text-xs font-bold text-brand-teal uppercase tracking-widest cursor-pointer"
            whileHover={{ x: 5 }}
          >
            Explore
            <ArrowRight className="ml-1 w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900 selection:bg-brand-teal/20 selection:text-brand-teal overflow-hidden">

      {/* Animated Background with Waves */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-6xl mx-auto space-y-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          
          {/* --- HERO SECTION --- */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUp}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Badge variant="outline" className="border-brand-teal text-brand-teal bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-lg">
                Our Philosophy
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-900"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Building the Future of
              <br />
              <span className="bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent">
                User Onboarding
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              We believe that great software shouldn't require a manual.
              Our mission is to make the complex simple, one tour at a time.
            </motion.p>
          </div>

          {/* --- OUR STORY --- */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-linear-to-br from-brand-blush/70 via-brand-sky/30 to-brand-teal/60 backdrop-blur-sm border-2 border-brand-teal/20 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blush/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-sky/10 rounded-full blur-3xl"></div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900 relative z-10">Our Story</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed relative z-10">
                  <p>
                    Every product team faces the same challenge: how do you help new users
                    understand your product without overwhelming them? Traditional documentation
                    is rarely read, and video tutorials often go unwatched.
                  </p>
                  <p>
                    We created TourGuide to bridge this gap. By providing interactive,
                    contextual guidance right where users need it, we help them learn by
                    doing rather than reading or watching.
                  </p>
                  <p>
                    Our mission is to make every product more accessible and every user
                    more successful from their very first interaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- CORE VALUES --- */}
          <motion.div variants={fadeInUp} id="core-values">
            <Card className="bg-linear-to-br from-brand-sky/40 via-brand-blush/40 to-brand-teal/50 backdrop-blur-sm border-2 border-brand-sage/20 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12 relative">
                <div className="absolute -top-20 left-1/4 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-brand-sage/10 rounded-full blur-3xl"></div>
                <h2 className="text-3xl font-bold mb-8 text-slate-900 text-center relative z-10">Core Values</h2>
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-teal/20 to-brand-sky/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-brand-teal" />
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900">User-Centric</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Every decision we make starts with the end user in mind. Their success is our success.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-blush/20 to-brand-sky/20 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-brand-blush" />
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900">Simplicity</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      We believe powerful tools should be simple to use. Complexity is our problem to solve, not yours.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-sage/20 to-brand-teal/20 flex items-center justify-center">
                        <Target className="h-6 w-6 text-brand-sage" />
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900">Excellence</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      We're committed to building the best onboarding solution on the market, continuously improving and innovating.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-sky/20 to-brand-blush/20 flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-brand-sky" />
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900">Innovation</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      We're always exploring new ways to make onboarding more effective, engaging, and accessible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- TEAM MEMBERS --- */}
          <motion.div variants={fadeInUp} id="team">
            <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl">
              <div className="bg-linear-to-br from-brand-teal/80 via-brand-blush/50 to-brand-sky p-12 md:p-16 text-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <motion.div
                  className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="space-y-4 relative z-10">
                  <h2 className="text-3xl font-bold text-slate-900">The Team Behind TourGuide</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Built with passion by a dedicated team of developers, designers, and problem solvers.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
                  {['EnesiDev', 'CynthiaAO', 'Mz-B', 'Tiffs'].map((member, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-base py-3 px-8 bg-white/90 hover:bg-white text-brand-teal border-0 cursor-default shadow-lg"
                      >
                        {member}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm text-slate-600 pt-8 max-w-2xl mx-auto relative z-10">
                  This project demonstrates our skills in full-stack development, UI/UX design,
                  and creating production-ready applications.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* --- TECHNOLOGY STACK --- */}
          <motion.div variants={fadeInUp} id="tech-stack">
            <Card className="bg-linear-to-br from-brand-sky/50 via-brand-blush/40 to-brand-teal/70 backdrop-blur-sm border-2 border-white/50 shadow-xl rounded-3xl">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-8 text-slate-900">Technology Stack</h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 text-lg">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-brand-teal/20 text-brand-teal hover:bg-brand-teal/30 border-0">Next.js 13</Badge>
                      <Badge className="bg-brand-teal/20 text-brand-teal hover:bg-brand-teal/30 border-0">TypeScript</Badge>
                      <Badge className="bg-brand-teal/20 text-brand-teal hover:bg-brand-teal/30 border-0">Tailwind CSS</Badge>
                      <Badge className="bg-brand-teal/20 text-brand-teal hover:bg-brand-teal/30 border-0">Shadcn ui</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 text-lg">Backend & Database</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-brand-sky/20 text-brand-blush hover:bg-brand-sky/30 border-0">Supabase</Badge>
                      <Badge className="bg-brand-sky/20 text-brand-blush hover:bg-brand-sky/30 border-0">PostgreSQL</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 text-lg">Authentication</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-brand-sky/40 text-brand-teal hover:bg-brand-sky/60 border-0">Supabase Auth</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 text-lg">Deployment</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-brand-sage/40 text-brand-sage hover:bg-brand-sage/50 border-0">Vercel</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
}