import React from "react";
import { AdminUsers } from "./adminUsers/AdminUsers";
import { AdminRoutes } from "./adminRouts/AdminRoutes";
import { AdminBuses } from "./adminBuses/AdminBuses";

export const Admin = () => {
  return (
    <>
      Admin
      <AdminUsers />
      <AdminRoutes />
      <AdminBuses />
    </>
  );
};
