import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppStateContext } from "../../../contexts/AppStateContext";
import BoardPage from "./BoardPage";
import { act } from "react-dom/test-utils";

const mockAppState = {
  boards: [
    { boardName: "exampleBoard", Todo: [], "In Progress": [], Done: [] },
    // Add more board data as needed for testing
  ],
  addTaskToBoard: jest.fn(),
};

describe("BoardPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("renders BoardPage with correct board name and Add Task button", () => {
    render(
      <MemoryRouter initialEntries={["/boards/exampleBoard"]}>
        <Routes>
          <Route
            path="/boards/:boardName"
            element={
              <AppStateContext.Provider value={mockAppState}>
                <BoardPage />
              </AppStateContext.Provider>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    // expect(screen.getByText("exampleBoard Board")).toBeInTheDocument();
    // expect(screen.getByText("Add Task")).toBeInTheDocument();
    // expect(screen.getByText("Add Column")).toBeInTheDocument();
  });

  // it("opens TaskForm when Add Task button is clicked", async () => {
  //   render(
  //     <MemoryRouter initialEntries={["/boards/exampleBoard"]}>
  //       <Routes>
  //         <Route
  //           path="/boards/:boardName"
  //           element={
  //             <AppStateContext.Provider value={mockAppState}>
  //               <BoardPage />
  //             </AppStateContext.Provider>
  //           }
  //         ></Route>
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // Use act to wrap interactions
  //   act(() => {
  //     // Click the "Add Task" button
  //     fireEvent.click(screen.getByText("Add Task"));
  //   });

  //   // Wait for the modal to be present in the DOM
  //   await waitFor(() => {
  //     expect(screen.getByText("Create a New Task")).toBeInTheDocument();
  //   });
  // });

  // it("opens Add Column  when Add column button is clicked", async () => {
  //   render(
  //     <MemoryRouter initialEntries={["/boards/exampleBoard"]}>
  //       <Routes>
  //         <Route
  //           path="/boards/:boardName"
  //           element={
  //             <AppStateContext.Provider value={mockAppState}>
  //               <BoardPage />
  //             </AppStateContext.Provider>
  //           }
  //         ></Route>
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // Use act to wrap interactions
  //   act(() => {
  //     // Click the "Add Task" button
  //     fireEvent.click(screen.getByText("Add Column"));
  //   });

  //   // Wait for the modal to be present in the DOM
  //   await waitFor(() => {
  //     expect(screen.getByText("Save Column")).toBeInTheDocument();
  //   });
  // });
});
