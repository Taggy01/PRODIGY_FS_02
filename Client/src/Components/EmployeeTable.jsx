import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function EmployeeTable({ employees}) {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/modify/${id}`);
    };

    const handleDelete = () => {
        toast.success("Employee deleted successfully!");
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
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button className="btn btn-soft btn-secondary btn-sm mr-5" onClick={() => handleEdit(employee.id)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-soft btn-error btn-sm" onClick={() => handleDelete()}>
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