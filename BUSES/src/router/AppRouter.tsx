import { Router } from "express";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/HomePage";
import { Admin } from "../pages/admin/Admin";
import { Driverpage } from "../pages/Driver/Driverpage";
import { Displey } from "../componntes/Displey";
import { EditUser } from "../pages/admin/edit_user/EditUser";
import { RegisterPage } from "../pages/admin/add_user/RegisterPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/displey" element={<Displey />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </>
  );
};
