import React, { useEffect, useMemo, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import CategorieCard from "../components/UI/CategorieCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

import { Search, X, Plus, Grid, List, Loader } from "lucide-react";
import { categoriesApiURL } from "../services/api.js";
import { useSelector } from "react-redux";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";

const AdminManageCategories = () => {
  const { user } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'row'

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${categoriesApiURL}/`);
      setCategories(response.data?.data?.categories);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error fetching categories!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtered categories by name
  const filteredCategories = categories.filter((categorie) => {
    const matchesSearch = categorie.nom
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <UserSideBar />

          <div className="md:w-3/4 bg-white dark:bg-gray-800  rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Categories Management
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

                {/* Add Categorie Button */}
                <Link
                  to="/admin/manage-categories/create"
                  className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus size={20} className="mr-2" />
                  Add New Category
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
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>

                {/* Reset Filters */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Categories List */}
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
                      close="true"
                    />
                  )}

                  {filteredCategories.length > 0 && (
                    <div
                      className={`${
                        viewMode === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                          : "space-y-6"
                      }`}
                    >
                      {filteredCategories.map((categorie) => (
                        <CategorieCard
                          key={categorie._id}
                          categorie={categorie}
                          viewMode={viewMode}
                          fetchCategories={fetchCategories}
                          setAlert={setAlert}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageCategories;
