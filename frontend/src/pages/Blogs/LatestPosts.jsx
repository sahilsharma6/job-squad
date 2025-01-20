import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const LatestPosts = () => {
  const posts = [
    {
      id: 1,
      title: "21 Job Interview Tips: How To Make a Great Impression",
      category: "News",
      author: "Azumi Rose",
      authorImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
      date: "25 April 2022",
      timeToRead: "8 mins to read",
      image:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },
    {
      id: 2,
      title: "Email Examples: How To Respond to Employer Interview Requests",
      category: "Events",
      author: "Azumi Rose",
      authorImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
      date: "25 April 2022",
      timeToRead: "8 mins to read",
      image:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },
    {
      id: 3,
      title: "10 Ways to Avoid a Referee Disaster Zone",
      category: "Tips",
      author: "Steven",
      authorImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
      date: "23 Sep",
      timeToRead: "5 mins to read",
      image:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },
    {
      id: 4,
      title: "How To Set Work-Life Boundaries From Any Location",
      category: "Guides",
      author: "Merias",
      authorImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
      date: "14 Sep",
      timeToRead: "6 mins to read",
      image:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },  {
      id: 5,
      title: "How To Set Work-Life Boundaries From Any Location",
      category: "Guides",
      author: "Merias",
      authorImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
      date: "14 Sep",
      timeToRead: "6 mins to read",
      image:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },
  ];

  const trending = [
    {
      id: 1,
      title: "How to get better agents in New York, USA",
      author: "Sugar Rosie",
      authorImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
      date: "15 Sep",
      postImage:
        "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },
    {
      id: 2,
      title: "How to get better agents in New York, USA",
      author: "Sugar Rosie",
      authorImage:  "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png", 
      date: "15 Sep",
      postImage:  "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    }, {
      id: 3,
      title: "How to get better agents in New York, USA",
      author: "Sugar Rosie",
      authorImage:  "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png", 
      date: "15 Sep",
      postImage:  "https://postaresume.co.in/blog/wp-content/uploads/2024/02/Five-Tips-Interview-Post-by-POST-A-RESUME-vipul-M-mali-vipul-the-wonderful.png",
    },
   
  ];

  const postsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-10 md:px-12
       lg:px-20 mx-auto max-w-7xl"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-left">Latest Posts</h2>
        <p className="text-gray-600 text-left">Don't miss the trending news</p>
      </div>


      <div className="flex flex-col lg:flex-row gap-2 justify-center  ">
        {/* Blog Posts */}
        <div className="lg:w-[75%] w-full  grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {currentPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white  rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="block text-blue-ultra font-bold text-sm mb-2">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {post.author} • {post.date} • {post.timeToRead}
                </p>
                <div className="flex items-center">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">{post.author}</span>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* Trending Now Sidebar */}
        <div className="w-full lg:w-[40%]  p-6 rounded-lg  ">
          <div className="mb-10 flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button className="p-4 bg-blue-light text-white rounded-r-lg">
              <Search size={20} />
            </button>
          </div>
          <div  className="border p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Trending Now</h3>
          <ul>
            {trending.map((item) => (
              <Link key={item.id} to={`/blog/${item.id}`}>
              <li key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.postImage}
                  alt={item.title}
                  className="h-12 rounded-lg mr-4"
                />
                <div>
                  <p to="#" className="font-medium">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <img
                      src={item.authorImage}
                      alt={item.author}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    {item.author} • {item.date}
                  </p>
                </div>
              </li>
              </Link>
            ))}
          </ul>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <Button
          variant="ghost"
          className="mr-2"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </Button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          className="ml-2"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </motion.div>
  );
};

export default LatestPosts;
