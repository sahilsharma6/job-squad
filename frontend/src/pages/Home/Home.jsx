import SlidingBanner from "./components/SlidingBanner";
import JobsOfTheDay from "./components/JobsOfTheDay";
import { categories, companies } from "./Home-Data";
import MarketplaceBanner from "./components/MarketplaceBanner";

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

      <MarketplaceBanner />

      <div>

        <JobsOfTheDay />

      </div>
    </div>
  );
};

export default HomePage;
