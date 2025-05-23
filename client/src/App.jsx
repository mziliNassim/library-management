import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster } from "sonner";

import { clientsApiURL } from "./services/api.js";

import { clearUser, setUser } from "./features/UserSlice.jsx";
import { setTheme } from "./features/themeSlice.jsx";

import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";
import LoadingApp from "./components/UI/LoadingApp.jsx";

import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

import ContactUs from "./pages/ContactUs.jsx";
import AboutUS from "./pages/AboutUS.jsx";
import FAQ from "./pages/FAQ.jsx";

import Blog from "./pages/Blog.jsx";
import BlogArticle from "./pages/BlogArticle.jsx";
import EditArticle from "./pages/EditArticle.jsx";

import Books from "./pages/Books.jsx";
import BooksDetails from "./pages/BooksDetails.jsx";

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
  const location = useLocation();

  // check local storage (user && theme)
  useEffect(() => {
    const checkLocalStorage = async () => {
      setLoading(true);
      // check local storage for user
      const user = await localStorage.getItem("user");
      if (user) {
        // Valid Token
        const parsedUser = JSON.parse(user);
        const token = parsedUser?.token;

        try {
          const response = await axios.get(
            `${clientsApiURL}/validToken/${token}`
          );

          if (response.data?.success) {
            const response = await axios.get(
              `${clientsApiURL}/me`,

              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // set user data in global data (redux)
            dispatch(setUser({ ...response.data.data.client, token }));
          } else dispatch(clearUser());
        } catch (error) {
          // Clear local storage
          dispatch(clearUser());
        }
      }

      // check local storage for theme
      const theme = localStorage.getItem("theme");
      if (theme) dispatch(setTheme(theme));
      else dispatch(setTheme("light"));

      setLoading(false);
    };
    checkLocalStorage();
  }, []);

  // smoth scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {loading ? (
          <LoadingApp />
        ) : (
          <>
            <Toaster theme={theme} />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />

              {/* libriTech */}
              <Route path="/libriTech">
                <Route path="" element={<AboutUS />} />
                <Route path="about-us" element={<AboutUS />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogArticle />} />
                <Route path="blog/edit/:id" element={<EditArticle />} />
                <Route path="FAQ" element={<FAQ />} />
              </Route>

              {/* Authentification */}
              <Route path="/auth">
                <Route path="" element={<Register />} />
                <Route path="register" element={<Register />} />
                <Route path="signin" element={<Login />} />
                <Route
                  path="reset-password/:token"
                  element={<ResetPasswordPage />}
                />
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
