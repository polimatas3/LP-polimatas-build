import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LazyMotion, domAnimation } from "framer-motion";
import HomePage from "@/react-app/pages/Home";

// Lazy load everything that's not critical for initial Hero render
const SpriteInjector = lazy(() => import("@/react-app/components/SpriteInjector").then(m => ({ default: m.SpriteInjector })));
const TermsOfUse = lazy(() => import("@/react-app/pages/TermsOfUse"));
const PrivacyPolicy = lazy(() => import("@/react-app/pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("@/react-app/pages/CookiesPolicy"));

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Router>
        <Suspense fallback={null}>
          <SpriteInjector />
        </Suspense>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/politica-de-cookies" element={<CookiesPolicy />} />
        </Routes>
      </Router>
    </LazyMotion>
  );
}
