import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  removeTeacher,
  editTeacher,
} from "../redux/teachersSlice";
import { DataGrid } from "@mui/x-data-grid";
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
import { Button, Box } from "@mui/material";

const Teachers = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const loading = useSelector((state) => state.teachers.loading);
  const hasMore = useSelector((state) => state.teachers.hasMore);
  const lastDoc = useSelector((state) => state.teachers.lastDoc);
  const role = useSelector((state) => state.user.role);

  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchTeachers({ reset: true }));
  }, [dispatch]);

  const lastTeacherRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current instanceof IntersectionObserver) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("first");
          
          dispatch(fetchTeachers({ lastDoc, reset: false }));
        
      }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, lastDoc, dispatch]
  );

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (teacherId) => {
    setTeacherToDelete(teacherId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (teacherToDelete) {
      await dispatch(removeTeacher(teacherToDelete));
      setTeacherToDelete(null);
    }
    handleCloseDeleteModal();
  };

  const handleTeacherSave = (id, updatedData) => {
    dispatch(editTeacher({ id, updatedData }));
  };

  const columns = [
    { field: "name", headerName: nameLabel, flex: 1 },
    { field: "email", headerName: emailLabel, flex: 1.5 },
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
            onClick={() => setSelectedTeacherId(params.row.id)}
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
      <h2>Teacher List</h2>
      <DataGrid
        rows={teachers}
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

      {teachers.length > 0 && (
        <div ref={lastTeacherRef} style={{ height: "30px" }} />
      )}

      {!hasMore && !loading && (
        <Box textAlign="center" mt={2} color="gray">
          {noMoreteachers}
        </Box>
      )}

      {selectedTeacherId && (
        <EditModal
          entityType="Teachers"
          entityId={selectedTeacherId}
          onClose={() => setSelectedTeacherId(null)}
          onSave={handleTeacherSave}
          fields={[
            {
              id: "name",
              label: "Full Name",
              placeholder: "Enter full name",
              type: "text",
            },
          ]}
        />
      )}

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        type={"Teachers"}
      />
    </Box>
  );
};

export default Teachers;
