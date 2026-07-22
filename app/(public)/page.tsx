import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function HomePage() {
  console.log("Root route");

  const user = await getMe();

  console.log(user);

  return (
    <div>
      Hello, Nextjs
      <Button>
        Click Me
      </Button>
    </div>
  );
}
