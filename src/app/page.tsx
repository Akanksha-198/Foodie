import Chef from '@/components/Chef'
import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Services from '@/components/Services'
import Slider from '@/components/Slider'

export default function Home() {
  return (
    <main>
      <Slider/>
      <Featured/>
      {/* <Offer/> */}
      <Chef/>
      <Services/>
    </main>
  )
}
