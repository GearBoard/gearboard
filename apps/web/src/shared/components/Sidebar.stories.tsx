import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Sidebar from "@/shared/components/Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Shared/UI/Sidebar",
  component: Sidebar,
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
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

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

export const DesktopActiveSavedPage: Story = {
  args: {
    isAuthenticated: true,
    activePage: "saved",
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
};
