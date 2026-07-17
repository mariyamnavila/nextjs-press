"use client"

const DislikeButton = ({ blogSlug }: { blogSlug: string }) => {
    return (
        <div>
            <button onClick={() => {
                console.log("Dislike Button clicked for blog: ", blogSlug);
            }}>Dislike  {blogSlug}</button>
        </div>
    )
}

export default DislikeButton