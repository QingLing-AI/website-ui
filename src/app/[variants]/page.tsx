import { DynamicLayoutProps } from '@/types/next';
import { RouteVariants } from '@/utils/server/routeVariants';

import About from './components/About';
// import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
// import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import NotFound from './not-found';

const Page = async (props: DynamicLayoutProps) => {
  // Get isMobile from variants parameter on server side
  // const isMobile = await RouteVariants.getIsMobile(props);
  // const { locale } = await RouteVariants.getVariantsFromProps(props);
  if (await RouteVariants.isValidVariantsFromProps(props)) {
    return (
      <>
        {/* <Header /> */}
        <Hero />
        <About />
        <Services />
        <Team />
        <Contact />
        {/* <Footer /> */}
        <BackToTop />
      </>
    );
  } else {
    return <NotFound />;
  }
};

export default Page;
