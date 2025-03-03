import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./features/UserSlice.jsx";
import { setTheme } from "./features/themeSlice.jsx";

import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";

import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Home from "./pages/Home.jsx";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // check local storage
  useEffect(() => {
    // check local storage for user
    const user = localStorage.getItem("user");
    if (user) dispatch(setUser(JSON.parse(user)));

    // check local storage for theme
    const theme = localStorage.getItem("theme");
    if (theme) dispatch(setTheme(theme));
    else dispatch(setTheme("light"));
  }, []);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Authentification */}
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/signin" element={<Login />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
