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
                                <button className="btn btn-soft btn-secondary btn-sm mr-5" onClick={() => onEdit(employee)}>
                                    Edit
                                </button>
                                <button className="btn btn-soft btn-error btn-sm" onClick={() => onDelete(employee.id)}>
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