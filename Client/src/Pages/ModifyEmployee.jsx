import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ModifyEmployee({employees}) {
    const navigate = useNavigate();
    const employeeId = window.location.pathname.split("/").pop();
    const employee = employees.find(emp => emp.id === parseInt(employeeId));

    return (
        <div>
            <Navbar />
            <div className="p-10 mt-25">
                <h1 className="text-3xl font-bold mb-5">Modify Employee</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mx-10">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input type="text" id="name" autoComplete="name" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.name} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input type="email" id="email" autoComplete="email" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.email} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                        <input type="tel" id="phone" autoComplete="tel" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.phone} />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                        <div name="gender" className="mt-2 flex gap-5">
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="male" className="radio radio-primary" defaultChecked={employee.gender === 'male'} /> Male
                            </label>
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="female" className="radio radio-primary" defaultChecked={employee.gender === 'female'} /> Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium">Department</label>
                        <input type="text" id="department" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.department} />
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium">Position</label>
                        <input type="text" id="position" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.position} />
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium">Salary</label>
                        <input type="number" id="salary" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.salary} />
                    </div>
                    <div>
                        <label htmlFor="joiningDate" className="block text-sm font-medium">Joining Date</label>
                        <input type="date" id="joiningDate" className="input w-3/4 mt-1.5 rounded-2xl" defaultValue={employee.joiningDate} />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="btn btn-soft btn-lg btn-primary mt-10" onClick={()=> navigate('/')}>Modify Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}