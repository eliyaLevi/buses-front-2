import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { Iusers } from "../types/UserType";

export const EditBus = () => {
  const { GETOne, PATCH, data } = useFetch("http://localhost:3001/buses");
  const [licensePlate, setLicensePlate] = useState("");
  const [busmodel, setBusmodel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [status, setStatus] = useState("");
  const [users] = useState<Iusers[]>([]);
  const [setDriverId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GETOne(id);
  }, []);

  useEffect(() => {
    if (data) {
      setLicensePlate(data.licensePlate);
      setBusmodel(data.busmodel);
      setCapacity(data.capacity);
      setStatus(data.status);
    }
  }, [data]);

  // useEffect(() => {
  //   GET("users");
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     setUsers(data);
  //   }
  // }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    PATCH(id, {
      licensePlate,
      busmodel,
      capacity,
      status,
    });

    setLicensePlate("");
    setBusmodel("");
    setCapacity(0);
    setStatus("");
    navigate("/displey");
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
          <button type="submit">Edit bus</button>
        </form>
      </div>
    </>
  );
};
