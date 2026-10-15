
import { useState, useEffect } from "react";

function StudentModal({ student, onSave, onClose }) {
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    age: "",
    email: "",
    course: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId || "",
        fullName: student.fullName || "",
        age: student.age ?? "",
        email: student.email || "",
        course: student.course || "",
        status: student.status || "Active",
      });
    } else {
      setFormData({
        studentId: "",
        fullName: "",
        age: "",
        email: "",
        course: "",
        status: "Active",
      });
    }

    setError("");
  }, [student]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !formData.studentId.trim() ||
      !formData.fullName.trim() ||
      !formData.age ||
      !formData.email.trim() ||
      !formData.course.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const age = Number(formData.age);

    if (!Number.isInteger(age) || age < 16 || age > 100) {
      setError("Age must be a whole number between 16 and 100.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    onSave({
      ...formData,
      studentId: formData.studentId.trim(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      age,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>{student ? "Edit Student" : "Add New Student"}</h2>
            <p>Enter the student information below.</p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Student ID *</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              placeholder="e.g. 20261001 or STU001"
              value={formData.studentId}
              onChange={handleChange}
              required
              maxLength={30}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              id="age"
              name="age"
              type="number"
              min="16"
              max="100"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="Enter course name"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {student ? "Update Student" : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;
