import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/UseFetch";
import { AuthContext } from "../../../providers/AuthProvider";
import { IRoutes } from "../../../types/routType";

export const AdminRoutes = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { GET, data } = useFetch("http://localhost:3001");
  const [routes, setRoutes] = useState<IRoutes[]>([]);

  useEffect(() => {
    GET("routs");
    console.log(1);
  }, []);

  useEffect(() => {
    if (data) {
      setRoutes(data);
      console.log(2);
    }
  }, [data]);

  return (
    <>
      <h1>List of all lines</h1>
      {user &&
        routes.map((rout) => (
          <div>
            <h2>{rout.lineNumber}</h2>
            <p>{rout.name}</p>
            <p>{rout.stations}</p>
            {/* <p>{rout.schedule}</p> */}
          </div>
        ))}
    </>
  );
};
