import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delay = 200,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showTooltip = () => {
    const id = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="absolute z-50 w-64 p-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-lg -top-2 left-1/2 -translate-x-1/2 -translate-y-full"
          >
            {content}
            <div className="absolute w-3 h-3 -bottom-1.5 left-1/2 -translate-x-1/2 rotate-45 bg-white border-b border-r border-gray-200"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
