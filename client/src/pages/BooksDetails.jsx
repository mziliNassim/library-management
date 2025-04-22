import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BooksDetailsTop from "../components/UI/BooksDetailsTop";
import ManagementAlert from "../components/UI/ManagementAlert";
import SimilarBooksSection from "../components/UI/SimilarBooksSection";
import axios from "axios";
import { livresApiURL } from "../services/api";
import { Loader } from "lucide-react";
import PopupAlert from "../components/UI/PopupAlert";

const BooksDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [alert, setAlert] = useState({ message: "", success: false });

  // Fetch book details
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        // Fetch all books
        const response = await axios.get(livresApiURL);
        const resBooks = response.data?.data?.livres || [];

        // Find current book details
        const currentBook = resBooks.find((book) => book._id === id);
        setBook(currentBook);

        // Set similar books by author or category (only the first 4)
        if (currentBook) {
          const similar = resBooks
            .filter(
              (item) =>
                item._id !== id &&
                (item.auteur === currentBook.auteur ||
                  item.categorie === currentBook.categorie)
            )
            .slice(0, 4); // Only take the first 4 similar books
          setSimilarBooks(similar);
        }
      } catch (error) {
        setAlert({
          message: error?.response?.data?.message || "Failed to fetch books",
          success: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  return (
    <div className="container min-h-screen w-full sm:w-11/12 md:w-10/12 mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-purple-500 animate-spin" />
        </div>
      ) : (
        <>
          {alert.message && <PopupAlert alert={alert} setAlert={setAlert} />}

          {book ? (
            <>
              <BooksDetailsTop book={book} setAlert={setAlert} />

              {similarBooks.length > 0 && (
                <SimilarBooksSection books={similarBooks} />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <div className="w-24 h-24 mb-6 text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Book Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
                We couldn't find the book you're looking for. It might have been
                removed or the URL might be incorrect.
              </p>
              <Link
                to="/discover"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Explore Our Collection
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BooksDetails;
