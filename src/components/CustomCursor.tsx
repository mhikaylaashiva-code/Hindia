import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailing, setTrailing] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is desktop / capable of hover
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hover effect listeners for buttons, links, and cards
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, input, select, textarea, [role="button"], .interactive-hover');
      setIsHovered(!!clickable);
    };

    window.addEventListener('mouseover', updateHoverState);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  // Soft elastic trailing animation
  useEffect(() => {
    let animationFrameId: number;
    
    const updateTrailing = () => {
      setTrailing((prev) => {
        // Linear interpolation for smooth lag
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    animationFrameId = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Circle */}
      <div
        style={{
          transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovered ? 1.8 : 1
          })`,
          transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 mix-blend-difference ${
          isHovered ? 'bg-red-700/20 border-red-500 scale-150' : 'border-neutral-500 bg-transparent'
        }`}
      />
      {/* Central Dot */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 transition-all duration-75 mix-blend-difference ${
          isHovered ? 'bg-orange-500 w-3 h-3' : 'bg-neutral-150'
        }`}
      />
    </>
  );
}
