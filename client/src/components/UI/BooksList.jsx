import React from "react";
import BookCard from "./BookCardDiscover";
import { Link } from "react-router-dom";
import { Eye, BookMarked } from "lucide-react";

const BooksList = ({ books, viewMode }) => {
  const handleBorrowClick = (book) => {
    window.alert(
      `Borrowed book: ${book.titre} \n this feature is not implemented yet`
    );
  };
  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {books.map((book) => (
        <div key={book._id} className="relative group">
          <BookCard book={book} viewMode={viewMode} />

          {/* Overlay actions */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/discover/books/${book._id}`}
              className="p-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600"
              title="View details"
            >
              <Eye size={16} />
            </Link>

            {book.quantite > 0 ? (
              <button
                onClick={() => handleBorrowClick(book)}
                className="p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600"
                title="Borrow book"
              >
                <BookMarked size={16} />
              </button>
            ) : (
              <div
                className="p-2 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600"
                title="Not available"
              >
                Not available
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
