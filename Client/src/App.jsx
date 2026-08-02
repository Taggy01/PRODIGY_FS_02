import { Homepage } from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./Pages/AddEmployee";


function App() {
  return (
    <div className="font-raleway">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddEmployee />} />
      </Routes>
    </div>
  )
}

export default App
