import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clientNavItems, adminNavItems } from "../../services/data";
import { clientsApiURL } from "../../services/api";
import { clearUser } from "../../features/UserSlice";

const UserSideBar = () => {
  const [logoutLoding, setLogoutLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log(" handleLogout ~ handleLogout:");
    setLogoutLoading(true);
    try {
      const response = await fetch(`${clientsApiURL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(clearUser());
        navigate("/");
      }
    } catch (err) {
      console.log(" handleLogout ~ err:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <div className="md:w-1/4 h-fit bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
        {/* Profile Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.nom}&background=random`}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 right-0 bg-green-400 w-6 h-6 rounded-full border-3 border-white shadow-md animate-pulse"></div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold uppercase">{user?.nom}</h2>
              <p className="text-sm opacity-80">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 space-y-2">
          {clientNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) => `
              w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 group
              ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-300"
              }
            `}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={`
                    transition-colors duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-purple-500 group-hover:text-purple-600 dark:text-purple-300 dark:group-hover:text-purple-200"
                    }
                  `}
                  />
                  <span className="flex-grow">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <>
              <hr className="bg-gray-400 w-5/6 mx-auto" />
              {adminNavItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) => `
              w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 group
              ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-300"
              }
            `}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        size={20}
                        className={`
                    transition-colors duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-purple-500 group-hover:text-purple-600 dark:text-purple-300 dark:group-hover:text-purple-200"
                    }
                  `}
                      />
                      <span className="flex-grow">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </>
          )}

          {/* Logout Option */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            <button
              disabled={logoutLoding}
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors duration-300 group"
            >
              {logoutLoding ? (
                <div className="flex justify-center items-center">
                  <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                </div>
              ) : (
                <>
                  <LogOut
                    size={20}
                    className="text-red-500 group-hover:rotate-180 transition-transform duration-300"
                  />
                  <span>Déconnexion</span>
                </>
              )}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default UserSideBar;
