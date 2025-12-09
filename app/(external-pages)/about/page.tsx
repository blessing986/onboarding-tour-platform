// 'use client';

// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Target, Users, Lightbulb, Heart, Code, Database, Lock, Cloud } from 'lucide-react';
// import { motion } from 'framer-motion';

// // --- ANIMATION VARIANTS (Matches Home Page) ---
// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 }
// };

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// export default function AboutPage() {
//   return (
//     // UPDATED: Light Theme Foundation (Matches Home)
//     <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
//       {/* Background Gradient Mesh (Matches Home) */}
//       <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
//         <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
//         <div className="absolute left-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-500 opacity-10 blur-[100px]"></div>
//       </div>

//       <section className="container mx-auto px-4 py-20">
//         <motion.div 
//           className="max-w-4xl mx-auto space-y-16"
//           initial="initial"
//           animate="animate"
//           variants={staggerContainer}
//         >
          
//           {/* --- HERO SECTION --- */}
//           <div className="text-center space-y-6">
//             <motion.div variants={fadeInUp}>
//               <Badge variant="outline" className="border-slate-300 text-slate-600 bg-white/50 backdrop-blur-sm">
//                 About TourGuide
//               </Badge>
//             </motion.div>
            
//             <motion.h1 
//               className="text-5xl md:text-6xl font-bold text-slate-900"
//               variants={fadeInUp}
//             >
//               Making Onboarding
//               <br />
//               {/* Mature Gradient: Slate to Indigo (Matches Home) */}
//               <span className="bg-linear-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
//                 Simple and Effective
//               </span>
//             </motion.h1>
            
//             <motion.p 
//               className="text-xl text-slate-600 max-w-2xl mx-auto"
//               variants={fadeInUp}
//             >
//               TourGuide was built to solve a common problem: helping users understand
//               and adopt new products quickly and efficiently.
//             </motion.p>
//           </div>

//           {/* --- OUR STORY CARD --- */}
//           <motion.div variants={fadeInUp}>
//             <Card className="bg-white border-slate-200 shadow-lg shadow-slate-200/50">
//               <CardContent className="p-8 md:p-10">
//                 <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Story</h2>
//                 <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
//                   <p>
//                     Every product team faces the same challenge: how do you help new users
//                     understand your product without overwhelming them? Traditional documentation
//                     is rarely read, and video tutorials often go unwatched.
//                   </p>
//                   <p>
//                     We created TourGuide to bridge this gap. By providing interactive,
//                     contextual guidance right where users need it, we help them learn by
//                     doing rather than reading or watching.
//                   </p>
//                   <p>
//                     Our mission is to make every product more accessible and every user
//                     more successful from their very first interaction.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* --- MISSION & VISION --- */}
//           <div className="grid md:grid-cols-2 gap-8">
//             <motion.div variants={fadeInUp}>
//               <Card className="bg-white border-slate-200 h-full hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
//                 <CardContent className="p-8 space-y-4">
//                   <div className="p-3 bg-indigo-50 rounded-lg w-fit">
//                     <Target className="h-8 w-8 text-indigo-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
//                   <p className="text-slate-600">
//                     To empower product teams with tools that transform complex onboarding
//                     into intuitive, engaging experiences that drive user success and
//                     product adoption.
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div variants={fadeInUp}>
//               <Card className="bg-white border-slate-200 h-full hover:border-yellow-200 hover:shadow-xl transition-all duration-300">
//                 <CardContent className="p-8 space-y-4">
//                   <div className="p-3 bg-yellow-50 rounded-lg w-fit">
//                     <Lightbulb className="h-8 w-8 text-yellow-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
//                   <p className="text-slate-600">
//                     A world where every user feels confident and capable from their first
//                     moment with a new product, eliminating confusion and unlocking potential.
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>

