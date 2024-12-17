import { useState } from "react";

export default function useFetch<T>(url: string): any {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   --------------GET method--------------
  const GET = async (path: string) => {
    try {
      const response = await fetch(`${url}/${path}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  //   --------------GETUSERSBYCALL method--------------
  const GETUSERSBYCALL = async (path: string, page: string, limit: string) => {
    const query = `getUsersByCall?page=${page}&limit=${limit}`;
    const r = `${url}/${path}/${query}`;
    console.log(r);

    try {
      const response = await fetch(`${url}/${path}/${query}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------GET One method--------------
  const GETOne = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------POST method--------------
  const POST = async (endpoint: string, body: object) => {
    try {
      const response = await fetch(`${url}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };
  //   --------------PATCH method--------------
  const PATCH = async (id: string, body: any) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`error is: ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
      console.log(data);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------DELETE method--------------
  const DELETE = async (endpoint: string, id: string) => {
    try {
      const response = await fetch(`${url}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`error is: ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result.users);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const VerifyRefresh = async (endpoint: string) => {
    try {
      const response = await fetch(
        `https://buses-1.onrender.com/auth/VerifyRefresh/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };

  return {
    data,
    error,
    GET,
    POST,
    PATCH,
    DELETE,
    GETOne,
    GETUSERSBYCALL,
    VerifyRefresh,
  };
}
