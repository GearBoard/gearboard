import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AboutCard from "./AboutCard";

const meta: Meta<typeof AboutCard> = {
  title: "Shared/AboutCard",
  component: AboutCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 313 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AboutCard>;

export const Default: Story = {
  args: {
    onButtonClick: () => alert("ไปหน้าเกี่ยวกับเรา"),
  },
};

export const CustomContent: Story = {
  args: {
    title: "เกี่ยวกับทีมของเรา",
    description: "ทีมพัฒนา GearBoard เป็นนักศึกษาและศิษย์เก่าที่ร่วมกันสร้างแพลตฟอร์มนี้ขึ้นมา",
    buttonText: "ทำความรู้จักทีม",
    onButtonClick: () => alert("ไปหน้าเกี่ยวกับทีม"),
  },
};
