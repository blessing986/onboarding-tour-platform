'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const tourSteps = [
  {
    id: 1,
    title: "Welcome!",
    description: "Let's take a quick tour of your dashboard",
    position: { top: "8%", right: "5%" },
    targetElement: { top: "12%", right: "50%" },
    arrowDirection: "right"
  },
  {
    id: 2,
    title: "Create Tours",
    description: "Build interactive guides in minutes",
    position: { top: "35%", left: "5%" },
    targetElement: { top: "25%", left: "15%" },
    arrowDirection: "left"
  },
  {
    id: 3,
    title: "Track Progress",
    description: "Monitor user engagement and completion",
    position: { bottom: "15%", right: "5%" },
    targetElement: { bottom: "55%", right: "35%" },
    arrowDirection: "right"
  },
  {
    id: 4,
    title: "You're All Set!",
    description: "Start creating amazing user experiences",
    position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    targetElement: null,
    arrowDirection: null
  }
];

export function ProductTourIllustration() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tourSteps[currentStep];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Main Browser Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-slate-200"
      >
        {/* Browser Header */}
        <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-lg px-3 py-1 text-xs text-slate-400 border border-slate-200">
              yourapp.com
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="bg-linear-to-br from-brand-sky/5 via-white to-brand-blush/5 p-6 h-[280px] relative overflow-hidden">
          {/* Animated Background Orbs */}
          <motion.div
            className="absolute top-4 right-8 w-40 h-40 rounded-full bg-brand-blush/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-8 left-12 w-48 h-48 rounded-full bg-brand-sky/30 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-brand-teal/20 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          {/* Decorative Dots Pattern */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #66b3ba 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Floating UI Elements in Background */}
          <motion.div
            className="absolute top-12 right-16 w-16 h-16 rounded-lg bg-white/60 backdrop-blur-sm shadow-lg border border-brand-sky/20"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full flex items-center justify-center text-2xl">📈</div>
          </motion.div>
          <motion.div
            className="absolute top-20 left-20 w-14 h-14 rounded-full bg-white/60 backdrop-blur-sm shadow-lg border border-brand-blush/20"
            animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full flex items-center justify-center text-xl">✨</div>
          </motion.div>

          {/* Mock App Interface */}
          <div className="grid grid-cols-12 gap-4 h-full relative z-10">
            {/* Light Sidebar */}
            <div className="col-span-3 bg-white border-2 border-slate-200 rounded-lg p-3 space-y-2 shadow-sm">
              <div className="h-8 bg-linear-to-br from-brand-blush/20 to-brand-teal/20 rounded flex items-center px-2 justify-center">
                <div className="w-6 h-6 rounded bg-linear-to-br from-brand-blush to-brand-teal"></div>
              </div>
              <div className="space-y-1.5">
                <div className="h-7 bg-slate-100 rounded px-2 flex items-center hover:bg-slate-200 transition-colors">
                  <div className="w-3 h-3 rounded bg-slate-300 mr-2"></div>
                  <div className="h-2 w-16 bg-slate-300 rounded"></div>
                </div>
                <div className="h-7 bg-brand-teal/10 rounded px-2 flex items-center border-2 border-brand-teal/30">
                  <div className="w-3 h-3 rounded bg-brand-teal mr-2"></div>
                  <div className="h-2 w-20 bg-brand-teal/60 rounded"></div>
                </div>
                <div className="h-7 bg-slate-100 rounded px-2 flex items-center hover:bg-slate-200 transition-colors">
                  <div className="w-3 h-3 rounded bg-slate-300 mr-2"></div>
                  <div className="h-2 w-14 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-9 space-y-3">
              {/* Header Bar */}
              <div className="flex items-center justify-between">
                <div className="h-8 w-40 bg-slate-200 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-sky to-brand-teal"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
                  <div className="h-2 w-12 bg-slate-200 rounded mb-1.5"></div>
                  <div className="h-4 w-16 bg-brand-teal/20 rounded"></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
                  <div className="h-2 w-14 bg-slate-200 rounded mb-1.5"></div>
                  <div className="h-4 w-14 bg-brand-sky/20 rounded"></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
                  <div className="h-2 w-10 bg-slate-200 rounded mb-1.5"></div>
                  <div className="h-4 w-12 bg-brand-blush/20 rounded"></div>
                </div>
              </div>

              {/* Content Blocks */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 rounded"></div>
                <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
                <div className="h-3 w-4/6 bg-slate-100 rounded"></div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white border border-slate-200 rounded-lg p-2 h-20 flex items-end justify-around">
                <div className="w-4 bg-brand-teal/30 rounded-t" style={{height: '40%'}}></div>
                <div className="w-4 bg-brand-sky/30 rounded-t" style={{height: '70%'}}></div>
                <div className="w-4 bg-brand-blush/30 rounded-t" style={{height: '50%'}}></div>
                <div className="w-4 bg-brand-sage/30 rounded-t" style={{height: '85%'}}></div>
                <div className="w-4 bg-brand-teal/30 rounded-t" style={{height: '60%'}}></div>
              </div>
            </div>
          </div>

          {/* Active Tour Tooltip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.3 }}
              style={step.position}
              className="absolute bg-[#20063Bcc] backdrop-blur-lg text-white rounded-2xl p-4 shadow-2xl max-w-xs z-10"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                  <p className="text-xs opacity-90">{step.description}</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
                <div className="text-xs opacity-70">
                  {currentStep + 1} / {tourSteps.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStep === tourSteps.length - 1}
                    className="px-3 py-1.5 rounded-lg bg-white text-[#2A1E5C55] hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center gap-1"
                  >
                    {currentStep === tourSteps.length - 1 ? "Done" : "Next"}
                    {currentStep !== tourSteps.length - 1 && <ChevronRight className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-amber-50/80 blur-xl"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-6 right-12 w-12 h-12 rounded-full bg-brand-blush/20 blur-xl"
          ></motion.div>
        </div>
      </motion.div>

      {/* Floating UI Cards Around Browser */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute left-4 -top-6 bg-white rounded-xl shadow-xl p-2.5 border-2 border-brand-sage/30"
      >
        <div className="w-10 h-10 rounded-lg bg-[#2A1E5C55] flex items-center justify-center">
          <span className="text-white text-lg">📊</span>
        </div>
      </motion.div>

    </div>
  );
}
