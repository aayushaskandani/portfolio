import React, { useEffect, useRef } from 'react';
import { soundFX } from '../../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
}

interface WebSling {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  alpha: number;
}

export const SpiderWebCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates & interaction radius
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
      prevX: -1000,
      prevY: -1000,
      speed: 0
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      mouse.speed = Math.hypot(dx, dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Active web-slings on click
    let webSlings: WebSling[] = [];

    const handleClick = (e: MouseEvent) => {
      // Don't interfere if clicking buttons, links or windows
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, [role="button"], .bevel-btn, .bevel-window')) {
        return;
      }

      // Shoot 3-5 high-velocity web strands to nearest particle anchors
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Find closest particles
      const sorted = [...particles]
        .map(p => ({ p, dist: Math.hypot(p.x - clickX, p.y - clickY) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 4);

      sorted.forEach((item, idx) => {
        webSlings.push({
          id: Date.now() + idx,
          x: clickX,
          y: clickY,
          targetX: item.p.x,
          targetY: item.p.y,
          progress: 0,
          alpha: 0.9
        });
      });

      soundFX.playWebThwip();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Particle nodes count (balanced for 60fps performance)
    let particles: Particle[] = [];
    const count = Math.min(48, Math.max(24, Math.floor((width * height) / 28000)));

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 1.5 + 1.2
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce boundaries
        if (p.x < 10 || p.x > width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > height - 10) p.vy *= -1;

        // Subtle mouse repulsion/attraction field
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < mouse.radius && mDist > 0) {
          const force = (mouse.radius - mDist) / mouse.radius;
          p.x -= (mdx / mDist) * force * 1.8;
          p.y -= (mdy / mDist) * force * 1.8;
        }

        // Draw node (Stark Gold / Cyan glow)
        const isGold = i % 3 === 0;
        ctx.fillStyle = isGold ? 'rgba(255, 215, 0, 0.45)' : 'rgba(0, 240, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // 2. Connect neighboring particles with high-tensile web strands
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 125) {
            const opacity = (1 - dist / 125) * 0.14;
            ctx.strokeStyle = `rgba(225, 29, 72, ${opacity})`; // Stark Crimson nanotech filament
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 3. Connect particles to Mouse Cursor (Dynamic Web-Sling Weave)
        if (mDist < mouse.radius && mouse.x > 0) {
          const opacity = (1 - mDist / mouse.radius) * 0.38;
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`; // Stark Arc Cyan web strand
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // 4. Render Active Web-Slings (Click THWIP animation)
      for (let i = webSlings.length - 1; i >= 0; i--) {
        const sling = webSlings[i];
        sling.progress = Math.min(1, sling.progress + 0.12);
        sling.alpha -= 0.035;

        const curX = sling.x + (sling.targetX - sling.x) * sling.progress;
        const curY = sling.y + (sling.targetY - sling.y) * sling.progress;

        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, sling.alpha)})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(sling.x, sling.y);
        ctx.lineTo(curX, curY);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        if (sling.alpha <= 0) {
          webSlings.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
