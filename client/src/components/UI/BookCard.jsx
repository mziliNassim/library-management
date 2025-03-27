import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { livresApiURL } from "../../services/api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

import {
  Edit,
  Trash,
  Eye,
  BookOpen,
  Calendar,
  Hash,
  Users,
  Globe,
  Box,
  FileText,
  Tag,
  Loader,
  BookMarked,
  Heart,
} from "lucide-react";

const BookCard = ({ book, viewMode, setAlert, fetchBooks, isAdmin = true }) => {
  const { user } = useSelector((state) => state.user);

  const [actionsHoverd, setActionsHoverd] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Get a color based on the first letter of the book title
  const getColorClass = (letter) => {
    const colors = [
      "from-purple-500 to-indigo-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-red-500 to-rose-600",
      "from-pink-500 to-fuchsia-600",
    ];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  // Get age category based on publication year
  const getAgeCategory = (year) => {
    const age = 2025 - year;
    if (age < 10) return "Recent";
    if (age < 30) return "Modern";
    if (age < 70) return "Classic";
    return "Vintage";
  };

  // Delete book
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoadingDelete(true);
    try {
      const response = await axios.delete(`${livresApiURL}/${book._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setAlert({
        message: response.data?.message || "Book deleted successfully!",
        success: true,
      });
      fetchBooks();
    } catch (error) {
      console.log("handleDelete ~ error:", error);
      setAlert({
        message: error.response?.data?.message || "Error deleting book!",
        success: false,
      });
    } finally {
      setIsDeleteModalOpen(false);
      setLoadingDelete(false);
    }
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          handleDelete={handleDelete}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          loading={loadingDelete}
          type="book"
        />
      )}

      <div
        className={`relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl
        ${
          viewMode === "row"
            ? "flex items-stretch h-56"
            : "flex flex-col h-full"
        }`}
      >
        {/* Overlay actions */}
        {actionsHoverd && (
          <div className="absolute z-30 top-2 right-2 flex space-x-2 opacity-100 group-hover:opacity-100 transition-opacity">
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

            {user ? (
              <button
                className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                title="View details"
              >
                <Heart size={16} />
              </button>
            ) : (
              <button
                className="p-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600"
                title="View details"
              >
                <Heart size={16} />
              </button>
            )}
          </div>
        )}

        {/* Book cover/spine */}
        <div
          className={`relative bg-gradient-to-br ${getColorClass(book.titre[0])}
          ${viewMode === "row" ? "w-36 flex-shrink-0" : "h-40"}`}
        >
          <div className="absolute inset-0 opacity-20 bg-grid-white/10"></div>
          <div
            className={`flex items-center justify-center h-full p-4 ${
              viewMode === "row" ? "flex-col" : ""
            }`}
          >
            <span className="text-4xl font-black text-white/90">
              {book.titre[0]}
            </span>
            <div className="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-bold">
              {getAgeCategory(book.anneePublication)}
            </div>
          </div>
        </div>

        {/* Book details */}
        <div
          className={`flex-1 flex flex-col bg-white dark:bg-gray-800 p-5 ${
            viewMode === "row" ? "" : ""
          }`}
        >
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
            {book.titre}
          </h3>
          <div className="space-y-2 mb-3 flex-grow">
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {book.auteur}
              </span>
            </div>

            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {book.editeur}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                <Globe className="h-3 w-3 mr-1" />
                {book.langue}
              </div>
              <div className="flex items-center text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-full">
                <Calendar className="h-3 w-3 mr-1" />
                {book.anneePublication}
              </div>
              <div className="flex items-center text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                <Box className="h-3 w-3 mr-1" />
                {book.quantite}
              </div>
              <div className="flex items-center text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                <Tag className="h-3 w-3 mr-1" />
                {book.categorie}
              </div>
            </div>

            {viewMode === "row" && (
              <div className="flex items-start text-sm mt-1">
                <Hash className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  {book.isbn}
                </span>
              </div>
            )}

            {/* Description section - now shown in both view modes */}
            <div className="flex items-start text-sm mt-1">
              <FileText className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
              <span
                className={`text-gray-600 dark:text-gray-400 text-xs ${
                  viewMode === "row" ? "line-clamp-2" : "line-clamp-3"
                }`}
              >
                {book.description}
              </span>
            </div>
          </div>

          {/* Action buttons  */}
          {isAdmin && (
            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                {/* View details */}
                <Link
                  to={`/admin/manage-books/${book._id}`}
                  className="group relative p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                >
                  <Eye size={16} />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    View details
                  </span>
                </Link>

                {/* Edit book */}
                <Link
                  to={`/admin/manage-books/edit/${book._id}`}
                  className="group relative p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                >
                  <Edit size={16} />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Edit book
                  </span>
                </Link>

                {/* Delete */}
                <button
                  disabled={loadingDelete}
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="group relative p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors"
                >
                  {loadingDelete ? (
                    <div className="flex justify-center items-center">
                      <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <Trash size={16} />

                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Delete
                      </span>
                    </>
                  )}
                </button>
              </div>

              {viewMode === "grid" && (
                <div
                  className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]"
                  title={book.isbn}
                >
                  ISBN: {book.isbn}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
