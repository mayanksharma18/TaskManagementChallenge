import React from "react";
import { render } from "@testing-library/react";
import Board from "./Board";
jest.mock("./CreateBoard/CreateBoard", () => () => (
  <div data-testid="mock-board">Create Board</div>
));
jest.mock("./BoardsList/BoardsList", () => () => (
    <div data-testid="mock-board">Board List</div>
  ));

describe("Board", () => {
  it("renders correctly", () => {
    const { container } = render(<Board />);
    expect(container).toMatchSnapshot();
  });
});
