import EmptyState from "@/features/feed/components/EmptyState";

export default function SavedPosts() {
  return <>
  <main className="flex min-h-screen items-center justify-center bg-[#F3EFF5] px-4 py-8">
    <EmptyState
        title="ไม่มีโพสต์"
        description="ไม่มีโพสต์ที่ถูกบันทึกในขณะนี้"
    />
  </main>
  </>;
  
}
