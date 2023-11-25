// BoardPage.jsx
import React, { useState, useContext , useEffect} from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../Tasks/TaskForm/TaskForm";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { AppStateContext } from "../../../contexts/AppStateContext";
import TasksList from "../Tasks/TasksList/TasksList";
import AddColumnButton from "../AddColumn/AddColumnButton";

const BoardPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentBoardData, setCurrentBoardData] = useState({});
  const { boardName } = useParams();
  const { boards, addTaskToBoard } = useContext(AppStateContext);

  useEffect(() => {
    if (boards.length > 0) {
      const currentBoardData = boards.filter(
        (board) => board.boardName === boardName
      );
      setCurrentBoardData(currentBoardData[0]);
    }
  }, [boards,boardName]);

  const handleToggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };
  const handleAddTask = (task) => {
    addTaskToBoard(boardName, task);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {boardName} Board
      </Typography>
      <Grid container spacing={2} justify="center">
        <Grid  xs={12} sm={4}>
          <Paper
            style={{
              background: "lightGrey",
              textAlign: "left",
              padding: "12px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleToggleTaskForm}
              sx={{
                margin: "16px 0px 16px 0px",
                width: "150px",
                height: "50px",
              }}
            >
              Add Task
            </Button>

            {showTaskForm && (
              <TaskForm
                open={showTaskForm}
                onClose={handleToggleTaskForm}
                onAddTask={handleAddTask}
              />
            )}
            <TasksList boardName={boardName} />
          </Paper>
        </Grid>
        {["Todo", "In Progress", "Done"].map((workState) => {
          if (currentBoardData[workState]) {
            return (
              <Grid  xs={8} sm={2} key={workState}>
                <Paper style={{ height: "49vh", background: "orange" }}>
                  <Typography variant="h4" gutterBottom>
                    {workState}
                  </Typography>
                </Paper>
              </Grid>
            );
          }
        })}
        <AddColumnButton boardName={boardName}/>
      </Grid>
    </div>
  );
};

export default BoardPage;
