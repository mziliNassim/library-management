import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Book,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Hash,
  Loader,
  Printer,
  User,
  Globe,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const DEFAULT_BOOK_COVER =
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=240&h=320";

// Book metadata component that only shows fields in the data structure
const BookMetadata = ({ book }) => {
  const metadata = [
    { icon: <User size={16} />, label: "Author", value: book?.auteur },
    { icon: <Printer size={16} />, label: "Publisher", value: book?.editeur },
    {
      icon: <Calendar size={16} />,
      label: "Published",
      value: book?.anneePublication,
    },
    { icon: <Hash size={16} />, label: "ISBN", value: book?.isbn },
    { icon: <BookOpen size={16} />, label: "Language", value: book?.langue },
    { icon: <Clock size={16} />, label: "Category", value: book?.categorie },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {metadata.map(
        (item, index) =>
          item.value && (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800/50 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
            >
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                {item.icon}
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                  {item.label}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

// Book cover component
const BookCover = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="md:col-span-4 lg:col-span-3">
      <div className="relative max-w-xs mx-auto md:mx-0 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-4">
        <div
          className="aspect-[3/4] rounded-md overflow-hidden relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={DEFAULT_BOOK_COVER}
            alt={`${book?.titre || "Book"} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-transparent flex items-end justify-center pb-8 transition-opacity duration-300">
              <button className="flex items-center gap-2 text-white bg-purple-600 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                <Eye size={16} />
                <span>Preview Book</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 px-1">
          <div className="flex items-center justify-between">
            <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-xs rounded-full font-medium">
              {book?.categorie || "Unknown"}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {book?.anneePublication}
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">ISBN:</span> {book?.isbn || "N/A"}
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
              <span>{book?.quantite || 0}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Similar books section
const BookCard = ({ book }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group cursor-pointer">
    <div className="relative overflow-hidden aspect-[3/4] w-full">
      <img
        src={DEFAULT_BOOK_COVER}
        alt={book?.titre}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center">
            <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-full transition-colors duration-300 flex items-center">
              <Eye size={12} className="mr-1" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="p-3">
      <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1 text-sm">
        {book?.titre}
      </h3>
      <p className="text-xs text-purple-600 dark:text-purple-400 mb-2 line-clamp-1">
        by {book?.auteur}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {book?.anneePublication}
        </span>
        <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
          {book?.langue}
        </span>
      </div>
    </div>
  </div>
);

const SimilarBooksSection = ({ books }) => (
  <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-6">
      <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center">
        <BookOpen className="mr-2" size={20} />
        <span>Similar Books</span>
      </h2>
      <div className="flex-grow h-0.5 bg-gray-200 dark:bg-gray-700"></div>
      <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center">
        View all
        <ChevronRight size={16} />
      </button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  </div>
);

const BooksDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarBooks, setSimilarBooks] = useState([]);

  // Example similar books data (strictly following the format)
  const booksData = [
    {
      _id: "67ca1bcb3b3eab9b3233efb5",
      isbn: "978-0-14-118739-6",
      titre: "The Da Vinci Code",
      auteur: "Dan Brown",
      editeur: "Doubleday",
      langue: "English",
      description: "A mystery thriller about a conspiracy.",
      quantite: 17,
      anneePublication: 2003,
      categorie: "Mystery",
    },
    {
      _id: "67ca1bcb3b3eab9b3233efb6",
      isbn: "978-0-14-118739-6",
      titre: "The Alchemist",
      auteur: "Paulo Coelho",
      editeur: "HarperCollins",
      langue: "English",
      description: "A novel about following your dreams.",
      quantite: 19,
      anneePublication: 1988,
      categorie: "Fiction",
    },
    {
      _id: "67ca1bcb3b3eab9b3233efb9",
      isbn: "978-0-14-118739-6",
      titre: "The Kite Runner",
      auteur: "Khaled Hosseini",
      editeur: "Riverhead Books",
      langue: "English",
      description: "A novel about friendship and redemption.",
      quantite: 13,
      anneePublication: 2003,
      categorie: "Fiction",
    },
    {
      _id: "67ca1bcb3b3eab9b3233efbd",
      isbn: "978-0-14-118739-6",
      titre: "The Shining",
      auteur: "Stephen King",
      editeur: "Doubleday",
      langue: "English",
      description: "A horror novel about a haunted hotel.",
      quantite: 10,
      anneePublication: 1977,
      categorie: "Thriller",
    },
    {
      _id: "67ca1bcb3b3eab9b3233efbe",
      isbn: "978-0-14-118739-6",
      titre: "Project Hail Mary",
      auteur: "Andy Weir",
      editeur: "Ballantine Books",
      langue: "English",
      description: "A sci-fi novel about an astronaut.",
      quantite: 8,
      anneePublication: 2021,
      categorie: "Science Fiction",
    },
  ];

  // Fetch book details
  useEffect(() => {
    setIsLoading(true);

    // Simulating API fetch with timeout
    setTimeout(() => {
      setBook({
        _id: "67ca1bcb3b3eab9b3233efb6",
        isbn: "978-0-14-118739-6",
        titre: "The Alchemist",
        auteur: "Paulo Coelho",
        editeur: "HarperCollins",
        langue: "English",
        description: "A novel about following your dreams.",
        quantite: 19,
        anneePublication: 1988,
        categorie: "Fiction",
      });
      setSimilarBooks(booksData);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleLoanBook = () => {
    // Loan book functionality would go here
    console.log("Loaning book:", book?.titre);
  };

  return (
    <div className="container min-h-screen w-full sm:w-11/12 md:10/12 mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 text-purple-500 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-12 gap-8 items-start mb-8">
              <BookCover book={book} />

              <div className="md:col-span-8 lg:col-span-9 space-y-6">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                    {book?.titre}
                  </h1>

                  <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">
                    by {book?.auteur}
                  </p>
                </div>

                <BookMetadata book={book} />

                <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    About this book
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {book?.description || "No description available."}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleLoanBook}
                      disabled={book?.quantite <= 0}
                      className={`flex-1 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
                        book?.quantite <= 0
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-purple-600 hover:bg-purple-700 active:scale-95 text-white cursor-pointer shadow-md hover:shadow-lg"
                      }`}
                    >
                      <Book className="mr-2" size={18} />
                      {book?.quantite <= 0
                        ? "Unavailable"
                        : `Loan This Book (${book?.quantite} available)`}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <SimilarBooksSection books={similarBooks} />
          </>
        )}
      </main>
    </div>
  );
};

export default BooksDetails;
