import Navbar from "../component/Navbar"
import Hero from "../component/Hero"
import Features from "../component/Feature"
import HowItWorks from "../component/HowItWorks"
import TemplatesPreview from "../component/TemplatePreview"
import AIFeatures from "../component/AiFeature"
import CTA from "../component/CTA"
import Footer from "../component/Footer"


function Home() {
    return (
        <>
        <Navbar/>
        <Hero/>
        <Features/>
        <HowItWorks/>
        <TemplatesPreview/>
        <AIFeatures></AIFeatures>
        <CTA></CTA>
        <Footer/>
        </>
    )

}
    
export default Home