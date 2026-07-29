import { NewsCard } from "./NewsCard";
import { IPost } from "@/lib/types";

export function PublicNewsList() {
  const mockPosts: IPost[] = [
    {
      id: "1",
      title: "Exploring Next.js 15 Server Actions",
      content: "Next.js 15 introduces powerful improvements for handling server-side logic directly from UI components. In this guide, we dive deep into how server actions can simplify form submissions and page updates...",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=60",
      isFeatured: true,
      status: "PUBLISHED",
      tags: ["nextjs", "react", "frontend"],
      views: 120,
      isPremium: false,
      authorId: "1",
      author: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        activeStatus: "ACTIVE",
        role: "AUTHOR",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Building Modern Interfaces with Tailwind CSS v4",
      content: "Tailwind CSS v4 introduces a new engine, improved performance, and cleaner configuration options. Discover how to leverage utility classes to build stunning, responsive layout designs...",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=60",
      isFeatured: false,
      status: "PUBLISHED",
      tags: ["tailwind", "css", "design"],
      views: 340,
      isPremium: false,
      authorId: "2",
      author: {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        activeStatus: "ACTIVE",
        role: "AUTHOR",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
