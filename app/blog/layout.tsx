import React from 'react'

const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>BlogsLayout is special only for blogs route
            {children}
        </div>
    )
}

export default BlogsLayout