import React, { useMemo, useState } from "react";
import { Camera, Upload, User, Mail, MapPin } from "lucide-react";
import UserSideBar from "../components/UI/UserSideBar";
import { useSelector } from "react-redux";
import { avatar } from "../services/data";
import axios from "axios";
import { clientsApiURL } from "../services/api";

const ProfileEditPage = () => {
  const { user } = useSelector((state) => state.user);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: user?.nom,
    email: user?.email,
    adresse: user?.adresse,
    avatar: avatar,
  });

  // Authentification Required
  useMemo(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, avatar: reader.result });
    };
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      // fetch request
      const response = await axios(`${clientsApiURL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: { ...formData, avatar: undefined },
      });
      console.log(" handleSubmit ~ response:", response.data);
    } catch (error) {
      console.log(" handleSubmit ~ error:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Placeholder */}
          <UserSideBar />

          {/* Main Content */}
          <div className="md:w-3/4 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <User className="mr-3 text-blue-500" size={24} />
                Éditer le profil
              </h2>
            </div>

            {/* content */}
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
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

              {/* picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo de profil
                </label>
                <div className="flex items-center space-x-4">
                  <img
                    src={formData?.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 bg-[#8961b3] text-white rounded-lg hover:bg-[#9570ba] transition-colors"
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
                  className="w-fit p-3 bg-[#8961b3] text-white rounded-lg hover:bg-[#9570ba] transition-colors flex items-center justify-center space-x-2"
                >
                  {submitLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    <>
                      <Camera size={20} />
                      <span>Mettre à jour le profil</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
