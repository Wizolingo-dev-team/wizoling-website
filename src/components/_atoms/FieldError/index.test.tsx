import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FieldError from "./index";

describe("FieldError", () => {
  it("renders nothing when message is omitted", () => {
    const { container } = render(<FieldError />);
    expect(container.firstChild).toBeNull();
  });

  it("renders visible alert text when message is provided", () => {
    render(<FieldError message="Password is required" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeVisible();
    expect(alert).toHaveTextContent("Password is required");
  });
});

