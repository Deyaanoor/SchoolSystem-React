import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  removeStudent,
  editStudent,
} from "../redux/studentsSlice";
import { Table, Button, Spinner } from "react-bootstrap";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/AlertToDelete";
import {
  edit,
  actionsLabel,
  ageLabel,
  deleteLabel,
  emailLabel,
  noMoreStudents,
  nameLabel,
  TeacherLabel,
} from "../Constants/constant";

const Overview = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const hasMore = useSelector((state) => state.students.hasMore);
  const lastDoc = useSelector((state) => state.students.lastDoc);
  const role = useSelector((state) => state.user.role);

  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchStudents({ reset: true }));
  }, [dispatch]);

  const lastStudentRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current instanceof IntersectionObserver) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchStudents({ lastDoc, reset: false }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, lastDoc, dispatch]
  );

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (studentToDelete) {
      await dispatch(removeStudent(studentToDelete));
      setStudentToDelete(null);
    }
    handleCloseDeleteModal();
  };

  const handleStudentSave = (id, updatedData) => {
    dispatch(editStudent({ id, updatedData }));
  };

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{nameLabel}</th>
            <th>{emailLabel}</th>
            <th>{ageLabel}</th>
            <th>{TeacherLabel}</th>
            {role === "admin" && <th>{actionsLabel}</th>}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.id}
              ref={index === students.length - 1 ? lastStudentRef : null}
            >
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.teacher}</td>

              {role === "admin" && (
                <td className="d-flex">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => setSelectedStudentId(student.id)}
                  >
                    {edit}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleShowDeleteModal(student.id)}
                  >
                    {deleteLabel}
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {!hasMore && <p className="text-center text-muted">{noMoreStudents}</p>}

      <EditModal
        entityType="Students"
        entityId={selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
        onSave={handleStudentSave}
        fields={[
          {
            id: "name",
            label: "Full Name",
            placeholder: "Enter full name",
            type: "text",
          },
          {
            id: "email",
            label: "Email",
            placeholder: "Enter email",
            type: "email",
          },
          { id: "age", label: "Age", placeholder: "Enter age", type: "number" },
        ]}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        type={"Students"}
      />
    </div>
  );
};

export default Overview;
