import React from "react";
import { AdminUsers } from "./adminUsers/AdminUsers";
import { AdminRoutes } from "./adminRouts/AdminRoutes";
import { AdminBuses } from "./adminBuses/AdminBuses";
import { NavLink } from "react-router-dom";
// import "app.css";

export const Admin = () => {
  return (
    <>
      <div>
        <AdminUsers />
        <AdminRoutes />
        <AdminBuses />
      </div>
    </>
  );
};
