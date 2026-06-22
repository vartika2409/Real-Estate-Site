import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { getFeaturedProperties } from "@/lib/data/properties";

export default async function HomePage() {
  const featured = await getFeaturedProperties();
  return (
    <>
      <HeroSection />
      <FeaturedListings properties={featured} />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
