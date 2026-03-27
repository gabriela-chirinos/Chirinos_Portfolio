import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Work from '@/components/Work'
import Philosophy from '@/components/Philosophy'
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
       <Work />
      <Stack />
      <Process />
      <About />
      <Contact />
    </main>
  )
}
