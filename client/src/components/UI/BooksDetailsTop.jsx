import React from "react";
import {
  Book,
  BookOpen,
  Calendar,
  Clock,
  Hash,
  Printer,
  User,
  Star,
  Bookmark,
} from "lucide-react";

const BooksDetailsTop = ({ book }) => {
  const metadata = [
    { icon: <User size={18} />, label: "Author", value: book?.auteur },
    { icon: <Printer size={18} />, label: "Publisher", value: book?.editeur },
    {
      icon: <Calendar size={18} />,
      label: "Published",
      value: book?.anneePublication,
    },
    { icon: <Hash size={18} />, label: "ISBN", value: book?.isbn },
    { icon: <BookOpen size={18} />, label: "Language", value: book?.langue },
    { icon: <Clock size={18} />, label: "Category", value: book?.categorie },
  ];

  // Loan book functionality
  const handleLoanBook = () => {
    window.alert(
      `Loaning book : ${book?.titre} \n \n \n This functionality is on development mode`
    );
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    window.alert(
      `Adding to wishlist : ${book?.titre} \n \n \n This functionality is on development mode`
    );
  };

  return (
    <>
      {book && (
        <div className="relative  overflow-hidden p-6 ">
          <div className="flex flex-col gap-8 relative z-10">
            {/* Title Section with decorative underline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {book?.titre}
              </h1>
              <div className="relative">
                <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">
                  by {book?.auteur}
                </p>
                <div className="absolute -bottom-3 left-0 h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>

            {/* Metadata Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {metadata.map(
                (item, index) =>
                  item.value && (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-purple-100 dark:border-purple-900/20 transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                          {item.label}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Description Section */}
            <div className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100 dark:border-purple-900/20">
              <div className="flex items-center mb-6">
                <Star className="text-yellow-500 mr-2" size={22} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  About this book
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {book?.description ||
                  "No description available for this title."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-1 shadow-xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleLoanBook}
                    disabled={book?.quantite <= 0}
                    className={`flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      book?.quantite <= 0
                        ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white cursor-pointer shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <Book className="mr-3" size={20} />
                    {book?.quantite <= 0
                      ? "Unavailable"
                      : `Loan This Book (${book?.quantite} available)`}
                  </button>

                  <button
                    onClick={handleAddToWishlist}
                    className="flex-none font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 dark:border-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 active:scale-95"
                  >
                    <Bookmark className="mr-2" size={20} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksDetailsTop;
