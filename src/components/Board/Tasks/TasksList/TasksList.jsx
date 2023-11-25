import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText, Stack, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppStateContext } from '../../../../contexts/AppStateContext';
import EditTask from '../EditTask/EditTask';

const TasksList = ({ boardName }) => {
  const { boards, updateBoards } = useContext(AppStateContext);

  const tasks = boards.find((board) => board.boardName === boardName)?.tasks || [];

  const handleDeleteTask = (taskId) => {
    const updatedBoards = boards.map((board) => {
      if (board.boardName === boardName) {
        const updatedTasks = board.tasks.filter((task) => task.id !== taskId);
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });

    updateBoards(updatedBoards);
  };

  const handleOnEdit = (updatedTaskDetails) => {
    const updatedBoards = boards.map((board) => {
      if (board.boardName === boardName) {
        const updatedTasks = board.tasks.map((task) => {
          if(task.id === updatedTaskDetails.id){
            return updatedTaskDetails;
          }
          return task
        });
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });

    updateBoards(updatedBoards);

  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Tasks:
      </Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks available.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <Paper
              key={task.id}
              sx={{
                marginBottom: 2,
                padding: 2,
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack spacing={1}>
                  <ListItemText primary="Task" secondary={task.taskName} />
                  <ListItemText primary="Description" secondary={task.taskDescription} />
                  <ListItemText primary="Deadline" secondary={task.deadline} />
                  <Stack direction="row" spacing={1}>
                    <IconButton color="primary" size="small" onClick={() => handleDeleteTask(task.id)} data-testid="deleteButton">
                      <DeleteIcon />
                    </IconButton>
                    <EditTask task ={task} handleOnEdit={handleOnEdit}/>
                  </Stack>
                </Stack>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </div>
  );
};

export default TasksList;
