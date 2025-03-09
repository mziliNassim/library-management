import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const BooksPagination = ({
  filteredBooks,
  indexOfFirstBook,
  indexOfLastBook,
  booksPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Showing <span className="font-medium">{indexOfFirstBook + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(indexOfLastBook, filteredBooks.length)}
        </span>{" "}
        of <span className="font-medium">{filteredBooks.length}</span> books
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-md border ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
          // Show pages around current page
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }

          if (pageNumber <= totalPages) {
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`w-8 h-8 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md border ${
            currentPage === totalPages
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BooksPagination;
