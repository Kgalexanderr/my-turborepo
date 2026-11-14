import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Page from "../app/page";

it("renders the sites app entry page", () => {
  render(<Page />);
  expect(screen.getByText("Sites App")).toBeInTheDocument();
});
