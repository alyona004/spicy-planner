"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { TaskForm } from "@/components/adhd-planner/task-form";
import { TaskCard } from "@/components/adhd-planner/task-card";
import { TaskList } from "@/components/adhd-planner/task-list";
import { AddTaskButton } from "@/components/adhd-planner/add-task-button";
import type { Task } from "@/types/task";
import type { CreateTaskFormData } from "@/types/forms";
import { useState } from "react";

const buttonVariants = [
  { variant: "default", label: "Default" },
  { variant: "destructive", label: "Destructive" },
  { variant: "outline", label: "Outline" },
  { variant: "secondary", label: "Secondary" },
  { variant: "ghost", label: "Ghost" },
  { variant: "link", label: "Link" },
];

const palette = [
  { name: "Primary (purple-600)", value: "#7c3aed" },
  { name: "Secondary (cyan-500)", value: "#06b6d4" },
  { name: "Accent (pink-400)", value: "#f472b6" },
  { name: "Background (gray-100)", value: "#f3f4f6" },
  { name: "Foreground (slate-800)", value: "#1e293b" },
  { name: "Muted (purple-100)", value: "#e0e7ef" },
  { name: "Destructive (red-400)", value: "#f87171" },
];

export default function DesignDemo() {
  const handleTaskSubmit = (data: CreateTaskFormData) => {
    console.log("Task submitted:", data);
    alert(`Task created: ${data.title}`);
  };

  const handleTaskCancel = () => {
    console.log("Task creation cancelled");
  };

  const [demoTask, setDemoTask] = useState<Task>({
    id: "1",
    title: "Write project update for team",
    state: "pending",
    block: "morning",
    energy: "medium",
    type: "daily",
    created_time: new Date().toISOString(),
  });

  const handleToggleComplete = (id: string, done: boolean) => {
    setDemoTask((prev) => ({ ...prev, state: done ? "done" : "pending" }));
    console.log(`Task ${id} marked as ${done ? "done" : "pending"}`);
  };

  const [demoTasks, setDemoTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Write project update for team",
      state: "pending",
      block: "morning",
      energy: "medium",
      type: "daily",
      created_time: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Take a walk outside",
      state: "done",
      block: "afternoon",
      energy: "high",
      type: "one-time",
      created_time: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Read a chapter of a book",
      state: "pending",
      block: "evening",
      energy: "low",
      type: "daily",
      created_time: new Date().toISOString(),
    },
  ]);

  const handleListToggleComplete = (id: string, done: boolean) => {
    setDemoTasks(tasks => tasks.map(task =>
      task.id === id ? { ...task, state: done ? "done" : "pending" } : task
    ));
    console.log(`Task ${id} marked as ${done ? "done" : "pending"}`);
  };

  const [taskListView, setTaskListView] = useState<'list' | 'grid'>('list');

  const [energyFilters, setEnergyFilters] = useState<('high' | 'medium' | 'low')[]>([]);

  const handleEnergyFilterToggle = (level: 'high' | 'medium' | 'low') => {
    setEnergyFilters(filters =>
      filters.includes(level)
        ? filters.filter(f => f !== level)
        : [...filters, level]
    );
  };

  const filteredTasks = energyFilters.length
    ? demoTasks.filter(task => energyFilters.includes(task.energy))
    : demoTasks;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
        {/* Theme/Color Palette Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Theme: Gentle Purple & Teal Palette</h2>
          <div className="flex flex-wrap gap-6">
            {palette.map((color) => (
              <div key={color.name} className="flex flex-col gap-1">
                <div
                  className="w-20 h-10 rounded-lg border border-gray-200 shadow"
                  style={{ background: color.value }}
                />
                <span className="text-xs" style={{ color: color.value === '#f3f4f6' ? '#222' : color.value }}>{color.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography & Spacing Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Typography & Spacing</h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Heading 1 (4xl)</h1>
              <h2 className="text-3xl font-bold mb-2">Heading 2 (3xl)</h2>
              <h3 className="text-2xl font-bold mb-2">Heading 3 (2xl)</h3>
              <h4 className="text-xl font-bold mb-2">Heading 4 (xl)</h4>
              <h5 className="text-lg font-bold mb-2">Heading 5 (lg)</h5>
              <h6 className="text-base font-bold mb-2">Heading 6 (base)</h6>
            </div>
            <div>
              <p className="text-base mb-2">
                This is body text (base). It uses Inter, a highly readable font, with relaxed line height for ADHD/autistic-friendly readability. Spacing between elements is generous for clarity.
              </p>
              <p className="text-sm mb-2">
                This is small text (sm). Use for captions, hints, or less important info.
              </p>
              <p className="text-xs mb-2">
                This is extra small text (xs). Use sparingly for labels or metadata.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm text-muted-foreground">Spacing demo (gap-4):</span>
              <div className="flex gap-4">
                <div className="w-16 h-8 bg-primary rounded-2xl" />
                <div className="w-16 h-8 bg-secondary rounded-2xl" />
                <div className="w-16 h-8 bg-accent rounded-2xl" />
              </div>
              <span className="text-sm text-muted-foreground">Spacing demo (gap-8):</span>
              <div className="flex gap-8">
                <div className="w-16 h-8 bg-primary rounded-2xl" />
                <div className="w-16 h-8 bg-secondary rounded-2xl" />
                <div className="w-16 h-8 bg-accent rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-6">
            {buttonVariants.map(({ variant, label }) => (
              <div key={variant} className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">{label} Button</span>
                <Button variant={variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}>
                  {variant === "default" ? "🌈 Focus Button" : `${label} Button`}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Input</h2>
          <Input placeholder="Type here..." />
        </section>

        {/* Checkbox Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Checkbox</h2>
          <div className="flex items-center gap-2">
            <Checkbox id="demo-checkbox" />
            <label htmlFor="demo-checkbox" className="text-sm">Check me</label>
          </div>
        </section>

        {/* Card Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Card</h2>
          <Card className="p-4">This is a card demo.</Card>
        </section>

        {/* Component Variants Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Component Variants</h2>
          <div className="space-y-8">
            {/* Badge Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Badge</h3>
              <div className="flex gap-3 flex-wrap">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="muted">Muted</Badge>
              </div>
            </div>
            {/* Alert Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Alert</h3>
              <div className="space-y-2">
                <Alert variant="info">This is an info alert.</Alert>
                <Alert variant="success">This is a success alert.</Alert>
                <Alert variant="warning">This is a warning alert.</Alert>
                <Alert variant="destructive">This is a destructive alert.</Alert>
              </div>
            </div>
            {/* Divider */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Divider</h3>
              <div>
                <span>Above</span>
                <Divider />
                <span>Below</span>
              </div>
            </div>
            {/* Section/Card Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Section/Card</h3>
              <Section>
                <h4 className="text-base font-bold mb-2">Section Title</h4>
                <p>This is a section/card variant for grouping content.</p>
              </Section>
            </div>
            {/* Tag/Chip Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Tag/Chip</h3>
              <div className="flex gap-3 flex-wrap">
                <Tag variant="primary">Primary</Tag>
                <Tag variant="secondary">Secondary</Tag>
                <Tag variant="accent">Accent</Tag>
                <Tag variant="muted">Muted</Tag>
              </div>
            </div>
          </div>
        </section>

        {/* Task Card Demo Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Task Card</h2>
          <div className="space-y-4">
            <p className="text-foreground/70">
              Demo of the TaskCard component with all properties and completion toggle.
            </p>
            <TaskCard task={demoTask} onToggleComplete={handleToggleComplete} />
          </div>
        </section>

        {/* Task Form Demo Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Task Creation Form</h2>
          <div className="space-y-4">
            <p className="text-foreground/70">
              Demo of the task creation form with all fields and validation.
            </p>
            <TaskForm 
              onSubmit={handleTaskSubmit}
              onCancel={handleTaskCancel}
            />
          </div>
        </section>

        {/* Task List Demo Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Task List</h2>
          <div className="space-y-4">
            <p className="text-foreground/70">
              Demo of the TaskList component with multiple tasks and interactive completion toggles.
            </p>
            {/* Tab Bar */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                className="px-4 py-1 rounded-full text-sm font-semibold bg-primary text-white shadow focus:outline-none focus:ring-2 focus:ring-primary"
                aria-current="page"
              >
                Today
              </button>
              <button
                type="button"
                className="px-4 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                disabled
                aria-disabled="true"
              >
                Week
              </button>
              <button
                type="button"
                className="px-4 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                disabled
                aria-disabled="true"
              >
                Goals
              </button>
            </div>
            {/* Energy Filter Controls */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${energyFilters.includes('high') ? 'bg-red-500 text-white border-red-500' : 'bg-muted text-foreground'}`}
                onClick={() => handleEnergyFilterToggle('high')}
                aria-pressed={energyFilters.includes('high')}
              >
                🔥 High
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${energyFilters.includes('medium') ? 'bg-yellow-400 text-foreground border-yellow-400' : 'bg-muted text-foreground'}`}
                onClick={() => handleEnergyFilterToggle('medium')}
                aria-pressed={energyFilters.includes('medium')}
              >
                ⚡ Medium
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${energyFilters.includes('low') ? 'bg-blue-400 text-white border-blue-400' : 'bg-muted text-foreground'}`}
                onClick={() => handleEnergyFilterToggle('low')}
                aria-pressed={energyFilters.includes('low')}
              >
                🧊 Low
              </button>
            </div>
            {/* + Add Task Button */}
            <div className="mb-2">
              <AddTaskButton onClick={() => console.log('Add Task clicked')} />
            </div>
            {/* End + Add Task Button */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${taskListView === 'list' ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
                onClick={() => setTaskListView('list')}
                aria-pressed={taskListView === 'list'}
              >
                List View
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${taskListView === 'grid' ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
                onClick={() => setTaskListView('grid')}
                aria-pressed={taskListView === 'grid'}
              >
                Grid View
              </button>
            </div>
            <TaskList tasks={filteredTasks} onToggleComplete={handleListToggleComplete} view={taskListView} />
          </div>
        </section>

        {/* Task List Empty State Demo Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Task List (Empty State)</h2>
          <div className="space-y-4">
            <p className="text-foreground/70">
              Demo of the TaskList component when there are no tasks.
            </p>
            <TaskList tasks={[]} />
          </div>
        </section>

        {/* Task List Loading State Demo Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Task List (Loading State)</h2>
          <div className="space-y-4">
            <p className="text-foreground/70">
              Demo of the TaskList component in loading state.
            </p>
            <TaskList tasks={[]} loading />
          </div>
        </section>
        {/* Task List Error State Demo Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Task List (Error State)</h2>
          <div className="space-y-4">
            <p className="text-foreground/70">
              Demo of the TaskList component in error state.
            </p>
            <TaskList tasks={[]} error="Network error: Please try again later." />
          </div>
        </section>
      </div>
    </div>
  );
} 