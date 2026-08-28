import AppPreviewSection from '@/components/Main/AppPreviewSection'
import FeatureHubSection from '@/components/Main/FeatureHubSection'
import DarkSection from '@/components/Main/DarkSection'
import FaqSection from '@/components/Main/FaqSection'
import Features from '@/components/Main/Features'
import Hero from '@/components/Main/Hero'
import PartnersSection from '@/components/Main/PartnersSection'
import PricingSection from '@/components/Main/PricingSection'

const Main = () => {
  return (
    <div>
        <Hero />
        <Features />
        <DarkSection />
        <PricingSection />
        <PartnersSection />
        <AppPreviewSection />
        <FeatureHubSection />
        <FaqSection />
    </div>
  )
}

export default Main