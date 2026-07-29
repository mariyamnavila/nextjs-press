"use server"
import { cookies } from "next/headers";

const getPremiumNews = async ({
    query,
}: {
    query?: { [key: string]: string | string[] | undefined }
}) => {
    // bad approach
    // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`

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

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {

        return {
            success: false,
            message: "User Not Logged In!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["premium-posts"],
        },
    })

    const result = await res.json();

    return result;
};

export default getPremiumNews;