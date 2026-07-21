import React, { useEffect, useRef } from 'react';

const Mascot = () => {
  const mascotWrapRef = useRef(null);
  const armRightRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);

  const eyeLeftCenter = { x: 59, y: 52 };
  const eyeRightCenter = { x: 93, y: 50 };
  const MAX_PUPIL_OFFSET = 4.8;
  const PROXIMITY_RADIUS = 220;

  useEffect(() => {
    let lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const handleMouseMove = (e) => {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let isGreeting = false;
    let animationFrameId;

    const updateEyes = (mouseX, mouseY) => {
      const mascotWrap = mascotWrapRef.current;
      if (!mascotWrap) return null;
      const svgEl = mascotWrap.querySelector('svg');
      if (!svgEl) return null;
      const rect = svgEl.getBoundingClientRect();
      const scaleX = 160 / rect.width;
      const scaleY = 130 / rect.height;

      const pupilLeft = pupilLeftRef.current;
      const pupilRight = pupilRightRef.current;

      if (pupilLeft) {
        const eyeScreenX = rect.left + eyeLeftCenter.x / scaleX;
        const eyeScreenY = rect.top + eyeLeftCenter.y / scaleY;
        const dx = mouseX - eyeScreenX;
        const dy = mouseY - eyeScreenY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(MAX_PUPIL_OFFSET, Math.hypot(dx, dy) / 18);
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        pupilLeft.setAttribute('cx', eyeLeftCenter.x + ox);
        pupilLeft.setAttribute('cy', eyeLeftCenter.y + oy);
      }

      if (pupilRight) {
        const eyeScreenX = rect.left + eyeRightCenter.x / scaleX;
        const eyeScreenY = rect.top + eyeRightCenter.y / scaleY;
        const dx = mouseX - eyeScreenX;
        const dy = mouseY - eyeScreenY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(MAX_PUPIL_OFFSET, Math.hypot(dx, dy) / 18);
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        pupilRight.setAttribute('cx', eyeRightCenter.x + ox);
        pupilRight.setAttribute('cy', eyeRightCenter.y + oy);
      }

      return rect;
    };

    const checkProximity = (mouseX, mouseY, rect) => {
      if (!rect) return;
      const armRight = armRightRef.current;
      if (!armRight) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);
      const near = dist < PROXIMITY_RADIUS;

      if (near && !isGreeting) {
        isGreeting = true;
        armRight.classList.remove('idle-sway');
        armRight.classList.add('greet');
      } else if (!near && isGreeting) {
        isGreeting = false;
        armRight.classList.remove('greet');
        armRight.classList.add('idle-sway');
      }
    };

    const loop = () => {
      const rect = updateEyes(lastMouse.x, lastMouse.y);
      if (rect) {
        checkProximity(lastMouse.x, lastMouse.y, rect);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Occasional blink
    let blinkTimeoutId;
    const blink = () => {
      const left = eyeLeftRef.current;
      const right = eyeRightRef.current;
      if (left && right) {
        left.style.transform = 'scaleY(0.1)';
        left.style.transformOrigin = '59px 52px';
        right.style.transform = 'scaleY(0.1)';
        right.style.transformOrigin = '93px 50px';
        
        setTimeout(() => {
          left.style.transform = 'scaleY(1)';
          right.style.transform = 'scaleY(1)';
        }, 120);
      }
      blinkTimeoutId = setTimeout(blink, 2500 + Math.random() * 3000);
    };

    const blinkDelayId = setTimeout(blink, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(blinkDelayId);
      clearTimeout(blinkTimeoutId);
    };
  }, []);

  return (
    <div ref={mascotWrapRef} id="mascot-wrap">
      <style>{`
        #mascot-wrap {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          animation: bob 3.4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%      { transform: translateX(-50%) translateY(-10px); }
        }

        .mascot-shadow {
          width: 90px;
          height: 14px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%);
          margin: 0 auto;
          border-radius: 50%;
        }

        .eye-pupil { transition: transform 0.05s linear; }

        #arm-right {
          transform-origin: 108px 62px;
          transition: transform 0.15s ease-out;
        }
        #arm-right.idle-sway {
          animation: idlesway 3s ease-in-out infinite;
        }
        #arm-right.greet {
          animation: greetwave 0.5s ease-in-out infinite;
        }
        @keyframes idlesway {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-4deg); }
        }
        @keyframes greetwave {
          0%, 100% { transform: rotate(-10deg); }
          50%      { transform: rotate(35deg); }
        }

        .cheek { transition: opacity 0.3s ease; }
      `}</style>
      <svg width="160" height="130" viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bodyGrad" cx="40%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#dbe4f0"/>
          </radialGradient>
          <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fda4af" stop-opacity="0.75"/>
            <stop offset="100%" stop-color="#fda4af" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <ellipse cx="80" cy="76" rx="58" ry="35" fill="url(#bodyGrad)"/>
        <circle cx="42" cy="60" r="27" fill="url(#bodyGrad)"/>
        <circle cx="75" cy="46" r="33" fill="url(#bodyGrad)"/>
        <circle cx="112" cy="62" r="25" fill="url(#bodyGrad)"/>

        {/* left arm (idle) */}
        <ellipse cx="30" cy="88" rx="8" ry="16" fill="#cdd8e8" transform="rotate(-12 30 88)"/>
        <circle cx="26" cy="100" r="7" fill="#dbe4f0"/>

        {/* right arm + hand, this one waves */}
        <g id="arm-right" ref={armRightRef} className="idle-sway">
          <ellipse cx="122" cy="82" rx="8" ry="17" fill="#e8eef7" transform="rotate(30 122 82)"/>
          <g transform="translate(133,60)">
            <circle r="9" fill="#f4f7fc"/>
            <ellipse cx="-3" cy="-4" rx="2.4" ry="3.4" fill="#e2e9f3" transform="rotate(-20 -3 -4)"/>
            <ellipse cx="1" cy="-6" rx="2.4" ry="3.6" fill="#e2e9f3" transform="rotate(-5 1 -6)"/>
            <ellipse cx="5" cy="-4.5" rx="2.4" ry="3.4" fill="#e2e9f3" transform="rotate(12 5 -4.5)"/>
          </g>
        </g>

        <circle cx="10" cy="34" r="2" fill="#67e8f9" opacity="0.9"/>
        <circle cx="142" cy="24" r="1.6" fill="#93c5fd" opacity="0.8"/>
        <circle cx="150" cy="50" r="2.2" fill="#c4b5fd" opacity="0.85"/>

        <g id="eye-left" ref={eyeLeftRef}>
          <circle cx="59" cy="52" r="12.5" fill="#0f172a"/>
          <circle className="eye-pupil" id="pupil-left" ref={pupilLeftRef} cx="59" cy="52" r="5.8" fill="#22d3ee"/>
          <circle cx="56" cy="49" r="1.8" fill="#ffffff"/>
        </g>
        <g id="eye-right" ref={eyeRightRef}>
          <circle cx="93" cy="50" r="12.5" fill="#0f172a"/>
          <circle className="eye-pupil" id="pupil-right" ref={pupilRightRef} cx="93" cy="50" r="5.8" fill="#22d3ee"/>
          <circle cx="90" cy="47" r="1.8" fill="#ffffff"/>
        </g>

        <path id="mouth" d="M 66 66 Q 76 73 86 66" stroke="#94a3b8" strokeWidth="2.6" fill="none" strokeLinecap="round"/>

        <circle className="cheek" cx="49" cy="62" r="8" fill="url(#cheekGrad)"/>
        <circle className="cheek" cx="103" cy="60" r="8" fill="url(#cheekGrad)"/>
      </svg>
      <div className="mascot-shadow"></div>
    </div>
  );
};

export default Mascot;
