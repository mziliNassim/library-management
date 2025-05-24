import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock, EyeClosed, Eye } from "lucide-react";
import { clientsApiURL } from "../services/api";
import axios from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const [hidPassword, setHidPassword] = useState(true);
  const [hidPasswordConfirm, setHidPasswordConfirm] = useState(true);

  const { token } = useParams();

  useEffect(() => {
    document.title = "LibriTech - Authentification";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match", success: false });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${clientsApiURL}/reset-password/${token}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsSuccess(true);
      setPassword("");
      navigate("/auth/signin");
      setConfirmPassword("");
      toast.success(data?.message || "", {
        action: { label: "✖️" },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "", {
        action: { label: "✖️" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white overflow-y-hidden dark:bg-gray-900">
      <div className="flex items-center justify-center max-w-screen-xl w-full px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="max-w-md w-full bg-gray-200 dark:bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-[#9333ea] text-transparent bg-clip-text">
              {isSuccess ? "Password reset successfully!" : "Reset Password"}
            </h2>

            {alert.message !== "" && (
              <div
                id="alert-1"
                className={`flex items-center justify-between p-4 mb-4  rounded-lg ${
                  alert.success
                    ? "text-green-800 dark:text-green-400 bg-green-50 "
                    : "text-red-800 dark:text-red-400 bg-red-50 "
                }  dark:bg-gray-800 `}
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>

                <span className="sr-only">Info</span>

                <div className="ms-3 text-sm font-medium">{alert.message}</div>

                <button
                  onClick={() => setAlert({ message: "", success: "" })}
                  type="button"
                  className={`ms-auto transition-all rounded-lg focus:ring-2 dark:bg-gray-800 dark:hover:bg-gray-700  p-1.5 inline-flex items-center justify-center h-8 w-8 ${
                    alert.success
                      ? "focus:ring-green-400 dark:text-green-400 bg-green-100 text-green-500"
                      : "focus:ring-red-400 dark:text-red-400 bg-red-100 text-red-500"
                  }  `}
                  data-dismiss-target="#alert-1"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}

            {isSuccess ? (
              <div className="flex items-center justify-center">
                <div className="bg-[#6a3de8] text-white text-4xl w-14 h-14 flex items-center justify-center rounded-full">
                  ✓
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="text-lg text-[#9333ea]" />
                  </div>
                  <input
                    type={hidPassword ? "password" : "text"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 outline-none bg-gray-200 dark:bg-gray-800 bg-opacity-50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#9333ea] focus:ring-2 focus:ring-[#9333ea] text-gray-900 dark:text-gray-50 placeholder-gray-600 dark:placeholder-gray-400 transition duration-200"
                  />

                  <div
                    onClick={() => setHidPassword(!hidPassword)}
                    className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer"
                  >
                    {hidPassword ? (
                      <Eye className="bi bi-eye text-lg text-gray-500" />
                    ) : (
                      <EyeClosed className="bi bi-eye-slash text-lg text-gray-500" />
                    )}
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="text-lg text-[#9333ea]" />
                  </div>
                  <input
                    type={hidPasswordConfirm ? "password" : "text"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 outline-none bg-gray-200 dark:bg-gray-800 bg-opacity-50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#9333ea] focus:ring-2 focus:ring-[#9333ea] text-gray-900 dark:text-gray-50 placeholder-gray-600 dark:placeholder-gray-400 transition duration-200"
                  />
                  <div
                    onClick={() => setHidPasswordConfirm(!hidPasswordConfirm)}
                    className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer"
                  >
                    {hidPasswordConfirm ? (
                      <Eye className="bi bi-eye text-lg text-gray-500" />
                    ) : (
                      <EyeClosed className="bi bi-eye-slash text-lg text-gray-500" />
                    )}
                  </div>
                </div>

                <button
                  className="w-full py-3 px-4 bg-[#9333ea] text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring--[#9333ea] focus:ring-offset-2 transition duration-200"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Set New Password"}
                </button>
              </form>
            )}
          </div>

          <div className="px-8 py-4 bg-gray-300 dark:bg-gray-900 bg-opacity-50 flex justify-center">
            <Link
              to={"/auth/signin"}
              className="text-sm text-blue-400 hover:underline flex items-center"
            >
              <i className="bi bi-arrow-left h-4 w-4 mr-2"></i>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
