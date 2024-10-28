import HomePage from "./home-ui";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  return (
    <div>
      <HomePage />
    </div>
  );
}
