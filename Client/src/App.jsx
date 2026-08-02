import { Homepage } from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/AddEmployee";
import Login from "./Pages/Login";


function App() {
  return (
    <div className="font-raleway">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
