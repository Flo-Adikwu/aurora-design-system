import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Card, CardHeader, CardFooter } from "./Card";
import React from "react";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders children content", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders with header", () => {
      render(<Card header={<div>Header content</div>}>Card body</Card>);
      expect(screen.getByText("Header content")).toBeInTheDocument();
      expect(screen.getByText("Card body")).toBeInTheDocument();
    });

    it("renders with footer", () => {
      render(<Card footer={<div>Footer content</div>}>Card body</Card>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
      expect(screen.getByText("Card body")).toBeInTheDocument();
    });

    it("renders with both header and footer", () => {
      render(
        <Card header={<div>Header</div>} footer={<div>Footer</div>}>
          Body
        </Card>
      );
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border", "border-gray-200", "shadow-sm");
    });

    it("renders elevated variant", () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("shadow-md", "hover:shadow-lg");
    });

    it("renders outlined variant", () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-2", "border-gray-300");
    });

    it("renders gradient variant", () => {
      const { container } = render(<Card variant="gradient">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("gradient-aurora", "text-white");
    });
  });

  describe("Padding", () => {
    it("applies no padding", () => {
      const { container } = render(<Card padding="none">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-0");
    });

    it("applies small padding", () => {
      const { container } = render(<Card padding="sm">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-4");
    });

    it("applies medium padding by default", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-6");
    });

    it("applies large padding", () => {
      const { container } = render(<Card padding="lg">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-8");
    });

    it("applies padding to sections when header/footer present", () => {
      const { container } = render(
        <Card
          padding="md"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
        >
          Body
        </Card>
      );

      const sections = container.querySelectorAll("div > div");
      expect(sections[0]).toHaveClass("px-6", "py-4"); // header
      expect(sections[1]).toHaveClass("p-6"); // body
      expect(sections[2]).toHaveClass("px-6", "py-4"); // footer
    });
  });

  describe("Hoverable", () => {
    it("applies hover effects when hoverable is true", () => {
      const { container } = render(<Card hoverable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass(
        "hover:shadow-aurora-md",
        "hover:-translate-y-1",
        "cursor-pointer"
      );
    });

    it("does not apply hover effects by default", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass("hover:shadow-aurora-md");
    });
  });

  describe("Custom Props", () => {
    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("accepts custom className", () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("custom-class");
    });

    it("forwards HTML attributes", () => {
      render(<Card data-testid="custom-card">Content</Card>);
      expect(screen.getByTestId("custom-card")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Card>Accessible content</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have violations with header and footer", async () => {
      const { container } = render(
        <Card
          header={<CardHeader title="Title" />}
          footer={<CardFooter>Footer</CardFooter>}
        >
          Content
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe("CardHeader", () => {
  describe("Rendering", () => {
    it("renders title", () => {
      render(<CardHeader title="Card Title" />);
      expect(screen.getByText("Card Title")).toBeInTheDocument();
    });

    it("renders subtitle", () => {
      render(<CardHeader title="Title" subtitle="Subtitle text" />);
      expect(screen.getByText("Subtitle text")).toBeInTheDocument();
    });

    it("renders actions", () => {
      render(<CardHeader title="Title" actions={<button>Action</button>} />);
      expect(
        screen.getByRole("button", { name: "Action" })
      ).toBeInTheDocument();
    });

    it("renders children when no title/subtitle", () => {
      render(<CardHeader>Custom content</CardHeader>);
      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardHeader ref={ref} title="Title" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardHeader className="custom" title="Title" />
      );
      expect(container.firstChild).toHaveClass("custom");
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <CardHeader title="Title" subtitle="Subtitle" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe("CardFooter", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });
  });

  describe("Alignment", () => {
    it("aligns left by default", () => {
      const { container } = render(<CardFooter>Content</CardFooter>);
      expect(container.firstChild).toHaveClass("justify-start");
    });

    it("aligns center", () => {
      const { container } = render(
        <CardFooter align="center">Content</CardFooter>
      );
      expect(container.firstChild).toHaveClass("justify-center");
    });

    it("aligns right", () => {
      const { container } = render(
        <CardFooter align="right">Content</CardFooter>
      );
      expect(container.firstChild).toHaveClass("justify-end");
    });

    it("aligns space-between", () => {
      const { container } = render(
        <CardFooter align="between">Content</CardFooter>
      );
      expect(container.firstChild).toHaveClass("justify-between");
    });
  });

  describe("Custom Props", () => {
    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Content</CardFooter>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("accepts custom className", () => {
      const { container } = render(
        <CardFooter className="custom">Content</CardFooter>
      );
      expect(container.firstChild).toHaveClass("custom");
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
