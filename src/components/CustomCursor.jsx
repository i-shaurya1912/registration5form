import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import GlassSurface from './GlassSurface';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 800, mass: 0.05 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      
      const target = e.target;
      const isHoverable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('a') ||
        target.closest('button');
        
      setIsPointer(!!isHoverable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  const size = isPointer ? 80 : 35;

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center rounded-full overflow-hidden transition-[width,height,box-shadow,border-color,background-color] duration-200"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        backdropFilter: 'blur(3px) brightness(1.2) contrast(1.1) saturate(1.2)',
        WebkitBackdropFilter: 'blur(3px) brightness(1.2) contrast(1.1) saturate(1.2)',
        border: isPointer ? '1px solid rgba(0, 210, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        boxShadow: isPointer 
          ? '0 0 20px rgba(0, 210, 255, 0.3), inset 0 0 15px rgba(0, 210, 255, 0.2)' 
          : '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Inner crosshair or dot */}
      <div className={`w-1 h-1 rounded-full bg-[#00d2ff] transition-opacity duration-300 ${isPointer ? 'opacity-100' : 'opacity-50'}`} />
    </motion.div>
  );
};
