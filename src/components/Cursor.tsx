import { useEffect, useState, useCallback, useRef } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Handle hover states
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Set up event listeners for interactive elements
  useEffect(() => {
    const interactiveSelectors = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      '[role="button"]',
      '[data-cursor-hover]'
    ];

    const interactiveElements = document.querySelectorAll(interactiveSelectors.join(','));
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Clean up event listeners
    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseEnter, handleMouseLeave]);

  // Set up global mouse move listener
  useEffect(() => {
    // Add a small delay to prevent initial flash of cursor in wrong position
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [handleMouseMove]);

  // Hide cursor when leaving the window
  useEffect(() => {
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out will-change-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        width: isHovered ? '32px' : '12px',
        height: isHovered ? '32px' : '12px',
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
      }}
      aria-hidden="true"
    />
  );
};

export default Cursor;
