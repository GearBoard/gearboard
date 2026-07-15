"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useSession } from "@/shared/libs/auth-client";
import { useGetPostList, useCreatePost, useGetTags, type TagOption } from "@/shared/hooks";
import { client, unwrap } from "@/shared/libs/api-client";
import { cn } from "@/shared/libs/utils";
import { CreatePostCard } from "@/features/post/components/CreatePostCard";
import PostCard from "@/features/feed/components/PostCard";
import { mergePostPages, type PostFeedPage } from "@/features/post/lib/feed";

export default function Home() {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState<PostFeedPage[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: firstPage, isLoading, error } = useGetPostList({ page: "1", limit: "10" });
  const { data: availableTags } = useGetTags();
  const tagStyles = useMemo(
    () =>
      Object.fromEntries(
        ((availableTags as TagOption[] | undefined) ?? []).map((tag) => [
          tag.name,
          { color: tag.color, backgroundColor: tag.backgroundColor },
        ])
      ),
    [availableTags]
  );
  const posts = useMemo(() => {
    if (!firstPage) return [];
    return mergePostPages([firstPage as PostFeedPage, ...allPages.filter((entry) => entry.page > 1)]);
  }, [allPages, firstPage]);

  const { trigger: createPost, isMutating: isCreatingPost } = useCreatePost();

  useEffect(() => {
    if (!firstPage) return;
    setAllPages((previous) => {
      if (previous.some((entry) => entry.page === 1)) {
        return previous;
      }
      return [firstPage as PostFeedPage, ...previous];
    });
  }, [firstPage]);

  useEffect(() => {
    if (!observerRef.current) return;

    const node = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetchingMore && !isLoading && firstPage && firstPage.totalPages > page) {
          setIsFetchingMore(true);
          setPage((current) => current + 1);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [firstPage, isFetchingMore, isLoading, page]);

  useEffect(() => {
    if (page <= 1) return;

    let isActive = true;

    async function loadNextPage() {
      try {
        const nextPage = await unwrap(
          client.api.posts.$get({ query: { page: String(page), limit: "10" } })
        );
        if (!isActive) return;
        setAllPages((previous) => {
          if (previous.some((entry) => entry.page === page)) {
            return previous;
          }
          return [...previous, nextPage as PostFeedPage];
        });
      } catch (err) {
        console.error("Failed to load more posts", err);
      } finally {
        if (isActive) {
          setIsFetchingMore(false);
        }
      }
    }

    void loadNextPage();
    return () => {
      isActive = false;
    };
  }, [page]);

  const handleCreatePost = async (input: { title: string; description: string; tags?: string[]; images?: string[] }) => {
    const createdPost = await createPost(input);
    setAllPages((previous) => {
      const nextPage = previous[0];
      if (!nextPage) {
        return [{
          data: [createdPost as PostFeedPage["data"][number]],
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        }];
      }

      const updatedFirstPage = {
        ...nextPage,
        data: [createdPost as PostFeedPage["data"][number], ...nextPage.data],
        total: nextPage.total + 1,
        totalPages: Math.max(nextPage.totalPages, 1),
      };

      return [updatedFirstPage, ...previous.slice(1)];
    });
  };

  return (
    <div className="flex justify-center p-4 md:p-6 lg:p-8">
      <div className="flex gap-6 lg:gap-8 w-full max-w-[1024px]">
        <div className="flex flex-col gap-4 md:gap-6 flex-1 max-w-full">
          {session?.user ? (
            <div className="hidden md:block">
              <CreatePostCard onSubmit={handleCreatePost} loading={isCreatingPost} />
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-xl border border-gray bg-white p-6 text-center text-sm text-dark-gray">
              Loading posts...
            </div>
          ) : null}

          {!isLoading && !error && posts.length === 0 ? (
            <div className="rounded-xl border border-gray bg-white p-8 text-center text-sm text-dark-gray">
              No posts yet. Be the first to share something.
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="rounded-xl border border-gray bg-white p-6 text-center text-sm text-primary-red">
              Unable to load posts right now.
            </div>
          ) : null}

          {!isLoading && !error ? (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <div key={post.id}>
                  <PostCard
                    title={post.title}
                    description={post.description}
                    tags={post.tags}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    authorInfo={post.authorInfo}
                    createdAt={post.createdAt}
                    imageUrl={post.images[0]}
                    isOwner={post.authorInfo.id === session?.user?.id}
                    tagStyles={tagStyles}
                    className="md:hidden"
                  />
                <article className="hidden rounded-xl border border-gray bg-white p-4 shadow-sm md:block md:p-6">
                  <div className="flex items-center gap-3">
                    {post.authorInfo.image ? (
                      <Image
                        src={post.authorInfo.image}
                        alt={post.authorInfo.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src="/profile.svg"
                        alt={post.authorInfo.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-black">{post.authorInfo.name}</p>
                      <p className="text-sm text-dark-gray">
                        {new Date(post.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-black">{post.title}</h2>
                    <p className="mt-2 whitespace-pre-line text-sm text-dark-gray">{post.description}</p>
                  </div>

                  {post.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => {
                        const tagDetails = (availableTags as TagOption[] | undefined)?.find(
                          (availableTag) => availableTag.name === tag
                        );

                        return (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              !tagDetails && "bg-primary-red/10 text-primary-red"
                            )}
                            style={
                              tagDetails
                                ? { color: tagDetails.color, backgroundColor: tagDetails.backgroundColor }
                                : undefined
                            }
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}

                  {post.images.length > 0 ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {post.images.map((image) => (
                        <img key={image} src={image} alt={post.title} className="h-48 w-full rounded-lg object-cover" />
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-center gap-4 text-sm text-dark-gray">
                    <span>{post.likeCount} likes</span>
                    <span>{post.commentCount} comments</span>
                  </div>
                </article>
                </div>
              ))}
            </div>
          ) : null}

          {isFetchingMore ? (
            <div className="text-center text-sm text-dark-gray">Loading more posts...</div>
          ) : null}

          <div ref={observerRef} className="h-1" />
        </div>

        <div className="hidden xl:block w-[320px] shrink-0">
          {/* Placeholder for "เกี่ยวกับ Gearboard" widget */}
        </div>
      </div>

      {session?.user ? (
        <Link
          href="/create-post"
          aria-label="สร้างโพสต์"
          className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-primary-red text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red md:hidden"
        >
          <SquarePen className="size-6" />
        </Link>
      ) : null}
    </div>
  );
}
