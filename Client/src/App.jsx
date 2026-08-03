import { Homepage } from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/AddEmployee";
import Login from "./Pages/Login";
import ModifyEmployee from "./Pages/ModifyEmployee";
import { Toaster } from "react-hot-toast";


function App() {
  const employees = [
        { id: 1, name: "John Doe", position: "Software Engineer", department: "Engineering", email:"john.doe@example.com",phone:"123-456-7890",gender:"male",salary:70000,joiningDate:"2021-06-01" },
        { id: 2, name: "Jane Smith", position: "Product Manager", department: "Product", email:"jane.smith@example.com",phone:"123-456-7890",gender:"female",salary:75000,joiningDate:"2021-09-01" },
        { id: 3, name: "Alice Johnson", position: "UX Designer", department: "Design", email:"alice.johnson@example.com",phone:"123-456-7890",gender:"female",salary:80000,joiningDate:"2022-01-15" },
    ];

  return (
    <div className="font-raleway">
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage employees={employees} />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/modify/:id" element={<ModifyEmployee employees={employees} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
