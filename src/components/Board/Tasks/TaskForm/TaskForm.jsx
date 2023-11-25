// TaskForm.jsx
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { v4 as uuidv4 } from 'uuid';
import {imageToBase64} from '../../../../utilities/ImageIntoBase64'

const TaskForm = ({ open, onClose, onAddTask, isEditMode=false, editTaskDetails, onEditTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [image, setImage] = useState(null); // For handling image uploads

  useEffect(() => {
    if (isEditMode && editTaskDetails) {
      setTaskName(editTaskDetails.taskName || '');
      setTaskDescription(editTaskDetails.taskDescription || '');
      setDeadline(editTaskDetails.deadline || '');
      setImage(editTaskDetails.image||null)
    }
  }, [isEditMode, editTaskDetails]);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await imageToBase64(file)
    setImage(base64);
  };

  const handleCreateTask = () => {
    // Add your logic to create a new task
    const newTask = { id: uuidv4(), taskName, taskDescription, deadline, image };
    console.log('Task created:', newTask);

    // Call the callback to add the task
    onAddTask(newTask);
    resetForm();
  };

  const handleEditTask = () => {
    const updatedTask = { ...editTaskDetails, taskName, taskDescription, deadline, image };
    onEditTask(updatedTask);
    resetForm();
  };
  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setDeadline('');
    setImage(null)
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEditMode ? "Edit Task" : "Create a New Task"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        />
        <TextField
          label="Deadline"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={deadline}
          onChange={handleDeadlineChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} data-testid="choose-file"/>
        {(!isEditMode && image) && <img src={image} width={50} height={50} />}
        {(isEditMode && editTaskDetails.image) && <img src={editTaskDetails.image} width={50} height={50} data-testid="preview-image"/>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={isEditMode ? handleEditTask : handleCreateTask}
          color="primary"
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default TaskForm;
