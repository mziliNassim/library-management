import React, { useEffect, useMemo, useState } from "react";
import UserSideBar from "../components/UI/UserSideBar";
import { useSelector } from "react-redux";
import { clientsApiURL, empruntsApiURL, livresApiURL } from "../services/api";
import axios from "axios";

import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";

const UserEmpruntsPage = () => {
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingReturn, setLoadingReturn] = useState(false);
  const [myDbEmprunts, setMyDbEmprunts] = useState([]);
  const [filter, setFilter] = useState("all");

  // Authentification Required
  useMemo(() => {
    document.title = "LibriTech - Emprunts";

    if (!user) window.location.href = "/";
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
              setMessage(error.message);
              return;
            }
          }
          setMyDbEmprunts(myEmprunts);
        }
      } catch (error) {
        setMessage(
          error?.response?.data?.message ||
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
          icon: AlertCircle,
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

  // Filter emprunts based on the selected status
  const filteredEmprunts = useMemo(() => {
    if (filter === "all") {
      return myDbEmprunts;
    }
    return myDbEmprunts.filter((emprunt) => emprunt.statut === filter);
  }, [myDbEmprunts, filter]);

  // handle return book
  const returnEmprunt = async (id) => {
    setLoadingReturn(true);
    try {
      const response = await axios.post(
        `${empruntsApiURL}/${id}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data?.success) {
        // Update the local state to reflect the returned book
        setMyDbEmprunts((prevEmprunts) =>
          prevEmprunts.map((emprunt) =>
            emprunt._id === id
              ? {
                  ...emprunt,
                  statut: "retourné",
                  dateRetourEffectif: new Date().toISOString(),
                }
              : emprunt
          )
        );

        setMessage(response?.data?.message || "Livre retourné avec succès!");
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Une erreur est survenue lors du retour du livre"
      );
    } finally {
      setLoadingReturn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Placeholder */}
          <UserSideBar />

          {/* Main Content */}
          <div className="md:w-3/4  bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <BookOpen className="mr-3 text-blue-500" size={24} />
                Mes Emprunts
              </h2>

              {/* Filter Dropdown */}
              <div className="">
                <label htmlFor="status-filter" className="sr-only">
                  Filtrer par statut
                </label>
                <select
                  id="status-filter"
                  className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Tous</option>
                  <option value="en cours">En cours</option>
                  <option value="retourné">Retourné</option>
                  <option value="en retard">En retard</option>
                </select>
              </div>
            </div>

            {/* Emprunts List */}
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
              ) : filteredEmprunts?.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  {message ? message : "Aucun emprunt en cours ou historique!"}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEmprunts?.map((emprunt) => {
                    const StatusIcon = getStatusStyle(emprunt.statut).icon;
                    const statusStyles = getStatusStyle(emprunt.statut);

                    return (
                      <div
                        key={emprunt._id}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-3 rounded-full ${statusStyles.color} bg-opacity-10`}
                            >
                              <StatusIcon
                                className={`w-6 h-6 ${statusStyles.color}`}
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                                {emprunt.livre?.titre || "Titre inconnu"}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {emprunt.livre?.auteur || "Auteur inconnu"}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles.color} bg-opacity-10`}
                            >
                              <StatusIcon
                                className={`w-4 h-4 mr-1 ${statusStyles.color}`}
                              />
                              {statusStyles.label}
                            </div>

                            <div className="mt-3 space-y-1">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                Emprunté le: {formatDate(emprunt.dateEmprunt)}
                              </div>

                              {emprunt.statut === "retourné" ? (
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Retourné le:{" "}
                                  {formatDate(emprunt.dateRetourEffectif)}
                                </div>
                              ) : (
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Retour prévu:{" "}
                                  {formatDate(emprunt.dateRetourPrevu)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {emprunt.statut === "en cours" && (
                          <div className="mt-4 flex justify-end">
                            <button
                              disabled={loadingReturn}
                              onClick={() => returnEmprunt(emprunt._id)}
                              className="group relative px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg overflow-hidden transition-all duration-300 hover:from-green-600 hover:to-green-700"
                            >
                              {loadingReturn ? (
                                <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                              ) : (
                                <>
                                  <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 transform group-hover:rotate-180 transition-transform duration-300"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Retourner le livre
                                  </span>
                                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                </>
                              )}
                            </button>
                          </div>
                        )}
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
