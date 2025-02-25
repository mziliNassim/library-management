const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the Apps API",
    documentation: "https://gestion-bibliotique.apidog.io/",
    github: "https://github.com/mzilinassim/library-management",
    gitlab: "https://gitlab.com/mzilinassim/library-management",
    endpoints: {
      Clients: {
        Authentification: {
          register: {
            method: "POST",
            access: "Public",
            url: "/api/clients/register",
          },
          login: {
            method: "POST",
            access: "Public",
            url: "/api/clients/login",
          },
          logout: {
            method: "POST",
            access: "Client",
            url: "/api/clients/logout",
          },
        },
        Profile: {
          updateProfile: {
            method: "PUT",
            access: "Client",
            url: "/api/clients/profile",
          },
          updatePassword: {
            method: "PUT",
            access: "Client",
            url: "/api/clients/password",
          },
          getClientDetails: {
            method: "GET",
            access: "Client",
            url: "/api/clients/me",
          },
          getEmprunts: {
            method: "GET",
            access: "Client",
            url: "/api/clients/emprunts",
          },
        },
        CRUD: {
          getAllClients: {
            method: "GET",
            access: "Admin",
            url: "/api/clients/",
          },
          getClientById: {
            method: "GET",
            access: "Admin",
            url: "/api/clients/:id",
          },
          updateClient: {
            method: "PUT",
            access: "Admin",
            url: "/api/clients/:id",
          },
          deleteClient: {
            method: "DELETE",
            access: "Admin",
            url: "/api/clients/:id",
          },
        },
      },
      Livres: {
        getAllLivers: {
          method: "GET",
          access: "Public",
          url: "/api/livres/",
        },
        getLiverById: {
          method: "GET",
          access: "Public",
          url: "/api/livres/:id",
        },
        addLivre: {
          method: "POST",
          access: "Admin",
          url: "/api/livres/",
        },
        updateLivre: {
          method: "PUT",
          access: "Admin",
          url: "/api/livres/:id",
        },
        deleteLivre: {
          method: "DELETE",
          access: "Admin",
          url: "/api/livres/:id",
        },
      },
      Emprunts: {
        createEmprunt: {
          method: "POST",
          access: "Client",
          url: "/api/emprunts/",
        },
        getEmpruntById: {
          method: "GET",
          access: "Client",
          url: "/api/emprunts/",
        },
        updateEmprunt: {
          method: "PUT",
          access: "Admin",
          url: "/api/emprunts/",
        },
        deleteEmprunt: {
          method: "DELETE",
          access: "Admin",
          url: "/api/emprunts/",
        },
        getAllEmprunts: {
          method: "GET",
          access: "Admin",
          url: "/api/emprunts/",
        },
        getEmpruntsByClient: {
          method: "GET",
          access: "Admin",
          url: "/api/emprunts/",
        },
        returnEmprunt: {
          method: "POST",
          access: "Client",
          url: "/api/emprunts/",
        },
      },
      Categories: {
        getAllCategories: {
          method: "GET",
          access: "Public",
          url: "/api/categories/",
        },
        getCategorieById: {
          method: "GET",
          access: "Public",
          url: "/api/categories/:id",
        },
        addCategorie: {
          method: "POST",
          access: "Admin",
          url: "/api/categories/",
        },
        updateCategorie: {
          method: "PUT",
          access: "Admin",
          url: "/api/categories/:id",
        },
        deleteCategorie: {
          method: "DELETE",
          access: "Admin",
          url: "/api/categories/:id",
        },
      },
    },
  });
});

module.exports = router;
