import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserSideBar from "../components/UI/UserSideBar";
import UserCard from "../components/UI/UserCard.jsx";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";

import { clientsApiURL } from "../services/api";

import { Users, Grid, List, Search, Filter, X, Loader } from "lucide-react";

const AdminManageClients = () => {
  const { user } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [loading, setLoading] = useState(true);
  const [dbUsers, setDbUsers] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Authentification Required as 'admin'
  useMemo(() => {
    document.title = "LibriTech - Manage Clients";

    if (!user || user.role !== "admin") window.location.href = "/";
  }, [user]);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${clientsApiURL}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setDbUsers(response.data?.data?.clients);
    } catch (error) {
      setAlert({ message: "Error fetching users!", success: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  // Filtered and Searched Users
  const filteredUsers = useMemo(() => {
    return dbUsers.filter((user) => {
      const matchesSearch =
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter ? user.role === roleFilter : true;

      return matchesSearch && matchesRole;
    });
  }, [dbUsers, searchTerm, roleFilter]);

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Users className="mr-3 text-blue-500" size={24} />
                  Clients Management
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`
                    p-2 rounded-full
                    ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }
                  `}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("row")}
                    className={`
                    p-2 rounded-full
                    ${
                      viewMode === "row"
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }
                  `}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="p-6 bg-gray-100 dark:bg-gray-700">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Search Input */}
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Role Filter */}
                  <div className="relative">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Roles</option>
                      <option value="admin">Admins</option>
                      <option value="client">Clients</option>
                    </select>
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>

                  {/* Reset Filters */}
                  {(searchTerm || roleFilter) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
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
                        close={false}
                      />
                    )}

                    {filteredUsers?.length > 0 && (
                      <div className="flex flex-col space-y-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {filteredUsers.length - 1} user
                          {filteredUsers.length - 1 !== 1 ? "s" : ""} found
                        </div>
                        <div
                          className={`
                    grid gap-4
                    ${
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                    }
                  `}
                        >
                          {filteredUsers?.map((mapingUser) => {
                            if (user.email !== mapingUser.email) {
                              return (
                                <UserCard
                                  key={mapingUser._id}
                                  user={{ ...mapingUser, token: user.token }}
                                  fetchUsers={fetchUsers}
                                  viewMode={viewMode}
                                />
                              );
                            }
                          })}
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

export default AdminManageClients;
