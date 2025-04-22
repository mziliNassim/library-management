import React, { useState } from "react";
import BookCard from "./BookCardDiscover";

const BooksList = ({ books, viewMode, fetchBooks, setAlert }) => {
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
          <BookCard
            book={book}
            viewMode={viewMode}
            fetchBooks={fetchBooks}
            setAlert={setAlert}
          />
        </div>
      ))}
    </div>
  );
};

export default BooksList;
