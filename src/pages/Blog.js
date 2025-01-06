import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import globalHand from "../assets/images/GlobalHand.png";
import { createClient } from "contentful";

const client = createClient({
  space: "3ikdvr3o8eml",
  environment: "master",
  accessToken: "MGz9B9EysJ2qBHbcbSAPQ6GCCMrs1CN-y0S1yHhBNO0",
});

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pinnedPost, setPinnedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const postsPerPage = 6; // Number of posts per page

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await client.getEntries({ content_type: "giverNews" });
        const posts = response.items.map((item) => ({
          id: item.sys.id,
          date: new Date(item.sys.createdAt).toLocaleDateString(),
          title: item.fields.header || "No Title",
          content: item.fields.description || "No Description",
          image: item.fields.banner?.fields?.file?.url || globalHand,
          facebookLink:
            item.fields.facebookLink ||
            "https://www.facebook.com/profile.php?id=61567122001523",
          pin: item.fields.category && item.fields.category.pin === true,
        }));
        const pinned = posts.find((post) => post.pin); // Find the pinned post
        const otherPosts = posts.filter((post) => !post.pin); // Filter out the rest of the posts

        setPinnedPost(pinned);
        setBlogPosts(otherPosts); // Set only non-pinned posts for pagination
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <motion.h1
        variants={fadeIn}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-4xl font-bold text-center text-[#517008] mb-12 mt-6"
      >
        Loading...
      </motion.h1>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 mt-4"
    >
      {/* Page Title */}
      <motion.h1
        variants={fadeIn}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-4xl font-bold text-center text-[#517008] mb-12"
      >
        News & Events
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pin Post */}
        {pinnedPost && (
          <motion.div
            variants={fadeIn}
            transition={{ duration: 1, delay: 0.6 }}
            className="lg:col-span-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col lg:flex-row mb-12"
          >
            <img
              src={pinnedPost.image}
              alt="Pinned Blog visual"
              className="lg:w-1/2 h-64 sm:h-96 object-cover"
            />
            <div className="p-6 flex flex-col justify-center lg:w-1/2">
              <p className="text-sm text-gray-500">{pinnedPost.date}</p>
              <h2 className="text-3xl font-semibold text-[#517008] mt-2">
                {pinnedPost.title}
              </h2>
              <p className="text-gray-700 mt-4 line-clamp-6">
                {pinnedPost.content}
              </p>
              <a
                className="text-[#517008] font-medium hover:underline justify-self-end mt-2 block text-right"
                href={pinnedPost.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                อ่านต่อ {"->"}
              </a>
            </div>
          </motion.div>
        )}
        {/* Blog Posts */}
        {currentPosts.map((post, index) => (
          <a href={post.facebookLink} target="_blank" rel="noopener noreferrer">
            <motion.div
              key={post.id}
              variants={fadeIn}
              transition={{ duration: 1, delay: 0.6 + index * 0.2 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={post.image}
                alt="Blog visual"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500">{post.date}</p>
                <h2 className="text-xl font-semibold text-[#517008] mt-2 line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {post.content}
                </p>
                <a
                  className="text-[#517008] font-medium hover:underline justify-self-end mt-2 block text-right"
                  href={post.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  อ่านต่อ {"->"}
                </a>
              </div>
            </motion.div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(blogPosts.length / postsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-[#517008] text-white"
                  : "bg-gray-200 text-[#517008]"
              } rounded-md hover:bg-[#426107]`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
