import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const WhoLoveUs = () => {
  const [xPosition, setXPosition] = useState(0);
  const [scrolling, setScrolling] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Andrew D. Smith",
      position: "Manager",
      company: "Posthill",
      feedback:
        "According to the council supply chain professionals the council logistics management logistics is the process of planning, implementing & controlling for procedures and solving the life projects all over boundaries and more people say.",
      profileIcon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCiQSSoCfHsEuLIcJA7R8TuWfJFl02NABEPQ&s",
    },
    {
      id: 2,
      name: "John Doe",
      position: "CEO",
      company: "TechCorp",
      feedback:
        "This is an amazing platform that has helped us streamline our processes. Highly recommend it to others!",
      profileIcon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCiQSSoCfHsEuLIcJA7R8TuWfJFl02NABEPQ&s",
    },
    {
      id: 3,
      name: "Jane Doe",
      position: "Developer",
      company: "WebTech",
      feedback:
        "The user interface design is fantastic, and we’ve seen great results since using this platform. Highly recommended.",
      profileIcon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCiQSSoCfHsEuLIcJA7R8TuWfJFl02NABEPQ&s",
    },
    {
      id: 4,
      name: "Alice M. Parker",
      position: "Designer",
      company: "CreativeWorks",
      feedback:
        "Efficient and easy to use. It's been a game changer for our team. The team has been very responsive to our needs.",
      profileIcon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCiQSSoCfHsEuLIcJA7R8TuWfJFl02NABEPQ&s",
    },
  ];

  const cardWidth = 320; 
  const totalWidth = cardWidth * testimonials.length;
  
  const handleHoverStart = () => {
    setScrolling(false);
  };

  const handleHoverEnd = () => {
    setScrolling(true);
  };

  useEffect(() => {
    if (scrolling) {
      const interval = setInterval(() => {
        setXPosition((prev) => {
          const newPos = prev - 1;
      
          if (newPos <= -totalWidth) {
            return 0;
          }
          return newPos;
        });
      }, 16);

      return () => clearInterval(interval);
    }
  }, [scrolling]);

  return (
    <div className="bg-primary-100 py-16 px-8">
      <h3 className="text-primary-500 text-lg text-center mb-4">Company Feedbacks</h3>

      <h2 className="text-4xl font-bold text-center mb-12">People Who Already Love Us</h2>
 
      <div className="max-w-6xl   w-full mx-auto overflow-hidden relative">
        <motion.div
          className="flex shadow-lg gap-6"
          style={{
            transform: `translateX(${xPosition}px)`,
          }}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          {[...testimonials, ...testimonials , ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl p-6 flex-shrink-0 w-80 lg:w-[30rem]"
            >
              <p className="text-gray-600 mb-4">{truncateText(testimonial.feedback, 30)}</p>

              <div className="border-t border-gray-300 my-4"></div>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.profileIcon}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.position} @ {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhoLoveUs;
