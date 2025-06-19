import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function PlannerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Section>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Task Planner</h1>
              <p className="text-foreground/70">
                Manage your tasks with ADHD-friendly organization
              </p>
            </div>
            <Button size="lg">
              + Add Task
            </Button>
          </div>
        </Section>

        {/* Tasks Section */}
        <Section>
          <h2 className="text-lg font-semibold mb-4">Your Tasks</h2>
          <div className="text-center py-12 text-foreground/50">
            <p className="text-lg mb-2">No tasks yet</p>
            <p className="text-sm">Create your first task to get started</p>
          </div>
        </Section>
      </div>
    </div>
  );
} 