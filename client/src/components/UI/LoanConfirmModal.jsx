import React from "react";

const LoanConfirmModal = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-clr-surface-a10 rounded-lg p-5 max-w-sm w-full shadow-lg">
        <div className="text-center">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full inline-flex items-center justify-center mb-4">
            <FaBook className="text-green-600 dark:text-green-300 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-black dark:text-clr-light-a0 mb-2">
            Book Loaned Successfully!
          </h3>
          <p className="text-black dark:text-clr-light-a0 mb-4 text-sm">
            You can now access "{book.titre}" in your library.
          </p>
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanConfirmModal;
