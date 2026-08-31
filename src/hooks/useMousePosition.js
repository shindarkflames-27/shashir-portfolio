import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0, // -1 to 1
    normalizedY: 0, // -1 to 1
    isHoveringInteractive: false,
    isHovering3D: false
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Check hovered element
      const target = document.elementFromPoint(clientX, clientY);
      const isInteractive = Boolean(
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('textarea') ||
        target?.closest('[data-interactive="true"]')
      );
      const is3D = Boolean(target?.closest('[data-3d="true"]') || target?.tagName.toLowerCase() === 'canvas');

      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX: (clientX / width) * 2 - 1,
        normalizedY: -(clientY / height) * 2 + 1,
        isHoveringInteractive: isInteractive,
        isHovering3D: is3D
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}
