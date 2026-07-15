export interface PostFeedItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  likeCount: number;
  commentCount: number;
  isClosed: boolean;
  authorInfo: {
    id: string;
    name: string;
    image: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PostFeedPage {
  data: PostFeedItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function mergePostPages(pages: PostFeedPage[]): PostFeedItem[] {
  const postsById = new Map<string, PostFeedItem>();

  pages.forEach((page) => {
    page.data.forEach((post) => {
      if (!postsById.has(post.id)) {
        postsById.set(post.id, post);
      }
    });
  });

  return [...postsById.values()].sort((left, right) => {
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}
