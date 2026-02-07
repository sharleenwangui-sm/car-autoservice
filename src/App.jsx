import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header, Footer } from "./components/layout";
import { Hero, ServiceCards, About } from "./components/sections";
import { BookingPage, CallButton } from "./components/pages/";
import { default as Services } from "./components/sections/Services.jsx";

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
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
