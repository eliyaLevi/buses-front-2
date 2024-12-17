import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/UseFetch";
import { useNavigate, useParams } from "react-router-dom";

export const EditUser = () => {
  const { GETOne, PATCH, data } = useFetch(
    "https://buses-1.onrender.com/users"
  );
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GETOne(id);
  }, []);

  useEffect(() => {
    if (data) {
      setname(data.name);
      setemail(data.email);
      setrole(data.role);
    }
  }, [data]);

  console.log(name, 4444);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    PATCH(id, {
      name,
      email,
      role,
    });

    setname("");
    setemail("");
    setrole("");
    navigate("/displey");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter the your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role">role</label>
            <input
              id="role"
              type="text"
              placeholder="Enter the your role"
              value={role}
              onChange={(e) => setrole(e.target.value)}
              required
            />
          </div>
          <button type="submit">Edit User</button>
        </form>
      </div>
    </>
  );
};
