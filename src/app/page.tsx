import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import TargetAudienceSection from '@/components/sections/target-audience-section';
import SpeakersSection from '@/components/sections/speakers-section';
import AgendaSection from '@/components/sections/agenda-section';
import FaqSection from '@/components/sections/faq-section';
import HostsSection from '@/components/sections/hosts-section';
// import RegistrationSection from '@/components/sections/registration-section';
import FooterSection from '@/components/sections/footer-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <AboutSection />
      <TargetAudienceSection />
      <SpeakersSection />
      <AgendaSection />
      <FaqSection />
      {/* Hosts section temporarily disabled
      <HostsSection />
      */}
      
      {/* Registration section temporarily disabled 
      <RegistrationSection />
      */}
      <FooterSection />
    </main>
  );
}