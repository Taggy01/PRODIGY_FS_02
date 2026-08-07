import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../Utils/api";
import { useState } from "react";

export function EmployeeTable({ employees, fetchEmployees }) {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/employees/${id}`);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/employees/${selectedEmployee._id}`);
            toast.success("Employee deleted successfully!");
            await fetchEmployees();
            document.getElementById("delete_modal").close();
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

    return (
        <>
            <dialog id="delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Employee</h3>

                    <p className="py-4">
                        Are you sure you want to delete{""} {selectedEmployee?.name}?
                    </p>

                    <div className="modal-action">
                        <button
                            className="btn btn-error"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>

                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>


            <div className="overflow-x-auto">
                <table className="table text-center w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <button className="btn btn-soft btn-secondary btn-sm mr-5" onClick={() => handleEdit(employee._id)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-soft btn-error btn-sm" onClick={() => {
                                        setSelectedEmployee(employee);
                                        document.getElementById("delete_modal").showModal();
                                    }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}