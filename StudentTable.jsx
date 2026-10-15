
function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.studentId}>
                <td>
                  <strong>{student.studentId}</strong>
                </td>

                <td>{student.fullName}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>

                <td>
                  <span
                    className={`status-badge ${(student.status || "Active")
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {student.status || "Active"}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="action-button edit"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="action-button delete"
                      onClick={() => onDelete(student)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty-message">
                No students found. Click "Add Student" to register a student.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
