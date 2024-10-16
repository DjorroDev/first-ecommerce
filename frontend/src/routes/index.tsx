// src/routes.js
import { createBrowserRouter } from "react-router-dom";
// import Home from './pages/Home';
import Dashboard from "../pages/Dashboard.tsx";
import Shop from "../pages/Shop.tsx";
import Cart from "../pages/Cart.tsx";
import Checkout from "../pages/Checkout.tsx";
import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";
import Navbar from "../components/Navbar.tsx";
// import React from "react";
// import Cart from './components/Cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // {
  //     path: "/cart",
  //     element: <Cart />,
  // },
]);

export default router;
