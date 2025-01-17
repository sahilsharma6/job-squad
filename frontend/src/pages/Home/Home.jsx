import SlidingBanner from "./components/SlidingBanner";
import JobsOfTheDay from "./components/JobsOfTheDay";
import { categories, companies } from "./Home-Data";
import JobMatchHero from "@/pages/Home/components/Banner1";
import HiringBanner from "@/pages/Home/components/Hiring";
import ExploreMarketplace from "@/pages/Home/components/Marketplace";
import NewsletterSection from "@/pages/Home/components/Newletter";
import TopRecruiters from "@/pages/Home/components/Recrut";


const HomePage = () => {

  return (
    <div>
      <SlidingBanner
        title="Browse by category"
        subtitle="Find the job that's perfect for you. about 800+ new jobs everyday"
        items={categories}
        isVerticalCard={true}
      />
      <SlidingBanner
        title="Top companies hiring now"
        items={companies}
        isVerticalCard={false}
      />
      <div>

        <JobsOfTheDay />
        <TopRecruiters />
        <HiringBanner />
        <ExploreMarketplace />
        <NewsletterSection />
        <JobMatchHero />
        {/* <JobsOfTheDay /> */}

      </div>
    </div>
  );
};

export default HomePage;
