import React, { useState, useEffect } from "react";
import axios from "axios";
import { categoriesApiURL, livresApiURL } from "../services/api";
import { Loader, AlertTriangle, Layers } from "lucide-react";

import BooksList from "../components/UI/BooksList.jsx";
import BooksHeaderFilter from "../components/UI/BooksHeaderFilter.jsx";
import BooksPagination from "../components/UI/BooksPagination.jsx";
import { useSelector } from "react-redux";

const Books = () => {
  const { user } = useSelector((state) => state.user);

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // Pagination
  const [booksPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Fetch books data
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${livresApiURL}/`);

      if (response.data.success) {
        setBooks(response.data?.data?.livres);
        setFilteredBooks(response.data.data.livres);
      } else {
        setError("Failed to fetch books");
      }
    } catch (err) {
      setError("An error occurred while fetching books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories data
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await axios.get(`${categoriesApiURL}/`);
      if (response.data.success) {
        setCategories(response.data?.data?.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [user]);

  //  Search term
  const sendSearchTerm = (term) => {
    if (!term) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => {
      return (
        book.titre.toLowerCase().includes(term.toLowerCase()) ||
        book.auteur.toLowerCase().includes(term.toLowerCase()) ||
        book.isbn.toString().includes(term) ||
        book.description.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
  };

  // smoth scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="container w-full sm:w-11/12 md:10/12 mx-auto px-4 py-8">
      {/* Header (search, veiwMode, search) */}
      {!loadingCategories && (
        <BooksHeaderFilter
          viewMode={viewMode}
          sendSearchTerm={sendSearchTerm}
          setViewMode={setViewMode}
          categories={categories}
          books={books}
          setFilteredBooks={setFilteredBooks}
        />
      )}

      {/* Books grid/list */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : error && !loading ? (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      ) : filteredBooks.length === 0 && !loading && !error ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Layers className="h-8 w-8 text-gray-500" />
          <span className="text-gray-500">No results found</span>
        </div>
      ) : (
        <>
          {/* Books grid */}
          <BooksList
            books={currentBooks}
            viewMode={viewMode}
            fetchBooks={fetchBooks}
          />
        </>
      )}

      {/* Pagination */}
      {!loading && !error && filteredBooks.length > 0 && (
        <BooksPagination
          filteredBooks={filteredBooks}
          indexOfFirstBook={indexOfFirstBook}
          indexOfLastBook={indexOfLastBook}
          booksPerPage={booksPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Books;
