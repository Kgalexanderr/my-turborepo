import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@repo/ui/components/button";

describe("Button", () => {
  it("forwards click handlers and button attributes", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="submit" onClick={onClick}>
        Publish
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Publish" });
    expect(button).toHaveAttribute("type", "submit");
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("prevents clicks when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Publish
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Publish" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("lets consumers override conflicting Tailwind classes", () => {
    render(<Button className="cursor-help px-8">Publish</Button>);

    const button = screen.getByRole("button", { name: "Publish" });
    expect(button).toHaveClass("cursor-help", "px-8");
    expect(button).not.toHaveClass("cursor-pointer");
    expect(button).not.toHaveClass("px-4");
  });

  it("renders a link with asChild without nesting a button", () => {
    render(
      <Button asChild>
        <a href="/dashboard">Dashboard</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
