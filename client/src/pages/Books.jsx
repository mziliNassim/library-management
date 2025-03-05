import React, { useState, useEffect } from "react";
import axios from "axios";
import { livresApiURL } from "../services/api";
import {
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  Grid,
  List,
  Loader,
  AlertTriangle,
  Calendar,
  Globe,
  Users,
  Hash,
  Box,
  FileText,
  Eye,
  BookMarked,
  ArrowLeft,
  Check,
} from "lucide-react";

import BookCard from "../components/UI/BookCardDiscover";

const Books = () => {
  // State for books data
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

  // State for UI controls
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    language: "",
    author: "",
    year: "",
    availability: "",
  });

  // Fetch books data
  useEffect(() => {
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

    fetchBooks();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...books];

    // Apply search term
    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.language) {
      result = result.filter((book) => book.langue === filters.language);
    }
    if (filters.author) {
      result = result.filter((book) => book.auteur === filters.author);
    }
    if (filters.year) {
      result = result.filter(
        (book) => book.anneePublication.toString() === filters.year
      );
    }
    if (filters.availability) {
      if (filters.availability === "available") {
        result = result.filter((book) => book.quantite > 0);
      } else if (filters.availability === "notAvailable") {
        result = result.filter((book) => book.quantite === 0);
      }
    }

    setFilteredBooks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, books]);

  // Fetch book details
  const fetchBookDetails = async (id) => {
    try {
      setDetailsLoading(true);
      const response = await axios.get(`${livresApiURL}/${id}`);

      if (response.data.success) {
        setBookDetails(response.data.data.livre);
      } else {
        setError("Failed to fetch book details");
      }
    } catch (err) {
      setError("An error occurred while fetching book details");
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle book selection for borrowing
  const handleBorrowClick = (book) => {
    setSelectedBook(book);
    setShowBorrowModal(true);
  };

  // Handle book selection for returning
  const handleReturnClick = (book) => {
    setSelectedBook(book);
    setShowReturnModal(true);
  };

  // Handle book selection for viewing details
  const handleViewDetails = (book) => {
    setSelectedBook(book);
    fetchBookDetails(book._id);
    setShowDetailsModal(true);
  };

  // Handle borrowing confirmation
  const confirmBorrow = async () => {
    // In a real app, you would make an API call here
    console.log(`Borrowing book: ${selectedBook.titre}`);
    setShowBorrowModal(false);
    // Update local state to reflect changes
    const updatedBooks = books.map((book) =>
      book._id === selectedBook._id
        ? { ...book, quantite: book.quantite - 1 }
        : book
    );
    setBooks(updatedBooks);
  };

  // Handle returning confirmation
  const confirmReturn = async () => {
    // In a real app, you would make an API call here
    console.log(`Returning book: ${selectedBook.titre}`);
    setShowReturnModal(false);
    // Update local state to reflect changes
    const updatedBooks = books.map((book) =>
      book._id === selectedBook._id
        ? { ...book, quantite: book.quantite + 1 }
        : book
    );
    setBooks(updatedBooks);
  };

  // Handle filter reset
  const resetFilters = () => {
    setFilters({
      language: "",
      author: "",
      year: "",
      availability: "",
    });
    setSearchTerm("");
  };

  // Get unique filter options
  const languages = [...new Set(books.map((book) => book.langue))];
  const authors = [...new Set(books.map((book) => book.auteur))];
  const years = [...new Set(books.map((book) => book.anneePublication))].sort(
    (a, b) => b - a
  );

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container w-full md:w-10/12 mx-auto px-4 py-8">
      {/* Header and controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">
          <BookOpen className="inline-block mr-2 h-6 w-6" />
          Library Collection
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* View mode toggle */}
          <div className="flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-l-lg border ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("row")}
              className={`p-2 rounded-r-lg border ${
                viewMode === "row"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center p-2 rounded-lg border ${
              showFilters
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            }`}
          >
            <Filter className="h-5 w-5 mr-1" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Language filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={filters.language}
                onChange={(e) =>
                  setFilters({ ...filters, language: e.target.value })
                }
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Author filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={filters.author}
                onChange={(e) =>
                  setFilters({ ...filters, author: e.target.value })
                }
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>

            {/* Year filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Publication Year
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Availability
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={filters.availability}
                onChange={(e) =>
                  setFilters({ ...filters, availability: e.target.value })
                }
              >
                <option value="">All Books</option>
                <option value="available">Available</option>
                <option value="notAvailable">Not Available</option>
              </select>
            </div>

            {/* Reset filters */}
            <button
              onClick={resetFilters}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            Loading books...
          </span>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && !error && filteredBooks.length === 0 && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg mb-6">
          <div className="flex flex-col items-center justify-center py-8">
            <Layers className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-center">
              {searchTerm || Object.values(filters).some((v) => v)
                ? "Try adjusting your search terms or filters"
                : "There are no books in the library yet"}
            </p>
            {(searchTerm || Object.values(filters).some((v) => v)) && (
              <button
                onClick={resetFilters}
                className="mt-4 bg-yellow-200 dark:bg-yellow-800 px-4 py-2 rounded-lg"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Books grid/list */}
      {!loading && !error && filteredBooks.length > 0 && (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {currentBooks.map((book) => (
            <div key={book._id} className="relative group">
              <BookCard book={book} viewMode={viewMode} />

              {/* Overlay actions */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleViewDetails(book)}
                  className="p-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600"
                  title="View details"
                >
                  <Eye size={16} />
                </button>
                {book.quantite > 0 ? (
                  <button
                    onClick={() => handleBorrowClick(book)}
                    className="p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600"
                    title="Borrow book"
                  >
                    <BookMarked size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleReturnClick(book)}
                    className="p-2 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600"
                    title="Return book"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && filteredBooks.length > 0 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{indexOfFirstBook + 1}</span>{" "}
            to{" "}
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
      )}

      {/* Borrow Book Modal */}
      {showBorrowModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Borrow Book
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to borrow "
              <span className="font-semibold">{selectedBook.titre}</span>"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBorrowModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmBorrow}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Book Modal */}
      {showReturnModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Return Book
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to return "
              <span className="font-semibold">{selectedBook.titre}</span>"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmReturn}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {showDetailsModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Book Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {detailsLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader className="h-8 w-8 text-blue-500 animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Book color label */}
                  <div className="w-full md:w-1/3 aspect-[2/3] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-6xl font-black text-white/90">
                      {selectedBook.titre[0]}
                    </span>
                  </div>

                  {/* Book info */}
                  <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {selectedBook.titre}
                    </h2>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Users className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Author
                          </div>
                          <div className="text-gray-900 dark:text-gray-100">
                            {selectedBook.auteur}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <BookOpen className="h-5 w-5 mr-3 text-emerald-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Publisher
                          </div>
                          <div className="text-gray-900 dark:text-gray-100">
                            {selectedBook.editeur}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Hash className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            ISBN
                          </div>
                          <div className="text-gray-900 dark:text-gray-100">
                            {selectedBook.isbn}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-amber-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Publication Year
                          </div>
                          <div className="text-gray-900 dark:text-gray-100">
                            {selectedBook.anneePublication}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Globe className="h-5 w-5 mr-3 text-purple-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Language
                          </div>
                          <div className="text-gray-900 dark:text-gray-100">
                            {selectedBook.langue}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Box className="h-5 w-5 mr-3 text-indigo-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Availability
                          </div>
                          <div className="text-gray-900 dark:text-gray-100 flex items-center">
                            {selectedBook.quantite > 0 ? (
                              <>
                                <Check className="h-4 w-4 mr-1 text-green-500" />
                                <span>{selectedBook.quantite} available</span>
                              </>
                            ) : (
                              <span className="text-red-500">
                                Not available
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start mb-2">
                    <FileText className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Description
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedBook.description}
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Close
                  </button>
                  {selectedBook.quantite > 0 ? (
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleBorrowClick(selectedBook);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Borrow
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleReturnClick(selectedBook);
                      }}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    >
                      Return
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
