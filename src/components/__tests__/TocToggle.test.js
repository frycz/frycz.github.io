import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TocToggle from "../TocToggle";

describe("TocToggle", () => {
  const button = () => screen.getByRole("button", { name: /toggle table of contents/i });

  // The contents are a region the button owns, and a reader on a screen reader is told as much.
  it("points at the contents it controls", () => {
    render(<TocToggle open onToggle={() => {}} />);
    expect(button()).toHaveAttribute("aria-controls", "toc");
  });

  it("says whether the contents are open", () => {
    const { rerender } = render(<TocToggle open onToggle={() => {}} />);
    expect(button()).toHaveAttribute("aria-expanded", "true");

    rerender(<TocToggle open={false} onToggle={() => {}} />);
    expect(button()).toHaveAttribute("aria-expanded", "false");
  });

  it("asks for the contents to be toggled when clicked", () => {
    const onToggle = jest.fn();
    render(<TocToggle open onToggle={onToggle} />);

    fireEvent.click(button());
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
