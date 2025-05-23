import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FeaturedPost from "../components/UI/FeaturedPost.jsx";
import Article from "../components/UI/Article.jsx";
import AddArticle from "../components/UI/AddArticle.jsx";

import { BookOpen, Loader, Search, Filter } from "lucide-react";
import axios from "axios";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";
import { blogApiURL } from "../services/api.js";
import { toast } from "sonner";

const Blog = () => {
  const { user } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", success: false });

  // fetch Articles
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(blogApiURL, {
        headers: {
          Authorization: "Bearer " + user?.token,
          "Content-Type": "application/json",
        },
      });
      setArticles(data?.data || []);
    } catch (error) {
      console.log("fetchArticles ~ error:", error);
      toast.error(
        error?.response?.data?.message || "Error while fetching data",
        { action: { label: "✖️" } }
      );
      setAlert({
        message: error?.response?.data?.message || "Error while fetching data",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "LibriTech - Blog";
    fetchArticles();
  }, []);

  // Extract unique categories - fixed to handle possible undefined values
  const categories = [
    "All",
    ...new Set(
      articles?.filter((post) => post?.category).map((post) => post.category)
    ),
  ];

  // Filter posts based on search and category - improved filtering logic
  const filteredPosts = articles?.filter((post) => {
    // Make sure we have the needed fields for proper filtering
    if (!post || !post.title || !post.excerpt) return false;

    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Featured post (first one in the filtered list marked as featured)
  const featuredPost = articles?.find((post) => post.featured);

  // Non-featured filtered posts for display in the grid
  const regularPosts = filteredPosts?.filter((post) =>
    featuredPost ? post._id !== featuredPost._id : true
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              LibriTech Blog
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Insights, updates, and stories from the world of digital libraries
              and reading
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <Loader className="animate-spin text-purple-800" />
        </div>
      ) : alert.message ? (
        <div className="text-center p-10 m-10">
          <ManagementAlert alert={alert} setAlert={setAlert} close={false} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Post - Only show if it matches current filter criteria */}
          {featuredPost &&
            (activeCategory === "All" ||
              featuredPost.category === activeCategory) &&
            (searchQuery.trim() === "" ||
              featuredPost.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              featuredPost.excerpt
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) && (
              <FeaturedPost featuredPost={featuredPost} />
            )}

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 gap-8">
              {regularPosts && regularPosts.length > 0 ? (
                regularPosts.map((post) => (
                  <Article
                    key={post._id}
                    post={post}
                    fetchArticles={fetchArticles}
                    categories={categories}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white h-fit dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-purple-600" />
                  Search Articles
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-purple-600" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={`sidebar-${category}`}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition-colors ${
                        activeCategory === category
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <span>{category}</span>
                      {activeCategory === category && (
                        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {articles?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredPosts.length} of {articles.length} articles
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AddArticle categories={categories} fetchArticles={fetchArticles} />
    </div>
  );
};

export default Blog;
