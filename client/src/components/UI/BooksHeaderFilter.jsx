import React, { useEffect, useState } from "react";
import { BookOpen, Search, Grid, List, Filter, X } from "lucide-react";

const BooksHeaderFilter = ({
  books,
  viewMode,
  sendSearchTerm,
  setViewMode,
  categories,
  setFilteredBooks,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categorie: "",
    language: "",
    author: "",
    year: "",
    availability: "",
  });

  const languages = [...new Set(books.map((book) => book.langue))];
  const authors = [...new Set(books.map((book) => book.auteur))];
  const years = [...new Set(books.map((book) => book.anneePublication))].sort(
    (a, b) => b - a
  );

  // Handle search
  const handleSearch = (e) => {
    sendSearchTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  // Handle filter reset
  const resetFilters = () => {
    setFilters({
      categorie: "",
      language: "",
      author: "",
      year: "",
      availability: "",
    });
    setSearchTerm("");
  };

  // handle filter change
  useEffect(() => {
    const filteredBooks = books.filter((book) => {
      return (
        // search term
        book.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        // category
        (filters.categorie === "" || book.categorie === filters.categorie) &&
        // language
        (filters.language === "" || book.langue === filters.language) &&
        // author
        (filters.author === "" || book.auteur === filters.author) &&
        // year
        (filters.year === "" ||
          book.anneePublication.toString() === filters.year) &&
        // availability
        (filters.availability === "" ||
          (filters.availability === "available" && book.quantite > 0) ||
          (filters.availability === "notAvailable" && book.quantite === 0))
      );
    });
    sendSearchTerm(searchTerm);
    setFilteredBooks(filteredBooks);
  }, [searchTerm, filters, books]);

  return (
    <>
      {/* header */}
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
              onChange={handleSearch}
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
            {/* Categorie filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categorie
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={filters.categorie}
                onChange={(e) =>
                  setFilters({ ...filters, categorie: e.target.value })
                }
              >
                <>
                  <option value="">All Categories</option>
                  {categories.length &&
                    categories.map((categorie, index) => (
                      <option key={index} value={categorie.nom}>
                        {categorie.nom}
                      </option>
                    ))}
                </>
              </select>
            </div>

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
    </>
  );
};

export default BooksHeaderFilter;
