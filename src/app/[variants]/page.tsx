import { DynamicLayoutProps } from '@/types/next';
// import { RouteVariants } from '@/utils/server/routeVariants';


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const Page = async (props: DynamicLayoutProps) => {
  // Get isMobile from variants parameter on server side
//   const isMobile = await RouteVariants.getIsMobile(props);
//   const { locale } = await RouteVariants.getVariantsFromProps(props);

//   console.log('isMobile', isMobile)
//   console.log('locale', locale)
  return (
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
  );
}

export default Page;