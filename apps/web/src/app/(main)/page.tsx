"use client";

import CreateComment from "@/features/comment/components/CreateComment";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 p-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h1 className="text-lg font-semibold text-neutral-900">คอมเมนต์</h1>
          <p className="mt-1 text-sm text-neutral-600">ตัวอย่างคอมโพเนนต์ที่แสดงอยู่บนหน้าจอ</p>
        </div>

        <CreateComment
          user={{
            name: "John doe",
            username: "john.doe",
            avatar: "/profile.svg",
          }}
          onSubmit={async ({ content, image }) => {
            console.log("comment submitted", { content, image });
          }}
          placeholder="แสดงความคิดเห็นของคุณ..."
        />
      </div>
    </main>
  );
}
