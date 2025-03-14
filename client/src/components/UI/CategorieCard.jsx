import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash, Save, X, Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { categoriesApiURL } from "../../services/api";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";

const CategorieCard = ({ categorie, viewMode, fetchCategories, setAlert }) => {
  const { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [nom, setNom] = useState(categorie.nom);
  const [description, setDescription] = useState(categorie.description);
  const [message, setMessage] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // update category by id
  const handleUpdate = async () => {
    setLoadingUpdate(true);
    try {
      const response = await axios.put(
        `${categoriesApiURL}/${categorie._id}`,
        { nom, description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setAlert({
        message: response.data?.message || "Category updated successfully !",
        success: true,
      });
      setIsEditing(false);
    } catch (error) {
      setAlert({ message: "Error updating category !", success: false });
    } finally {
      setLoadingUpdate(false);
      fetchCategories();
    }
  };

  // delete category by id
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const response = await axios.delete(
        `${categoriesApiURL}/${categorie._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setAlert({
        message: response?.data?.message || "Category deleted successfully !",
        success: true,
      });
      fetchCategories();
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Error deleting category !",
        success: true,
      });
    } finally {
      setLoadingDelete(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          loading={loadingDelete}
          type="category"
        />
      )}

      <div
        className={`${
          viewMode === "grid"
            ? "bg-white dark:bg-gray-700 rounded-lg shadow-md p-6"
            : "bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex justify-between items-center"
        }`}
      >
        {isEditing ? (
          <div className="w-full">
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                disabled={loadingUpdate}
                onClick={handleUpdate}
                className="flex min-w-[100px] items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {loadingUpdate ? (
                  <div className="flex justify-center items-center">
                    <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                  </div>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <X size={16} className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="">
              {message && (
                <div className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
                  {message}
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {categorie.nom}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {categorie.description}
              </p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                disabled={loadingUpdate}
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {loadingUpdate ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <Edit size={16} className="mr-2" />
                    Edit
                  </>
                )}
              </button>
              <button
                disabled={loadingDelete}
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                {loadingDelete ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <Trash size={16} className="mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorieCard;
