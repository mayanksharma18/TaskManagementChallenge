// AppStateContext.js

import React, { createContext, useState, useEffect } from 'react';

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch boards from local storage when the component mounts
    const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    setBoards(storedBoards);
  }, []);

  const updateBoards = (newBoards) => {
    setBoards(newBoards);

    // Update local storage
    localStorage.setItem('boards', JSON.stringify(newBoards));
  };

  const addTaskToBoard = (boardName,task) => {
    const updateBoard = [...boards];
    updateBoard.map(boardInLS => {
        if (boardInLS.boardName === boardName) {
            boardInLS.tasks = [...(boardInLS.tasks || []),task]
        }
    })
    updateBoards(updateBoard);
  }

  const addWorkStateToBoard = (boardName,workState) => {
    const updateBoard = [...boards];
    updateBoard.forEach(boardInLS => {
        if (boardInLS.boardName === boardName) {
            boardInLS[workState] = []
        }
    })
    updateBoards(updateBoard);
  }


  const contextValue = {
    boards,
    updateBoards,
    addTaskToBoard,
    addWorkStateToBoard,
  };

  return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
};

export { AppStateContext, AppStateProvider };
