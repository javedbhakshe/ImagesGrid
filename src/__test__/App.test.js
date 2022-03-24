import { render, screen } from "@testing-library/react";
import App from "../App";

test("On Initial Render", () => {
  render(<App />);
  const linkElement = screen.getByText(/Image Gallery/i);
  expect(linkElement).toBeInTheDocument();
});
