import SlidingBanner from "./components/SlidingBanner";
import JobsOfTheDay from "./components/JobsOfTheDay";
import { categories, companies } from "./Home-Data";
import JobMatchHero from "@/pages/Home/components/Banner1";
import HiringBanner from "@/pages/Home/components/Hiring";
import ExploreMarketplace from "@/pages/Home/components/Marketplace";
import NewsletterSection from "@/pages/Home/components/Newletter";
import TopRecruiters from "@/pages/Home/components/Recrut";
import MarketplaceBanner from "./components/MarketplaceBanner";
import Hero from "@/components/Hero/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero />

      <div>
        <div className="py-16">
          <SlidingBanner
            title="Browse by category"
            subtitle="Find the job that's perfect for you. about 800+ new jobs everyday"
            items={categories}
            isVerticalCard={true}
          />
        </div>
        <div className="py-16">
          <ExploreMarketplace />
        </div>
        <div className="py-16">
          <SlidingBanner
            title="Top companies hiring now"
            items={companies}
            isVerticalCard={false}
          />
        </div>

        <div>{/* stats */}</div>

        <div>
          <JobsOfTheDay />
        </div>

        <div>{/* how it works */}</div>

        <div className="py-16">
          <TopRecruiters />
        </div>

        <div>
          <HiringBanner />
        </div>

        <div>
          <JobMatchHero />
        </div>

        <div className="py-16">
          <NewsletterSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
