import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  removeTeacher,
  editTeacher,
} from "../redux/teachersSlice";
import { Table, Button, Spinner } from "react-bootstrap";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/AlertToDelete";
import {
  edit,
  actionsLabel,
  deleteLabel,
  emailLabel,
  noMoreteachers,
  nameLabel,
} from "../Constants/constant";

const Teachers = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const loading = useSelector((state) => state.teachers.loading);
  const hasMore = useSelector((state) => state.teachers.hasMore);
  const lastDoc = useSelector((state) => state.teachers.lastDoc);

  const [selectedteacherId, setSelectedteacherId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setteacherToDelete] = useState(null);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchTeachers({ reset: true }));
  }, [dispatch]);

  const lastteacherRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current instanceof IntersectionObserver) {
        observer.current.disconnect();
      }      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchTeachers({ lastDoc, reset: false }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, lastDoc, dispatch]
  );

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (teacherId) => {
    setteacherToDelete(teacherId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (teacherToDelete) {
      await dispatch(removeTeacher(teacherToDelete));
      setteacherToDelete(null);
    }
    handleCloseDeleteModal();
  };

  const handleTeacherSave = (id, updatedData) => {
    dispatch(editTeacher({ id, updatedData }));
  };

  return (
    <div className="container mt-4">
      <h2>teacher List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{nameLabel}</th>
            <th>{emailLabel}</th>
            <th>{actionsLabel}</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr
              key={teacher.id}
              ref={index === teachers.length - 1 ? lastteacherRef : null}
            >
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
             
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => setSelectedteacherId(teacher.id)}
                >
                  {edit}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleShowDeleteModal(teacher.id)}
                >
                  {deleteLabel}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {!hasMore && <p className="text-center text-muted">{noMoreteachers}</p>}

      <EditModal
  entityType="Teachers"
  entityId={selectedteacherId}
  onClose={() => setSelectedteacherId(null)}
  onSave={handleTeacherSave}
  fields={[
    { id: "name", label: "Full Name", placeholder: "Enter full name", type: "text" },
    { id: "email", label: "Email", placeholder: "Enter email", type: "email" },
  ]}
/>

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        type={"Teachers"}
      />
    </div>
  );
};

export default Teachers;
