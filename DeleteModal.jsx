
function DeleteModal({ student, onClose, onConfirm }) {
  if (!student) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="delete-modal-title">Delete Student?</h2>
            <p>
              Are you sure you want to delete this student?
            </p>
          </div>
        </div>

        <div className="delete-student-details">
          <strong>{student.fullName}</strong>
          <p>{student.email}</p>
        </div>

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="action-button delete"
            onClick={() => onConfirm(student.id)}
          >
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
