import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Work from '@/components/Work'
import Philosophy from '@/components/Philosophy'
import Pricing from '@/components/Pricing'
import Stack from '@/components/Stack'
import Process from '@/components/Process'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Marquee />
      <Philosophy />
      <Pricing />
      <Process />
      <Work />
      <Stack />
      <About />
      <Contact />
    </main>
  )
}
