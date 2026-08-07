import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../Utils/api";

export function EmployeeTable({ employees,fetchEmployees }) {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/employees/${id}`);
    };

    const handleDelete = async(id) => {
        try {
            await api.delete(`/employees/${id}`);
            toast.success("Employee deleted successfully!");
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

    return (
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
                                <button className="btn btn-soft btn-error btn-sm" onClick={() => handleDelete(employee._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}