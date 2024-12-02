import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useFetch from "../../../hooks/UseFetch";
import { Iusers } from "../../../types/UserType";
import { NavLink } from "react-router-dom";

export const AdminUsers = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { GET, DELETE, data } = useFetch("http://localhost:3001");
  const [users, setUsers] = useState<Iusers[]>([]);
  const [isDelete, setisDelete] = useState(false);
  const deleteUser = (id: string) => {
    DELETE("users", id);
    setisDelete(true);
  };
  useEffect(() => {
    GET("users");
  }, [isDelete]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return (
    <>
      <h1>List of all users</h1>
      <div>
        {user &&
          users.map((user) => (
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <NavLink to={`/editUser/${user._id}`}>
                <button>edit user</button>
              </NavLink>
              <button onClick={() => deleteUser(user._id)}>delete user</button>
            </div>
          ))}
        <div>
          <NavLink to={`/register`}>
            <button>add user</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
