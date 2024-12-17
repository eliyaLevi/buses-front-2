import { useEffect, useState } from "react";
import useFetch from "../../../hooks/UseFetch";
import { Iusers } from "../../../types/UserType";
import { NavLink } from "react-router-dom";

export interface ICurrentData {
  users: Iusers[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

export const AdminUsers = () => {
  const { GETUSERSBYCALL, DELETE, data } = useFetch("http://localhost:3001");
  const [currentData, setCurrentData] = useState<ICurrentData>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const next = () => {
    if (currentData)
      if (currentPage < currentData.totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
  };

  const back = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const deleteUser = (id: string) => {
    DELETE("users", id);
  };

  useEffect(() => {
    GETUSERSBYCALL("users", currentPage, itemPerPage);
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      setCurrentData(data);
    }
  }, [data]);

  return (
    <>
      <div>
        <NavLink to={`/chet`}>
          <button>Chet</button>
        </NavLink>
      </div>
      <div className="list">
        <h1>List of all users</h1>
        <div>
          <div>
            <NavLink to={`/register`}>
              <button>add user</button>
            </NavLink>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">user name</th>
                <th scope="col">email</th>
                <th scope="col">role</th>
                <th scope="col">edite/delete</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.users.map((user) => (
                <tr>
                  <th scope="row">{user.name}</th>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="buttan_table">
                      <NavLink to={`/editUser/${user._id}`}>
                        <button>edit user</button>
                      </NavLink>
                      <button onClick={() => deleteUser(user._id!)}>
                        delete user
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={back}>back</button>
          <span>{`page ${currentPage} of ${currentData?.totalPages}`}</span>
          <button onClick={next}>next</button>
        </div>
      </div>
    </>
  );
};
