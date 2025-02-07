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
    const [isMobile, setIsMobile] = useState(false);
  
    // Check for mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = () => {
        const increment = isMobile ? 1 : 2;
        setCurrentIndex((prev) => (prev + increment) % marketplaceData.length);
    };
  
    const prevSlide = () => {
        const increment = isMobile ? 1 : 2;
        setCurrentIndex((prev) => {
            const newIndex = prev - increment;
            return newIndex < 0 ? marketplaceData.length - increment : newIndex;
        });
    };
  
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isMobile]);
  
    const visibleCards = isMobile 
        ? [marketplaceData[currentIndex]]
        : [
            marketplaceData[currentIndex],
            marketplaceData[(currentIndex + 1) % marketplaceData.length]
          ];

    return (
        <div className="w-full relative overflow-hidden bg-gradient-to-br from-primary-dark via-secondary-ultra to-primary-light">
            {/* Background Decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary-ultra/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-secondary-ultra/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-base-white space-y-6 sm:space-y-8">
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                                Explore the Marketplace
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-xl leading-relaxed">
                                Search and connect with the right applicants faster. Tell us what you are looking
                                for and we will get to work for you.
                            </p>
                        </div>
                        <Button 
                            className="group bg-base-white text-primary-dark hover:bg-primary-dark hover:text-base-white transition-all duration-300 
                                text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl w-full sm:w-auto"
                            size="lg"
                        >
                            Explore Marketplace
                            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Right Content - Enhanced Image Cards */}
                    <div className="relative mt-8 lg:mt-0">
                        <div className="flex gap-4 sm:gap-6 transition-all duration-500 ease-out">
                            {visibleCards.map((item) => (
                                <div 
                                    key={item.id}
                                    className={`relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-xl overflow-hidden transition-all duration-300 transform
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-transparent" />
                                    
                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                                        {/* Top Section */}
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                                {React.createElement(IconMap[item.icon], { 
                                                    size: isMobile ? 16 : 20,
                                                    className: "text-base-white" 
                                                })}
                                            </div>
                                            <span className="text-xs sm:text-sm font-medium bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm text-base-white">
                                                {item.jobs}
                                            </span>
                                        </div>
                                        
                                        {/* Bottom Section */}
                                        <div className="space-y-2 sm:space-y-3">
                                            <h3 className="text-lg sm:text-xl font-semibold text-base-white">{item.title}</h3>
                                            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed line-clamp-2">{item.description}</p>
                                            <Button
                                                variant="ghost"
                                                className="group text-base-white hover:bg-white/20 px-0 py-1 sm:py-2 text-sm sm:text-base"
                                            >
                                                Learn More 
                                                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-base-white/90 backdrop-blur-sm text-primary-dark hover:bg-primary-dark hover:text-base-white border-none shadow-lg"
                                onClick={prevSlide}
                            >
                                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                            </Button>
                        </div>
                        <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-base-white/90 backdrop-blur-sm text-primary-dark hover:bg-primary-dark hover:text-base-white border-none shadow-lg"
                                onClick={nextSlide}
                            >
                                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                            </Button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-8">
                            {[...Array(Math.ceil(marketplaceData.length / (isMobile ? 1 : 2)))].map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 
                                        ${Math.floor(currentIndex / (isMobile ? 1 : 2)) === index 
                                            ? 'w-6 sm:w-8 bg-base-white' 
                                            : 'w-1.5 sm:w-2 bg-base-white/40'}`}
                                    onClick={() => setCurrentIndex(index * (isMobile ? 1 : 2))}
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