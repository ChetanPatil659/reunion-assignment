import DashboardPage from "@/pages/DashboardPage";
import TaskPage from "@/pages/TaskPage";
import { Route, Routes } from "react-router";

export default function SignedInRoutes() {
  return (
    <Routes>
      <Route path="*" element={<TaskPage />} />
      <Route path="/" element={<TaskPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
