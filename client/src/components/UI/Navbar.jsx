import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../features/themeSlice";
import { adminNavItems, clientNavItems, navigation } from "../../services/data";
import { useDispatch, useSelector } from "react-redux";

import {
  FaBars,
  FaBell,
  FaTimes,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaShoppingCart,
} from "react-icons/fa";
import { clearUser } from "../../features/UserSlice";
import { clientsApiURL, livresApiURL } from "../../services/api";
import { Loader } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [dropdown, setDropdown] = useState(false);
  const [logoutLoding, setLogoutLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Ref for the dropdown
  const dropdownRef = useRef(null);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        const response = await axios.get(`${livresApiURL}`);
        setBooks(response.data?.data?.livres);
      } catch (error) {
        setAlert({
          message: error.response?.data?.message || "...",
          success: false,
        });
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, [user]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await fetch(`${clientsApiURL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        dispatch(clearUser());
      }
    } catch (err) {
      console.log(" handleLogout ~ err:", err);
    } finally {
      setLogoutLoading(false);
      setDropdown(false);
    }
  };

  // Handle search input change
  useEffect(() => {
    if (searchQuery) {
      const filtered = books.filter(
        (book) =>
          book.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.auteur.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered.slice(0, 4));
    } else {
      setFilteredBooks([]);
    }
  }, [searchQuery, books]);

  return (
    <nav
      className="shadow-lg w-full bg-[#4a148c] dark:bg-[#4a148c] text-[#000]"
      style={{ transition: "background-color 0.3s ease" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button - only visible on md and smaller screens */}
          <div className="flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-purple-100 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo - always visible and clickable to go home */}
          <div className={`flex flex-1 justify-center md:mr-4`}>
            <Link
              to="/"
              className="flex items-center text-white font-bold text-xl focus:outline-none"
            >
              <img
                alt="Bookio"
                src="/darklogo.png"
                width="170"
                height="170"
                className="mr-2"
              />
            </Link>
          </div>

          {/* Desktop navigation - hidden on md and smaller screens */}
          <div className="hidden md:block flex-1 text-white">
            <div className="flex justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 mx-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search bar - hidden on small screens */}
          <div className="hidden lg:block relative mr-3">
            <input
              type="text"
              placeholder="Search books by name or author..."
              className="rounded-full py-1 px-4 focus:outline-none focus:ring-2 w-48 lg:w-64 bg-[#7549a6] dark:bg-[#8961b3] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />

            {isSearchFocused && filteredBooks.length > 0 && (
              <div className="absolute md:right-0 z-50 mt-2 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                {filteredBooks.map((book) => (
                  <Link
                    key={book._id}
                    to={`/discover/books/${book._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    <div className="font-bold">{book.titre}</div>
                    <div className="text-xs text-gray-500">{book.auteur}</div>
                    <div className="text-xs text-gray-500">
                      {book.categorie} - {book.anneePublication}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full p-1 mx-1 lg:mx-2 text-white"
          >
            <span className="sr-only">Toggle dark mode</span>
            {theme === "dark" ? (
              <FaSun className="h-5 w-5" />
            ) : (
              <FaMoon className="h-5 w-5" />
            )}
          </button>

          {/* Right side icons */}
          {user ? (
            <div className="flex items-center">
              {/* Profile icon */}
              <div
                className="relative ml-1 lg:ml-2 text-white"
                ref={dropdownRef}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.nom}&background=random`}
                  alt={user?.nom}
                  className="flex h-8 cursor-pointer w-8 rounded-full ring-4 ring-[#7549a6] bg-[#7549a6] dark:bg-[#7549a6] text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setDropdown(!dropdown)}
                  aria-hidden="true"
                />

                <div
                  className={`absolute z-50 flex-col right-0 px-3 py-1 mt-2 gap-1 w-64 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                    dropdown ? "flex" : "hidden"
                  }`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 ">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.nom}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>

                  <ul className="pb-2 pt-0" aria-labelledby="user-menu-button">
                    {clientNavItems &&
                      clientNavItems.map((navLink, index) => (
                        <li key={index}>
                          <Link
                            to={navLink.to}
                            className="block rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            {navLink.label}
                          </Link>
                        </li>
                      ))}

                    {adminNavItems && user.role === "admin" && (
                      <>
                        <hr className="border-gray-300 dark:border-gray-600" />
                        {adminNavItems.map((navLink, index) => (
                          <li key={index}>
                            <Link
                              to={navLink.to}
                              className="block rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              {navLink.label}
                            </Link>
                          </li>
                        ))}
                      </>
                    )}

                    <li className="mt-2 border-t border-gray-300 dark:border-gray-600 pt-2">
                      <button
                        disabled={logoutLoding}
                        onClick={handleLogout}
                        className="block w-full rounded border-none px-4 py-2 text-sm bg-red-900 font-bold hover:bg-red-700 dark:hover:bg-red-700 text-gray-200 dark:hover:text-white"
                      >
                        {logoutLoding ? (
                          <div className="flex justify-center items-center">
                            <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                          </div>
                        ) : (
                          "Sign out"
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/auth/signin"
              className="flex text-white py-1 px-3 rounded-md mx-1 lg:mx-2 text-sm font-medium transition-colors duration-200 items-center dark:bg-[#7549a6] bg-[#7549a6] dark:hover:bg-[#8a63b8] hover:bg-[#8a63b8]"
            >
              <span className="inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu - slide down animation */}
      <div
        className={`${
          isMobileMenuOpen ? "md:hidden" : "md:hidden hidden"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-1 px-2 pt-2 pb-3 text-white">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium hover:bg-[#7549a6]"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-4 px-2 pb-2">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full rounded-full py-2 px-4 focus:outline-none focus:ring-2  bg-[#7549a6] dark:bg-[#8961b3] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {isSearchFocused && filteredBooks.length > 0 && (
              <div className="mt-2 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg">
                {filteredBooks.map((book) => (
                  <Link
                    key={book._id}
                    to={`/discover/books/${book._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    <div className="font-bold">{book.titre}</div>
                    <div className="text-xs text-gray-500">{book.auteur}</div>
                    <div className="text-xs text-gray-500">
                      {book.categorie} - {book.anneePublication}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
