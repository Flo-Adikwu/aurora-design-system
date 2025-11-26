import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Badge, NotificationBadge } from "./Badge";
import React from "react";

describe("Badge", () => {
  describe("Rendering", () => {
    it("renders children content", () => {
      render(<Badge>Badge text</Badge>);
      expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("renders as a span element", () => {
      const { container } = render(<Badge>Badge</Badge>);
      expect(container.firstChild?.nodeName).toBe("SPAN");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-gray-100", "text-gray-800");
    });

    it("renders primary variant", () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-aurora-100", "text-aurora-800");
    });

    it("renders success variant", () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-green-100", "text-green-800");
    });

    it("renders warning variant", () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
    });

    it("renders error variant", () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-red-100", "text-red-800");
    });

    it("renders info variant", () => {
      const { container } = render(<Badge variant="info">Info</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-blue-100", "text-blue-800");
    });

    it("renders gradient variant", () => {
      const { container } = render(<Badge variant="gradient">Gradient</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("gradient-aurora", "text-white");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      const { container } = render(<Badge badgeSize="sm">Small</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("text-xs", "px-2", "py-0.5");
    });

    it("renders medium size by default", () => {
      const { container } = render(<Badge>Medium</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("text-sm", "px-2.5", "py-0.5");
    });

    it("renders large size", () => {
      const { container } = render(<Badge badgeSize="lg">Large</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("text-base", "px-3", "py-1");
    });
  });

  describe("Shapes", () => {
    it("renders pill shape by default", () => {
      const { container } = render(<Badge>Pill</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("rounded-full");
    });

    it("renders rounded shape", () => {
      const { container } = render(<Badge shape="rounded">Rounded</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("rounded");
    });

    it("renders square shape", () => {
      const { container } = render(<Badge shape="square">Square</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("rounded-none");
    });
  });

  describe("Dot Indicator", () => {
    it("does not show dot by default", () => {
      const { container } = render(<Badge>No dot</Badge>);
      const dot = container.querySelector(".w-1\\.5");
      expect(dot).not.toBeInTheDocument();
    });

    it("shows dot when dot prop is true", () => {
      const { container } = render(<Badge dot>With dot</Badge>);
      const dot = container.querySelector(".w-1\\.5");
      expect(dot).toBeInTheDocument();
    });

    it("applies correct dot color for each variant", () => {
      const { container: container1 } = render(
        <Badge variant="primary" dot>
          Primary
        </Badge>
      );
      expect(container1.querySelector(".bg-aurora-600")).toBeInTheDocument();

      const { container: container2 } = render(
        <Badge variant="success" dot>
          Success
        </Badge>
      );
      expect(container2.querySelector(".bg-green-600")).toBeInTheDocument();

      const { container: container3 } = render(
        <Badge variant="error" dot>
          Error
        </Badge>
      );
      expect(container3.querySelector(".bg-red-600")).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("forwards ref", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("accepts custom className", () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("custom-class");
    });

    it("forwards HTML attributes", () => {
      render(<Badge data-testid="custom-badge">Badge</Badge>);
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Badge>Accessible badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have violations with all variants", async () => {
      const { container } = render(
        <div>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe("NotificationBadge", () => {
  describe("Rendering", () => {
    it("renders count", () => {
      render(<NotificationBadge count={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("renders max+ when count exceeds max", () => {
      render(<NotificationBadge count={150} max={99} />);
      expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("uses default max of 99", () => {
      render(<NotificationBadge count={100} />);
      expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("hides when count is 0", () => {
      const { container } = render(<NotificationBadge count={0} />);
      expect(container.firstChild).toBeNull();
    });

    it("shows when count is 0 and showZero is true", () => {
      render(<NotificationBadge count={0} showZero />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Default Props", () => {
    it("uses error variant by default", () => {
      const { container } = render(<NotificationBadge count={5} />);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-red-100", "text-red-800");
    });

    it("uses small size by default", () => {
      const { container } = render(<NotificationBadge count={5} />);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("text-xs");
    });

    it("uses pill shape", () => {
      const { container } = render(<NotificationBadge count={5} />);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("rounded-full");
    });
  });

  describe("Custom Props", () => {
    it("accepts custom variant", () => {
      const { container } = render(
        <NotificationBadge count={5} variant="success" />
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-green-100");
    });

    it("accepts custom size", () => {
      const { container } = render(
        <NotificationBadge count={5} badgeSize="lg" />
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("text-base");
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<NotificationBadge ref={ref} count={5} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("Max Values", () => {
    it("handles custom max value", () => {
      render(<NotificationBadge count={50} max={20} />);
      expect(screen.getByText("20+")).toBeInTheDocument();
    });

    it("shows exact count when below max", () => {
      render(<NotificationBadge count={50} max={100} />);
      expect(screen.getByText("50")).toBeInTheDocument();
    });

    it("handles max value of 0", () => {
      render(<NotificationBadge count={5} max={0} />);
      expect(screen.getByText("0+")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<NotificationBadge count={5} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
