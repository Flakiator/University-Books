import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import cookieManager from "../Components/cookieManager";

export default function ProtectedRoutes() {
  const token = cookieManager.get("TOKEN");
  return (
    token ? <Outlet /> : <Navigate to="/login" />
  );
}