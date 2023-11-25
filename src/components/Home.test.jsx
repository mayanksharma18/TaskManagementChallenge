import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
jest.mock("./Board/Board", () => () => (
  <div data-testid="mock-board">Mocked Board</div>
));

describe("Home", () => {
  it("renders Board component", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
