import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { Route, Routes } from "react-router";

export default function SignedOutRoutes() {
  return (
    <Routes>
        <Route path="*" element={<LoginPage/>} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
    </Routes>
  )
}
