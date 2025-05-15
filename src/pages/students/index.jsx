import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  removeStudent,
  editStudent,
} from "../../redux/studentsSlice";
import { DataGrid } from "@mui/x-data-grid";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/AlertToDelete";
import {
  
  noMoreStudents,
  
} from "../../Constants/constant";
import {Box } from "@mui/material";

import useStudent from "../../hooks/useStudent";

const fields  = [
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
];


const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const hasMore = useSelector((state) => state.students.hasMore);
  const lastDoc = useSelector((state) => state.students.lastDoc);

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

  const columns = useStudent(setSelectedStudentId, handleShowDeleteModal);


  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <h2 className="mt-5">Student List</h2>
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
          fields={fields }
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
