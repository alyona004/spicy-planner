import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Hero Section */}
        <Section className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to 🌶️ Planner</h1>
          <p className="text-lg text-foreground/70 mb-6">
            A Notion-style planner designed specifically for ADHD and autistic minds.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/planner">Start Planning</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/design">View Design System</Link>
            </Button>
          </div>
        </Section>

        {/* Features Section */}
        <Section>
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Task Management</h3>
              <p className="text-sm text-foreground/70">
                Create and organize tasks with energy levels, time blocks, and custom properties.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ADHD-Friendly Design</h3>
              <p className="text-sm text-foreground/70">
                High contrast, clear visual hierarchy, and predictable interactions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Local Storage</h3>
              <p className="text-sm text-foreground/70">
                All your data stays on your device - no cloud dependencies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accessible</h3>
              <p className="text-sm text-foreground/70">
                Built with accessibility in mind for all users.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