//           {/* --- CORE VALUES --- */}
//           <motion.div variants={fadeInUp}>
//             <Card className="bg-white border-slate-200 shadow-sm">
//               <CardContent className="p-8">
//                 <h2 className="text-3xl font-bold mb-8 text-slate-900">Core Values</h2>
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Users className="h-6 w-6 text-emerald-600" />
//                       <h4 className="text-xl font-semibold text-slate-900">User-Centric</h4>
//                     </div>
//                     <p className="text-slate-600">
//                       Every decision we make starts with the end user in mind. Their success is our success.
//                     </p>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Heart className="h-6 w-6 text-rose-500" />
//                       <h4 className="text-xl font-semibold text-slate-900">Simplicity</h4>
//                     </div>
//                     <p className="text-slate-600">
//                       We believe powerful tools should be simple to use. Complexity is our problem to solve, not yours.
//                     </p>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Target className="h-6 w-6 text-indigo-600" />
//                       <h4 className="text-xl font-semibold text-slate-900">Excellence</h4>
//                     </div>
//                     <p className="text-slate-600">
//                       We're committed to building the best onboarding solution on the market, continuously improving.
//                     </p>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Lightbulb className="h-6 w-6 text-yellow-600" />
//                       <h4 className="text-xl font-semibold text-slate-900">Innovation</h4>
//                     </div>
//                     <p className="text-slate-600">
//                       We're always exploring new ways to make onboarding more effective, engaging, and accessible.
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div variants={fadeInUp}>
//             <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-800 shadow-xl">
//               <CardContent className="p-10 text-center space-y-6">
//                 <h2 className="text-3xl font-bold text-white">Team Members</h2>
//                 <p className="text-slate-300">
//                   Built as an internship project by a dedicated team of developers:
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {['EnesiD_ev', 'CynthiaAO', 'Tiffs', 'Mz-b'].map((member, i) => (
//                     <Badge 
//                       key={i} 
//                       variant="secondary" 
//                       className="text-base py-2 px-6 bg-slate-700 hover:bg-slate-600 text-white border-0"
//                     >
//                       {member}
//                     </Badge>
//                   ))}
//                 </div>
//                 <p className="text-sm text-slate-400 pt-2">
//                   This project demonstrates our skills in full-stack development, UI/UX design,
//                   and creating production-ready applications.
//                 </p>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* --- TECH STACK --- */}
//           <motion.div variants={fadeInUp}>
//             <Card className="bg-white border-slate-200">
//               <CardContent className="p-8">
//                 <h2 className="text-3xl font-bold mb-8 text-slate-900">Technology Stack</h2>
//                 <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                  
//                   {/* Frontend */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-indigo-600 mb-2">
//                       <Code className="h-5 w-5" />
//                       <h4 className="font-semibold text-slate-900">Frontend</h4>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">Next.js 13</Badge>
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">TypeScript</Badge>
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">Tailwind CSS</Badge>
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">ShadCn UI</Badge>

//                     </div>
//                   </div>

//                   {/* Backend */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-indigo-600 mb-2">
//                       <Database className="h-5 w-5" />
//                       <h4 className="font-semibold text-slate-900">Backend</h4>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">Supabase</Badge>
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">PostgreSQL</Badge>
//                     </div>
//                   </div>

//                   {/* Auth */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-indigo-600 mb-2">
//                       <Lock className="h-5 w-5" />
//                       <h4 className="font-semibold text-slate-900">Auth</h4>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">Supabase Auth</Badge>
//                     </div>
//                   </div>

//                   {/* Deploy */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-indigo-600 mb-2">
//                       <Cloud className="h-5 w-5" />
//                       <h4 className="font-semibold text-slate-900">Deployment</h4>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Badge variant="outline" className="w-fit border-slate-200 text-slate-600">Vercel</Badge>
//                     </div>
//                   </div>

//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//         </motion.div>
//       </section>
//     </div>
//   );
// }

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Lightbulb, Heart, ArrowRight, Zap, BarChart } from 'lucide-react';
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
      staggerChildren: 0.15
    }
  }
};

// --- CUSTOM SVG TEXT PATH FOR ROTATING STICKER ---
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

// --- THE CREATIVE CARD COMPONENT ---
interface CreativeCardProps {
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stickerText: string;
  colorClass: string; // Tailwind text color class for sticker
  bgClass: string;   // Tailwind bg color class for sticker
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
      <div className="relative h-32 bg-gradient-to-br from-brand-blush via-brand-teal to-brand-sky overflow-hidden">

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
    <div className="min-h-screen bg-gradient-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900 selection:bg-brand-teal/20 selection:text-brand-teal overflow-hidden">

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

      <section className="container mx-auto px-4 py-20">
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
              whileHover={{ scale: 1.1, rotate: 5 }}
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
              <span className="bg-gradient-to-r from-brand-teal via-brand-blush to-brand-sky bg-clip-text text-transparent">
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

          {/* --- COMPACT CARDS GRID --- */}
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              {
                title: "Drive Adoption",
                desc: "To empower product teams with tools that transform complex onboarding into intuitive experiences.",
                icon: Target,
                color: "text-indigo-600",
                bg: "bg-gradient-to-br from-indigo-100 to-purple-100"
              },
              {
                title: "Spark Curiosity",
                desc: "A world where every user feels confident from their first moment, eliminating confusion.",
                icon: Lightbulb,
                color: "text-yellow-600",
                bg: "bg-gradient-to-br from-yellow-100 to-amber-100"
              },
              {
                title: "Grow Engagement",
                desc: "We prioritize simplicity and user-centric design in every decision we make.",
                icon: Heart,
                color: "text-rose-600",
                bg: "bg-gradient-to-br from-rose-100 to-pink-100"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-5 flex items-start space-x-3">
                    <motion.div
                      className={`p-2.5 rounded-xl ${item.bg}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* --- TEAM MEMBERS --- */}
          <motion.div variants={fadeInUp}>
            <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl">
              <div className="bg-gradient-to-br from-brand-teal via-brand-blush to-brand-sky p-12 md:p-16 text-center relative overflow-hidden">
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
                  <h2 className="text-3xl font-bold text-white">The Team Behind TourGuide</h2>
                  <p className="text-white/90 max-w-2xl mx-auto">
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

                <p className="text-sm text-white/80 pt-8 max-w-2xl mx-auto relative z-10">
                  This project demonstrates our skills in full-stack development, UI/UX design,
                  and creating production-ready applications.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* --- TECHNOLOGY STACK --- */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-xl rounded-3xl">
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
                      <Badge className="bg-brand-sky/20 text-brand-sky hover:bg-brand-sky/30 border-0">Supabase</Badge>
                      <Badge className="bg-brand-sky/20 text-brand-sky hover:bg-brand-sky/30 border-0">PostgreSQL</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 text-lg">Authentication</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-brand-blush/50 text-brand-teal hover:bg-brand-blush/70 border-0">Supabase Auth</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 text-lg">Deployment</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-brand-sage/30 text-brand-sage hover:bg-brand-sage/40 border-0">Vercel</Badge>
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