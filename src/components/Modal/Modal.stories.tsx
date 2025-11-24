import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import React from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    modalSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Size of the modal",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Whether clicking overlay closes the modal",
    },
    closeOnEsc: {
      control: "boolean",
      description: "Whether pressing ESC closes the modal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
        >
          <p className="text-gray-600">
            This is the modal content. You can put any content here.
          </p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          footer={
            <>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-gray-600">
            Are you sure you want to perform this action?
          </p>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Modal"
          modalSize="sm"
        >
          <p className="text-gray-600">This is a small modal.</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Modal"
          modalSize="lg"
        >
          <p className="text-gray-600">
            This is a large modal with more space for content.
          </p>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal with Long Content
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
        >
          <div className="space-y-4 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
            <p>
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
              quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: "", email: "" });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${JSON.stringify(formData)}`);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="User Information"
          footer={
            <>
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit" form="user-form">
                Save
              </Button>
            </>
          }
        >
          <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-aurora border border-gray-300 px-3 py-2 focus:border-aurora-500 focus:outline-none focus:ring-1 focus:ring-aurora-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full rounded-aurora border border-gray-300 px-3 py-2 focus:border-aurora-500 focus:outline-none focus:ring-1 focus:ring-aurora-500"
              />
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal (No Close Button)
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          showCloseButton={false}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          footer={
            <>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                No
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="danger">
                Yes, Delete
              </Button>
            </>
          }
        >
          <p className="text-gray-600">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal>
      </>
    );
  },
};

export const DeleteConfirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} variant="danger">
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Confirmation"
          modalSize="sm"
          footer={
            <>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert("Item deleted!");
                  setIsOpen(false);
                }}
                variant="danger"
              >
                Delete
              </Button>
            </>
          }
        >
          <p className="text-gray-600">
            This action cannot be undone. Are you sure you want to delete this
            item?
          </p>
        </Modal>
      </>
    );
  },
};

export const MultiStep: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);

    const handleClose = () => {
      setIsOpen(false);
      setStep(1);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Start Multi-Step Process
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title={`Step ${step} of 3`}
          footer={
            <>
              {step > 1 && (
                <Button onClick={() => setStep(step - 1)} variant="outline">
                  Back
                </Button>
              )}
              <div className="flex-1" />
              <Button onClick={handleClose} variant="outline">
                Cancel
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              ) : (
                <Button onClick={handleClose}>Finish</Button>
              )}
            </>
          }
        >
          {step === 1 && (
            <p className="text-gray-600">This is step 1 content.</p>
          )}
          {step === 2 && (
            <p className="text-gray-600">This is step 2 content.</p>
          )}
          {step === 3 && (
            <p className="text-gray-600">This is step 3 content.</p>
          )}
        </Modal>
      </>
    );
  },
};

export const NestedModals: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = React.useState(false);
    const [isSecondOpen, setIsSecondOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Open First Modal</Button>
        <Modal
          isOpen={isFirstOpen}
          onClose={() => setIsFirstOpen(false)}
          title="First Modal"
        >
          <p className="text-gray-600 mb-4">This is the first modal.</p>
          <Button onClick={() => setIsSecondOpen(true)}>
            Open Second Modal
          </Button>
        </Modal>
        <Modal
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
          title="Second Modal"
          modalSize="sm"
        >
          <p className="text-gray-600">This is a nested modal!</p>
        </Modal>
      </>
    );
  },
};
