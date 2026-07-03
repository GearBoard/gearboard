import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, userEvent } from "storybook/test";
import AppLayout from "@/shared/components/AppLayout";

const meta: Meta<typeof AppLayout> = {
  title: "Shared/UI/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isAuthenticated: { control: "boolean" },
    activePage: {
      control: "select",
      options: ["home", "posts", "saved"],
    },
  },
  args: {
    children: (
      <div className="p-8 text-gray-500">Page content goes here</div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

export const DesktopUnauthenticated: Story = {
  args: {
    isAuthenticated: false,
    activePage: "home",
  },
};

export const DesktopAuthenticated: Story = {
  args: {
    isAuthenticated: true,
    activePage: "home",
    user: { name: "John Doe" },
  },
};

export const DesktopActivePostsPage: Story = {
  args: {
    isAuthenticated: true,
    activePage: "posts",
    user: { name: "John Doe" },
  },
};

export const MobileUnauthenticated: Story = {
  args: {
    isAuthenticated: false,
    activePage: "home",
  },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Menu" }));
  },
};

export const MobileAuthenticated: Story = {
  args: {
    isAuthenticated: true,
    activePage: "home",
    user: { name: "John Doe" },
  },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Menu" }));
  },
};
