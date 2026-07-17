import Link from "next/link";
import LikeButton from "./ui/LikeButton";

export default function Home() {
  console.log("route ");
  return (
    <div>
      Hello world
      blogs ppage <Link href={"/blog/122"}> Blog</Link>
      <LikeButton></LikeButton>

    </div>
  );
}
