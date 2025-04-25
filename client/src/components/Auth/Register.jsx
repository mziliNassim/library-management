import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { clientsApiURL } from "../../services/api";

const Register = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: false });
  const [data, setData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${clientsApiURL}/register`, data);

      setAlert({
        message: response.data.message || "Account created successfully!",
        success: false,
      });
      onSuccess(response.data);
    } catch (error) {
      // console.error("Registration failed:", error);
      setAlert({
        message:
          error.response?.data?.message ||
          "An error occurred during registration.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-4 md:p-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Create Account
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Join our learning platform today
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-3">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="nom"
            placeholder="John Doe"
            value={data.nom}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 mt-1 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

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
            className="w-full px-3 py-1.5 mt-1 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-gray-100"
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
            minLength="6"
            className="w-full px-3 py-1.5 mt-1 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={data.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 mt-1 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="flex items-start mt-2">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700"
          />
          <label className="ml-2 block text-xs text-gray-700 dark:text-gray-400">
            I agree to the{" "}
            <Link
              to="/terms-of-service"
              className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] dark:bg-purple-700 dark:hover:bg-purple-600"
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
            "Create Account"
          )}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
