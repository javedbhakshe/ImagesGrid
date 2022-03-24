import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import SearchBar from "../SearchBar";

test("Check if input field is empty at start", () => {
  render(<SearchBar />);
  const input = screen.getByPlaceholderText(/Search/i);
  expect(input).toHaveValue("");
});

test("Check If Search gets Enabled", () => {
  render(<SearchBar />);
  userEvent.type(screen.getByPlaceholderText("Search"), "Image Gallary");
  expect(screen.getByTitle("Search Images")).toBeEnabled();
});
