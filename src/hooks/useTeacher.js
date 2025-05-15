import { Button, Box } from "@mui/material";
import {
  edit,
  deleteLabel,
  nameLabel,
  emailLabel,
  actionsLabel,
} from "../Constants/constant";
import useRoles from "./useRoles"; 

const useTeacher = (setSelectedTeacherId, handleShowDeleteModal) => {
  const baseColumns = [
   
      { field: "name", headerName: nameLabel, flex: 1 },
      { field: "email", headerName: emailLabel, flex: 1.5 },
    ];

    const { isAdmin} = useRoles();

  if (isAdmin) {
    const actionsColumn = {
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
    };

    return [...baseColumns, actionsColumn];
  }

  return baseColumns;
};

export default useTeacher;
