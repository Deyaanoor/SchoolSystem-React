import { Button, Box } from "@mui/material";
import {
  edit,
  deleteLabel,
  nameLabel,
  emailLabel,
  ageLabel,
  TeacherLabel,
  actionsLabel,
} from "../Constants/constant";

import useRoles from "./useRoles"; 

const useStudent = (setSelectedStudentId, handleShowDeleteModal) => {
  const baseColumns = [
    { field: "name", headerName: nameLabel, flex: 1 },
    { field: "email", headerName: emailLabel, flex: 1.5 },
    { field: "age", headerName: ageLabel, flex: 0.5 },
    { field: "teacher", headerName: TeacherLabel, flex: 1 },
  ];
  const { isAdmin} = useRoles();


  if (isAdmin) {
    const actionsColumn = {
      field: "actions",
      headerName: actionsLabel,
      flex: 1.5,
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
    };

    return [...baseColumns, actionsColumn];
  }

  return baseColumns;
};

export default useStudent;
