import { AdminUsers } from "./adminUsers/AdminUsers";
import { AdminRoutes } from "./adminRouts/AdminRoutes";
import { AdminBuses } from "./adminBuses/AdminBuses";

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
