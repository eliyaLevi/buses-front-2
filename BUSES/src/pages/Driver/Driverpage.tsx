import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const Driverpage = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      <button onClick={() => authContext!.logout()}>logout</button>
    </>
  );
};
