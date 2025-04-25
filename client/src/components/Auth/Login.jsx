import { useState } from "react";
import { clientsApiURL } from "../../services/api";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false); // Toggle forgot password mode
  const [resetEmail, setResetEmail] = useState(""); // Email for password reset
  const [resetMessage, setResetMessage] = useState(""); // Reset email response
  const [alert, setAlert] = useState({
    message: "",
    success: false,
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${clientsApiURL}/login`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.data?.success) {
        setAlert({
          message: response.data?.message || "Login successful!",
          success: true,
        });
        onLogin(response.data);
      } else {
        setAlert({
          message: response.data?.message || "Login failed. Please try again!",
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        message:
          error.response?.data?.message || "Network error. Please try again.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetMessage("");

    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(`${clientsApiURL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const result = await response.json();
      if (response.ok) {
        setResetMessage(
          result.message || "A reset link has been sent to your email."
        );
      } else {
        setResetMessage(result.message || "Failed to send reset email.");
      }
    } catch {
      setResetMessage(result.message || "Network error. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 md:p-8">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {forgotPassword ? "Reset Password" : "Welcome Back!"}
        </h2>
        {!forgotPassword && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue learning
          </p>
        )}
      </div>

      {alert.message && (
        <div
          className={`text-center mb-3 ${
            alert.success
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {alert.message}
        </div>
      )}

      {forgotPassword ? (
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="resetEmail"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition bg-white dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          {resetMessage && (
            <div className="text-green-600 dark:text-green-400 text-center">
              {resetMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition"
          >
            Send Reset Link
          </button>

          <button
            type="button"
            className="w-full text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition mt-2"
            onClick={() => setForgotPassword(false)}
          >
            Back to Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition bg-white dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition bg-white dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div className="flex justify-between text-sm">
            <button
              type="button"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition"
              onClick={() => setForgotPassword(true)}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition"
            disabled={loading}
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
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
              "Sign in"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
