import Image from "next/image"
import BannerImg from '@/assets/img/image wrapper.png'
const Hero = () => {
    return (
        <section className="hero-section">
            <Image src={BannerImg} alt="Banner Image" quality={100} />
        </section>
    )
}

export default Hero
