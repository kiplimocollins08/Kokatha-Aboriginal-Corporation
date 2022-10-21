import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from "./App"
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";

import MembershipApplication from "./pages/MembershipApplication";
import HealthApplication from "./pages/HealthApplication";

export default function MRoutes(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />} />
          <Route path="application" element={<MembershipApplication />} />
          <Route path="admin" element={<Admin />} />
          <Route path="health" element={<HealthApplication />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}