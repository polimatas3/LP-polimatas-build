import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GridBackground } from './ui/grid-background';

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Listen for global event to open Calendly
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsExpanded(false);
    };
    
    window.addEventListener('open-calendly', handleOpen);
    return () => window.removeEventListener('open-calendly', handleOpen);
  }, []);

  const handleOpenCalendly = () => {
    setIsOpen(true);
    setIsExpanded(false);
  };

  const handleCloseCalendly = () => {
    setIsOpen(false);
    setIsExpanded(false);
    setIsIframeLoading(false);
  };

  const handleAnimationComplete = () => {
    if (isOpen) {
      setIsExpanded(true);
      setIsIframeLoading(true);
    }
  };

  return (
    <m.section 
      id="contact" 
      ref={containerRef}
      className="py-32 bg-black relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Grid Background */}
      <GridBackground />

      <div className="container mx-auto px-6 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-4 text-white">
            Fale com a Polímatas
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto font-light">
            Agende uma chamada gratuita para entender suas necessidades e identificar oportunidades reais de automação e IA para o seu negócio
          </p>
        </m.div>

        {/* Calendly Container */}
        <div className="flex justify-center w-full">
          <div 
            className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden backdrop-blur-sm"
            style={{
              background: 'transparent',
              border: '1px solid rgba(128, 128, 128, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Default State - Attractive Layout */}
            <AnimatePresence>
              {!isOpen && (
                <m.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-16 px-8"
                  style={{ minHeight: '400px' }}
                >
                  <div className="text-center mb-8">
                    <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                      Clique no botão abaixo para visualizar nossa agenda e marcar uma consultoria técnica gratuita, com diagnóstico personalizado e sem obrigação de contratação.
                    </p>
                    <button
                      onClick={handleOpenCalendly}
                      className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
                      aria-label="Abrir agendamento de chamada gratuita"
                    >
                      Agendar Chamada Gratuita
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">
                      <span className="text-cyan-500">Chamada gratuita</span>
                      <span className="text-white mx-2">•</span>
                      <span className="text-cyan-500">Diagnóstico personalizado</span>
                      <span className="text-white mx-2">•</span>
                      <span className="text-cyan-500">Sem obrigação de contratação</span>
                    </p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Expanded State - Calendly */}
            <AnimatePresence>
              {isOpen && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onAnimationComplete={handleAnimationComplete}
                  className="relative"
                >
                  {/* Close Button */}
                  <button
                    onClick={handleCloseCalendly}
                    className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
                    aria-label="Fechar agendamento"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Calendly Container */}
                  <div style={{ minWidth: '320px', height: '700px' }} className="flex items-center justify-center">
                    {isExpanded && (
                      <iframe
                        src="https://calendly.com/utroiss/60min?hide_gdpr_banner=1"
                        title="Agendamento de consultoria técnica gratuita com a Polímatas"
                        loading="lazy"
                        className="w-full"
                        style={{ height: '700px', border: 0 }}
                        onLoad={() => setIsIframeLoading(false)}
                      />
                    )}
                    {isIframeLoading && <div className="text-white text-lg">Carregando agenda...</div>}
                  </div>

                  <p className="text-center py-4 text-sm font-semibold">
                    <span className="text-cyan-500">Chamada gratuita</span>
                    <span className="text-white mx-2">•</span>
                    <span className="text-cyan-500">Diagnóstico personalizado</span>
                    <span className="text-white mx-2">•</span>
                    <span className="text-cyan-500">Sem obrigação de contratação</span>
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </m.section>
  );
}
