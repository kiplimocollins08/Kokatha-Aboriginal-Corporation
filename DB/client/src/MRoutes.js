import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from "./App"
import Admin from "./pages/Admin";
import Home from "./pages/Home";

import MembershipApplication from "./pages/AddMember";

export default function MRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}/>
          <Route path="application" element={<MembershipApplication />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}