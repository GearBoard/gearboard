import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Shared/UI/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isAuthenticated: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const DesktopUnauthenticated: Story = {
  args: { isAuthenticated: false },
};

export const DesktopAuthenticated: Story = {
  args: { isAuthenticated: true },
};

export const MobileUnauthenticated: Story = {
  args: { isAuthenticated: false },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};

export const MobileAuthenticated: Story = {
  args: { isAuthenticated: true },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};
