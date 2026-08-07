import { Homepage } from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/AddEmployee";
import Login from "./Pages/Login";
import ModifyEmployee from "./Pages/ModifyEmployee";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./Routes/ProtectRoute";
import PublicRoute from "./Routes/PublicRoute";
import api from "./Utils/api.js";
import { useEffect, useState } from "react";


function App() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees/");
        setEmployees(response.data.employees ?? []);
      } catch (error) {
        console.log("Error fetching employees:");
        console.log(error);
        console.log("Status:", error.response?.status);
        console.log("Message:", error.response?.data);
      }
    }


  useEffect(() => {
    fetchEmployees();
  },[]);

  return (
    <div className="font-raleway">
      <Toaster />
      <Routes>

        <Route path="/" element={
          <ProtectRoute>
            <Homepage employees={employees} fetchEmployees={fetchEmployees} />
          </ProtectRoute>} />

        <Route path="/add" element={
          <ProtectRoute>
            <AddEmployee fetchEmployees={fetchEmployees}/>
          </ProtectRoute>} />

        <Route path="/employees/:id" element={
          <ProtectRoute>
            <ModifyEmployee employees={employees} fetchEmployees={fetchEmployees} />
          </ProtectRoute>} />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>} />

      </Routes>
    </div>
  )
}

export default App
