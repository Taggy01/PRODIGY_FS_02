import { EmployeeTable } from "./EmployeeTable";
export function MainPage({ employees, onEdit, onDelete }) {
    return (
        <div className="m-10">
            <div className="py-5">
                <p className="text-4xl font-extrabold">Welcome, Admin</p>
                <p>Look Whats Happening Around!</p>
            </div>
            <div className="p-5 flex flex-col md:flex-row gap-5">
                <div className="stats shadow w-full">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Total Employees</div>
                        <div className="stat-value text-primary">31K</div>
                    </div>
                </div>
                <div className="stats shadow w-full">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-6 0h6"></path></svg>
                        </div>
                        <div className="stat-title">Total Departments</div>
                        <div className="stat-value text-secondary">4</div>
                    </div>
                </div>
            </div>
            <div className="m-5">
                <div className="flex gap-5 justify-between items-center">
                    <p className="text-4xl font-extrabold">Employee List</p>
                    <button className="btn btn-primary my-5" onClick={() => onEdit({})}>
                        Add Employee
                    </button>
                </div>
                {employees.length > 0 ? (
                    <EmployeeTable employees={employees} onEdit={onEdit} onDelete={onDelete} />
                ) : (
                    <div className="flex justify-center my-10">
                        <p className="text-lg">No employees found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}