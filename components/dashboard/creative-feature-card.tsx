import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
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

export const CreativeFeatureCard = ({
  title,
  description,
  icon: Icon,
  colorClass,
  features,
}: CreativeCardProps) => {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="
        group relative h-full flex flex-col overflow-hidden 
        rounded-3xl border border-gray/30 
        bg-white/70 dark:bg-slate-900/60 
        backdrop-blur-xl 
        transition-all
      "
    >

      {/* Content */}
      <div className="relative z-10 flex flex-col p-8">
        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4
            bg-linear-to-br from-slate-100 to-slate-200 shadow-inner
          `}
        >
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>

        <h3
          className="
            text-xl font-semibold text-center 
            text-[#20063B] transition-colors
          "
        >
          {title}
        </h3>

        <p className="text-slate-600 text-center mt-2 mb-6 text-sm leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mt-auto">
          {features.map((item, i) => (
            <li key={i} className="flex items-start text-sm text-slate-700">
              <CheckCircle2 className={`h-4 w-4 mr-2 mt-0.5 shrink-0 ${colorClass}`} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
