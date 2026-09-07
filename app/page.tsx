import { HomeFeatures } from "@/app/components/home-features";
import { HomeHero } from "@/app/components/home-hero";
import { HomePrBanner } from "@/app/components/home-pr-banner";
import { HomeTestimonials } from "@/app/components/home-testimonials";
import { SiteHeader } from "@/app/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <HomeHero />
        <HomeFeatures />
        <HomePrBanner />
        <HomeTestimonials />
      </main>
    </div>
  );
}
