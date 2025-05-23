const serverURL =
  import.meta.env.VITE_ENV === "dev"
    ? import.meta.env.VITE_SERVER_URL_DEV
    : import.meta.env.VITE_SERVER_URL_PROD;

export const clientsApiURL = `${serverURL}/api/clients`;

export const livresApiURL = `${serverURL}/api/livres`;

export const empruntsApiURL = `${serverURL}/api/emprunts`;

export const categoriesApiURL = `${serverURL}/api/categories`;

export const blogApiURL = `${serverURL}/api/blog`;
