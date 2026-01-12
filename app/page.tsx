import HeroSlider from "../components/HeroSlider"
import CompanyProfile from "../components/CompanyProfile"
import WhyATL from "../components/WhyATL"

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <HeroSlider />

      {/* ŞİRKET PROFİLİ */}
      <CompanyProfile />

      {/* NEDEN ATL */}
      <WhyATL />
    </>
  )
}
