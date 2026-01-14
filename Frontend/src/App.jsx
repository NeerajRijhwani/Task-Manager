import { useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/LoginPage.jsx";
import { Register } from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
function CustomRoutes() {
  const element = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return element;
}

function App() {
  return (
    <>
      <CustomRoutes />
    </>
  );
}

export default App;
