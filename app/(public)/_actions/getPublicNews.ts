"use server"

const getPublicNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined }
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  if (query?.sortBy) {
    params.set("sortBy", query.sortBy as string);
  }
  if (query?.sortOrder) {
    params.set("sortOrder", query.sortOrder as string);
  }
  if (query?.page) {
    params.set("page", query.page as string);
  }
  if (query?.limit) {
    params.set("limit", query.limit as string);
  }
  if (query?.tags) {
    params.set("tags", query.tags as string);
  }
  if (query?.isFeatured) {
    params.set("isFeatured", query.isFeatured as string);
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts?${params.toString()}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60,
      tags: ["public-posts"],
    },
  });

  const result = await res.json();

  return result;
};

export default getPublicNews;
