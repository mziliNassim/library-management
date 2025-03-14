import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserSideBar from "../components/UI/UserSideBar";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";

import { clientsApiURL } from "../services/api";

import { Users, Loader, Linkedin, Globe, Github, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import UpdateConfirmationModal from "../components/UI/UpdateConfirmationModal.jsx";

const AdminManageClientsEdit = () => {
  const { user } = useSelector((state) => state.user);
  const [updateUser, setUpdateUser] = useState({
    nom: "",
    email: "",
    adresse: "",
    role: "", // ["client", "admin"]
    id: "",
    socials: {
      linkedin: "",
      website: "",
      github: "",
      bio: "",
    },
  });
  const [alert, setAlert] = useState({ message: "", success: false });
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { id } = useParams();

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch Users
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${clientsApiURL}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      // If socials doesn't exist in the response, add it
      const clientData = response.data?.data?.client;
      if (!clientData.socials) {
        clientData.socials = {
          linkedin: "",
          website: "",
          github: "",
          bio: "",
        };
      }
      setUpdateUser(clientData);
    } catch (error) {
      setAlert({
        message: "Client not found!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      socials: {
        ...updateUser.socials,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const response = await axios.put(`${clientsApiURL}/${id}`, updateUser, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setAlert({
        message: response.data?.data?.message || "User updated successfully!",
        success: true,
      });
      setUpdateUser(response.data?.data?.client);
    } catch (error) {
      setAlert({ message: error.response?.data?.message, success: false });
    } finally {
      setLoadingSubmit(false);
      setIsUpdateModalOpen(false);
    }
  };

  return (
    <>
      {isUpdateModalOpen && (
        <UpdateConfirmationModal
          handleUpdate={handleSubmit}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          loading={loadingSubmit}
          type="clients"
        />
      )}

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
                        close={updateUser?.nom ? true : false}
                      />
                    )}

                    {updateUser && (
                      <form className="space-y-6 max-w-2xl mx-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-8 shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-600 pb-2">
                          Edit User Details
                        </h3>

                        <div className="grid grid-cols-1 gap-6">
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="nom"
                                value={updateUser?.nom}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter user's full name"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                name="email"
                                value={updateUser?.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="user@example.com"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Address
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="adresse"
                                value={updateUser?.adresse}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter user's address"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Role
                            </label>
                            <div className="relative">
                              <select
                                name="role"
                                value={updateUser?.role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                              >
                                <option value="" disabled>
                                  Select Role
                                </option>
                                <option value="client">Client</option>
                                <option value="admin">Admin</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Social Media Section */}
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-600 pb-2">
                              Social Media & Profile
                            </h3>

                            <div className="space-y-4">
                              <div className="group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  LinkedIn Profile
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Linkedin className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <input
                                    type="url"
                                    name="linkedin"
                                    value={updateUser.socials?.linkedin}
                                    onChange={handleSocialChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="https://linkedin.com/in/username"
                                  />
                                </div>
                              </div>

                              <div className="group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Website
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Globe className="h-5 w-5 text-green-600" />
                                  </div>
                                  <input
                                    type="url"
                                    name="website"
                                    value={updateUser.socials?.website}
                                    onChange={handleSocialChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="https://yourwebsite.com"
                                  />
                                </div>
                              </div>

                              <div className="group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  GitHub
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                                  </div>
                                  <input
                                    type="url"
                                    name="github"
                                    value={updateUser.socials?.github}
                                    onChange={handleSocialChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="https://github.com/username"
                                  />
                                </div>
                              </div>

                              <div className="group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Bio / Description
                                </label>
                                <div className="relative">
                                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <textarea
                                    name="bio"
                                    value={updateUser.socials?.bio}
                                    onChange={handleSocialChange}
                                    rows="4"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Write a short bio or description..."
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Link
                            to="/admin/manage-clients"
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:bg-gray-300 dark:focus:bg-gray-700 focus:ring-gray-500 font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-1"
                          >
                            Back to Clients
                          </Link>

                          <button
                            disabled={loadingSubmit}
                            type="button"
                            onClick={() => setIsUpdateModalOpen(true)}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-1"
                          >
                            {loadingSubmit ? (
                              <div className="flex justify-center items-center">
                                <Loader className="h-5 w-5 text-white animate-spin" />
                              </div>
                            ) : (
                              "Update User"
                            )}
                          </button>
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

export default AdminManageClientsEdit;
