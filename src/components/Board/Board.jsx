import React from "react";
import CreateBoard from "./CreateBoard/CreateBoard";
import BoardsList from "./BoardsList/BoardsList";

const Board = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <CreateBoard />
      <div style={{ marginTop: "80px" }}>
        <BoardsList />
      </div>
    </div>
  );
};

export default Board;
