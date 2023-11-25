import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CreateBoard from "./CreateBoard";
import { AppStateContext } from "../../../contexts/AppStateContext";

// Mocking the context values
const mockAppState = {
  boards: [],
  updateBoards: jest.fn(),
};

test("renders CreateBoard component and creates a new board", () => {
  render(
    <AppStateContext.Provider value={mockAppState}>
      <CreateBoard />
    </AppStateContext.Provider>
  );

  // Click the "Create board" button
  fireEvent.click(screen.getByText("Create board"));

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText("Board Name"), {
    target: { value: "Test Board" },
  });

  fireEvent.change(screen.getByLabelText("Purpose"), {
    target: { value: "Test Purpose" },
  });

  // Click the "Create" button
  fireEvent.click(screen.getByText("Create"));

  // Expect the updateBoards function to be called with the correct arguments
  expect(mockAppState.updateBoards).toHaveBeenCalledWith([
    { boardName: "Test Board", purpose: "Test Purpose" },
  ]);

  // Expect the dialog to be closed
  waitFor(() => {
    expect(screen.queryByText("Create a New Board")).not.toBeInTheDocument();
  })
 
});
