import React from 'react'
import MyServerComponent from '../ui/MyServerComponent';
import { getBlogs } from '../utils/getBlogs';
import { cacheLife, cacheTag } from 'next/cache';

const BlogsPage = async () => {
    // "use cache"
    // cacheLife("hours")
    // cacheTag("posts")


    const blogs = await getBlogs();

    console.log(blogs);

    return (
        <div>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                blogs.map((blog: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <div>
                        <h2>{blog.title}</h2>
                    </div>
                ))
            }
            Blogs Page
            <MyServerComponent />
        </div>
    )
}

export default BlogsPage