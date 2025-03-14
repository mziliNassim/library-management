import React, { useEffect, useMemo, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import BookCard from "../components/UI/BookCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

import { Search, Filter, X, Plus, Grid, List, Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { categoriesApiURL, livresApiURL } from "../services/api.js";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";
import BooksPagination from "../components/UI/BooksPagination.jsx"; // Import the pagination component

const AdminManageBooks = () => {
  const { user } = useSelector((state) => state.user);

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [langueFilter, setLangueFilter] = useState("");
  const [disponibleFilter, setDisponibleFilter] = useState(""); // available, notAvailable
  const [viewMode, setViewMode] = useState("grid");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(2);

  const languages = [...new Set(books.map((book) => book.langue))];

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch Books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(livresApiURL);
      setBooks(response.data?.data?.livres);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error fetching books!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoriesApiURL);
      setCategories(response.data?.data?.categories);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error fetching categories!",
        success: false,
      });
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  // Filtered Books
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.titre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter
      ? book.categorie === categoryFilter
      : true;

    const matchesLangue = langueFilter ? book.langue === langueFilter : true;

    // availability
    const matchesDisponible =
      disponibleFilter === "" ||
      (disponibleFilter === "available" && book.quantite > 0) ||
      (disponibleFilter === "notAvailable" && book.quantite === 0);

    return (
      matchesSearch && matchesCategory && matchesLangue && matchesDisponible
    );
  });

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setLangueFilter("");
    setDisponibleFilter("");
    setCurrentPage(1); // Reset to the first page when filters are reset
  };

  useEffect(() => {
    if (!loading && filteredBooks.length === 0) {
      if (alert.message !== "No books found!") {
        setAlert({ message: "No books found!", success: false });
      }
    } else if (alert.message !== "") {
      setAlert({ message: "", success: false });
    }
  }, [filteredBooks, loading, alert.message]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 bg-white dark:bg-gray-800  rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Books Management
                </h2>
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg ${
                        viewMode === "grid"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("row")}
                      className={`p-2 rounded-lg ${
                        viewMode === "row"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>

                  {/* Add Book Button */}
                  <Link
                    to="/admin/manage-books/create"
                    className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus size={20} className="mr-2" />
                    Add New Book
                  </Link>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="p-6 bg-gray-100 dark:bg-gray-700">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Search Input */}
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search by title"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full pl-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.nom}>
                          {category.nom}
                        </option>
                      ))}
                    </select>
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Language Filter */}
                  <div className="relative">
                    <select
                      value={langueFilter}
                      onChange={(e) => setLangueFilter(e.target.value)}
                      className="w-full pl-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Languages</option>
                      {languages &&
                        languages.map((language, index) => (
                          <option key={index} value={language}>
                            {language}
                          </option>
                        ))}
                    </select>
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Disponible Filter */}
                  <div className="relative">
                    <select
                      value={disponibleFilter}
                      onChange={(e) => setDisponibleFilter(e.target.value)}
                      className="w-full pl-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All</option>
                      <option value="available">Available</option>
                      <option value="notAvailable">Unavailable</option>
                    </select>
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Reset Filters */}
                  {(searchTerm ||
                    categoryFilter ||
                    langueFilter ||
                    disponibleFilter) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Books List */}
              <div className="p-6 max-h-screen overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                  </div>
                ) : (
                  <>
                    {alert.message && (
                      <ManagementAlert alert={alert} setAlert={setAlert} />
                    )}

                    {filteredBooks.length > 0 && (
                      <>
                        <div
                          className={`${
                            viewMode === "grid"
                              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                              : "space-y-6"
                          }`}
                        >
                          {currentBooks.map((book) => (
                            <BookCard
                              key={book._id}
                              book={book}
                              setAlert={setAlert}
                              fetchBooks={fetchBooks}
                            />
                          ))}
                        </div>

                        {/* Pagination */}
                        <BooksPagination
                          filteredBooks={filteredBooks}
                          indexOfFirstBook={indexOfFirstBook}
                          indexOfLastBook={indexOfLastBook}
                          booksPerPage={booksPerPage}
                          setCurrentPage={setCurrentPage}
                          currentPage={currentPage}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageBooks;
