import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  encodeToBase64,
  decodeFromBase64,
  compressImage,
} from "../utils/Base64.js";

import {
  Loader,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

import { categoriesApiURL, livresApiURL } from "../services/api.js";
import { languages } from "../services/data.js";

import UserSideBar from "../components/UI/UserSideBar";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";

const AdminManageBooksCreate = () => {
  const { user } = useSelector((state) => state.user);

  const [newBookData, setNewBookData] = useState({
    titre: "",
    auteur: "",
    editeur: "",
    anneePublication: 2000,
    categorie: "",
    isbn: "",
    quantite: 0,
    description: "",
    poster: "", // base 24
  });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [posterPreview, setPosterPreview] = useState(null);

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${categoriesApiURL}`);
        setCategories(response.data?.data?.categories);
      } catch (error) {
        setAlert({
          message:
            error.response?.data?.message || "Error fetching categories!",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantite" && value < 0) return;
    if (name === "anneePublication" && value < 1000) return;
    setNewBookData((prevData) => ({ ...prevData, [name]: value }));
  };

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
        setNewBookData((prev) => ({ ...prev, poster: compressedBase64 }));
      } catch (error) {
        setAlert({
          message: "Error processing image. Please try again.",
          success: false,
        });
      }
    }
  };

  // Create book
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    console.log(" handleCreate ~ newBookData:", newBookData);
    try {
      const response = await axios.post(`${livresApiURL}`, newBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAlert({
        message: response.data?.message || "Book Created successfully!",
        success: true,
      });
      // Reset form after successful creation
      setNewBookData({
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
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error Creating book!",
        success: false,
      });
    } finally {
      setLoadingCreate(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Create New Book
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
                      <ManagementAlert alert={alert} setAlert={setAlert} />
                    )}

                    <form onSubmit={handleCreate}>
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

                        {/* Titre */}
                        <div className="space-y-2">
                          <label
                            htmlFor="titre"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Title*
                          </label>
                          <input
                            type="text"
                            id="titre"
                            name="titre"
                            value={newBookData.titre}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          />
                        </div>

                        {/* Auteur */}
                        <div className="space-y-2">
                          <label
                            htmlFor="auteur"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Author*
                          </label>
                          <input
                            type="text"
                            id="auteur"
                            name="auteur"
                            value={newBookData.auteur}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          />
                        </div>

                        {/* Editeur */}
                        <div className="space-y-2">
                          <label
                            htmlFor="editeur"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Publisher*
                          </label>
                          <input
                            type="text"
                            id="editeur"
                            name="editeur"
                            value={newBookData.editeur}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          />
                        </div>

                        {/* AnneePublication */}
                        <div className="space-y-2">
                          <label
                            htmlFor="anneePublication"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Publication Year*
                          </label>
                          <input
                            type="number"
                            id="anneePublication"
                            name="anneePublication"
                            value={newBookData.anneePublication}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          />
                        </div>

                        {/* Categorie */}
                        <div className="space-y-2">
                          <label
                            htmlFor="categorie"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Category*
                          </label>
                          <select
                            id="categorie"
                            name="categorie"
                            value={newBookData.categorie}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.nom}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* ISBN */}
                        <div className="space-y-2">
                          <label
                            htmlFor="isbn"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            ISBN*
                          </label>
                          <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={newBookData.isbn}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          />
                        </div>

                        {/* Langue */}
                        <div className="space-y-2">
                          <label
                            htmlFor="langue"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Language*
                          </label>
                          <select
                            id="langue"
                            name="langue"
                            value={newBookData.langue}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          >
                            <option value="">Select a language</option>
                            {languages.map((language) => (
                              <option key={language} value={language}>
                                {language}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quantite */}
                        <div className="space-y-2">
                          <label
                            htmlFor="quantite"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Quantity*
                          </label>
                          <input
                            type="number"
                            id="quantite"
                            name="quantite"
                            value={newBookData.quantite}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            required
                          />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 col-span-2">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Description*
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={newBookData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            rows="4"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="mt-6 flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          disabled={loadingCreate}
                        >
                          {loadingCreate ? (
                            <Loader className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              <Save className="h-5 w-5 mr-2" />
                              Create Book
                            </>
                          )}
                        </button>
                      </div>
                    </form>
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

export default AdminManageBooksCreate;
