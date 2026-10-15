
import { useState, useEffect } from "react";
import "./App.css";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = localStorage.getItem("students");
      const parsedStudents = savedStudents
        ? JSON.parse(savedStudents)
        : [];

      // Support records saved by the earlier version.
      return parsedStudents.map((student) => ({
        ...student,
        studentId:
          student.studentId ||
          (student.id ? String(student.id) : ""),
      }));
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const pendingStudents = students.filter(
    (student) => student.status === "Pending"
  ).length;

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      student.studentId?.toLowerCase().includes(search) ||
      student.fullName?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.course?.toLowerCase().includes(search) ||
      student.status?.toLowerCase().includes(search)
    );
  });

  function handleSaveStudent(studentData) {
    const enteredId = studentData.studentId.trim();

    const duplicateId = students.some(
      (student) =>
        student.studentId?.toLowerCase() === enteredId.toLowerCase() &&
        student.studentId !== editingStudent?.studentId
    );

    if (duplicateId) {
      alert("This Student ID already exists. Please enter a different ID.");
      return;
    }

    if (editingStudent) {
      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.studentId === editingStudent.studentId
            ? { ...studentData, studentId: enteredId }
            : student
        )
      );
    } else {
      setStudents((previousStudents) => [
        ...previousStudents,
        { ...studentData, studentId: enteredId },
      ]);
    }

    setIsModalOpen(false);
    setEditingStudent(null);
  }

  function handleDeleteStudent(studentId) {
    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.studentId !== studentId
      )
    );

    setDeletingStudent(null);
  }

  function openAddModal() {
    setEditingStudent(null);
    setIsModalOpen(true);
  }

  function openEditModal(student) {
    setEditingStudent(student);
    setIsModalOpen(true);
  }

  function closeStudentModal() {
    setIsModalOpen(false);
    setEditingStudent(null);
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="brand">StudentHub</h2>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-link active">
            Dashboard
          </a>
        </nav>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <h1>Student Management System</h1>
            <p>Manage your student records in one place.</p>
          </div>

          <div className="admin-profile">
            <span className="admin-avatar">A</span>
            <span>Administrator</span>
          </div>
        </header>

        <section className="dashboard-cards">
          <div className="stat-card">
            <p>Total Students</p>
            <h2>{totalStudents}</h2>
          </div>

          <div className="stat-card">
            <p>Active Students</p>
            <h2>{activeStudents}</h2>
          </div>

          <div className="stat-card">
            <p>Pending Students</p>
            <h2>{pendingStudents}</h2>
          </div>
        </section>

        <section className="student-section">
          <div className="section-header">
            <div>
              <h2>Student Records</h2>
              <p>Add, view, edit, search, and delete student records.</p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={openAddModal}
            >
              + Add Student
            </button>
          </div>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by Student ID, name, email, course, or status..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}
          </div>

          <p className="search-results">
            Showing {filteredStudents.length} of {students.length} students
          </p>

          <StudentTable
            students={filteredStudents}
            onEdit={openEditModal}
            onDelete={setDeletingStudent}
          />
        </section>

        <footer className="app-footer">
          Student Management System
        </footer>
      </main>

      {isModalOpen && (
        <StudentModal
          student={editingStudent}
          onSave={handleSaveStudent}
          onClose={closeStudentModal}
        />
      )}

      {deletingStudent && (
        <DeleteModal
          student={deletingStudent}
          onClose={() => setDeletingStudent(null)}
          onConfirm={handleDeleteStudent}
        />
      )}
    </div>
  );
}

export default App;