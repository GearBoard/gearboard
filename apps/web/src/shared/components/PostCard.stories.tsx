import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PostCard, { type PostCardProps } from "./PostCard";

const meta: Meta<typeof PostCard> = {
  title: "Shared/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof PostCard>;

const baseArgs = {
  title: "ใครมีเทคนิคอ่านหนังสือก่อนสอบ Midterm บ้าง",
  description:
    "อยากรู้ว่าเพื่อนๆ มีวิธีจัดตารางอ่านหนังสือก่อนสอบยังไงบ้าง เผื่อจะเอามาปรับใช้กับตัวเองบ้าง เพราะรอบนี้เนื้อหาเยอะมาก",
  tags: ["แคลคูลัส", "ฟิสิกส์", "เคมี"],
  likeCount: 24,
  commentCount: 8,
  authorInfo: { id: "1", name: "gear.head", image: null },
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
};

// Wraps PostCard with local state so like/save actually toggle when clicked in Storybook.
function InteractivePostCard(props: PostCardProps) {
  const [isLiked, setIsLiked] = useState(props.isLiked ?? false);
  const [isSaved, setIsSaved] = useState(props.isSaved ?? false);
  const [likeCount, setLikeCount] = useState(props.likeCount);

  return (
    <PostCard
      {...props}
      isLiked={isLiked}
      isSaved={isSaved}
      likeCount={likeCount}
      onLikeClick={() => {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => prev + (isLiked ? -1 : 1));
      }}
      onSaveClick={() => setIsSaved((prev) => !prev)}
      onCommentClick={() => alert("ไปหน้าคอมเมนต์")}
    />
  );
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <InteractivePostCard {...args} />,
};

export const Mobile: Story = {
  args: baseArgs,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 354 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <InteractivePostCard {...args} />,
};

export const WithAvatar: Story = {
  args: {
    ...baseArgs,
    authorInfo: { id: "1", name: "gear.head", image: "https://i.pravatar.cc/80" },
  },
  render: (args) => <InteractivePostCard {...args} />,
};

export const NoTags: Story = {
  args: {
    ...baseArgs,
    tags: [],
  },
  render: (args) => <InteractivePostCard {...args} />,
};

export const LikedAndSaved: Story = {
  args: {
    ...baseArgs,
    isLiked: true,
    isSaved: true,
  },
  render: (args) => <InteractivePostCard {...args} />,
};

export const LikedAndSavedMobile: Story = {
  args: {
    ...baseArgs,
    isLiked: true,
    isSaved: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 354 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <InteractivePostCard {...args} />,
};

const IMAGE_URL = "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80";

export const WithImage: Story = {
  name: "Post Card with Pic",
  args: {
    ...baseArgs,
    imageUrl: IMAGE_URL,
    isOwner: true,
  },
  render: (args) => <InteractivePostCard {...args} />,
};

export const WithImageMobile: Story = {
  name: "Post Card with Pic (Mobile)",
  args: {
    ...baseArgs,
    imageUrl: IMAGE_URL,
    isOwner: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 354 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <InteractivePostCard {...args} />,
};

export const OwnerMenu: Story = {
  name: "Post Card by Owner",
  args: {
    ...baseArgs,
    isOwner: true,
    onMenuClick: () => alert("เปิดเมนูตัวเลือก (แก้ไข/ลบ)"),
  },
  render: (args) => <InteractivePostCard {...args} />,
};

export const OwnerMenuMobile: Story = {
  name: "Post Card by Owner (Mobile)",
  args: {
    ...baseArgs,
    isOwner: true,
    onMenuClick: () => alert("เปิดเมนูตัวเลือก (แก้ไข/ลบ)"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 354 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <InteractivePostCard {...args} />,
};
