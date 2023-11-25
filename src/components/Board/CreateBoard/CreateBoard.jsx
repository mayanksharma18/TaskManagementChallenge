import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { AppStateContext } from "../../../contexts/AppStateContext";

const CreateBoard = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ boardName: "", purpose: "" });

  const { boards, updateBoards } = useContext(AppStateContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ boardName: "", purpose: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCreateBoard = () => {
    const newBoard = formData;
    updateBoards([...boards, newBoard]);
    setFormData({ boardName: "", purpose: "" });
    handleClose();
  };

  return (
    <div>
      <Card sx={{ padding: "50px 50px 50px 50px" }}>
        <CardContent>
          <Button variant="outlined" color="secondary" onClick={handleOpen}>
            Create board
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Board</DialogTitle>
        <DialogContent sx={{ padding: "40px" }}>
          <TextField
            fullWidth
            id="boardName"
            label="Board Name"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="purpose"
            label="Purpose"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateBoard}
            color="primary"
            disabled={!(formData.boardName && formData.purpose)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateBoard;
