import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header, Footer } from "./components/layout";
import { Hero, ServiceCards, About, Testimonials } from "./components/sections";
import { BookingPage } from "./components/pages";

function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <ServiceCards />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* <Route path="/emergency" element={<EmergencyTowing />} />
          <Route path="/services" element={<Services />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
