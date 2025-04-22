import React, { useEffect, useState } from "react";

const PopupAlert = ({ alert, setAlert, time = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Reset progress when alert changes
    setProgress(100);
    setIsVisible(true);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 100 / (time / 50)));
    }, 50);

    // Hide popup after time
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setAlert({ message: "", success: false });
      }, 300); // Wait for exit animation
    }, time);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [alert, time, setAlert]);

  if (!alert.message) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-full translate-y-full opacity-0"
      }`}
    >
      <div
        className={`relative min-w-[300px] max-w-md p-4 rounded-lg shadow-lg ${
          alert.success
            ? "bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700"
            : "bg-red-50 dark:bg-gray-800 border border-red-200 dark:border-gray-700"
        }`}
      >
        {/* Progress bar */}
        <div
          className={`absolute top-0 left-0 h-1 rounded-t-lg ${
            alert.success
              ? "bg-green-500 dark:bg-green-400"
              : "bg-red-500 dark:bg-red-400"
          }`}
          style={{ width: `${progress}%` }}
        />

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 rounded-full text-gray-400 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-100 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Message content */}
        <div className="flex items-start">
          <div
            className={`flex-shrink-0 ${
              alert.success
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {alert.success ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${
                alert.success
                  ? "text-green-800 dark:text-gray-100"
                  : "text-red-800 dark:text-gray-100"
              }`}
            >
              {alert.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;
