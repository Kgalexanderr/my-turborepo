import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Page from "../src/app/page";

it("renders the blank app entry page", () => {
  render(<Page />);
  expect(screen.getByText("Blank App")).toBeInTheDocument();
});
