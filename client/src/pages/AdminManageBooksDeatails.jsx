import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import { livresApiURL } from "../services/api.js";

import UserSideBar from "../components/UI/UserSideBar";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";
import DeleteConfirmationModal from "../components/UI/DeleteConfirmationModal";

import {
  Plus,
  Loader,
  Book,
  Calendar,
  User,
  Building,
  FileText,
  Languages,
  Hash,
  Tag,
  Undo2,
} from "lucide-react";

const AdminManageBooksDeatails = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const id = useParams().id;

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch Books
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${livresApiURL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        setBook(response.data?.data?.livre);
      } catch (error) {
        console.log(" fetchBook ~ error:", error);
        setAlert({
          message: error.response?.data?.message || "Error fetching book!",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, user.token]);

  // Delete book
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoadingDelete(true);
    try {
      const response = await axios.delete(`${livresApiURL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setAlert({
        message: response.data?.message || "Book deleted successfully!",
        success: true,
      });
      navigate("/admin/manage-books");
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

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Book Details
                </h2>
                <div className="flex items-center space-x-4">
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

              {/* Books Details */}
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

                    {book && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        {/* Book Cover and Basic Info */}
                        <div className="flex flex-col lg:flex-row gap-8 p-6">
                          {/* Left Column - Cover Image */}
                          <div className="lg:w-1/3">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[2/3] flex items-center justify-center overflow-hidden">
                              <Book
                                size={80}
                                className="text-gray-400 dark:text-gray-500"
                              />
                            </div>
                          </div>

                          {/* Right Column - Book Information */}
                          <div className="lg:w-2/3 flex flex-col">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                              {book.titre || "Unknown Title"}
                            </h1>
                            <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                              ISBN: {book.isbn}
                            </div>

                            {/* Book Description */}
                            <div className="mb-6">
                              <p className="text-gray-700 dark:text-gray-300">
                                {book.description ||
                                  "No description available."}
                              </p>
                            </div>

                            {/* Book Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                              <div className="flex items-center">
                                <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Author:
                                  </span>{" "}
                                  {book.auteur || "Unknown"}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Building className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Publisher:
                                  </span>{" "}
                                  {book.editeur || "Unknown"}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Publication Year:
                                  </span>{" "}
                                  {book.anneePublication || "Unknown"}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Languages className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Language:
                                  </span>{" "}
                                  {book.langue || "Unknown"}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Hash className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Quantity:
                                  </span>{" "}
                                  {book.quantite || "0"} copies
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Category:
                                  </span>{" "}
                                  {book.categorie || "Uncategorized"}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-4 mt-auto">
                              <Link
                                to={`/admin/manage-books/edit/${book._id}`}
                                className="px-2 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center"
                              >
                                <FileText size={18} className="mr-2" />
                                Update Book
                              </Link>

                              <button
                                disabled={loadingDelete}
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-2 py-2 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center"
                              >
                                {loadingDelete ? (
                                  <Loader
                                    size={18}
                                    className="mr-2 animate-spin"
                                  />
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                )}
                                Delete Book
                              </button>
                            </div>
                            <Link
                              to={`/admin/manage-books`}
                              className="px-4 py-2 my-4 flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                            >
                              <Undo2 size={18} className="mr-2" />
                              Update Book
                            </Link>
                          </div>
                        </div>
                      </div>
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

export default AdminManageBooksDeatails;
