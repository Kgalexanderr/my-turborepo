import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Page from "../app/page";

it("renders the dashboard entry page", () => {
  render(<Page />);
  expect(screen.getByText("Dashboard App")).toBeInTheDocument();
});
