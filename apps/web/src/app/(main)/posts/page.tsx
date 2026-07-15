import { AboutCard, EmptyState, PostCard } from "@/features/feed";
import type { PostCardProps } from "@/features/feed";
import { cn } from "@/shared/libs/utils";

const myPosts: PostCardProps[] = [
  {
    title: "แคลคูลัส 2 สรุปสั้นๆ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt blandit nisi id rutrum. Cras et facilisis lectus. Quisque sollicitudin pharetra lectus, nec lacinia risus dictum ac. Ut ornare tempus ultricies. Aliquam vitae magna mauris.",
    tags: ["แคลคูลัส", "ฟิสิกส์", "เคมี"],
    likeCount: 52,
    commentCount: 12,
    authorInfo: { id: "1", name: "John doe", image: null },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isOwner: true,
  },
  {
    title: "สรุปฟิสิกส์ 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt blandit nisi id rutrum. Cras et facilisis lectus.",
    tags: ["ฟิสิกส์"],
    likeCount: 18,
    commentCount: 4,
    authorInfo: { id: "1", name: "John doe", image: null },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isOwner: true,
  },
];

export default function MyPosts() {
  const hasPosts = myPosts.length > 0;

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <section
        className={cn(
          "flex flex-1 flex-col gap-4 bg-bg-white p-6 md:gap-6 md:p-9",
          !hasPosts && "items-center justify-center"
        )}
      >
        {hasPosts ? (
          myPosts.map((post, i) => (
            <PostCard key={i} {...post} className="w-full" />
          ))
        ) : (
          <EmptyState
            title="ไม่มีโพสต์"
            description="เริ่มสร้างโพสต์แรกกันเลย"
            imageSrc="/no-post.svg"
            imageWidth={250}
            imageHeight={265}
          />
        )}
      </section>

      <aside className="hidden shrink-0 bg-bg-white p-9 pr-24 md:flex">
        <AboutCard />
      </aside>
    </div>
  );
}
