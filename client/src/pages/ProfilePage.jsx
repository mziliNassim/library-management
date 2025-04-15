import React, { useEffect, useState } from "react";
import {
  Camera,
  Upload,
  Github,
  User,
  Mail,
  MapPin,
  Loader,
  LinkIcon,
  Lock,
  Linkedin,
  Globe,
  FileText,
} from "lucide-react";

import UserSideBar from "../components/UI/UserSideBar";
import ManagementAlert from "../components/UI/ManagementAlert.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clientsApiURL } from "../services/api";
import { setUser } from "../features/UserSlice.jsx";
import { compressImage, encodeToBase64 } from "../utils/Base64.js";

const ProfileEditPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", success: true });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    profilePic: "",
    nom: "",
    email: "",
    adresse: "",
    socials: {
      linkedin: "",
      website: "",
      github: "",
      bio: "",
    },
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Authentification Required
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  // fetch user infos
  const fetchUserInfos = async () => {
    setLoading(true);
    try {
      const response = await axios(`${clientsApiURL}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setFormData({
        nom: response.data?.data?.client?.nom || "",
        email: response.data?.data?.client?.email || "",
        adresse: response.data?.data?.client?.adresse || "",
        socials: {
          linkedin: response.data?.data?.client?.socials?.linkedin || "",
          website: response.data?.data?.client?.socials?.website || "",
          github: response.data?.data?.client?.socials?.github || "",
          bio: response.data?.data?.client?.socials?.bio || "",
        },
      });

      dispatch(setUser({ ...response.data?.data?.client, token: user.token }));
    } catch (error) {
      setAlert({
        message:
          error?.response?.data?.message ||
          "Une erreur s'est produite lors de la récupération des informations de l'utilisateur!",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfos();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(" ProfileEditPage ~ formData:", formData);
  };

  // Handle Social Form Change
  const handleSocialChange = (e) => {
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle Password Change
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const fileBase64 = await encodeToBase64(file);
    setFormData({ ...formData, profilePic: fileBase64 });
  };

  // handle profile form submit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // Ensure formData only contains allowed fields
      const allowedUpdates = [
        "profilePic", // base64
        "nom",
        "email",
        "adresse",
        "socials",
      ];

      const filteredData = {};
      Object.keys(formData).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          filteredData[key] = formData[key];
        }
      });

      // Compress profile picture if it exists
      if (formData.profilePic && formData.profilePic.startsWith("data:image")) {
        filteredData.profilePic = await compressImage(formData.profilePic);
      }

      // Send the PUT request with the filtered data
      const response = await axios.put(
        `${clientsApiURL}/profile`,
        filteredData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      fetchUserInfos();
      setAlert({
        message: response?.data?.message || "Profil mis à jour avec succès!",
        success: true,
      });
    } catch (error) {
      setAlert({
        message:
          error.response?.data?.message || "Échec de la mise à jour du profil!",
        success: false,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  // handle password form submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const response = await axios.put(
        `${clientsApiURL}/password`,
        passwordData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setAlert({
        message:
          response.data?.message || "Mot de passe mis à jour avec succès!",
        success: true,
      });

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setAlert({
        message:
          error.response?.data?.message ||
          "Échec de la mise à jour du mot de passe!",
        success: false,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Render profile form
  const renderProfileForm = () => (
    <form className="p-6 space-y-6" onSubmit={handleProfileSubmit}>
      {alert.message && <ManagementAlert alert={alert} setAlert={setAlert} />}

      {/* name and email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom Complet
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={formData?.nom}
              name="nom"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={20} />
            </div>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={formData?.email}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
            />
          </div>
        </div>
      </div>

      {/* adresse */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Adresse
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            value={formData?.adresse}
            onChange={handleChange}
            name="adresse"
            placeholder="Votre adresse"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4 p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <LinkIcon className="mr-2 text-blue-500" size={20} />
          Réseaux sociaux et bio
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Linkedin className="text-gray-400" size={20} />
              </div>
              <input
                type="url"
                value={formData.socials.linkedin}
                name="linkedin"
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/in/votre-profile"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Web
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="text-gray-400" size={20} />
              </div>
              <input
                type="url"
                value={formData.socials.website}
                name="website"
                onChange={handleSocialChange}
                placeholder="https://votre-site.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Github className="text-gray-400" size={20} />
              </div>
              <input
                type="url"
                value={formData.socials.github}
                name="github"
                onChange={handleSocialChange}
                placeholder="https://github.com/votre-username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FileText className="text-gray-400" size={20} />
            </div>
            <textarea
              value={formData.socials.bio}
              name="bio"
              onChange={handleSocialChange}
              placeholder="Parlez-nous un peu de vous..."
              rows="4"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
            />
          </div>
        </div>
      </div>

      {/* picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Photo de profil
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-blue-500 p-1">
            <img
              src={
                formData?.profilePic ||
                user?.profilePic ||
                `https://ui-avatars.com/api/?name=${user?.nom}&background=random`
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <div className="relative">
            <input
              type="file"
              accept=".png, .jpg, jpeg, .ico"
              onChange={(e) => handleImageUpload(e)}
              name="profilePic"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md"
            >
              <Upload className="mr-2" size={20} />
              Télécharger
            </button>
          </div>
        </div>
      </div>

      {/* submit button */}
      <div className="pt-4 flex items-center justify-end border-t border-gray-100 dark:border-gray-700">
        <button
          disabled={submitLoading}
          type="submit"
          className="w-fit px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center space-x-2 transform hover:scale-105 duration-200"
        >
          {submitLoading ? (
            <div className="flex justify-center items-center">
              <Loader className="h-5 w-5 text-white animate-spin" />
            </div>
          ) : (
            <>
              <Camera size={20} />
              <span>Mettre à jour le profil</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  // Render password form
  const renderPasswordForm = () => (
    <form className="p-6 space-y-6" onSubmit={handlePasswordSubmit}>
      {alert.message && <ManagementAlert alert={alert} setAlert={setAlert} />}

      <div className="space-y-4 p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Lock className="mr-2 text-blue-500" size={20} />
          Mettre à jour le mot de passe
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mot de passe actuel
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={20} />
            </div>
            <input
              type="password"
              value={passwordData.oldPassword}
              name="oldPassword"
              onChange={handlePasswordChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                value={passwordData.newPassword}
                name="newPassword"
                onChange={handlePasswordChange}
                required
                minLength="8"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Au moins 8 caractères
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                value={passwordData.confirmPassword}
                name="confirmPassword"
                onChange={handlePasswordChange}
                required
                minLength="8"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* submit button */}
      <div className="pt-4 flex items-center justify-end border-t border-gray-100 dark:border-gray-700">
        <button
          disabled={submitLoading}
          type="submit"
          className="w-fit px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center space-x-2 transform hover:scale-105 duration-200"
        >
          {submitLoading ? (
            <div className="flex justify-center items-center">
              <Loader className="h-5 w-5 text-white animate-spin" />
            </div>
          ) : (
            <>
              <Lock size={20} />
              <span>Mettre à jour le mot de passe</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <UserSideBar />

          {/* Main Content */}
          <div className="md:w-3/4 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <User className="mr-3 text-blue-500" size={24} />
                Éditer le profil
              </h2>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setAlert({ message: "", success: true });
                }}
                className={`px-6 py-3 font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === "profile"
                    ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <User size={18} />
                <span>Informations du profil</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("password");
                  setAlert({ message: "", success: true });
                }}
                className={`px-6 py-3 font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === "password"
                    ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Lock size={18} />
                <span>Mot de passe</span>
              </button>
            </div>

            {/* content */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="h-8 w-8 text-blue-500 animate-spin" />
              </div>
            ) : (
              <>
                {activeTab === "profile" && renderProfileForm()}
                {activeTab === "password" && renderPasswordForm()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
