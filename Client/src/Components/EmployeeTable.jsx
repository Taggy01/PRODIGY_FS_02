export function EmployeeTable({ employees, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button className="btn btn-primary btn-sm mr-2" onClick={() => onEdit(employee)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(employee.id)}>
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