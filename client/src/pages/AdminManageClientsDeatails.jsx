import React, { useEffect, useMemo, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import DeleteConfirmationModal from "../components/UI/DeleteConfirmationModal";
import { useSelector } from "react-redux";
import { clientsApiURL } from "../services/api";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Users, Edit, Mail, Shield, Home, Trash2, Loader } from "lucide-react";
import ManagementAlert from "../components/UI/ManagementAlert";

const AdminManageClientDetails = () => {
  const { user } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dbUser, setDbUser] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
      setDbUser(response.data?.data?.client);
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

  // Render User Details Row
  const UserDetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2">
      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
        <Icon className="text-blue-600 dark:text-blue-300" size={20} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
          {label}
        </p>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );

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

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <UserSideBar />

            <div className="md:w-3/4 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Users className="mr-3 text-blue-500" size={24} />
                  Client Details
                </h2>
                <div className="flex items-center space-x-2">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        dbUser?.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                  >
                    {dbUser?.active ? "Active" : "Inactive"}
                  </span>
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

                    <div className="p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                      {/* Profile Image & Basic Info */}
                      <div className="md:w-1/3 flex flex-col items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${
                            dbUser?.nom || "Not provided"
                          }&background=random`}
                          alt={dbUser?.nom || "Not provided"}
                          className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                          {dbUser?.nom || "Not provided"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {dbUser?.role?.charAt(0).toUpperCase() +
                            dbUser?.role?.slice(1) || "Not provided"}
                        </p>
                      </div>

                      {/* Detailed Information */}
                      <div className="md:w-2/3 space-y-4">
                        <UserDetailRow
                          icon={Mail}
                          label="Email Address"
                          value={dbUser.email}
                        />
                        <UserDetailRow
                          icon={Shield}
                          label="Account Role"
                          value={
                            dbUser?.role?.charAt(0).toUpperCase() +
                            dbUser?.role?.slice(1)
                          }
                        />

                        <UserDetailRow
                          icon={Home}
                          label="Address"
                          value={dbUser.adresse}
                        />

                        <div className="flex space-x-4">
                          {/* edit */}
                          <Link
                            to={`/admin/manage-clients/edit/${dbUser._id}`}
                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <Edit className="mr-2" size={20} />
                            Edit Profile
                          </Link>

                          {/* delete */}
                          <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="mr-2" size={20} />
                            Delete User
                          </button>

                          {/*  */}
                          <Link
                            to="/admin/manage-clients"
                            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            Back to Clients
                          </Link>
                        </div>
                      </div>
                    </div>
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

export default AdminManageClientDetails;
