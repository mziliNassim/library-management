import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BooksDetailsTop from "../components/UI/BooksDetailsTop";
import ManagementAlert from "../components/UI/ManagementAlert";
import SimilarBooksSection from "../components/UI/SimilarBooksSection";
import axios from "axios";
import { livresApiURL } from "../services/api";
import { Loader } from "lucide-react";

const BooksDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [alert, setAlert] = useState({ message: "", success: false });

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
          {alert.message && (
            <ManagementAlert alert={alert} setAlert={setAlert} />
          )}

          {book ? (
            <>
              <BooksDetailsTop book={book} />

              {similarBooks.length > 0 && (
                <SimilarBooksSection books={similarBooks} />
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Book not found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BooksDetails;
