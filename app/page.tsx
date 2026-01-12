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
import HomeProjects from "@/components/HomeProjects"

export default function HomePage() {
  return (
    <>
      {/* HERO burada */}

      {/* Şirket Profili / Neden ATL vs */}

      <HomeProjects />

      {/* Footer zaten layout’ta */}
    </>
  )
}
