import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  removeStudent,
  editStudent,
} from "../redux/studentsSlice";
import { DataGrid } from "@mui/x-data-grid";
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
import { Button, Box } from "@mui/material";

const Students = () => {
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

  const columns = [
    { field: "name", headerName: nameLabel, flex: 1 },
    { field: "email", headerName: emailLabel, flex: 1.5 },
    { field: "age", headerName: ageLabel, flex: 0.5 },
    { field: "teacher", headerName: TeacherLabel, flex: 1 },
  ];

  if (role === "admin") {
    columns.push({
      field: "actions",
      headerName: actionsLabel,
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={() => setSelectedStudentId(params.row.id)}
          >
            {edit}
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleShowDeleteModal(params.row.id)}
          >
            {deleteLabel}
          </Button>
        </Box>
      ),
    });
  }

  return (
    <Box sx={{ height: 600, width: "100%", mt: 4 }}>
      <h2>Student List</h2>
      <DataGrid
        rows={students}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        disableSelectionOnClick
        scrollbarSize={10}
        rowHeight={60}
        autoHeight
        pagination={false}
        hideFooterPagination
      />
      {students.length > 0 && (
        <div ref={lastStudentRef} style={{ height: "30px" }} />
      )}

      {!hasMore && !loading && (
        <Box textAlign="center" mt={2} color="gray">
          {noMoreStudents}
        </Box>
      )}

      {selectedStudentId && (
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
              id: "age",
              label: "Age",
              placeholder: "Enter age",
              type: "number",
            },
          ]}
        />
      )}

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        type={"Students"}
      />
    </Box>
  );
};

export default Students;
