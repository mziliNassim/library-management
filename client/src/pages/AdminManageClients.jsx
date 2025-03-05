import React, { useEffect, useMemo, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import UserCard from "../components/UI/UserCard.jsx";
import { useSelector } from "react-redux";
import { clientsApiURL } from "../services/api";
import axios from "axios";

import { Users, Grid, List, Search, Filter, X } from "lucide-react";

const AdminManageClients = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [dbUsers, setDbUsers] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Authentification Required
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${clientsApiURL}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setDbUsers(response.data?.data?.clients);
    } catch (error) {
      setMessage("Error fetching users!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
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
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : filteredUsers?.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    {message || "No users found!"}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {filteredUsers.length} user
                      {filteredUsers.length !== 1 ? "s" : ""} found
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageClients;
