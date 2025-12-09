'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- HELPER: CIRCULAR TEXT (The "Sticker") ---
const CircularText = ({ text, className }: { text: string, className?: string }) => (
  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
  title, description, icon: Icon, stickerText, colorClass, bgClass, features
}: CreativeCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-3xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-brand-teal/50 transition-all duration-300"
    >
      <div className="relative h-32 bg-gradient-to-br from-brand-blush via-brand-teal to-brand-sky overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full" />
          <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/20 rounded-full" />
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/90 backdrop-blur-sm text-brand-teal hover:bg-white font-bold tracking-wider text-xs">
            {/* {label} */}
          </Badge>
        </div>

        {/* Wave Separator */}
        <div className="absolute -bottom-px left-0 w-full leading-0">
           <svg className="w-full h-8 text-white fill-current opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
           </svg>
        </div>
      </div>

      {/* 2. ROTATING STICKER */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          className={`relative w-20 h-20 rounded-full ${bgClass} shadow-2xl flex items-center justify-center border-4 border-white`}
          whileHover={{ scale: 1.15, rotate: 45 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CircularText text={stickerText} className={colorClass} />
          <Icon className={`w-7 h-7 ${colorClass}`} />
        </motion.div>
      </div>

      {/* 3. CONTENT SECTION */}
      <div className="pt-12 pb-6 px-6 flex-1 flex flex-col bg-white/80 backdrop-blur-sm relative z-10">
        <h3 className="text-lg font-bold text-center text-slate-900 mb-2 group-hover:text-brand-teal transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-center mb-6 text-xs leading-relaxed">
          {description}
        </p>
        
        {/* Feature List */}
        <ul className="space-y-2 mt-auto">
          {features.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start text-xs text-slate-600"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CheckCircle2 className={`h-4 w-4 mr-2 shrink-0 ${colorClass}`} />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900 selection:bg-brand-teal/20 selection:text-brand-teal">

      {/* Animated Background with Waves */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <section className="container mx-auto px-4 py-20 md:py-32 relative">
        <motion.div
          className="text-center space-y-8 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            // whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Badge variant="outline" className="text-sm hover:scale-105 transition-transform cursor-default border-brand-teal text-brand-teal bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-lg">
              <Zap className="h-3 w-3 mr-2 fill-amber-400 text-amber-400" />
              Embeddable Onboarding Made Easy
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Guide Your Users
            <br />
            <motion.span
              className="bg-linear-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Through Every Step
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Create beautiful, interactive onboarding tours that help new users discover
            the power of your product. No coding required.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            variants={fadeInUp}
          >
            <Link href="/external-pages">
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button size="lg" className="text-lg px-8 h-12 bg-gradient-to-r from-brand-blush via-brand-teal to-brand-sky hover:from-brand-blush/90 hover:to-brand-sky/90 text-white shadow-xl shadow-brand-blush/30 rounded-full">
                  Get Started Free
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/external-pages">
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button size="lg" variant="outline" className="text-lg px-8 h-12 border-brand-teal bg-white/80 hover:bg-white backdrop-blur-sm text-brand-teal rounded-full shadow-lg">
                  <Play className="mr-2 h-4 w-4 fill-brand-teal" />
                  View Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-64 bg-linear-to-r from-brand-sky/20 via-brand-blush/30 to-brand-teal/20 rounded-3xl backdrop-blur-sm border-2 border-white/50 shadow-xl flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-brand-blush to-brand-teal opacity-20 blur-2xl"
            />
          </div>
          <p className="text-2xl font-bold text-brand-teal/50 z-10">Your Graphic/Illustration Here</p>
        </motion.div>
      </section>

      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Features</h2>
          <p className="text-xl text-slate-600">Everything you need to create amazing experiences</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <CreativeFeatureCard 
            title="Interactive Tours"
            description="Create step-by-step tours that guide users through your product features effortlessly."
            icon={Compass}
            stickerText="GUIDE • TEACH • SHOW"
            colorClass="text-indigo-600"
            bgClass="bg-indigo-50"
            features={["Multi-step guided tours", "Smart element targeting", "Resume capability"]}
          />

          <CreativeFeatureCard 
            title="Easy Integration"
            description="Add tours to any website with a simple script tag. Works with any framework."
            icon={Zap}
            stickerText="FAST • QUICK • EASY"
            colorClass="text-amber-600"
            bgClass="bg-amber-50"
            features={["One-line integration", "No dependencies", "Lightweight bundle"]}
          />

          <CreativeFeatureCard 
            title="Analytics & Insights"
            description="Track user engagement, drop-off points, and optimize your tours for better conversion."
            icon={BarChart}
            stickerText="TRACK • DATA • GROW"
            colorClass="text-emerald-600"
            bgClass="bg-emerald-50"
            features={["Completion rates", "Drop-off analysis", "User behavior tracking"]}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <CreativeFeatureCard
            title="Secure & Private"
            description="Enterprise-grade security with end-to-end encryption."
            icon={Shield}
            stickerText="SAFE • SECURE • PROTECT"
            colorClass="text-red-600"
            bgClass="bg-red-50"
            features={["End-to-end encryption", "SOC 2 compliant", "Privacy-first design"]}
          />

          <CreativeFeatureCard
            title="Customizable"
            description="Match your brand with full styling control and themes."
            icon={Layers}
            stickerText="STYLE • THEME • BRAND"
            colorClass="text-purple-600"
            bgClass="bg-purple-50"
            features={["Custom CSS themes", "Brand colors", "Flexible layouts"]}
          />

          <CreativeFeatureCard
            title="Developer First"
            description="Built with a powerful API and TypeScript support."
            icon={Code}
            stickerText="CODE • BUILD • SHIP"
            colorClass="text-cyan-600"
            bgClass="bg-cyan-50"
            features={["TypeScript support", "RESTful API", "Comprehensive docs"]}
          />
        </motion.div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#f3e8ff" fillOpacity="0.3" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-slate-900">How It Works</h2>
          <p className="text-xl text-slate-600">Get started in three simple steps</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-1 bg-gradient-to-r from-brand-blush via-brand-teal to-brand-sky rounded-full -z-10" />

          {[
            { step: 1, title: "Create Tour", desc: "Build your onboarding flow visually.", gradient: "from-brand-blush to-brand-teal" },
            { step: 2, title: "Embed Script", desc: "Add one line of code to your app.", gradient: "from-brand-teal to-brand-sky" },
            { step: 3, title: "Optimize", desc: "Track results and improve adoption.", gradient: "from-brand-sky to-brand-blush" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-center space-y-6 p-4"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto bg-linear-to-br ${item.gradient} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl ring-4 ring-white`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.step}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DEMO CTA (Kept Simple & Bold) --- */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-5xl mx-auto overflow-hidden border-0 shadow-2xl rounded-3xl">
            <div className="bg-linear-to-br from-brand-teal via-brand-blush to-brand-sky p-12 md:p-20 text-center relative overflow-hidden">
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

              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-8 text-white relative z-10"
              >
                <Compass className="w-full h-full drop-shadow-lg" />
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Ready to transform your onboarding?
              </motion.h2>
              <motion.p
                className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Join thousands of developers creating better user experiences with TourGuide.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/external-pages">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 bg-white text-brand-teal hover:bg-brand-sky/10 border-0 rounded-full font-bold shadow-xl">
                      Start Free Trial
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/external-pages">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 border-white/50 text-white hover:bg-white/20 hover:border-white bg-transparent backdrop-blur-sm rounded-full">
                      Contact Sales
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-brand-blush/30 py-12 bg-linear-to-br from-brand-blush/10 via-brand-sky/10 to-brand-sage/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Compass className="h-6 w-6 text-brand-teal" />
                </motion.div>
                <span className="font-bold text-xl bg-linear-to-r from-brand-teal to-brand-sky bg-clip-text text-transparent">TourGuide</span>
              </div>
              <p className="text-sm text-slate-600">
                Making software easier to learn, one tour at a time.
              </p>
            </div>
            {[
                { header: "Product", links: ["Features", "Documentation", "Pricing"] },
                { header: "Resources", links: ["API Reference", "Guides", "Blog"] },
                { header: "Company", links: ["About Us", "Careers", "Contact"] }
            ].map((col, i) => (
                <div key={i}>
                    <h4 className="font-bold mb-4 text-slate-900">{col.header}</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        {col.links.map((link, j) => (
                            <li key={j}><Link href="#" className="hover:text-brand-teal transition-colors">{link}</Link></li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-12 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 TourGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}