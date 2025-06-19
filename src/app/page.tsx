import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <Button asChild>
        <Link href="/design">View Design System Demos</Link>
      </Button>
    </main>
  );
}
