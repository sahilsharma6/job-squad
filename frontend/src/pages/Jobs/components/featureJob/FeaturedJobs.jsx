import { useRef } from "react";
import { jobData } from "../../jobs-data";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JobCard } from "./JobCard";

export default function FeaturedJobs() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 420; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
            <p className="text-muted-foreground">Get the latest news, updates and tips</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {jobData.slice(0, 10).map((job) => (
            <div key={job.id} className="snap-start">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
