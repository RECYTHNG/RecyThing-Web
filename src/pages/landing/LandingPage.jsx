import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Fitur from "./Fitur";
import FAQ from "./FAQ";
import Partner from "./Partner";
import Footer from "./Footer";
import License from "./License";

export default function LandingPage() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <About />
      <Fitur />
      <FAQ />
      <Partner />
      <Footer />
      <License />
    </div>
  );
}
