import { m } from 'framer-motion';
import { useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { openContactCalendly } from '@/react-app/lib/contact-calendly';

// Lazy load shader background to avoid blocking LCP
const ShaderBackground = lazy(() => import('@/react-app/components/ui/shader-background'));

export default function HeroSection() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Detect mobile - use useMemo to avoid recalculation
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  }, []);

  useEffect(() => {
    // Defer shader loading by 500ms to improve LCP
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Static headline - always renders first for LCP
  const staticHeadline = (
    <>
      <span className="text-cyan-400">Automação</span> e inteligência{' '}
      <br className="md:hidden" />
      <span className="hidden md:inline"> </span>
      artificial aplicadas com{' '}
      <br className="md:hidden" />
      <span className="hidden md:inline"> </span>
      <span className="relative inline-block">
        <span
          className="absolute inset-0 rounded pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(56, 182, 254, 0.2) 0%, rgba(56, 182, 254, 0.15) 50%, rgba(56, 182, 254, 0) 100%)',
            left: 0,
            top: '-2px',
            bottom: '-2px',
            zIndex: 0,
          }}
        />
        <span className="relative z-10">método, critério</span>
      </span>{' '}
      <br className="md:hidden" />
      <span className="hidden md:inline"> </span>
      <span className="relative inline-block">
        <span
          className="absolute inset-0 rounded pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(56, 182, 254, 0.2) 0%, rgba(56, 182, 254, 0.15) 50%, rgba(56, 182, 254, 0) 100%)',
            left: 0,
            top: '-2px',
            bottom: '-2px',
            zIndex: 0,
          }}
        />
        <span className="relative z-10">e visão estratégica.</span>
      </span>
    </>
  );

  // Render hero headline with letter hover effects (desktop only, after mount)
  const heroHeadline = useMemo(() => {
    const renderWord = (word: string, startIdx: number, isBlue = false, hasHighlight = false) => {
      const content = word.split('').map((ch, i) => (
        <span
          key={`char-${startIdx + i}`}
          className={`hero-letter ${isBlue ? 'text-cyan-400' : ''}`}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ));
      if (hasHighlight) {
        return (
          <span className="relative inline-block">
            <span
              className="absolute inset-0 rounded pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(56, 182, 254, 0.2) 0%, rgba(56, 182, 254, 0.15) 50%, rgba(56, 182, 254, 0) 100%)',
                left: 0,
                top: '-2px',
                bottom: '-2px',
                zIndex: 0,
              }}
            />
            <span className="relative z-10">{content}</span>
          </span>
        );
      }
      return <>{content}</>;
    };
    let idx = 0;
    return (
      <>
        {renderWord('Automação', idx, true)}
        {(() => { idx += 9; return null; })()}
        {renderWord(' e inteligência', idx)}
        {(() => { idx += 15; return null; })()}
        <br className="md:hidden" />
        <span className="hidden md:inline"> </span>
        {renderWord('artificial aplicadas com', idx)}
        {(() => { idx += 23; return null; })()}
        <br className="md:hidden" />
        <span className="hidden md:inline"> </span>
        {renderWord('método, critério', idx, false, true)}
        {(() => { idx += 16; return null; })()}
        <br className="md:hidden" />
        <span className="hidden md:inline"> </span>
        {renderWord('e visão estratégica.', idx, false, true)}
      </>
    );
  }, []);

  // Determine which headline to show: static first, then animated on desktop after mount
  const headlineToRender = mounted && !isMobile ? heroHeadline : staticHeadline;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-900 via-cyan-800 to-black">
      {/* Shader background - lazy loaded and purely decorative */}
      {mounted && (
        <Suspense fallback={null}>
          <ShaderBackground />
        </Suspense>
      )}
      
      <div
        className="container mx-auto px-6 z-30 text-center relative max-w-[1100px]"
      >
        <h1 className="text-[1.60rem] sm:text-2xl md:text-3xl lg:text-4xl font-bold md:font-light mb-[3.75rem] md:mb-8 text-white tracking-tight">
          <div className="block hero-letters-wrapper">
            {headlineToRender}
          </div>
        </h1>
        <div className="mb-12 max-w-2xl mx-auto hidden md:block">
            <div className="relative inline-block">
              <span
                className="absolute inset-0 rounded pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(56, 182, 254, 0.35) 0%, rgba(56, 182, 254, 0.25) 50%, rgba(56, 182, 254, 0.1) 100%)',
                  left: '-8px',
                  right: '-8px',
                  top: '-4px',
                  bottom: '-4px',
                  zIndex: 0,
                }}
              />
              <span className="relative z-10 text-lg md:text-xl text-cyan-400 font-medium leading-relaxed">
                Formamos profissionais e automatizamos empresas.
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="relative group w-full sm:w-auto mt-4 sm:mt-0">
              <m.button
                onClick={openContactCalendly}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block p-px font-semibold leading-6 bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 w-full sm:w-auto"
              >
                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950 h-full">
                  <div className="relative z-10 flex items-center justify-center space-x-2 h-full">
                    <span className="transition-colors duration-300 group-hover:text-gray-300 text-white text-sm">
                      Quero automatizar meu negócio
                    </span>
                    <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-300 text-white" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd"></path></svg>
                  </div>
                </span>
              </m.button>
            </div>
            <div className="relative group w-full sm:w-auto">
              <m.button
                onClick={() => navigate('/mentoring')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block p-px font-semibold leading-6 bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 w-full sm:w-auto"
              >
                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950 h-full">
                  <div className="relative z-10 flex items-center justify-center space-x-2 h-full">
                    <span className="transition-colors duration-300 group-hover:text-gray-300 text-white text-sm">
                      Quero aprender automação e IA
                    </span>
                    <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-300 text-white" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd"></path></svg>
                  </div>
                </span>
              </m.button>
            </div>
          </div>
        </div>
      {/* Mouse Scroll Indicator - only on desktop after mount */}
      {mounted && !isMobile && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-full flex justify-center pointer-events-none select-none" style={{ zIndex: 40 }}>
          <div className="flex flex-col items-center">
            {/* Mouse shape */}
            <span className="w-8 h-14 rounded-full border-2 border-cyan-400 flex items-start justify-center bg-black/60 shadow-lg overflow-hidden relative" style={{ boxShadow: '0 2px 16px 0 rgba(0,255,255,0.08)' }}>
              {/* Animated dot with hover */}
              <span className="block w-2 h-2 rounded-full bg-cyan-400 mt-2 transition-transform duration-300 animate-bounce group-hover:translate-y-4 mouse-dot" style={{ animationDuration: '1.2s' }} />
            </span>
            {/* Animated arrows */}
            <div className="flex flex-col items-center mt-2">
              <svg className="arrow w-4 h-4 text-cyan-400 animate-arrow1" fill="currentColor" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3 .1-17z"/></svg>
              <svg className="arrow w-4 h-4 text-cyan-400 animate-arrow2" fill="currentColor" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3 .1-17z"/></svg>
              <svg className="arrow w-4 h-4 text-cyan-400 animate-arrow3" fill="currentColor" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3 .1-17z"/></svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
