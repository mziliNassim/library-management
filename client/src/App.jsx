import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./features/UserSlice.jsx";
import { setTheme } from "./features/themeSlice.jsx";

import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";
import Loader from "./components/UI/Loader.jsx";

import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";

import Home from "./pages/Home.jsx";
import Books from "./pages/Books.jsx";
import BooksDetails from "./pages/BooksDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

import UserProfile from "./pages/ProfilePage.jsx";
import UserEmprunts from "./pages/UserEmpruntsPage.jsx";
import UserBooksWishlist from "./pages/UserBooksWishlist.jsx";

import AdminManageClients from "./pages/AdminManageClients.jsx";
import AdminManageClientsDeatails from "./pages/AdminManageClientsDeatails.jsx";
import AdminManageClientsEdit from "./pages/AdminManageClientsEdit.jsx";

import AdminManageBooks from "./pages/AdminManageBooks.jsx";
import AdminManageBooksEdit from "./pages/AdminManageBooksEdit.jsx";
import AdminManageBooksDeatails from "./pages/AdminManageBooksDeatails.jsx";
import AdminManageBooksCreate from "./pages/AdminManageBooksCreate.jsx";

import AdminManageCategories from "./pages/AdminManageCategories.jsx";
import AdminManageCategoriesCreate from "./pages/AdminManageCategoriesCreate.jsx";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // check local storage
  useEffect(() => {
    const checkLocalStorage = () => {
      setLoading(true);
      // check local storage for user
      const user = localStorage.getItem("user");
      if (user) dispatch(setUser(JSON.parse(user)));

      // check local storage for theme
      const theme = localStorage.getItem("theme");
      if (theme) dispatch(setTheme(theme));
      else dispatch(setTheme("light"));
      setLoading(false);
    };
    checkLocalStorage();
  }, []);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Authentification */}
              <Route path="/auth">
                <Route path="" element={<Register />} />
                <Route path="register" element={<Register />} />
                <Route path="signin" element={<Login />} />
              </Route>

              {/* Books */}
              <Route path="/discover">
                <Route path="" element={<Books />} />
                <Route path="books" element={<Books />} />
                <Route path="books/:id" element={<BooksDetails />} />
              </Route>

              {/* User */}
              <Route path="/user">
                <Route path="" element={<UserProfile />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="emprunts" element={<UserEmprunts />} />
                <Route path="books-wishlist" element={<UserBooksWishlist />} />
              </Route>

              {/* Admin */}
              <Route path="/admin">
                <Route path="" element={<AdminManageClients />} />
                <Route path="manage-clients" element={<AdminManageClients />} />
                <Route
                  path="manage-clients/:id"
                  element={<AdminManageClientsDeatails />}
                />
                <Route
                  path="manage-clients/edit/:id"
                  element={<AdminManageClientsEdit />}
                />
                <Route path="manage-books" element={<AdminManageBooks />} />
                <Route
                  path="manage-books/edit/:id"
                  element={<AdminManageBooksEdit />}
                />
                <Route
                  path="manage-books/:id"
                  element={<AdminManageBooksDeatails />}
                />
                <Route
                  path="manage-books/create"
                  element={<AdminManageBooksCreate />}
                />
                <Route
                  path="manage-categories"
                  element={<AdminManageCategories />}
                />
                <Route
                  path="manage-categories/create"
                  element={<AdminManageCategoriesCreate />}
                />
              </Route>

              {/* Legal */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Not Found Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
