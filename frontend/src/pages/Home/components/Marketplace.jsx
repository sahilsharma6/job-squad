import React, { useRef, useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { Code, LineChart, Users, Megaphone, Palette, BadgeDollarSign } from "lucide-react";  

const categories = [   
  { title: "Software", jobs: "55 Jobs Available", icon: Code },   
  { title: "Finance", jobs: "35 Jobs Available", icon: LineChart },   
  { title: "Recruiting", jobs: "20 Jobs Available", icon: Users },   
  { title: "Marketing", jobs: "45 Jobs Available", icon: Megaphone },   
  { title: "Design", jobs: "30 Jobs Available", icon: Palette },   
  { title: "Sales", jobs: "25 Jobs Available", icon: BadgeDollarSign }, 
];

const ExploreMarketplace = () => { 
  const scrollContainer = useRef(null); 
  const [isLeftVisible, setIsLeftVisible] = useState(false); 
  const [isRightVisible, setIsRightVisible] = useState(true); 

  // Check the visibility of the scroll buttons
  const checkScroll = () => { 
    if (scrollContainer.current) { 
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current; 
      setIsLeftVisible(scrollLeft > 0); 
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 10); 
    } 
  };

  // Scroll container by a set amount (left or right)
  const scroll = (direction) => { 
    const container = scrollContainer.current; 
    const scrollAmount = direction === 'left' ? -container.offsetWidth / 2 : container.offsetWidth / 2; 

    container.scrollBy({ left: scrollAmount, behavior: "smooth" }); 
  };

  return ( 
    <div className="bg-blue-ultra py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ubuntu font-normal ">       
      <div className=" mx-auto flex flex-col lg:flex-row items-center gap-8 max-w-6xl">         
        {/* Text Section */}         
        <div className="text-white flex-shrink-0 lg:w-1/3 text-center lg:text-left">           
          <h2 className="text-2xl sm:text-3xl font-semibold animate-fade-in">             
            Explore the Marketplace           
          </h2>           
          <p className="mt-4 text-base sm:text-lg opacity-90 font-lato font-normal">             
            Search and connect with the right candidates faster. Tell us what you are looking for, and we will get to work for you.           
          </p>           
          <Button className="mt-6 bg-white text-blue-ultra hover:bg-blue-light hover:text-white transition-all duration-300 group">             
            Explore             
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>           
          </Button>         
        </div>          

        {/* Carousel Section */}         
        <div className="relative flex-grow lg:w-2/3 w-full">           
          {/* Navigation Buttons */}           
          {isLeftVisible && (             
            <Button               
              variant="ghost"               
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg transition-all duration-300 h-12 w-12 p-0"               
              onClick={() => scroll('left')}             
            >               
              <ChevronLeft className="h-6 w-6 text-blue-ultra" />             
            </Button>           
          )}                      

          {isRightVisible && (             
            <Button               
              variant="ghost"               
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg transition-all duration-300 h-12 w-12 p-0"               
              onClick={() => scroll('right')}             
            >               
              <ChevronRight className="h-6 w-6 text-blue-ultra" />             
            </Button>           
          )}            

          {/* Cards Container */}           
          <div             
            ref={scrollContainer}             
            className="flex gap-4 overflow-x-hidden pb-4"             
            onScroll={checkScroll}           
          >             
            {categories.map((category, index) => (               
              <div                 
                key={index}                 
                className="flex-shrink-0 w-72 sm:w-80 group cursor-pointer"                 
                style={{ animationDelay: `${index * 100}ms` }}               
              >                 
                <div className="h-64 sm:h-72 rounded-xl bg-white/10 backdrop-blur-sm p-6 transform transition-all duration-300 hover:translate-y--1 hover:shadow-xl">                   
                  <div className="h-full flex flex-col justify-between">                     
                    {/* Icon area */}                     
                    <div className="w-16 h-16 rounded-lg bg-white/20 mb-4 transform transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">                       
                      {React.createElement(category.icon, {                         
                        size: 32,                         
                        className: "text-white"                       
                      })}                     
                    </div>                                          
                    {/* Content */}                     
                    <div className="text-white">                       
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white/90">                         
                        {category.title}                       
                      </h3>                       
                      <p className="text-white/70 group-hover:text-white/80">                         
                        {category.jobs}                       
                      </p>                     
                    </div>                   
                  </div>                 
                </div>               
              </div>             
            ))}           
          </div>         
        </div>       
      </div>     
    </div>   
  ); 
};

export default ExploreMarketplace;
