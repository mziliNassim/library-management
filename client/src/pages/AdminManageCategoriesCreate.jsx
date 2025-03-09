import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const AdminManageCategoriesCreate = () => {
  const { user } = useSelector((state) => state.user);

  // Authentification Required as 'admin'
  useMemo(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <div className="text-black dark:text-white flex items-center justify-center h-[50vh]">
      AdminManageCategoriesCreate
    </div>
  );
};

export default AdminManageCategoriesCreate;
