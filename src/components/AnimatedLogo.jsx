import React, { useEffect, useRef } from 'react';

export default function AnimatedLogo({ fontSize }) {
  const logoRef = useRef(null);
  const animsRef = useRef([]);

  const buildAnimation = () => {
    const wm = logoRef.current;
    if (!wm) return;

    // Clear active animations
    animsRef.current.forEach(a => a.cancel());
    animsRef.current = [];

    wm.classList.add('ready');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const letters = Array.from(wm.querySelectorAll('.ch'));
    const bang = wm.querySelector('.bang');
    const stem = wm.querySelector('.stem');
    const dot = wm.querySelector('.dot');
    const ball = wm.querySelector('.ball');
    const ring = wm.querySelector('.ring');
    const ground = wm.querySelector('.ground');
    const glow = wm.querySelector('.glow');

    if (!letters.length || !dot || !ball || !ring || !ground || !glow) return;

    function animateElement(el, kf, opt) {
      const a = el.animate(kf, opt);
      animsRef.current.push(a);
      return a;
    }

    const w = wm.getBoundingClientRect();
    const em = parseFloat(getComputedStyle(wm).fontSize);
    const d = dot.getBoundingClientRect();
    const r = d.width / 2;
    const floor = d.bottom - w.top;
    const cy = floor - r;
    const xe = d.left + r - w.left;
    const xs = letters.map(l => {
      const b = l.getBoundingClientRect();
      return b.left - w.left + (b.width - 0.05 * em) / 2;
    });

    const FALL = 0.45, HOP = 0.21, LAST = 0.34, T = [FALL];
    for (let j = 1; j <= 6; j++) T[j] = T[j - 1] + HOP;
    T[7] = T[6] + LAST;
    const end = T[7];

    const pts = [];
    function pt(t, x, y, sx, sy, o) {
      pts.push({ t, x, y, sx, sy, o: o === undefined ? 1 : o });
    }

    const N = 16;
    for (let k = 0; k <= N; k++) {
      const u = k / N;
      let sy = 1 + 0.22 * u;
      let sx = 1 - 0.12 * u;
      const q = Math.max(0, (u - 0.88) / 0.12);
      sy -= (sy - 0.62) * q;
      sx += (1.5 - sx) * q;
      pt(FALL * u, xs[0], cy - 2.6 * em * (1 - u * u), sx, sy);
    }

    function hop(t0, D, xa, xb, H) {
      const n = 18;
      for (let kk = 1; kk <= n; kk++) {
        const uu = kk / n;
        const v = Math.abs(1 - 2 * uu);
        const e = Math.min(uu, 1 - uu);
        let s1 = 1 + 0.28 * v;
        let s2 = 1 - 0.18 * v;
        if (e < 0.12) {
          const qq = 1 - e / 0.12;
          s1 -= (s1 - 0.62) * qq;
          s2 += (1.5 - s2) * qq;
        }
        pt(t0 + D * uu, xa + (xb - xa) * uu, cy - 4 * H * uu * (1 - uu), s2, s1);
      }
    }

    for (let j = 0; j < 6; j++) hop(T[j], HOP, xs[j], xs[j + 1], 0.75 * em);
    hop(T[6], LAST, xs[6], xe, 1.3 * em);
    pt(end + 0.09, xe, cy, 1, 1);
    pt(end + 0.091, xe, cy, 1, 1, 0);
    const total = pts[pts.length - 1].t;

    animateElement(ball, pts.map(p => {
      const b = 1 + 0.6 * Math.max(0, 1 - p.t / end);
      return {
        transform: `translate(${(p.x - r).toFixed(2)}px,${(p.y - r).toFixed(2)}px) scale(${(p.sx * b).toFixed(3)},${(p.sy * b).toFixed(3)})`,
        opacity: p.o,
        offset: p.t / total
      };
    }), { duration: total * 1000, easing: 'linear', fill: 'both' });

    ground.style.top = floor + 'px';
    animateElement(ground, [
      { transform: 'scaleX(0)', opacity: 1 },
      { transform: 'scaleX(1)', opacity: 1 }
    ], { duration: 500, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' });

    animateElement(ground, [
      { opacity: 1 },
      { opacity: 0 }
    ], { delay: (end + 1.3) * 1000, duration: 500, fill: 'forwards' });

    const castKf = [
      { textShadow: '0 0 0 rgba(106,56,0,0)' },
      { textShadow: '.11em .11em 0 #6a3800', offset: 0.5 },
      { textShadow: '.055em .055em 0 #6a3800' }
    ];

    letters.forEach((el, i) => {
      const s = i % 2 ? 1 : -1;
      animateElement(el, [
        { transform: `scale(.6,0) rotate(${-7 * s}deg)`, easing: 'cubic-bezier(.2,.9,.3,1)' },
        { transform: `scale(1.08,1.22) rotate(${3 * s}deg)`, offset: 0.4, easing: 'ease-in-out' },
        { transform: `scale(.97,.94) rotate(${-1 * s}deg)`, offset: 0.7, easing: 'ease-out' },
        { transform: 'scale(1,1) rotate(0deg)' }
      ], { delay: T[i] * 1000, duration: 650, fill: 'both' });

      animateElement(el, castKf, { delay: (end + i * 0.045) * 1000, duration: 600, easing: 'ease-out', fill: 'both' });
    });

    animateElement(dot, [{ opacity: 0 }, { opacity: 1 }], { delay: (end + 0.09) * 1000, duration: 1, fill: 'both' });
    animateElement(stem, [
      { transform: 'scaleY(0)' },
      { transform: 'scaleY(1)' }
    ], { delay: end * 1000, duration: 700, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' });

    const cast7 = { delay: (end + 7 * 0.045) * 1000, duration: 600, easing: 'ease-out', fill: 'both' };
    const castBox = [
      { boxShadow: '0 0 0 rgba(106,56,0,0)' },
      { boxShadow: '.11em .11em 0 #6a3800', offset: 0.5 },
      { boxShadow: '.055em .055em 0 #6a3800' }
    ];
    animateElement(dot, castBox, cast7);
    animateElement(stem, castBox, cast7);

    ring.style.left = xe + 'px';
    ring.style.top = cy + 'px';
    animateElement(ring, [
      { width: '.3em', height: '.3em', margin: '-.15em 0 0 -.15em', opacity: 0.9 },
      { width: '5em', height: '5em', margin: '-2.5em 0 0 -2.5em', opacity: 0 }
    ], { delay: end * 1000, duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });

    animateElement(glow, [
      { opacity: 0, transform: 'translate(-50%,-50%) scale(.5)' },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }
    ], { delay: end * 1000, duration: 1200, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });

    letters.concat([bang]).forEach((el, i) => {
      const rot = el === bang ? ' rotate(6deg)' : '';
      animateElement(el, [
        { transform: `translateY(0)${rot}` },
        { transform: `translateY(-.1em)${rot}`, offset: 0.4 },
        { transform: `translateY(0)${rot}` }
      ], { delay: (end + 0.55) * 1000 + i * 55, duration: 550, easing: 'ease-in-out' });
    });
  };

  useEffect(() => {
    const ready = (document.fonts && document.fonts.load)
      ? document.fonts.load('800 100px Poppins').catch(() => {})
      : Promise.resolve();

    let isMounted = true;
    Promise.race([ready, new Promise(r => setTimeout(r, 1200))]).then(() => {
      if (isMounted) buildAnimation();
    });

    return () => {
      isMounted = false;
      animsRef.current.forEach(a => a.cancel());
    };
  }, []);

  return (
    <div 
      ref={logoRef} 
      className="phizeeo-logo-wm" 
      role="img" 
      aria-label="PhiZeeo!" 
      title="Click to replay logo animation"
      onClick={buildAnimation}
      style={fontSize ? { fontSize } : {}}
    >
      <span className="glow"></span>
      <span className="ground"></span>
      <span className="ch o" aria-hidden="true">P</span>
      <span className="ch o" aria-hidden="true">h</span>
      <span className="ch o" aria-hidden="true">i</span>
      <span className="ch w" aria-hidden="true">Z</span>
      <span className="ch w" aria-hidden="true">e</span>
      <span className="ch w" aria-hidden="true">e</span>
      <span className="ch w" aria-hidden="true">o</span>
      <span className="bang" aria-hidden="true">
        <span className="stem"></span>
        <span className="dot"></span>
      </span>
      <span className="ring"></span>
      <span className="ball"></span>
    </div>
  );
}
