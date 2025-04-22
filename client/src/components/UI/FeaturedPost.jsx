import React from "react";
import { Calendar, User, Tag, Clock, ChevronRight } from "lucide-react";

const FeaturedPost = ({ featuredPost }) => {
  return (
    <div className="mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-64 md:h-full w-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center mb-3">
              <Tag className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {featuredPost.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {featuredPost.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center mb-6">
              <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
                {featuredPost.author}
              </span>
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
                {featuredPost.date}
              </span>
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {featuredPost.readTime}
              </span>
            </div>
            <a
              href={`/blog/${featuredPost.id}`}
              className="inline-flex items-center font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              Read Full Article
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
