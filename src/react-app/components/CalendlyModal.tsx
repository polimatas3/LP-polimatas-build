import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsExpanded(false);
      setIsIframeLoading(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAnimationComplete = () => {
    if (isOpen) {
      setIsExpanded(true);
      setIsIframeLoading(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsIframeLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onAnimationComplete={handleAnimationComplete}
              className="w-full max-w-6xl bg-black/90 rounded-2xl overflow-hidden backdrop-blur-sm pointer-events-auto"
              style={{
                border: '1px solid rgba(128, 128, 128, 0.4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
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
                {isIframeLoading && (
                  <div className="text-white text-lg">Carregando agenda...</div>
                )}
              </div>

              <p className="text-center py-4 text-sm font-semibold bg-black/50">
                <span className="text-cyan-500">Chamada gratuita</span>
                <span className="text-white mx-2">•</span>
                <span className="text-cyan-500">Diagnóstico personalizado</span>
                <span className="text-white mx-2">•</span>
                <span className="text-cyan-500">Sem obrigação de contratação</span>
              </p>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
