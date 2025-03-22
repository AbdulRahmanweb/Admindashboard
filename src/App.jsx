import React from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Components/Sidebar"
import Navbar from "./Components/Navbar"
import Dashboard from "./Components/Dashboard"
import UserManagement from "./Components/Pages/UserManagement"

function App() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
