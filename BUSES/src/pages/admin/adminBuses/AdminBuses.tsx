import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useFetch from "../../../hooks/UseFetch";
import { IBuses } from "../../../types/BusesType";
import { Iusers } from "../../../types/UserType";

export const AdminBuses = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { GET, GETOne, data } = useFetch("http://localhost:3001");
  const [buses, setBuses] = useState<IBuses[]>([]);
  const [driver, setdriver] = useState<Iusers>();

  useEffect(() => {
    GET("buses");
  }, []);

  useEffect(() => {
    if (data) {
      setBuses(data);
    }
  }, [data]);

  // const findDriver = (id:string){
  //   useEffect(() => {
  //     const driver = GETOne(id);
  //     setdriver(driver)
  //   }, []);
  // }

  return (
    <>
      <h1>List of all buses</h1>
      {user &&
        buses!.map((bus) => (
          <div>
            <h2>{bus.licensePlate}</h2>
            <p>{bus.busmodel}</p>
            <p>{bus.capacity}</p>
            <p>{bus.status}</p>
            {/* <p>{bus?.routId.}</p> */}
          </div>
        ))}
    </>
  );
};

// driverId: object;
// routId: object;
