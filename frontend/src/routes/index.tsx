import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";

import Shop from "@/pages/Shop.tsx";
import Cart from "@/pages/Cart.tsx";
import Checkout from "@/pages/Checkout.tsx";

import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import Logout from "@/pages/auth/Logout.tsx";

import Dashboard from "@/pages/dashboard/Dashboard.tsx";
import Products from "@/pages/dashboard/products";
import Transactions from "@/pages/Transactions";
import Admin from "@/pages/dashboard/Admin";
import Orders from "@/pages/dashboard/Orders";
import PrivateRoutes from "@/utils/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Link to={"/products"}>Browse product</Link>,
      },
      {
        path: "/products",
        element: <Shop />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
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
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

export default router;
