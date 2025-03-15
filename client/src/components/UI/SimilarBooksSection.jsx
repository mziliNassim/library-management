import { BookOpen, ChevronRight } from "lucide-react";
import React from "react";
import BookCardDiscover from "./BookCardDiscover";
import { Link } from "react-router-dom";

const SimilarBooksSection = ({ books }) => {
  return (
    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center">
          <BookOpen className="mr-2" size={20} />
          <span>Similar Books</span>
        </h2>
        <div className="flex-grow h-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <Link
          to="/discover/books"
          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center"
        >
          View all
          <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCardDiscover book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
};

export default SimilarBooksSection;
