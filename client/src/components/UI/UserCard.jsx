import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, Edit } from "lucide-react";
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
          handleDeleteUser={handleDeleteUser}
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
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
