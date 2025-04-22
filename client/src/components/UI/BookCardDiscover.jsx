import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { empruntsApiURL, livresApiURL } from "../../services/api";

import {
  BookOpen,
  Calendar,
  Hash,
  Users,
  Globe,
  Box,
  FileText,
  Tag,
  Eye,
  BookMarked,
  Heart,
  Edit,
  Trash,
  Loader,
} from "lucide-react";
import { setUser } from "../../features/UserSlice";

const BookCardDiscover = ({
  book,
  viewMode = "grid",
  fetchBooks,
  setAlert,
}) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [actionsHoverd, setActionsHoverd] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingWishlistAction, setLoadingWishlistAction] = useState(false);
  const [loadingLoanBook, setLoadingLoanBook] = useState(false);

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

  //
  const addToWishlist = async () => {
    setLoadingWishlistAction(true);
    if (!user) return navigate("/auth/signin");

    try {
      const response = await axios.post(
        `${livresApiURL}/wishlist/${book._id}`,
        {}, // Empty body if no data to send
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data?.success) {
        setAlert(response.data?.message);
        dispatch(setUser({ ...user, wishlist: [...user.wishlist, book._id] }));
      }
    } catch (error) {
      setAlert(error?.response?.data?.message);
    } finally {
      setLoadingWishlistAction(false);
    }
  };

  //
  const removeFromWishlist = async () => {
    if (!user) navigate("/auth/signin");
    setLoadingWishlistAction(true);
    try {
      const response = await axios.delete(
        `${livresApiURL}/wishlist/${book._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data?.success) {
        setAlert(response.data?.message);
        dispatch(
          setUser({
            ...user,
            wishlist: user.wishlist.filter((id) => id !== book._id),
          })
        );
      }
      fetchBooks();
    } catch (error) {
      console.log(" removeFromWishlist ~ error:", error);
      setAlert(error?.response?.data?.message);
    } finally {
      setLoadingWishlistAction(false);
    }
  };

  // handle loan event
  const loanCuurentBook = async () => {
    if (!user) navigate("/auth/signin");
    setLoadingLoanBook(true);
    try {
      const response = await axios.post(
        `${empruntsApiURL}/${book._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      if (response.data?.success) {
        setAlert({
          message: response.data?.message || "Book loaned successfully!",
          success: true,
        });
        // Update the book quantity in the UI
        book.quantite--;
      }
    } catch (error) {
      setAlert({
        message: error?.response?.data?.message || "Failed to loan the book",
        success: false,
      });
    } finally {
      setLoadingLoanBook(false);
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
        onMouseEnter={() => setActionsHoverd(true)}
        onMouseLeave={() => setActionsHoverd(false)}
        className={`relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl
        ${viewMode === "row" ? "flex items-stretch" : "flex flex-col h-full"}`}
      >
        {/* Overlay actions */}
        {actionsHoverd && (
          <div className="absolute z-30 top-2 right-2 flex space-x-2 opacity-100 group-hover:opacity-100 transition-opacity">
            {/* Disponibilite */}
            {book.quantite == 0 && (
              <div
                className="p-2 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600"
                title="Not available"
              >
                Not available
              </div>
            )}
          </div>
        )}

        {/* Book cover/spine */}
        <div
          className={`relative overflow-hidden
          ${viewMode === "row" ? "w-36 flex-shrink-0" : "h-40"}
          ${
            book.poster
              ? "bg-white"
              : `bg-gradient-to-br ${getColorClass(book.titre[0])}`
          }`}
        >
          {book.poster ? (
            <div className="relative h-full w-full group">
              {/* Poster Image */}
              <img
                src={book.poster}
                alt={book.titre}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Book Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
                    {getAgeCategory(book.anneePublication)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Book details */}
        <div className={`flex-1 flex flex-col bg-white dark:bg-gray-800 p-5`}>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 ">
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
              {/* Added category badge */}
              <div className="flex items-center text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                <Tag className="h-3 w-3 mr-1" />
                {book.categorie}
              </div>
            </div>
            <div className="flex items-start text-sm mt-1">
              <Hash className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {book.isbn}
              </span>
            </div>

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
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              {/* Details Link */}
              <Link
                to={`/discover/books/${book._id}`}
                className="p-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 flex justify-content-center items-center"
                title="View details"
              >
                <Eye size={16} />
              </Link>

              {user?.role === "admin" && (
                <>
                  {/* Edit book */}
                  <Link
                    to={`/admin/manage-books/edit/${book._id}`}
                    className="group relative p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                  >
                    <Edit size={16} />
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
                      <Trash size={16} />
                    )}
                  </button>
                </>
              )}
            </div>

            <div className="flex space-x-2">
              {/* Wish List */}
              {loadingWishlistAction ? (
                <button
                  onClick={() => addToWishlist()}
                  className="p-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600"
                  title="Add to wishlist"
                >
                  <Loader size={16} className="text-blue-500 animate-spin" />
                </button>
              ) : user?.wishlist?.includes(book._id) ? (
                <button
                  onClick={() => removeFromWishlist()}
                  className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                  title="Remove from wishlist"
                >
                  <Heart size={16} />
                </button>
              ) : (
                <button
                  onClick={() => addToWishlist()}
                  className="p-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600"
                  title="Add to wishlist"
                >
                  <Heart size={16} />
                </button>
              )}

              {book.quantite > 0 && (
                <button
                  onClick={() => loanCuurentBook(book)}
                  disabled={loadingLoanBook}
                  className="p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600"
                  title="Borrow book"
                >
                  {loadingLoanBook ? (
                    <Loader className="h-4 w-4 text-purple-500 animate-spin" />
                  ) : (
                    <BookMarked size={16} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCardDiscover;
