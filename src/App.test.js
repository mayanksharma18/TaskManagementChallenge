import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Home component on / route", () => {
  render(<App />);
  expect(screen.getByText('Task Management App')).toBeInTheDocument();
  expect(screen.getByText('Create board')).toBeInTheDocument();
  expect(screen.getByText('Task Management App')).toBeInTheDocument();
  expect(render(<App />).container).toMatchSnapshot();
});
