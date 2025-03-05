import MainLayout from "@/components/main-layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "@/components/protected-route";
import TodoPage from "./todo/page";

export function AuthLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </SidebarProvider>
  );
}

export default function DashboardRoute() {
  return (
    <Routes>
      <Route element={
        <ProtectedRoute>
          <AuthLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<TodoPage />} />
      </Route>
    </Routes>
  )
}