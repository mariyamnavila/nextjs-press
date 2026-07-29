import getPublicNews from "../../_actions/getPublicNews";
import { NewsCard } from "./NewsCard";
import { NewsPagination } from "./NewsPagination";
import { IPost } from "@/lib/types";

export async function PublicNewsList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams;
  const result = await getPublicNews({ query });

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No news found
      </p>
    );
  }

  const posts: IPost[] = result.data;
  const meta = result.meta;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: IPost) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <NewsPagination totalPages={meta.totalPages} />
    </div>
  );
}
