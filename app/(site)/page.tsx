import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import I18nProvider from './i18n-provider';

export default function Home() {
  return (
    <I18nProvider>
      <div className="font-sans antialiased text-gray-800">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Team />
        <Testimonials />
        <Contact />
        <Footer />

        <BackToTop />
      </div>
    </I18nProvider>
  );
}