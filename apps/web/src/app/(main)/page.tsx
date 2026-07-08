import EmptyState from "@/features/feed/components/EmptyState";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3EFF5] px-4 py-8">
      <EmptyState
        title="ไม่มีโพสต์"
        buttonText="เริ่มสร้างโพสต์แรกกันเลย"
      />
    </main>
  );
}
