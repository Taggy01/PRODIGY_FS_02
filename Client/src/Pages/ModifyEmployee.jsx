import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../Utils/api.js";
import { useParams } from "react-router-dom";

export default function ModifyEmployee({ employees,fetchEmployees }) {

    const {id} = useParams();

    const employee = employees.find(emp => emp._id === id);

    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [gender, setGender] = useState([]);
    const [dept, setDept] = useState([]);
    const [position, setPosition] = useState([]);
    const [salary, setSalary] = useState([]);
    const [date, setDate] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!employee) return;

        setName(employee.name);
        setEmail(employee.email);
        setPhone(employee.phone);
        setGender(employee.gender);
        setDept(employee.department);
        setPosition(employee.position);
        setSalary(employee.salary);
        setDate(employee.joiningDate?.split("T")[0] || "");
    }, [employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respond = await api.put(`/employees/${employee._id}`, {
                name,
                email,
                phone,
                gender,
                department: dept,
                position,
                salary,
                joiningDate: date
            });

            console.log(respond);
            toast.success("Updated Successfully successful!");

            await fetchEmployees();
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




    if (!employees) {
    return (
        <>
            <Navbar />
            <div className="mt-20 text-center">
                Loading employee...
            </div>
        </>
    );
}


    return (
        <div>
            <Navbar />
            <div className="p-10 mt-25">
                <h1 className="text-3xl font-bold mb-5">Modify Employee</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mx-10" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input type="text" id="name" autoComplete="name" className="input w-3/4 mt-1.5 rounded-2xl" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input type="email" id="email" autoComplete="email" className="input w-3/4 mt-1.5 rounded-2xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                        <input type="tel" id="phone" autoComplete="tel" className="input w-3/4 mt-1.5 rounded-2xl" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                        <div name="gender" className="mt-2 flex gap-5">
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="male" className="radio radio-primary" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} /> Male
                            </label>
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="female" className="radio radio-primary" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} /> Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium">Department</label>
                        <input type="text" id="department" className="input w-3/4 mt-1.5 rounded-2xl" value={dept} onChange={(e) => setDept(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium">Position</label>
                        <input type="text" id="position" className="input w-3/4 mt-1.5 rounded-2xl" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium">Salary</label>
                        <input type="number" id="salary" className="input w-3/4 mt-1.5 rounded-2xl" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="joiningDate" className="block text-sm font-medium">Joining Date</label>
                        <input type="date" id="joiningDate" className="input w-3/4 mt-1.5 rounded-2xl" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="btn btn-soft btn-lg btn-primary mt-10">Modify Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}