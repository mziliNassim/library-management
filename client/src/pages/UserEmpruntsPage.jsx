import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";
import UserSideBar from "../components/UI/UserSideBar";
import { useSelector } from "react-redux";
import { clientsApiURL, livresApiURL } from "../services/api";
import axios from "axios";

const UserEmpruntsPage = () => {
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [myDbEmprunts, setMyDbEmprunts] = useState([]);
  const [filter, setFilter] = useState("all"); // State for the selected filter

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
