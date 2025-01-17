import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const SlidingBanner = ({
    title,
    subtitle,
    items,
    itemsPerView = 4, // Changed to 4 to match the design
    isVerticalCard = false
}) => {
    const [startIndex, setStartIndex] = useState(0);

    // Calculate maximum index based on items length and items per view
    const maxIndex = Math.max(0, items.length - itemsPerView);
    
    const canSlidePrev = startIndex > 0;
    const canSlideNext = startIndex < maxIndex;

    const handlePrev = () => {
        if (canSlidePrev) {
            // Move by full itemsPerView amount
            setStartIndex(prev => Math.max(0, prev - itemsPerView));
        }
    };

    const handleNext = () => {
        if (canSlideNext) {
            // Move by full itemsPerView amount
            setStartIndex(prev => Math.min(maxIndex, prev + itemsPerView));
        }
    };

    const VerticalCard = ({ item }) => (
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border cursor-pointer group">
          <CardContent className="py-3">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                {item.icon && (
                  <div className="w-14 h-14 bg-blue-ultra/10 rounded-xl flex items-center justify-center group-hover:bg-blue-ultra/20 transition-colors duration-300">
                    <item.icon className="" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-blue-black text-base tracking-tight">
                    {item.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-blue-ultra opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="text-sm text-blue-ultra font-medium">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
    );

    const HorizontalCard = ({ item }) => (
        <Card className="h-6/7 hover:shadow-lg transition-shadow bg-white hover:bg-blue-ultra/10 cursor-pointer">
            <CardContent className="p-4">
                <div className="flex flex-col text-left gap-2">
                    <div>
                        <h3 className="font-medium text-base text-blue-black flex items-center justify-between gap-3">{item.title} <ArrowRight className="w-4 h-4" /></h3> 
                        <p className="text-xs text-grey-muted mt-1">{item.subtitle}</p>
                    </div>
                    {Array.isArray(item.icon) ? (
                        <div className="grid grid-cols-4 gap-1">
                            {item.icon.map((icon, index) => (
                                <div
                                    key={index}
                                    className="aspect-square flex items-center justify-center"
                                >
                                    <img
                                        src={icon}
                                        alt={`Logo ${index + 1}`}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                            {item.icon}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl text-gray-900 mb-2 font-ubuntu font-bold">{title}</h2>
                <p className="text-grey-muted lowercase text-sm">{subtitle}</p>
            </div>

            <div className="relative pt-6">
                <div className="flex items-center">
                    <button
                        onClick={handlePrev}
                        className={`p-2 rounded-full mr-2 ${canSlidePrev
                            ? 'hover:bg-gray-100 bg-blue-ultra/20'
                            : 'cursor-not-allowed text-grey-muted '
                            }`}
                        disabled={!canSlidePrev}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <div className="flex-1 overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-4"
                            style={{ transform: `translateX(-${startIndex * (100 / itemsPerView)}%)` }}
                        >
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-none w-1/4"
                                >
                                    {isVerticalCard ? (
                                        <VerticalCard item={item} />
                                    ) : (
                                        <HorizontalCard item={item} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className={`p-2 rounded-full ml-2 ${canSlideNext
                            ? 'hover:bg-gray-100 bg-blue-ultra/20'
                            : 'cursor-not-allowed text-grey-muted'
                            }`}
                        disabled={!canSlideNext}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlidingBanner;