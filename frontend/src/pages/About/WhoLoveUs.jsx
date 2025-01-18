import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const WhoLoveUs = () => {
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

  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    speed: 500,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-blue-100 py-16 px-8">
      <h3 className="text-blue-500 text-lg text-center mb-4">
        Company Feedbacks
      </h3>

      <h2 className="text-4xl font-bold text-center mb-12">
        People Who Already Love Us
      </h2>

      <div className="max-w-6xl w-full mx-auto ">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-md rounded-md p-6 h-[250px]  flex flex-col justify-between mx-10 px-8"
            >
              <p className="text-gray-600 mb-4 flex-grow">
                {truncateText(testimonial.feedback, 30)}
              </p>

              <div className="border-t border-gray-300 my-4"></div>

              <div className="flex flex-col items-start">
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
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default WhoLoveUs;
