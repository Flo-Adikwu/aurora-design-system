import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

describe("Tooltip", () => {
  it("renders children", () => {
    render(
      <Tooltip content="Test tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    expect(
      screen.getByRole("button", { name: /trigger/i })
    ).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip" delay={0}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      expect(screen.getByText("Test tooltip")).toBeInTheDocument();
    });
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip" delay={0}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.hover(trigger);
    await waitFor(() =>
      expect(screen.getByRole("tooltip")).toBeInTheDocument()
    );

    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip" delay={0}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.tab(); // Focus the button

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("does not show tooltip when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip" disabled delay={0}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.hover(trigger);

    await waitFor(
      () => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it("applies correct variant classes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Tooltip content="Test tooltip" variant="default" delay={0}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.hover(trigger);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveClass("gradient-aurora");
    });

    await user.unhover(trigger);

    rerender(
      <Tooltip content="Test tooltip" variant="dark" delay={0}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    await user.hover(trigger);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveClass("bg-gray-900");
    });
  });

  it("renders rich content", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip
        content={
          <div>
            <strong>Title</strong>
            <p>Description</p>
          </div>
        }
        delay={0}
      >
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  it("respects delay prop", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip" delay={300}>
        <Button>Trigger</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    await user.hover(trigger);

    // Should not appear immediately
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    // Should appear after delay
    await waitFor(
      () => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
});
