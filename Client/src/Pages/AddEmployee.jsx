import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="p-10 mt-25">
                <h1 className="text-3xl font-bold mb-5">Add Employee</h1>
                <form className="grid *:grid-cols-1 md:grid-cols-2 gap-5 mt-10 mx-10">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input type="text" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input type="tel" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <div className="mt-2 flex gap-5">
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="male" className="radio radio-primary" /> Male
                            </label>
                            <label className="inline-flex gap-4 items-center">
                                <input type="radio" name="gender" value="female" className="radio radio-primary" /> Female
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <input type="text" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Position</label>
                        <input type="text" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Salary</label>
                        <input type="number" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Joining Date</label>
                        <input type="date" className="input w-3/4 mt-1.5 rounded-2xl" />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="btn btn-soft btn-lg btn-primary mt-10" onClick={() => navigate('/')}>
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}