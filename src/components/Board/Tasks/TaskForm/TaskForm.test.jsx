import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TaskForm from "./TaskForm";
import { imageToBase64 } from "../../../../utilities/ImageIntoBase64";

// Mock the imageToBase64 utility function
jest.mock("../../../../utilities/ImageIntoBase64", () => ({
  imageToBase64: jest.fn(),
}));

describe("TaskForm Component", () => {
  const mockOnClose = jest.fn();
  const mockOnAddTask = jest.fn();
  const mockOnEditTask = jest.fn();
  const mockEditTaskDetails = {
    taskName: "Edit Task Name",
    taskDescription: "Edit Task Description",
    deadline: "2023-12-31",
    image: "editTaskImageBase64",
  };

  test("renders TaskForm in create mode", async () => {
    imageToBase64.mockResolvedValue("mockedBase64");
    render(<TaskForm open onClose={mockOnClose} onAddTask={mockOnAddTask} />);

    fireEvent.change(screen.getByLabelText("Task Name"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Task Description"), {
      target: { value: "New Task Description" },
    });
    fireEvent.change(screen.getByLabelText("Deadline"), {
      target: { value: "2023-12-31" },
    });

    const fileInput = screen.getByTestId("choose-file");
    fireEvent.change(fileInput, {
      target: { files: [new File(["file contents"], "test.png")] },
    });
    await waitFor(async () => {
      await screen.findByRole("img");
    });

    fireEvent.click(screen.getByText("Add Task"));

    expect(mockOnAddTask).toHaveBeenCalledWith({
      id: expect.any(String),
      taskName: "New Task",
      taskDescription: "New Task Description",
      deadline: "2023-12-31",
      image: "mockedBase64",
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders TaskForm in edit mode", () => {
    imageToBase64.mockResolvedValue("mockedBase64");
    render(
      <TaskForm
        open
        onClose={mockOnClose}
        onEditTask={mockOnEditTask}
        isEditMode
        editTaskDetails={mockEditTaskDetails}
      />
    );

    fireEvent.change(screen.getByLabelText("Task Name"), {
      target: { value: "New Task edited" },
    });

    fireEvent.click(screen.getByText("Update Task"));

    // Add your assertions here
    expect(mockOnEditTask).toHaveBeenCalledWith({
      ...mockEditTaskDetails,
      taskName: "New Task edited", // Assuming the image is changed in edit mode
    });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
