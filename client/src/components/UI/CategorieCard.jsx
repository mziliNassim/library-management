import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash, Save, X } from "lucide-react";
import { useSelector } from "react-redux";
import { categoriesApiURL } from "../../services/api";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";

const CategorieCard = ({ categorie, viewMode, fetchCategories }) => {
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

      if (response.data.success) {
        setMessage("Category updated successfully!");
        setIsEditing(false);
      } else {
        setMessage("Failed to update category.");
      }
    } catch (error) {
      setMessage("Error updating category!");
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

      if (response.data.success) {
        setMessage("Category deleted successfully!");
        fetchCategories();
      } else {
        setMessage("Failed to delete category.");
      }
    } catch (error) {
      setMessage("Error deleting category!");
    } finally {
      setLoadingDelete(false);
      setIsDeleteModalOpen(false);
    }
  };

  // hid message after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message]);

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
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                disabled={loadingUpdate}
                onClick={handleUpdate}
                className="flex min-w-[100px] items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {loadingUpdate ? (
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
