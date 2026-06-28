import { HeroSection } from "@/components/layout/HeroSection";
import { FeaturesSection } from "@/components/layout/FeaturesSection";
import { StatsSection } from "@/components/layout/StatsSection";
import { CTASection } from "@/components/layout/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
