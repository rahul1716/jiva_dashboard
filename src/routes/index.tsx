import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import UserDetail from "../pages/UserDetail";
import OrderDetail from "../pages/OrderDetail";
import PaymentHistory from "../pages/PaymentHistory";
import FamilyMembers from "../pages/FamilyMembers";
import Department from "../pages/Department";
import Consultations from "../pages/Consultations";
import Placeholder from "../pages/Placeholder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><Dashboard /></MainLayout>,
  },
  {
    path: "/users",
    element: <MainLayout><Dashboard /></MainLayout>,
  },
  {
    path: "/users/:id",
    element: <MainLayout><UserDetail /></MainLayout>,
  },
  {
    path: "/orders",
    element: <MainLayout><OrderDetail /></MainLayout>,
  },
  {
    path: "/payments",
    element: <MainLayout><PaymentHistory /></MainLayout>,
  },
  {
    path: "/family",
    element: <MainLayout><FamilyMembers /></MainLayout>,
  },
  {
    path: "/department",
    element: <MainLayout><Department /></MainLayout>,
  },
  {
    path: "/consultations",
    element: <MainLayout><Consultations /></MainLayout>,
  },
  {
    path: "/lab-tests",
    element: <MainLayout><Placeholder /></MainLayout>,
  },
  {
    path: "/medicine-orders",
    element: <MainLayout><Placeholder /></MainLayout>,
  },
  {
    path: "/ambulance",
    element: <MainLayout><Placeholder /></MainLayout>,
  },
  {
    path: "/reports",
    element: <MainLayout><Placeholder /></MainLayout>,
  },
  {
    path: "/access",
    element: <MainLayout><Placeholder /></MainLayout>,
  },
  {
    path: "/settings",
    element: <MainLayout><Placeholder /></MainLayout>,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
