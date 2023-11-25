import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TasksList from "./TasksList";
import { AppStateContext } from "../../../../contexts/AppStateContext";

const mockAppState = {
  boards: [
    {
      boardName: "exampleBoard",
      tasks: [
        {
          id: 1,
          taskName: "Test Task",
          taskDescription: "Test Description",
          deadline: "2023-12-01",
        },
     
      ],
    },
  ],
  updateBoards: jest.fn(),
};

describe("TasksList Component", () => {
  it("render correctly", () => {
    expect(
      render(
        <AppStateContext.Provider value={mockAppState}>
          <TasksList boardName="exampleBoard" />
        </AppStateContext.Provider>
      ).container
    ).toMatchSnapshot();
  });
  
  it("renders TasksList with tasks and handles delete and edit actions", () => {
    render(
      <AppStateContext.Provider value={mockAppState}>
        <TasksList boardName="exampleBoard" />
      </AppStateContext.Provider>
    );
    expect(screen.getByText("Tasks:")).toBeInTheDocument();

    // Expect the task details to be rendered
    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Deadline")).toBeInTheDocument();

    const deleteButton = screen.getByTestId("deleteButton");
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    waitFor(() => {
      expect(screen.queryByText("Task")).not.toBeInTheDocument();
      expect(screen.queryByText("Description")).not.toBeInTheDocument();
      expect(screen.queryByText("Deadline")).not.toBeInTheDocument();
    });
  });
});
