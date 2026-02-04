// Utility function to scroll to contact section and open Calendly
export const openContactCalendly = () => {
  // First, scroll to contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // After a short delay, trigger the Calendly opening
  setTimeout(() => {
    window.dispatchEvent(new Event('open-calendly'));
  }, 800); // Wait for scroll to complete
};