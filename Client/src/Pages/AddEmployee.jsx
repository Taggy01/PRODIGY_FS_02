import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../Utils/api.js";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddEmployee() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [gender,setGender] = useState("");
    const [dept,setdept] = useState("");
    const [position,setPosition] = useState("");
    const [salary,setSalary] = useState("");
    const [date,setDate] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const respond = await api.post("/employees", {
                name,
                email,
                phone,
                gender,
                department:dept,
                position,
                salary,
                joiningDate:date
            });

            console.log(respond);
            toast.success("Added successful!");
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }


    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="p-10 mt-25">
                <h1 className="text-3xl font-bold mb-5">Add Employee</h1>
                <form className="grid *:grid-cols-1 md:grid-cols-2 gap-5 mt-10 mx-10" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input type="text" className="input w-3/4 mt-1.5 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" className="input w-3/4 mt-1.5 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input type="tel" className="input w-3/4 mt-1.5 focus:outline-none" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <div className="mt-2 flex gap-5">
                            <label className="inline-flex gap-4 items-center" value={gender} onChange={() => setGender("male")}>
                                <input type="radio" name="gender" value="male" className="radio radio-primary" /> Male
                            </label>
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="female" className="radio radio-primary" value={gender} onChange={() => setGender("female")}/> Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <input type="text" className="input w-3/4 mt-1.5 focus:outline-none" value={dept} onChange={(e) => setdept(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Position</label>
                        <input type="text" className="input w-3/4 mt-1.5 focus:outline-none" value={position} onChange={(e) => setPosition(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Salary</label>
                        <input type="number" className="input w-3/4 mt-1.5 focus:outline-none" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Joining Date</label>
                        <input type="date" className="input w-3/4 mt-1.5 focus:outline-none" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="btn btn-soft btn-lg btn-primary mt-10">
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}