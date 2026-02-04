import { useState, useEffect, lazy, Suspense } from 'react';
import logo80 from '@/assets/images/logo-80.avif';
import logo160 from '@/assets/images/logo-160.avif';
import logo240 from '@/assets/images/logo-240.avif';

// Lazy load framer-motion only when mobile menu is opened
const MobileMenu = lazy(() => import('./MobileMenu'));

// Inline SVG icons to avoid lucide-react dependency in critical path
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'services', 'how-it-works', 'cases', 'team', 'compare', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          // If we're in contact section, don't highlight any nav item (contact has its own button)
          if (id === 'contact') {
            setActiveSection('');
          } else {
            setActiveSection(id);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    setIsMobileMenuOpen(false);
    
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'about', label: 'Sobre' },
    { id: 'services', label: 'Serviços' },
    { id: 'how-it-works', label: 'Como funciona' },
    { id: 'cases', label: 'Casos' },
    { id: 'team', label: 'Quem somos' },
    { id: 'compare', label: 'Comparações' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Outer wrapper that narrows when scrolled (adds external margins) */}
        <div
          style={{
            marginLeft: isScrolled ? '3vw' : 0,
            marginRight: isScrolled ? '3vw' : 0,
            transition: 'margin 1.5s cubic-bezier(.2,.9,.2,1)',
          }}
        >
        {/* Inner box that receives the border and backdrop when scrolled */}
        <div
          style={{
            borderRadius: isScrolled ? 12 : 0,
            border: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
            background: isScrolled ? 'rgba(0,0,0,0.45)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(6px)' : 'none',
            transition: 'all 1.5s cubic-bezier(.2,.9,.2,1)',
          }}
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo on the left */}
            <div className="flex items-center">
              <div 
                className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105" 
                onClick={() => scrollToSection('home')}
              >
                <img 
                  src={logo80}
                  srcSet={`${logo80} 80w, ${logo160} 160w, ${logo240} 240w`}
                  sizes="80px"
                  alt="Polímatas - Automação e Inteligência Artificial" 
                  className="h-10 w-auto object-contain"
                  width="80"
                  height="42"
                  decoding="async"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-light tracking-tight text-white">Polímatas</span>
                </div>
              </div>
            </div>

            {/* Right-side wrapper: nav pills + Contato + mobile menu (keeps two main children for justify-between) */}
            <div className="flex items-center gap-6 ml-auto">
              <nav className="hidden lg:flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button key={item.id} onClick={() => scrollToSection(item.id)} className={`text-sm font-light transition-all ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`} style={{ 
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                      transition: 'all 0.3s ease',
                    }}>
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="hidden lg:block">
                <button onClick={() => scrollToSection('contact')} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                  Contato
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button 
                  className="text-white" 
                  onClick={() => setIsMobileMenuOpen(v => !v)}
                  aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <Suspense fallback={null}>
          <MobileMenu 
            navItems={navItems}
            scrollToSection={scrollToSection}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </Suspense>
      )}
    </header>
  );
}
