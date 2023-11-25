import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

import { AppStateContext } from "../../../contexts/AppStateContext";

const AddColumnButton = ({ boardName }) => {
  const [open, setOpen] = useState(false);
  const [workState, setWorkState] = useState("");
  const { addWorkStateToBoard } = useContext(AppStateContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWorkState("");
  };

  const handleSaveColumn = () => {
    addWorkStateToBoard(boardName, workState);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        sx={{
          margin: "16px 0px 16px 0px",
          width: "200px",
          height: "50px",
        }}
        endIcon={<AddIcon />}
        data-testid="addColumn"
      >
        Add Column
      </Button>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Add your status column!
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="workState-label">Work State</InputLabel>
              <Select
                labelId="workState-label"
                id="workState"
                value={workState}
                onChange={(e) => setWorkState(e.target.value)}
                label="Work State"
                data-testid="workState"
              >
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleSaveColumn}
              color="primary"
              variant="contained"
              sx={{ marginTop: "16px" }}
            >
              Save Column
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AddColumnButton;
