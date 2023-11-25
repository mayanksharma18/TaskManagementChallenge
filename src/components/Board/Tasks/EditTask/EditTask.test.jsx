import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditTask from "./EditTask";

const mockTask = {
  id: 1,
  title: "Test Task",
  description: "Test Description",
};

const mockHandleOnEdit = jest.fn();

test("renders EditTask component and opens TaskForm in edit mode", () => {
  render(<EditTask task={mockTask} handleOnEdit={mockHandleOnEdit} />);

  fireEvent.click(screen.getByRole("button"));

  expect(screen.getByText("Edit Task")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Task Name"), {
    target: { value: "Task1" },
  });
  fireEvent.change(screen.getByLabelText("Task Description"), {
    target: { value: "New Task Description1" },
  });
  fireEvent.change(screen.getByLabelText("Deadline"), {
    target: { value: "2023-12-31" },
  });
  fireEvent.click(screen.getByText("Update Task"));

  expect(mockHandleOnEdit).toHaveBeenCalledWith({
    deadline: "2023-12-31",
    description: "Test Description",
    id: 1,
    image: null,
    taskDescription: "New Task Description1",
    taskName: "Task1",
    title: "Test Task",
  });

  expect(screen.queryByText("Edit Task")).not.toBeInTheDocument();
});
