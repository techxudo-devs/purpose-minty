import Footer from '@/components/common/Footer'
import AppPreviewSection from '@/components/Main/AppPreviewSection'
import CtaSection from '@/components/Main/CtaSection'
import BetterOptionsSection from '@/components/Main/BetterOptionsSection'
import DarkSection from '@/components/Main/DarkSection'
import FaqSection from '@/components/Main/FaqSection'
import FeatureHubSection from '@/components/Main/FeatureHubSection'
import GoalsSection from '@/components/Main/GoalsSection'
import Hero from '@/components/Main/Hero'
import LevelsSection from '@/components/Main/LevelsSection'
import PartnersSection from '@/components/Main/PartnersSection'
import PricingSection from '@/components/Main/PricingSection'
import SurveySection from '@/components/Main/SurveySection'
const Main = () => {
  return (
    <div className="overflow-x-hidden">
        <Hero />
        <LevelsSection />
        <BetterOptionsSection />
        <GoalsSection />
        <FeatureHubSection />
        <AppPreviewSection />
        <PricingSection />
        <PartnersSection />
        <DarkSection />
        <FaqSection />
        <SurveySection />
        <CtaSection />
        <Footer />
    </div>
  )
}
export default Main
