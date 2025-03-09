import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
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

          {user.role === "admin" && (
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
