import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Plus,
  Loader,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { livresApiURL, categoriesApiURL } from "../services/api.js";
import { languages } from "../services/data";
import { encodeToBase64, compressImage } from "../utils/Base64.js";

import UserSideBar from "../components/UI/UserSideBar";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";
import UpdateConfirmationModal from "../components/UI/UpdateConfirmationModal.jsx";

const AdminManageBooksEdit = () => {
  const { user } = useSelector((state) => state.user);

  const [bookData, setBookData] = useState({
    titre: "",
    auteur: "",
    editeur: "",
    anneePublication: "",
    categorie: "",
    isbn: "",
    langue: "",
    quantite: 0,
    description: "",
    poster: "",
  });
  const [posterPreview, setPosterPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: false });

  const id = useParams().id;

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch Book
  const fetchBook = async () => {
    try {
      const response = await axios.get(`${livresApiURL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const book = response.data?.data?.livre;
      setBookData(book);
      if (book.poster) {
        setPosterPreview(book.poster);
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error fetching book!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoriesApiURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCategories(response.data?.data?.categories);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error fetching Categories!",
        success: false,
      });
    }
  };

  useEffect(() => {
    fetchBook();
    fetchCategories();
  }, [id, user.token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  // Handle poster image change
  const handlePosterChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setAlert({
          message: "Please upload a valid image file (PNG, JPG, JPEG)",
          success: false,
        });
        return;
      }

      try {
        // Convert file to base64
        const base64String = await encodeToBase64(file);

        // Compress the image with more aggressive settings
        const compressedBase64 = await compressImage(base64String, 600, 600);

        // Update state with compressed image
        setPosterPreview(compressedBase64);
        setBookData((prev) => ({ ...prev, poster: compressedBase64 }));
      } catch (error) {
        setAlert({
          message: "Error processing image. Please try again.",
          success: false,
        });
      }
    }
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const response = await axios.put(`${livresApiURL}/${id}`, bookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAlert({
        message: response.data?.message || "Book updated successfully!",
        success: true,
      });
    } catch (error) {
      console.log("handleUpdate ~ error:", error);
      setAlert({
        message: error.response?.data?.message || "Error updating book!",
        success: false,
      });
    } finally {
      setLoadingUpdate(false);
      setIsUpdateModalOpen(false);
    }
  };

  return (
    <>
      {isUpdateModalOpen && (
        <UpdateConfirmationModal
          handleUpdate={handleUpdate}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          loading={loadingUpdate}
          type="book"
        />
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Edit Book
                </h2>
                <div className="flex items-center space-x-4">
                  {/* Back Button */}
                  <Link
                    to="/admin/manage-books"
                    className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Books
                  </Link>

                  {/* Add Book Button */}
                  <Link
                    to="/admin/manage-books/create"
                    className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Plus size={20} className="mr-2" />
                    Add New Book
                  </Link>
                </div>
              </div>

              {/* Book Edit Form */}
              <div className="p-6 max-h-screen overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                  </div>
                ) : (
                  <>
                    {alert.message && (
                      <ManagementAlert
                        alert={alert}
                        setAlert={setAlert}
                        close={bookData?.isbn ? true : false}
                      />
                    )}

                    {bookData.isbn && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Poster Upload Section */}
                            <div className="col-span-2">
                              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                                {posterPreview ? (
                                  <div className="relative group">
                                    <img
                                      src={posterPreview}
                                      alt="Book Poster Preview"
                                      className="w-full max-h-64 object-contain rounded-lg shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                      <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        <Upload className="h-5 w-5 inline-block mr-2" />
                                        Change Image
                                        <input
                                          type="file"
                                          accept=".png,.jpg,.jpeg"
                                          onChange={handlePosterChange}
                                          className="hidden"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                ) : (
                                  <label className="cursor-pointer flex flex-col items-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                      <ImageIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-300 mb-2">
                                      Click to upload book poster
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      PNG, JPG, JPEG up to 5MB
                                    </span>
                                    <input
                                      type="file"
                                      accept=".png,.jpg,.jpeg"
                                      onChange={handlePosterChange}
                                      className="hidden"
                                    />
                                  </label>
                                )}
                              </div>
                            </div>

                            {/* Title */}
                            <div className="col-span-2">
                              <label
                                htmlFor="titre"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Book Title *
                              </label>
                              <input
                                type="text"
                                id="titre"
                                name="titre"
                                value={bookData.titre || ""}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter book title"
                              />
                            </div>

                            {/* Author */}
                            <div>
                              <label
                                htmlFor="auteur"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Author *
                              </label>
                              <input
                                type="text"
                                id="auteur"
                                name="auteur"
                                value={bookData.auteur || ""}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter author name"
                              />
                            </div>

                            {/* Publisher */}
                            <div>
                              <label
                                htmlFor="editeur"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Publisher *
                              </label>
                              <input
                                type="text"
                                id="editeur"
                                name="editeur"
                                value={bookData.editeur || ""}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter publisher name"
                              />
                            </div>

                            {/* ISBN */}
                            <div>
                              <label
                                htmlFor="isbn"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                ISBN *
                              </label>
                              <input
                                type="text"
                                id="isbn"
                                name="isbn"
                                value={bookData.isbn || ""}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="e.g. 978-0-14-118523-1"
                              />
                            </div>

                            {/* Publication Year */}
                            <div>
                              <label
                                htmlFor="anneePublication"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Publication Year *
                              </label>
                              <input
                                type="number"
                                id="anneePublication"
                                name="anneePublication"
                                value={bookData.anneePublication || ""}
                                onChange={handleChange}
                                required
                                min="1000"
                                max={new Date().getFullYear()}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="e.g. 2020"
                              />
                            </div>

                            {/* Quantity */}
                            <div>
                              <label
                                htmlFor="quantite"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Quantity *
                              </label>
                              <input
                                type="number"
                                id="quantite"
                                name="quantite"
                                value={bookData.quantite || 0}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter quantity available"
                              />
                            </div>

                            {/* Category */}
                            <div>
                              <label
                                htmlFor="categorie"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Category *
                              </label>
                              <select
                                id="categorie"
                                name="categorie"
                                value={bookData.categorie || ""}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              >
                                <option value="">Select a category</option>
                                {categories && categories.length > 0 ? (
                                  categories.map((cat) => (
                                    <option key={cat._id} value={cat.nom}>
                                      {cat.nom}
                                    </option>
                                  ))
                                ) : (
                                  <>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-Fiction">
                                      Non-Fiction
                                    </option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Science Fiction">
                                      Science Fiction
                                    </option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Biography">Biography</option>
                                  </>
                                )}
                              </select>
                            </div>

                            {/* Language */}
                            <div>
                              <label
                                htmlFor="langue"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Language *
                              </label>
                              <select
                                id="langue"
                                name="langue"
                                value={bookData.langue || ""}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              >
                                <option value="">Select a language</option>
                                {languages.map((lang) => (
                                  <option key={lang} value={lang}>
                                    {lang}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Description */}
                            <div className="col-span-2">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Description
                              </label>
                              <textarea
                                id="description"
                                name="description"
                                value={bookData.description || ""}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter book description"
                              ></textarea>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="mt-8 flex justify-end">
                            <button
                              type="submit"
                              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-200"
                              disabled={loadingUpdate}
                            >
                              {loadingUpdate ? (
                                <>
                                  <Loader size={20} className="animate-spin" />
                                </>
                              ) : (
                                <>
                                  <Save size={20} className="mr-2" />
                                  Update Book
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
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

export default AdminManageBooksEdit;
