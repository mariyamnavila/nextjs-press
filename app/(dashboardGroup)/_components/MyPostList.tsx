import { IPost } from "@/lib/types";
import { MyPostCard } from "./MyPostCard";

export function MyPostsList() {
  const mockMyPosts: IPost[] = [
    {
      id: "101",
      title: "My First Experience with Next.js App Router",
      content: "Moving from pages directory to app router felt challenging at first. However, the benefits of routing, layouts, and server components make it all worth it. Here are my key findings...",
      thumbnail: null,
      isFeatured: false,
      status: "PUBLISHED",
      tags: ["nextjs", "app-router"],
      views: 45,
      isPremium: false,
      authorId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "102",
      title: "Building an Interactive Dashboard Layout",
      content: "Designing dashboards requires robust grid layouts and flexible sidebar controls. In this article, I demonstrate the styling and component composition using simple standard CSS...",
      thumbnail: null,
      isFeatured: false,
      status: "DRAFT",
      tags: ["dashboard", "css", "layout"],
      views: 0,
      isPremium: true,
      authorId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockMyPosts.map((post) => (
        <MyPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
