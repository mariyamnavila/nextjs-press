import { IPost } from "@/lib/types";
import { MyPostCard } from "./MyPostCard";
import { getMyPosts } from "../_actions/myPostsActions";

export async function MyPostsList() {
  const result = await getMyPosts()
  const myPosts: IPost[] = result.data;

  if (!result.success||!result.data?.length) {
    return(
      <p className="py-12 text-center text-muted-foreground">
        You haven&apos;t created any posts yet
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {myPosts.map((post) => (
        <MyPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
