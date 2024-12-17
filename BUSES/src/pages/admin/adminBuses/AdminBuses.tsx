import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useFetch from "../../../hooks/UseFetch";
import { IBuses } from "../../../types/BusesType";
import { NavLink } from "react-router-dom";

// interface HabasDto {
//   name: string;
// }
export const AdminBuses = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { GET, DELETE, data } = useFetch("http://localhost:3001");
  const [buses, setBuses] = useState<IBuses[]>([]);

  useEffect(() => {
    GET("buses");
  }, []);

  useEffect(() => {
    if (data) {
      setBuses(data);
    }
  }, [data]);

  const deleteBus = (id: string) => {
    DELETE("buses", id);
  };

  return (
    <>
      <div className="list">
        <h1>List of all buses</h1>
        {user &&
          buses!.map((bus) => (
            <div>
              <h2>{`licensePlate: ${bus.licensePlate}`}</h2>
              <p>{`busmodel: ${bus.busmodel}`}</p>
              <p>{`capacity: ${bus.capacity}`}</p>
              <p>{`status: ${bus.status}`}</p>
              <p>{`draiver: ${bus.driverId}`}</p>
              <p>{`lineNumber: ${bus.routId}`}</p>
              <NavLink to={`/editBus/${bus._id}`}>
                <button>edit bus</button>
              </NavLink>
              <button onClick={() => deleteBus(bus._id!)}>delete bus</button>
            </div>
          ))}
        <div>
          <NavLink to={`/add-bus`}>
            <button>add bus</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
