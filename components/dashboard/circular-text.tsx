import { motion } from 'framer-motion';

export const CircularText = ({
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