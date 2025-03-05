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
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import NotFound from "./pages/NotFound.jsx";
import UserProfile from "./pages/ProfilePage.jsx";
import UserEmprunts from "./pages/UserEmpruntsPage.jsx";
import AdminManageClients from "./pages/AdminManageClients.jsx";
import AdminManageClientsDeatails from "./pages/AdminManageClientsDeatails.jsx";
import AdminManageClientsEdit from "./pages/AdminManageClientsEdit.jsx";
import AdminManageBooks from "./pages/AdminManageBooks.jsx";
import AdminManageBooksCreate from "./pages/AdminManageBooksCreate.jsx";
import BooksDetails from "./pages/BooksDetails.jsx";

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
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/signin" element={<Login />} />

              {/* Books */}
              <Route path="/discover/books" element={<Books />} />
              <Route path="/discover/books/:id" element={<BooksDetails />} />

              {/* User */}
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/emprunts" element={<UserEmprunts />} />

              {/* Admin */}
              <Route
                path="/admin/manage-clients"
                element={<AdminManageClients />}
              />
              <Route
                path="/admin/manage-clients/:id"
                element={<AdminManageClientsDeatails />}
              />
              <Route
                path="/admin/manage-clients/edit/:id"
                element={<AdminManageClientsEdit />}
              />
              <Route
                path="/admin/manage-books"
                element={<AdminManageBooks />}
              />
              <Route
                path="/admin/manage-books/create"
                element={<AdminManageBooksCreate />}
              />

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
