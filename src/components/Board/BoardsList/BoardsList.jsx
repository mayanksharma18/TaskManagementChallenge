// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import { AppStateContext } from "../../../contexts/AppStateContext";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// const BoardsList = () => {
//   const { boards } = useContext(AppStateContext);

//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>
//         Current boards:
//       </Typography>
//       {boards.length === 0 ? (
//         <Typography>No boards available.</Typography>
//       ) : (
//         <Stack direction="column" spacing={2}>
//           {boards.map((board, index) => (
//             <Item key={index}>
//               <Link to={`/board/${board.boardName}`}>{board.boardName}</Link>
//             </Item>
//           ))}
//         </Stack>
//       )}
//     </div>
//   );
// };

// export default BoardsList;
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { AppStateContext } from "../../../contexts/AppStateContext";

const StyledItem = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
}));

const BoardsList = () => {
  const { boards } = useContext(AppStateContext);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Current boards:
      </Typography>
      {boards.length === 0 ? (
        <Typography>No boards available.</Typography>
      ) : (
        <Stack direction="column" spacing={2}>
          {boards.map((board, index) => (
            <StyledItem key={index}>
              <Button
                component={Link}
                to={`/board/${board.boardName}`}
                variant="contained"
                color="primary"
                fullWidth
              >
                {board.boardName}
              </Button>
            </StyledItem>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default BoardsList;

