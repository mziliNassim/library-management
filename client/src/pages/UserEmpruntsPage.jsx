import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import UserSideBar from "../components/UI/UserSideBar";
import { useSelector } from "react-redux";
import { clientsApiURL, livresApiURL } from "../services/api";
import axios from "axios";

const UserEmpruntsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [myDbEmprunts, setMyDbEmprunts] = useState([]);

  // Authentification Required
  useMemo(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  // Fetch Emprunts
  useEffect(() => {
    const fetchEmprunts = async () => {
      setLoading(true);
      try {
        const response = await axios(`${clientsApiURL}/emprunts`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const myEmprunts = response.data.data?.emprunts;

        if (myEmprunts.length > 0) {
          for (const emprunt of myEmprunts) {
            try {
              const livreId = emprunt.livreId;
              const response = await axios.get(`${livresApiURL}/${livreId}`);
              emprunt.livre = response.data.data?.livre;
            } catch (error) {
              console.log("Error fetching livre data:", error);
            }
          }
          setMyDbEmprunts(myEmprunts);
        }
      } catch (error) {
        setMessage(
          error?.response?.data?.message &&
            "Aucun emprunt en cours ou historique!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmprunts();
  }, [user]);

  // Status color and icon mapping
  const getStatusStyle = (statut) => {
    switch (statut) {
      case "en cours":
        return {
          color: "text-yellow-500",
          icon: Clock,
          label: "En cours",
        };
      case "retourné":
        return {
          color: "text-green-500",
          icon: CheckCircle2,
          label: "Retourné",
        };
      case "en retard":
        return {
          color: "text-red-500",
          icon: CheckCircle2,
          label: "En retard",
        };
      default:
        return {
          color: "text-red-500",
          icon: AlertCircle,
          label: "Inconnu",
        };
    }
  };

  // Date formatting utility
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Placeholder */}
          <UserSideBar />

          {/* Main Content */}
          <div className="md:w-3/4  bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <BookOpen className="mr-3 text-blue-500" size={24} />
                Mes Emprunts
              </h2>
            </div>

            {/* Emprunts List */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                </div>
              ) : myDbEmprunts?.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  {message ? message : "Aucun emprunt en cours ou historique!"}
                </div>
              ) : (
                <div className="space-y-4">
                  {myDbEmprunts?.map((emprunt) => {
                    const StatusIcon = getStatusStyle(emprunt.statut).icon;
                    const statusStyles = getStatusStyle(emprunt.statut);

                    return (
                      <div
                        key={emprunt._id}
                        className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <StatusIcon
                            className={`${statusStyles.color} w-8 h-8`}
                          />
                          <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-200">
                              {emprunt.livre?.titre || "Titre inconnu"}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {emprunt.livre?.auteur || "Auteur inconnu"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-semibold ${statusStyles.color}`}
                          >
                            {statusStyles.label}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Emprunté le: {formatDate(emprunt.dateEmprunt)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Retour prévu: {formatDate(emprunt.dateRetourPrevu)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEmpruntsPage;
