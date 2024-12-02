import React, { useState } from "react";
import useFetch from "../../../hooks/UseFetch";
import { Iusers } from "../../../types/UserType";

export const RegisterPage = () => {
  const { POST } = useFetch<Iusers>("http://localhost:3001");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
    console.log({ name, email, password, role });

    POST("users", {
      name,
      email,
      password,
      role,
    });

    setName("");
    setEmail("");
    setPassword("");
    setRole("");
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
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add New User</button>
        </form>
      </div>
    </>
  );
};
