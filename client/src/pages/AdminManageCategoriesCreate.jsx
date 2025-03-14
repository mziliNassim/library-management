import React, { useEffect, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Loader, Undo2 } from "lucide-react";
import { categoriesApiURL } from "../services/api.js";
import { useSelector } from "react-redux";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";

const AdminManageCategoriesCreate = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
  });

  // Authentification Required as 'admin'
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(categoriesApiURL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setAlert({
        message:
          response.data?.message || "Category has been created successfully!",
        success: true,
      });

      setFormData({
        nom: "",
        description: "",
      });
    } catch (error) {
      console.log(" handleSubmit ~ error:", error);
      setAlert({
        message:
          error.response?.data?.message ||
          "Failed to create category. Please try again.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <UserSideBar />

          <div className="md:w-3/4 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Add New Category
              </h2>
              <div className="flex items-center space-x-4">
                {/* Back Button */}
                <Link
                  to="/admin/manage-categories"
                  className="flex items-center justify-center p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  <Undo2 size={20} className="mr-2" />
                  Back to Categories
                </Link>
              </div>
            </div>

            <div className="p-6 max-h-screen overflow-y-auto">
              {alert.message && (
                <ManagementAlert
                  alert={alert}
                  setAlert={setAlert}
                  close="true"
                />
              )}

              {/* Category Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Category Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Mystery, Fiction, Biography, etc."
                  />
                </div>

                {/* Category Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="10"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter a brief description for this category..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader size={20} className="animate-spin mr-2" />
                      </>
                    ) : (
                      "Create Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageCategoriesCreate;
