import React, { useEffect, useState } from "react";
import useFetch from "../hooks/UseFetch";
import { useNavigate, useParams } from "react-router-dom";

export const EditRoute = () => {
  const { GETOne, PATCH, data } = useFetch("http://localhost:3001/routs");
  const [licensePlate, setLicensePlate] = useState("");
  const [busmodel, setBusmodel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [status, setStatus] = useState("");
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
  return <div>EditRoute</div>;
};
