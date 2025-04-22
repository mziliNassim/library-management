import React from "react";
import { User, Tag, Clock, ChevronRight } from "lucide-react";

const Article = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1 hover:shadow-xl">
      <img
        src={post.image}
        alt={post.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Tag className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {post.author}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {post.readTime}
            </span>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
          <a
            href={`/blog/${post.id}`}
            className="inline-flex items-center font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
          >
            Read Article
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Article;
