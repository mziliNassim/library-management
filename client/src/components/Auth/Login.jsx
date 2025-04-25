import { useState } from "react";
import { clientsApiURL } from "../../services/api";
import LoginForm from "../UI/LoginForm.jsx";
import RestPasswordForm from "../UI/RestPasswordForm.jsx";
import axios from "axios";
import ManagementAlert from "../UI/ManagementAlert.jsx";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [forgotPasswordUI, setForgotPasswordUI] = useState(false);
  const [submited, setSubmited] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    success: false,
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const toggleForgotPasswordUI = () => {
    setForgotPasswordUI(!forgotPasswordUI);
    setAlert({ message: "", success: false });
    setLoading(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${clientsApiURL}/login`, data, {
        headers: { "Content-Type": "application/json" },
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
    setLoading(true);

    setAlert({
      message: "",
      success: false,
    });

    try {
      const response = await axios.post(
        `${clientsApiURL}/forgot-password`,
        { email: data.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.success) {
        setAlert({
          message:
            response.data?.message ||
            "A reset link has been sent to your email!",
          success: true,
        });
        setSubmited(true);
        setTimeout(() => {
          setSubmited(false);
          setForgotPasswordUI(false);
          setAlert({ message: "", success: false });
          setData({
            email: "",
            password: "",
          });
        }, 3000);
      } else {
        setAlert({
          message: response.data?.message || "Failed to send reset email!",
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        message:
          error.response?.data?.message || "Network error. Please try again!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-8">
      {/* Form header */}
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {forgotPasswordUI ? "Reset Password" : "Welcome Back!"}
        </h2>
        {!forgotPasswordUI && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue learning
          </p>
        )}
      </div>

      {alert.message && (
        <ManagementAlert alert={alert} setAlert={setAlert} close={false} />
      )}

      {forgotPasswordUI ? (
        <RestPasswordForm
          handlePasswordReset={handlePasswordReset}
          data={data}
          alert={alert}
          handleChange={handleChange}
          toggleForgotPasswordUI={toggleForgotPasswordUI}
          loading={loading}
          submited={submited}
        />
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          handleChange={handleChange}
          loading={loading}
          data={data}
          toggleForgotPasswordUI={toggleForgotPasswordUI}
        />
      )}
    </div>
  );
};

export default Login;
