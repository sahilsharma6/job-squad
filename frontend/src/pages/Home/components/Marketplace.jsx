import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useJobSectors } from '@/hooks/useJobSectors';
import { Building2 } from "lucide-react";

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-72 sm:w-80 animate-pulse">
    <div className="h-64 sm:h-72 rounded-xl bg-white/10 backdrop-blur-sm p-6">
      <div className="h-full flex flex-col justify-between">
        <div className="w-16 h-16 rounded-lg bg-white/20 mb-4"></div>
        <div className="h-6 w-3/4 bg-white/20 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-white/20 rounded"></div>
      </div>
    </div>
  </div>
);

const ExploreMarketplace = () => {
  const navigate = useNavigate();
  const { sectorStats, isLoading } = useJobSectors();
  const scrollContainer = useRef(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  useEffect(() => {
    checkScroll();
  }, [sectorStats]);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth / 2 : container.offsetWidth / 2;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-primary-ultra py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ubuntu font-normal">
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-8 max-w-6xl">
        {/* Left Text Section */}
        <div className="text-white flex-shrink-0 lg:w-1/3 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold animate-fade-in">
            Explore the Marketplace
          </h2>
          <p className="mt-4 text-base sm:text-lg opacity-90 font-lato font-normal">
            Search and connect with the right applicants faster. Tell us what you are looking for, and we will get to work for you.
          </p>
          <Button className="mt-6 bg-white text-primary-ultra hover:bg-primary-light hover:text-white transition-all duration-300 group">
            Explore
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </div>

        {/* Right Scrolling Section */}
        <div className="relative flex-grow lg:w-2/3 w-full">
          {isLeftVisible && (
            <Button
              variant="ghost"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg transition-all duration-300 h-12 w-12 p-0"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-6 w-6 text-primary-ultra" />
            </Button>
          )}

          {isRightVisible && (
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg transition-all duration-300 h-12 w-12 p-0"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-6 w-6 text-primary-ultra" />
            </Button>
          )}

          {/* Job Sectors Carousel */}
          <div
            ref={scrollContainer}
            className="flex gap-4 overflow-x-hidden pb-4"
            onScroll={checkScroll}
          >
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : sectorStats.length > 0 ? (
              sectorStats.map((sector, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 sm:w-80 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={sector.onClick}
                >
                  <div className="h-64 sm:h-72 rounded-xl bg-white/10 backdrop-blur-sm p-6 transform transition-all duration-300 hover:translate-y--1 hover:shadow-xl">
                    <div className="h-full flex flex-col justify-between">
                      <div className="w-16 h-16 rounded-lg bg-white/20 mb-4 transform transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                        {React.createElement(sector.icon || Building2, {
                          size: 32,
                          className: "text-white"
                        })}
                      </div>
                      <div className="text-white">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-white/90">
                          {sector.title}
                        </h3>
                        <p className="text-white/70 group-hover:text-white/80">
                          {sector.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white text-lg">No job sectors available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMarketplace;
