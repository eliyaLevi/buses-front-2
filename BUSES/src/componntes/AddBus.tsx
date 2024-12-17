import React, { useEffect, useState } from "react";
import useFetch from "../hooks/UseFetch";
import { IBuses } from "../types/BusesType";
import { Iusers } from "../types/UserType";

export const AddBus = () => {
  const { POST, GET, data } = useFetch<IBuses>("http://localhost:3001");

  const [licensePlate, setLicensePlate] = useState("");
  const [busmodel, setBusmodel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [status, setStatus] = useState("");
  const [driverId, setDriverId] = useState("");
  const [users, setUsers] = useState<Iusers[]>([]);
  const [routes, setRoutes] = useState<any>([]);

  useEffect(() => {
    GET("users");
    fetchAllLiens();
  }, []);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const fetchAllLiens = async () => {
    try {
      const response = await fetch("http://localhost:3001/routs");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData} `);
      }
      const result = await response.json();
      setRoutes(result);
    } catch (error: unknown) {
      throw new Error(`HTTP error! ${error} `);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBus = { licensePlate, busmodel, capacity, status, driverId };
    console.log(newBus);

    POST("buses", {
      licensePlate,
      busmodel,
      capacity,
      status,
      driverId,
    });

    setLicensePlate("");
    setBusmodel("");
    setCapacity(0);
    setStatus("");
    setDriverId("");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="licensePlate">licensePlate</label>
            <input
              id="licensePlate"
              type="text"
              placeholder="Enter the your license Plate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="busmodel">busmodel</label>
            <input
              id="busmodel"
              type="text"
              placeholder="Enter the your bus model"
              value={busmodel}
              onChange={(e) => setBusmodel(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="capacity">capacity</label>
            <input
              id="capacity"
              type="number"
              placeholder="Enter the your capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="status">status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="service">service</option>
              <option value="out of sevice">out of sevice</option>
              <option value="maintenance">maintenance</option>
            </select>
          </div>
          <div>
            <label htmlFor="driverId">driver</label>
            <select id="driverId" onChange={(e) => setDriverId(e.target.value)}>
              {users.map((user) => (
                <option value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="routId">route</label>
            <select id="routId" onChange={(e) => setRoutes(e.target.value)}>
              {routes.map((route) => (
                <option value={route._id}>{route.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">add new bus</button>
        </form>
      </div>
    </>
  );
};
