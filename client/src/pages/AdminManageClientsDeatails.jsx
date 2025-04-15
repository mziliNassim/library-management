import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { clientsApiURL } from "../services/api";

import UserSideBar from "../components/UI/UserSideBar";
import DeleteConfirmationModal from "../components/UI/DeleteConfirmationModal";
import ManagementAlert from "../components/UI/ManagementAlert";
import UserDetailCardInfos from "../components/UI/UserDetailCardInfos.jsx";

import {
  Users,
  Mail,
  Shield,
  MapPin,
  Loader,
  Linkedin,
  Github,
  Globe,
  FileText,
  ArrowLeft,
  Tag,
} from "lucide-react";
import AdminManageClientDetailsHeader from "../components/UI/AdminManageClientDetailsHeader.jsx";

const AdminManageClientDetails = () => {
  const { user } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dbUser, setDbUser] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const id = useParams().id;
  const navigate = useNavigate();

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch User Details
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${clientsApiURL}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const clientData = response.data?.data?.client;
      // Ensure socials exists
      if (!clientData.socials) {
        clientData.socials = {
          linkedin: "",
          website: "",
          github: "",
          bio: "",
        };
      }
      setDbUser(clientData);
    } catch (error) {
      console.log(" fetchUser ~ error:", error);
      setAlert({
        message: error.response?.data?.message || "User not found!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user, id]);

  // Delete User
  const handleDeleteUser = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(`${clientsApiURL}/${dbUser._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      navigate("/admin/manage-clients");
    } catch (error) {
      setAlert({
        message: error.response.data?.data?.message || "Error deleting user!",
        success: false,
      });
    } finally {
      setIsDeleteModalOpen(false);
      setLoadingDelete(false);
    }
  };

  // Tabs for better organization
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "contact", label: "Contact" },
    { id: "social", label: "Social" },
  ];

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          handleDelete={handleDeleteUser}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          loading={loadingDelete}
          type="user"
        />
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 ease-in-out">
        <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <Loader className="h-10 w-10 text-blue-500 animate-spin" />
                </div>
              ) : (
                <>
                  {/* Header */}
                  <AdminManageClientDetailsHeader
                    dbUser={dbUser}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                  />

                  {/* Content */}
                  <div className="mt-2 p-6">
                    {alert.message && (
                      <div className="mb-6">
                        <ManagementAlert
                          alert={alert}
                          setAlert={setAlert}
                          close={false}
                        />
                      </div>
                    )}

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                      <nav className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                              activeTab === tab.id
                                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </nav>
                    </div>

                    {/* Tab Content - Kept the same */}
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                      <div className="space-y-6">
                        {dbUser.socials?.bio && (
                          <div className="mt-8">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                              <div className="flex items-center mb-4">
                                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-full mr-3">
                                  <FileText
                                    className="text-purple-600 dark:text-purple-300"
                                    size={18}
                                  />
                                </div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                                  Bio / Description
                                </h3>
                              </div>
                              <div className="pl-12 mt-2">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                  {dbUser.socials.bio ||
                                    "No bio provided by this client."}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <UserDetailCardInfos
                            icon={Tag}
                            label="Role"
                            value={
                              dbUser?.role?.charAt(0).toUpperCase() +
                                dbUser?.role?.slice(1) || "Not specified"
                            }
                            bgColor="bg-indigo-50"
                            iconColor="text-indigo-600"
                            darkBgColor="dark:bg-indigo-950"
                            darkIconColor="dark:text-indigo-300"
                          />
                          <UserDetailCardInfos
                            icon={Shield}
                            label="Account Status"
                            value={
                              dbUser?.active
                                ? "Active Account"
                                : "Inactive Account"
                            }
                            bgColor={
                              dbUser?.active ? "bg-green-50" : "bg-red-50"
                            }
                            iconColor={
                              dbUser?.active ? "text-green-600" : "text-red-600"
                            }
                            darkBgColor={
                              dbUser?.active
                                ? "dark:bg-green-950"
                                : "dark:bg-red-950"
                            }
                            darkIconColor={
                              dbUser?.active
                                ? "dark:text-green-300"
                                : "dark:text-red-300"
                            }
                          />
                          <UserDetailCardInfos
                            icon={Users}
                            label="Client ID"
                            value={dbUser?._id || "Not available"}
                            bgColor="bg-gray-50"
                            iconColor="text-gray-600"
                            darkBgColor="dark:bg-gray-900"
                            darkIconColor="dark:text-gray-300"
                          />
                        </div>
                      </div>
                    )}

                    {/* Contact Tab */}
                    {activeTab === "contact" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <UserDetailCardInfos
                            icon={Mail}
                            label="Email Address"
                            value={dbUser?.email}
                            bgColor="bg-blue-50"
                            iconColor="text-blue-600"
                            darkBgColor="dark:bg-blue-950"
                            darkIconColor="dark:text-blue-300"
                          />

                          <UserDetailCardInfos
                            icon={MapPin}
                            label="Address"
                            value={dbUser?.adresse}
                            bgColor="bg-red-50"
                            iconColor="text-red-600"
                            darkBgColor="dark:bg-red-950"
                            darkIconColor="dark:text-red-300"
                          />
                        </div>
                      </div>
                    )}

                    {/* Social Tab */}
                    {activeTab === "social" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dbUser.socials?.linkedin && (
                            <UserDetailCardInfos
                              icon={Linkedin}
                              label="LinkedIn Profile"
                              value={dbUser.socials.linkedin}
                              isLink={true}
                              bgColor="bg-blue-50"
                              iconColor="text-blue-600"
                              darkBgColor="dark:bg-blue-950"
                              darkIconColor="dark:text-blue-300"
                            />
                          )}

                          {dbUser.socials?.github && (
                            <UserDetailCardInfos
                              icon={Github}
                              label="GitHub Profile"
                              value={dbUser.socials.github}
                              isLink={true}
                              bgColor="bg-gray-50"
                              iconColor="text-gray-800"
                              darkBgColor="dark:bg-gray-900"
                              darkIconColor="dark:text-gray-300"
                            />
                          )}

                          {dbUser.socials?.website && (
                            <UserDetailCardInfos
                              icon={Globe}
                              label="Website"
                              value={dbUser.socials.website}
                              isLink={true}
                              bgColor="bg-green-50"
                              iconColor="text-green-600"
                              darkBgColor="dark:bg-green-950"
                              darkIconColor="dark:text-green-300"
                            />
                          )}
                        </div>

                        {!dbUser.socials?.linkedin &&
                          !dbUser.socials?.github &&
                          !dbUser.socials?.website && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
                              <p className="text-gray-500 dark:text-gray-400">
                                No social profiles have been added for this
                                client.
                              </p>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Actions Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/admin/manage-clients"
                        className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors shadow-sm"
                      >
                        <ArrowLeft className="mr-2" size={18} />
                        Back to Client List
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageClientDetails;
