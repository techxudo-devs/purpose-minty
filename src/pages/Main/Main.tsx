import AppPreviewSection from '@/components/Main/AppPreviewSection'
import DarkSection from '@/components/Main/DarkSection'
import FaqSection from '@/components/Main/FaqSection'
import Features from '@/components/Main/Features'
import Hero from '@/components/Main/Hero'

const Main = () => {
  return (
    <div>
        <Hero />
        <Features />
        <DarkSection />
        <AppPreviewSection />
        <FaqSection />
    </div>
  )
}

export default Main