import { m, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  navItems: Array<{ id: string; label: string }>;
  scrollToSection: (id: string) => void;
  onClose: () => void;
}

export default function MobileMenu({ navItems, scrollToSection, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      <m.div 
        id="mobile-menu"
        initial={{ opacity: 0, height: 0 }} 
        animate={{ opacity: 1, height: 'auto' }} 
        exit={{ opacity: 0, height: 0 }} 
        transition={{ duration: 0.28 }} 
        className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => { 
                scrollToSection(item.id); 
                onClose(); 
              }} 
              className="text-left text-sm text-gray-300 py-2"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => { 
              scrollToSection('contact'); 
              onClose(); 
            }} 
            className="mt-2 px-4 py-2 bg-white text-black rounded-full text-sm w-max"
          >
            Contato
          </button>
        </nav>
      </m.div>
    </AnimatePresence>
  );
}
