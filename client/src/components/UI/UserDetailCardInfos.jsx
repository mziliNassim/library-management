import React from "react";

import { ArrowUpRight } from "lucide-react";

const UserDetailCardInfos = ({
  icon: Icon,
  label,
  value,
  isLink = false,
  linkPrefix = "",
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
  darkBgColor = "dark:bg-blue-950",
  darkIconColor = "dark:text-blue-300",
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center mb-2">
        <div className={`${bgColor} ${darkBgColor} p-3 rounded-full mr-3`}>
          <Icon className={`${iconColor} ${darkIconColor}`} size={18} />
        </div>
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </h3>
      </div>
      <div className="pl-12">
        {isLink && value ? (
          <a
            href={value.startsWith("http") ? value : `${linkPrefix}${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center"
          >
            {value}
            <ArrowUpRight className="ml-1" size={14} />
          </a>
        ) : (
          <p className="text-gray-800 dark:text-gray-100 font-medium">
            {value || "Not provided"}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetailCardInfos;
