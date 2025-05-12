import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Login from "../components/Auth/Login.jsx";

import Lottie from "react-lottie";
import animationData from "../animation/book.json";
import { setUser } from "../features/UserSlice.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (userData) => {
    dispatch(
      setUser({
        ...userData.data.client,
        token: userData.data.token,
      })
    );
    navigate("/");
  };

  useEffect(() => {
    document.title = "LibriTech - Authentification";
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <main className="flex-1 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:shadow-gray-900">
              <div className="flex flex-col md:flex-row">
                {/* Login Form Section */}
                <div className="w-full md:w-1/2 p-4 md:p-6">
                  <Login onLogin={handleLogin} />

                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/auth/register"
                      className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Create account
                    </Link>
                  </p>
                </div>

                {/* Lottie Animation Section */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 items-center justify-center p-4">
                  <div className="max-w-xs">
                    <Lottie options={lottieOptions} height={200} width={200} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginPage;
