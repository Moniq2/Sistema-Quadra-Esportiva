import BenefitsSection from '../components/landing/BenefitsSection'
import CallToAction from '../components/landing/CallToAction'
import CommunitySection from '../components/landing/CommunitySection'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import HowItWorks from '../components/landing/HowItWorks'
import LandingHeader from '../components/landing/LandingHeader'
import SchedulePreview from '../components/landing/SchedulePreview'
import SportsSection from '../components/landing/SportsSection'
import FutureSection from '../components/landing/FutureSection'
import PricingSection from '../components/landing/PricingSection'
import '../styles/landing.css'

export default function Home() {
  return (
    <div className="landing-page">
      <LandingHeader />
      <main>
        <HeroSection />
        <HowItWorks />
        <BenefitsSection />
        <SportsSection />
        <SchedulePreview />
        <CommunitySection />
        <FutureSection />
        <PricingSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
