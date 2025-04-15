import React from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const AdminManageClientDetailsHeader = ({ dbUser, setIsDeleteModalOpen }) => {
  return (
    <div className="relative">
      {/* Background Header */}
      <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900"></div>

      {/* Client Info Container */}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20">
          {/* Profile Picture */}
          <div className="flex-shrink-0 relative z-10">
            <div className="rounded-full h-28 w-28 sm:h-36 sm:w-36 border-4 border-white dark:border-gray-800 shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
              <img
                src={
                  dbUser?.profilePic ||
                  `https://ui-avatars.com/api/?name=${
                    dbUser?.nom || "Client"
                  }&background=random&size=144`
                }
                alt={dbUser?.nom || "Client Profile"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Client Info & Actions - Responsive Layout */}
          <div className="flex flex-col sm:flex-row justify-between w-full mt-4 sm:mt-0 sm:ml-6 sm:pb-1">
            {/* Name, */}
            <div className="mb-4 sm:mb-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {dbUser?.nom || "Client Name"}
                </h2>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 sm:self-end">
              <Link
                to={`/admin/manage-clients/edit/${dbUser?._id}`}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                <Edit className="mr-1.5" size={16} />
                Edit
              </Link>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                <Trash2 className="mr-1.5" size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageClientDetailsHeader;
