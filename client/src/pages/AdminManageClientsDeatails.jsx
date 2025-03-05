import React, { useEffect, useMemo, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import DeleteConfirmationModal from "../components/UI/DeleteConfirmationModal.jsx";
import { useSelector } from "react-redux";
import { clientsApiURL } from "../services/api";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Users, Edit, Mail, Shield, Home, Trash2 } from "lucide-react";

const AdminManageClientDetails = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dbUser, setDbUser] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // Authentication Check
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch User Details
  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${clientsApiURL}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setDbUser(response.data?.data?.client);
    } catch (error) {
      setMessage("Error fetching user details!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const handleDeleteUser = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(`${clientsApiURL}/${dbUser._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      navigate("/admin/manage-clients");
    } catch (error) {
      setMessage("Error deleting user!");
      setIsDeleteModalOpen(false);
    } finally {
      setLoadingDelete(false);
    }
  };

  // Fetch User on Component Mount
  useEffect(() => {
    fetchUser(params.id);
  }, [user, params.id]);

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
          handleDeleteUser={handleDeleteUser}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          loading={loadingDelete}
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
              ) : (
                <div className="p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                  {/* Profile Image & Basic Info */}
                  <div className="md:w-1/3 flex flex-col items-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${dbUser.nom}&background=random`}
                      alt={dbUser.nom}
                      className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {dbUser.nom}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {dbUser.role.charAt(0).toUpperCase() +
                        dbUser.role.slice(1)}
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
                        dbUser.role.charAt(0).toUpperCase() +
                        dbUser.role.slice(1)
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageClientDetails;
