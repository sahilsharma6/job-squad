import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const SlidingBanner = ({
    title,
    subtitle,
    items,
    isVerticalCard = false
}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth < 640) { // sm
                setItemsPerView(1);
            } else if (window.innerWidth < 768) { // md
                setItemsPerView(2);
            } else if (window.innerWidth < 1024) { // lg
                setItemsPerView(3);
            } else {
                setItemsPerView(4);
            }
        };

        // Initial setup
        updateItemsPerView();

        // Add event listener
        window.addEventListener('resize', updateItemsPerView);

        // Cleanup
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    // Reset startIndex when itemsPerView changes
    useEffect(() => {
        setStartIndex(0);
    }, [itemsPerView]);

    const maxIndex = Math.max(0, items.length - itemsPerView);
    const canSlidePrev = startIndex > 0;
    const canSlideNext = startIndex < maxIndex;

    const handlePrev = () => {
        if (canSlidePrev) {
            setStartIndex(prev => Math.max(0, prev - itemsPerView));
        }
    };

    const handleNext = () => {
        if (canSlideNext) {
            setStartIndex(prev => Math.min(maxIndex, prev + itemsPerView));
        }
    };

    const VerticalCard = ({ item }) => (
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border cursor-pointer group">
            <CardContent className="py-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="flex-shrink-0">
                        {item.icon && (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-ultra/10 rounded-xl flex items-center justify-center group-hover:bg-blue-ultra/20 transition-colors duration-300">
                                <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium text-blue-black text-sm sm:text-base tracking-tight">
                                {item.title}
                            </h3>
                            <ArrowRight className="w-4 h-4 text-blue-ultra opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                        <p className="text-xs sm:text-sm text-blue-ultra font-medium">
                            {item.subtitle}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const HorizontalCard = ({ item }) => (
        <Card className="h-full hover:shadow-lg transition-shadow bg-white hover:bg-blue-ultra/10 cursor-pointer">
            <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col text-left gap-2">
                    <div>
                        <h3 className="font-medium text-sm sm:text-base text-blue-black flex items-center justify-between gap-3">
                            {item.title} 
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </h3> 
                        <p className="text-xs text-grey-muted mt-1">{item.subtitle}</p>
                    </div>
                    {Array.isArray(item.icon) ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
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
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                            {item.icon}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl text-gray-900 mb-1 sm:mb-2 font-ubuntu font-bold">{title}</h2>
                <p className="text-xs sm:text-sm text-grey-muted lowercase">{subtitle}</p>
            </div>

            <div className="relative pt-4 sm:pt-6">
                <div className="flex items-center">
                    <button
                        onClick={handlePrev}
                        className={`p-1 sm:p-2 rounded-full mr-1 sm:mr-2 ${
                            canSlidePrev
                                ? 'hover:bg-gray-100 bg-blue-ultra/20'
                                : 'cursor-not-allowed text-grey-muted'
                        }`}
                        disabled={!canSlidePrev}
                    >
                        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>

                    <div className="flex-1 overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-2 sm:gap-4"
                            style={{ transform: `translateX(-${startIndex * (100 / itemsPerView)}%)` }}
                        >
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ width: `${100 / itemsPerView}%` }}
                                    className="flex-none"
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
                        className={`p-1 sm:p-2 rounded-full ml-1 sm:ml-2 ${
                            canSlideNext
                                ? 'hover:bg-gray-100 bg-blue-ultra/20'
                                : 'cursor-not-allowed text-grey-muted'
                        }`}
                        disabled={!canSlideNext}
                    >
                        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlidingBanner;