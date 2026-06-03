import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Home, MessageSquare, Bookmark, ArrowLeftRight, Settings, LogOut } from "lucide-react";
import { Sidebar } from "./Sidebar";

const defaultItems = [
  { href: "/home", icon: <Home className="w-5 h-5" />, label: "หน้าหลัก" },
  { href: "/my-posts", icon: <MessageSquare className="w-5 h-5" />, label: "กระทู้ของคุณ" },
  { href: "/saved", icon: <Bookmark className="w-5 h-5" />, label: "ที่บันทึกไว้" },
];

const defaultMobileActions = [
  { icon: <ArrowLeftRight className="w-5 h-5" />, label: "Switch Account", onClick: () => {} },
  { icon: <Settings className="w-5 h-5" />, label: "Setting", onClick: () => {} },
  { icon: <LogOut className="w-5 h-5" />, label: "Log out", onClick: () => {} },
];

const meta: Meta<typeof Sidebar> = {
  title: "Shared/UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    displayName: "คุณกะปอมป้อมป้อม",
    items: defaultItems,
    mobileActions: defaultMobileActions,
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Desktop
export const DesktopExpanded: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/other" } },
    viewport: { defaultViewport: "desktop" },
  },
};

export const DesktopItemSelected: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/home" } },
    viewport: { defaultViewport: "desktop" },
  },
};

// Mobile
export const MobileExpanded: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/other" } },
    viewport: { defaultViewport: "mobile1" },
  },
};

export const MobileItemSelected: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/home" } },
    viewport: { defaultViewport: "mobile1" },
  },
};
