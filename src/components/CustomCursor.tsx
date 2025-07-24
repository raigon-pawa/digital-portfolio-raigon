import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ${
          isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.75 : 1})`,
        }}
      >
        <div className="w-5 h-5 border-2 border-cyber-blue rounded-full" />
      </div>

      {/* Trailing effect */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-10 h-10 border border-cyber-pink/50 rounded-full animate-pulse" />
      </div>
    </>
  );
};

export default CustomCursor;