import React from 'react';
import { useNavigate } from 'react-router-dom';
import SlidingBanner from "./components/SlidingBanner";
import JobsOfTheDay from "./components/JobsOfTheDay";
import { companies } from "./Home-Data";
import { useGetJobs } from '@/hooks/useGetJobs';
import { jobData } from "@/assets/Jobs_Data/jobs-data";
import { Building2 } from 'lucide-react';
import JobMatchHero from "@/pages/Home/components/Banner1";
import HiringBanner from "@/pages/Home/components/Hiring";
import ExploreMarketplace from "@/pages/Home/components/Marketplace";
import NewsletterSection from "@/pages/Home/components/Newletter";
import TopRecruiters from "@/pages/Home/components/Recrut";
import Hero from "@/pages/Home/components/Hero";
import FAQSection from "./components/Faq";
import StatsSection from "./components/StatsSection";
import RecruiterChoiceCard from "./components/AreyouRecuiter";
import JobPostingBanner from "./components/JobPostingBanner";
import { useJobSectors } from '@/hooks/useJobSectors';
import { useCompanies } from '@/hooks/useCompanies';

const HomePage = () => {

  const { sectorStats, isLoading } = useJobSectors();
  const { companiesForBanner, isCompanyLoading } = useCompanies();

  return (
    <div>
      <Hero />

      <div>
        <JobPostingBanner />
      </div>

      <div className="py-16">
        {/* {!isLoading && ( */}
          <div className="py-16">
            <SlidingBanner
              title="Browse by category"
              subtitle="Find the job that's perfect for you"
              items={sectorStats}
              isLoading={isLoading}
              isVerticalCard={true}
            />
          </div>
        {/* )} */}
      </div>

      <div>
        <HiringBanner />
      </div>

      <div className="py-16">
        <SlidingBanner
          title="Top companies hiring now"
          subtitle="Join leading companies in your industry"
          items={companiesForBanner}
          isLoading={isCompanyLoading}
          isVerticalCard={false}
        />
      </div>

      <div>
        <StatsSection />
      </div>

      <div className="py-16">
        <ExploreMarketplace />
      </div>

      <div>
        <JobsOfTheDay />
      </div>

      <div className="py-16">
        <TopRecruiters />
      </div>

      <div>
        <JobMatchHero />
      </div>

      <RecruiterChoiceCard />

      <div>
        <FAQSection />
      </div>

      <div className="py-16">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default HomePage;