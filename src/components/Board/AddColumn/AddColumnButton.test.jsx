import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddColumnButton from "./AddColumnButton";
import { AppStateContext } from "../../../contexts/AppStateContext";
import UserEvent from "@testing-library/user-event";

describe("AddColumnButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  const mockedAddWorkStateToBoard = jest.fn();
  it("renders AddColumnButton", () => {
    render(
      <AppStateContext.Provider value={{ addWorkStateToBoard: mockedAddWorkStateToBoard }}>
        <AddColumnButton boardName="exampleBoard" />
      </AppStateContext.Provider>
    );

    fireEvent.click(screen.getByTestId("addColumn"));
    expect(screen.getByText("Save Column")).toBeInTheDocument();
  });

  
  it("renders AddColumnButton and adds a work state", async () => {
    render(
      <AppStateContext.Provider value={{ addWorkStateToBoard: mockedAddWorkStateToBoard }}>
        <AddColumnButton boardName="exampleBoard" />
      </AppStateContext.Provider>
    );

    fireEvent.click(screen.getByTestId("addColumn"));

    fireEvent.mouseDown(screen.getByLabelText("Work State"));

    UserEvent.click(screen.getByText("Todo"));

    UserEvent.click(screen.getByText("Save Column"));

    expect(mockedAddWorkStateToBoard).toHaveBeenCalledWith("exampleBoard", "Todo");
  });
});
