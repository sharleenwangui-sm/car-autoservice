import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header, Footer } from "./components/layout";
import { Hero, ServiceCards, About } from "./components/sections";
import { BookingPage, CallButton } from "./components/pages/";
import { default as Services } from "./components/sections/Services.jsx";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Instant for SPA feel
    });
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <ServiceCards />
        <About />
        <Services />
        {/* <Testimonials /> */}
      </main>
      <Footer />
      <CallButton />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
