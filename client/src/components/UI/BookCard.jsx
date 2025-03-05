import React from "react";
import {
  Edit,
  Trash,
  Eye,
  BookOpen,
  Calendar,
  Hash,
  Users,
  Globe,
  Box,
  FileText,
} from "lucide-react";

const BookCard = ({ book, viewMode }) => {
  // Get a color based on the first letter of the book title
  const getColorClass = (letter) => {
    const colors = [
      "from-purple-500 to-indigo-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-red-500 to-rose-600",
      "from-pink-500 to-fuchsia-600",
    ];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  // Get age category based on publication year
  const getAgeCategory = (year) => {
    const age = 2025 - year;
    if (age < 10) return "Recent";
    if (age < 30) return "Modern";
    if (age < 70) return "Classic";
    return "Vintage";
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl
        ${
          viewMode === "row"
            ? "flex items-stretch h-56"
            : "flex flex-col h-full"
        }`}
    >
      {/* Book cover/spine */}
      <div
        className={`relative bg-gradient-to-br ${getColorClass(book.titre[0])}
          ${viewMode === "row" ? "w-36 flex-shrink-0" : "h-40"}`}
      >
        <div className="absolute inset-0 opacity-20 bg-grid-white/10"></div>
        <div
          className={`flex items-center justify-center h-full p-4 ${
            viewMode === "row" ? "flex-col" : ""
          }`}
        >
          <span className="text-4xl font-black text-white/90">
            {book.titre[0]}
          </span>
          <div className="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-bold">
            {getAgeCategory(book.anneePublication)}
          </div>
        </div>
      </div>
      {/* Book details */}
      <div
        className={`flex-1 flex flex-col bg-white dark:bg-gray-800 p-5 ${
          viewMode === "row" ? "" : ""
        }`}
      >
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {book.titre}
        </h3>
        <div className="space-y-2 mb-3 flex-grow">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {book.auteur}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <BookOpen className="h-4 w-4 mr-2 text-emerald-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {book.editeur}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
              <Globe className="h-3 w-3 mr-1" />
              {book.langue}
            </div>
            <div className="flex items-center text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-full">
              <Calendar className="h-3 w-3 mr-1" />
              {book.anneePublication}
            </div>
            <div className="flex items-center text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
              <Box className="h-3 w-3 mr-1" />
              {book.quantite}
            </div>
          </div>
          {viewMode === "row" && (
            <div className="flex items-start text-sm mt-1">
              <Hash className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {book.isbn}
              </span>
            </div>
          )}

          {/* Description section - now shown in both view modes */}
          <div className="flex items-start text-sm mt-1">
            <FileText className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
            <span
              className={`text-gray-600 dark:text-gray-400 text-xs ${
                viewMode === "row" ? "line-clamp-2" : "line-clamp-3"
              }`}
            >
              {book.description}
            </span>
          </div>
        </div>
        {/* Action buttons with tooltip-style labels */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <button className="group relative p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors">
              <Eye size={16} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                View details
              </span>
            </button>
            <button className="group relative p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors">
              <Edit size={16} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Edit book
              </span>
            </button>
            <button className="group relative p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors">
              <Trash size={16} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Delete
              </span>
            </button>
          </div>
          {viewMode === "grid" && (
            <div
              className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]"
              title={book.isbn}
            >
              ISBN: {book.isbn}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
