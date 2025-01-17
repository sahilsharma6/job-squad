import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Code, DollarSign, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { marketplaceData } from '../Home-Data';

const IconMap = {
  Code: Code,
  DollarSign: DollarSign,
  Users: Users,
  TrendingUp: TrendingUp
};

const MarketplaceBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(null);
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 2) % marketplaceData.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prev) => {
        const newIndex = prev - 2;
        return newIndex < 0 ? marketplaceData.length - 2 : newIndex;
      });
    };
  
    useEffect(() => {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }, []);
  
    const visibleCards = [
      marketplaceData[currentIndex],
      marketplaceData[(currentIndex + 1) % marketplaceData.length]
    ];

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-blue-dark via-green-ultra to-blue-light">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-ultra/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-ultra/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-base-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                Explore the Marketplace
              </h1>
              <p className="text-xl text-gray-200 max-w-xl leading-relaxed">
                Search and connect with the right candidates faster. Tell us what you are looking
                for and we will get to work for you.
              </p>
            </div>
            <Button 
              className="group bg-base-white text-blue-dark hover:bg-blue-dark hover:text-base-white transition-all duration-300 text-lg px-8 py-6 rounded-xl"
              size="lg"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Content - Enhanced Image Cards */}
          <div className="relative">
            <div className="flex gap-6 transition-all duration-500 ease-out">
            {visibleCards.map((item) => (
                <div 
                  key={item.id}
                  className={`relative w-full h-[400px] rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105
                    ${isHovering === item.id ? 'scale-105' : 'scale-100'}`}
                  onMouseEnter={() => setIsHovering(item.id)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  {/* Background Image */}
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/90 via-blue-dark/50 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        {React.createElement(IconMap[item.icon], { 
                          size: 20,
                          className: "text-base-white" 
                        })}
                      </div>
                      <span className="text-sm font-medium bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm text-base-white">
                        {item.jobs}
                      </span>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-base-white">{item.title}</h3>
                      <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                      <Button
                        variant="ghost"
                        className="group text-base-white hover:bg-white/20 px-0 py-2"
                      >
                        Learn More 
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-base-white/90 backdrop-blur-sm text-blue-dark hover:bg-blue-dark hover:text-base-white border-none shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-base-white/90 backdrop-blur-sm text-blue-dark hover:bg-blue-dark hover:text-base-white border-none shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(Math.ceil(marketplaceData.length / 2))].map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${Math.floor(currentIndex / 2) === index ? 'w-8 bg-base-white' : 'bg-base-white/40'}`}
                  onClick={() => setCurrentIndex(index * 2)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBanner;