import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, Edit, Loader } from "lucide-react";
import axios from "axios";
import { clientsApiURL } from "../../services/api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const UserCard = ({ user, viewMode, fetchUsers }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteUser = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(`${clientsApiURL}/${user._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      fetchUsers();
    } catch (error) {
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleteModalOpen(false);
      setLoadingDelete(false);
    }
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          handleDelete={handleDeleteUser}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          loading={loadingDelete}
        />
      )}

      <div
        className={`
      ${viewMode === "grid" ? "w-full sm:w-64 h-auto" : "w-full"}
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg shadow-md hover:shadow-lg
      transition-all duration-300 ease-in-out
      transform hover:-translate-y-1
      flex ${viewMode === "grid" ? "flex-col" : "flex-row items-center"}
      p-4 space-y-3 ${viewMode === "grid" ? "" : "space-y-0 space-x-4"}
    `}
      >
        <div
          className={`
        flex ${viewMode === "grid" ? "flex-col" : "flex-row"}
        items-center space-x-4
      `}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user.nom}&background=random`}
            alt={user.nom}
            className={`
            rounded-full object-cover
            ${viewMode === "grid" ? "w-24 h-24 self-center" : "w-16 h-16"}
          `}
          />
          <div
            className={`
          flex flex-col
          ${viewMode === "grid" ? "items-center text-center" : "items-start"}
        `}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {user.nom}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <div
              className={`
            flex items-center space-x-2 mt-2
            ${viewMode === "grid" ? "justify-center" : ""}
          `}
            >
              <span
                className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${
                  user.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              `}
              >
                {user.active ? "Active" : "Inactive"}
              </span>
              <span
                className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }
            `}
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`
        flex space-x-2
        ${viewMode === "grid" ? "justify-center mt-4" : "ml-auto"}
      `}
        >
          {/* detials */}
          <Link
            to={`/admin/manage-clients/${user._id}`}
            className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
          >
            <Eye size={20} />
          </Link>

          {/* edit */}
          <Link
            to={`/admin/manage-clients/edit/${user._id}`}
            className="text-green-500 hover:bg-green-100 p-2 rounded-full"
          >
            <Edit size={20} />
          </Link>

          {/* delete */}
          <button
            disabled={loadingDelete}
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
          >
            {loadingDelete ? (
              <div className="flex justify-center items-center">
                <Loader className="h-5 w-5 text-blue-500 animate-spin" />
              </div>
            ) : (
              <Trash2 size={20} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
