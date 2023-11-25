import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BoardsList from "./BoardsList";
import { AppStateContext } from "../../../contexts/AppStateContext";
describe("BoardsList", () => {
  it("renders current boards", () => {
    const mockBoards = [{ boardName: "Board1" }, { boardName: "Board2" }];

    render(
      <Router>
        <AppStateContext.Provider value={{ boards: mockBoards }}>
          <BoardsList />
        </AppStateContext.Provider>
      </Router>
    );

    // Check if the "Current boards:" text is present
    expect(screen.getByText(/Current boards:/i)).toBeInTheDocument();

    // Check if each board is rendered as a button link
    mockBoards.forEach((board) => {
      const boardLink = screen.getByRole("link", { name: board.boardName });
      expect(boardLink).toBeInTheDocument();
      expect(boardLink).toHaveAttribute("href", `/board/${board.boardName}`);
    });
  });

  it('renders "No boards available." when there are no boards', () => {
    const mockBoards = [];

    render(
      <Router>
        <AppStateContext.Provider value={{ boards: mockBoards }}>
          <BoardsList />
        </AppStateContext.Provider>
      </Router>
    );

    // Check if the "No boards available." text is present
    expect(screen.getByText(/No boards available./i)).toBeInTheDocument();
  });
});
