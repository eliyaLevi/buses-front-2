import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Driverpage } from "../pages/Driver/Driverpage";
import { Admin } from "../pages/admin/Admin";

export const Displey = () => {
  const { user } = useContext(AuthContext) ?? {};
  console.log(user?.role);

  return <>{user?.role === "admin" ? <Admin /> : <Driverpage />}</>;
};
