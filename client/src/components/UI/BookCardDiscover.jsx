import React from "react";
import {
  BookOpen,
  Calendar,
  Hash,
  Users,
  Globe,
  Box,
  FileText,
  Tag,
} from "lucide-react";

const BookCardDiscover = ({ book, viewMode = "grid" }) => {
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
            {/* Added category badge */}
            <div className="flex items-center text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
              <Tag className="h-3 w-3 mr-1" />
              {book.categorie}
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
        {/* ISBN in grid view */}
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
  );
};

export default BookCardDiscover;
