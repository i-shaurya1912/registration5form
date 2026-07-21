import React, { useEffect, useRef } from 'react';

const BackgroundGrid = () => {
  const starsCanvasRef = useRef(null);
  const hexCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);

  useEffect(() => {
    const starsCanvas = starsCanvasRef.current;
    const hexCanvas = hexCanvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!starsCanvas || !hexCanvas || !bgCanvas) return;

    const starsCtx = starsCanvas.getContext('2d');
    const hexCtx = hexCanvas.getContext('2d');
    const bgCtx = bgCanvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;

      starsCanvas.width = w;
      starsCanvas.height = h;

      hexCanvas.width = w;
      hexCanvas.height = h;

      bgCanvas.width = w;
      bgCanvas.height = h;

      drawHexGrid();
      generateStars();
      generateNodes();
    };

    /* ---- Stars ---- */
    let starList = [];
    function generateStars() {
      starList = [];
      const count = Math.max(80, Math.floor((w * h) / 9000));
      for (let i = 0; i < count; i++) {
        starList.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02
        });
      }
    }

    function drawStars(t) {
      starsCtx.clearRect(0, 0, w, h);
      for (const s of starList) {
        const tw = (Math.sin(t * s.speed + s.phase) + 1) / 2;
        starsCtx.fillStyle = `rgba(200,215,255,${0.15 + tw * 0.5})`;
        starsCtx.beginPath();
        starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        starsCtx.fill();
      }
    }

    /* ---- Hex grid ---- */
    function drawHexGrid() {
      hexCtx.clearRect(0, 0, w, h);
      const size = 46;
      const hexH = size * Math.sqrt(3);
      hexCtx.strokeStyle = 'rgba(96,165,250,0.06)';
      hexCtx.lineWidth = 1;
      for (let row = -1; row * hexH * 0.75 < h + hexH; row++) {
        for (let col = -1; col * size * 1.5 < w + size * 2; col++) {
          const x = col * size * 1.5;
          const y = row * hexH * 0.75 + (col % 2 ? hexH / 2 : 0);
          drawHex(hexCtx, x, y, size * 0.86);
        }
      }
    }

    function drawHex(ctx, x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const px = x + r * Math.cos(a);
        const py = y + r * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    /* ---- Main network ---- */
    const mouse = { x: w / 2, y: h / 2, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let nodes = [];
    function generateNodes() {
      const count = Math.min(140, Math.floor((w * h) / 13000));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.4 + 1
        });
      }
    }

    const packets = [];
    function spawnPacket() {
      if (nodes.length < 2) return;
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a === b) return;
      packets.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.012, trail: [] });
    }

    const packetInterval = setInterval(spawnPacket, 150);

    // Initialize dimensions and contents
    resize();
    window.addEventListener('resize', resize);

    let animationFrameId;
    function animate(timestamp) {
      bgCtx.clearRect(0, 0, w, h);
      drawStars(timestamp * 0.001);

      const CONNECT_DIST = Math.min(150, w / 6);
      const MOUSE_RADIUS = 160;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0.01) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.6;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.4;
            bgCtx.strokeStyle = `rgba(110,180,255,${alpha})`;
            bgCtx.lineWidth = 0.6;
            bgCtx.beginPath();
            bgCtx.moveTo(n.x, n.y);
            bgCtx.lineTo(m.x, m.y);
            bgCtx.stroke();
          }
        }

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.5;
            bgCtx.strokeStyle = `rgba(167,139,250,${alpha})`;
            bgCtx.lineWidth = 0.7;
            bgCtx.beginPath();
            bgCtx.moveTo(n.x, n.y);
            bgCtx.lineTo(mouse.x, mouse.y);
            bgCtx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const grad = bgCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        grad.addColorStop(0, 'rgba(147,197,253,0.9)');
        grad.addColorStop(1, 'rgba(147,197,253,0)');
        bgCtx.fillStyle = grad;
        bgCtx.beginPath();
        bgCtx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        bgCtx.fill();

        bgCtx.fillStyle = '#eff6ff';
        bgCtx.beginPath();
        bgCtx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        bgCtx.fill();
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const px = p.a.x + (p.b.x - p.a.x) * p.t;
        const py = p.a.y + (p.b.y - p.a.y) * p.t;
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 10) p.trail.shift();

        for (let k = 0; k < p.trail.length; k++) {
          const pt = p.trail[k];
          const alpha = (k / p.trail.length) * 0.5;
          bgCtx.fillStyle = `rgba(34,211,238,${alpha})`;
          bgCtx.beginPath();
          bgCtx.arc(pt.x, pt.y, 1.4, 0, Math.PI * 2);
          bgCtx.fill();
        }

        const grad = bgCtx.createRadialGradient(px, py, 0, px, py, 7);
        grad.addColorStop(0, 'rgba(34,211,238,1)');
        grad.addColorStop(1, 'rgba(34,211,238,0)');
        bgCtx.fillStyle = grad;
        bgCtx.beginPath();
        bgCtx.arc(px, py, 7, 0, Math.PI * 2);
        bgCtx.fill();

        bgCtx.fillStyle = '#cffafe';
        bgCtx.beginPath();
        bgCtx.arc(px, py, 1.8, 0, Math.PI * 2);
        bgCtx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(packetInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0">
      <style>{`
        .bg-system-ambient {
          background: #05070f;
        }
        .canvas-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        #stars-canvas { z-index: 0; }
        #hex-canvas { z-index: 1; opacity: 0.5; }
        #bg-canvas { z-index: 2; }
        .glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.4;
          z-index: 1;
          pointer-events: none;
          animation: drift 14s ease-in-out infinite alternate;
        }
        .glow-1 { width: 550px; height: 550px; background: #3b82f6; top: -180px; left: -120px; }
        .glow-2 { width: 600px; height: 600px; background: #8b5cf6; bottom: -220px; right: -160px; animation-delay: 3s; }
        .glow-3 { width: 420px; height: 420px; background: #06b6d4; top: 40%; left: 50%; transform: translate(-50%, -50%); opacity: 0.18; animation-delay: 6s; }
        @keyframes drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.08); }
        }
        .vignette {
          position: fixed;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(3,5,12,0.75) 100%);
        }
        .scanline {
          position: fixed;
          left: 0; right: 0;
          height: 2px;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent);
          animation: scan 6s linear infinite;
        }
        @keyframes scan {
          0%   { top: -5%; opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { top: 105%; opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 bg-system-ambient -z-50 pointer-events-none" />
      <canvas ref={starsCanvasRef} id="stars-canvas" className="canvas-bg" />
      <canvas ref={hexCanvasRef} id="hex-canvas" className="canvas-bg" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
      <canvas ref={bgCanvasRef} id="bg-canvas" className="canvas-bg" />
      <div className="scanline" />
      <div className="vignette" />
    </div>
  );
};

export default BackgroundGrid;
