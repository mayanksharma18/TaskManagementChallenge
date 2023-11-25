import React, { useState } from "react";
import {
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "../TaskForm/TaskForm";

const EditTask = ({ task, handleOnEdit }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <IconButton
        color="secondary"
        size="small"
        onClick={() => setIsEditMode(!isEditMode)}
      >
        <EditIcon />
      </IconButton>
      {isEditMode && (
        <TaskForm
          open={isEditMode}
          onClose={() => setIsEditMode(!isEditMode)}
          editTaskDetails={task}
          isEditMode
          onEditTask={handleOnEdit}
        />
      )}
    </div>
  );
};

export default EditTask;
