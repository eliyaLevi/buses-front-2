import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/UseFetch";
import { AuthContext } from "../../../providers/AuthProvider";
import { IRoutes } from "../../../types/routType";
import { NavLink } from "react-router-dom";

export const AdminRoutes = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { GET, DELETE, data } = useFetch("https://buses-1.onrender.com");
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

  const deleteRoute = (id: string) => {
    DELETE("routs", id);
  };

  return (
    <>
      {/* <div className="list">
        <h1>List of all lines</h1>
        {user &&
          routes.map((rout) => (
            <div>
              <h2>{`lineNumber: ${rout.lineNumber}`}</h2>
              <p>{`target: ${rout.name}`}</p>
              <p>{`stations: ${rout.stations}`}</p>
              <p>
                {rout.schedule.map((s) => (
                  <p>
                    {`departureTime: ${s.departureTime}`}
                    {`arrivalTime: ${s.arrivalTime}`}
                    {`station: ${s.station}`}
                  </p>
                ))}
              </p>
              <NavLink to={`/edit-Route/${rout._id}`}>
                <button>edit route</button>
              </NavLink>
              <button onClick={() => deleteRoute(rout._id!)}>
                delete route
              </button>
            </div>
          ))}
        <div>
          <NavLink to={`/add-route`}>
            <button>add route</button>
          </NavLink>
        </div>
      </div> */}
      <div>
        <h1>List of all lines</h1>
        {user && (
          <table>
            <thead>
              <tr>
                <th scope="col">line Number</th>
                <th scope="col">target</th>
                <th scope="col">stations</th>
                <th scope="col">schedule</th>
                <th scope="col">edite/delete</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                routes.map((route) => (
                  <tr>
                    <th scope="row">{route.lineNumber}</th>
                    <td>{route.name}</td>
                    <td>{route.stations}</td>
                    <td>
                      {route.schedule.map((s) => (
                        <div>
                          <div>{`departureTime: ${s.departureTime}`}</div>
                          <div>{`arrivalTime: ${s.arrivalTime}`}</div>
                          <div>{`station: ${s.station}`}</div>
                        </div>
                      ))}
                    </td>
                    <td>
                      <div className="buttan_table">
                        <NavLink to={`/edit-Route/${route._id}`}>
                          <button>edit route</button>
                        </NavLink>

                        <button onClick={() => deleteRoute(route._id!)}>
                          delete route
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
