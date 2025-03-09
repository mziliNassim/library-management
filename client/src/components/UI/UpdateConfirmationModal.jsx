import React from "react";
import { AlertTriangle, Loader } from "lucide-react";

const UpdateConfirmationModal = ({
  handleUpdate,
  setIsUpdateModalOpen,
  loading,
  type,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Confirm Update
            </h2>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to update this {type}? This action cannot be
            undone.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateConfirmationModal;
