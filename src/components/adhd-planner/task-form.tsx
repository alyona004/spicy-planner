import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { createTaskSchema, type CreateTaskFormData } from "@/types/forms";

const dopamineIcons = [
  "🎉", "🚀", "✨", "🦄", "🌈", "🔥", "🍀", "🥳", "💡", "🏆"
];

function getRandomIcon() {
  return dopamineIcons[Math.floor(Math.random() * dopamineIcons.length)];
}

interface TaskFormProps {
  onSubmit: (data: CreateTaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TaskForm({ onSubmit, onCancel, isLoading = false }: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskFormData>({
    title: "",
    block: "morning",
    energy: "medium",
    type: "one-time"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dopamineIcon, setDopamineIcon] = useState<string | null>(null);

  useEffect(() => {
    setDopamineIcon(getRandomIcon());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = createTaskSchema.parse(formData);
      setErrors({});
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    }
  };

  const handleInputChange = (field: keyof CreateTaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-white shadow-lg relative border border-muted">
      {/* X Close Button */}
      <button
        type="button"
        aria-label="Close form"
        onClick={onCancel}
        className="absolute top-3 right-3 text-muted-foreground hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive rounded-full p-1 transition-colors"
      >
        <span aria-hidden>✕</span>
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        </div>

        {errors.general && (
          <Alert variant="destructive">
            {errors.general}
          </Alert>
        )}

        {/* Title Field */}
        <div className="space-y-2">
          <Label htmlFor="title">Task Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="What needs to be done?"
            className="w-full"
            required
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        {/* Time Block Field */}
        <div className="space-y-2">
          <Label htmlFor="block">Time Block *</Label>
          <Select
            value={formData.block}
            onValueChange={(value) => handleInputChange("block", value)}
          >
            <SelectTrigger className="bg-white border border-muted focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Select time block" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-muted shadow-lg">
              <SelectItem value="morning">🌅 Morning</SelectItem>
              <SelectItem value="afternoon">☀️ Afternoon</SelectItem>
              <SelectItem value="evening">🌙 Evening</SelectItem>
            </SelectContent>
          </Select>
          {errors.block && (
            <p className="text-sm text-destructive">{errors.block}</p>
          )}
        </div>

        {/* Energy Level Field */}
        <div className="space-y-2">
          <Label htmlFor="energy">Energy Level *</Label>
          <Select
            value={formData.energy}
            onValueChange={(value) => handleInputChange("energy", value)}
          >
            <SelectTrigger className="bg-white border border-muted focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Select energy level" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-muted shadow-lg">
              <SelectItem value="low">🔋 Low Energy</SelectItem>
              <SelectItem value="medium">⚡ Medium Energy</SelectItem>
              <SelectItem value="high">🚀 High Energy</SelectItem>
            </SelectContent>
          </Select>
          {errors.energy && (
            <p className="text-sm text-destructive">{errors.energy}</p>
          )}
        </div>

        {/* Task Type Field */}
        <div className="space-y-2">
          <Label htmlFor="type">Task Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleInputChange("type", value)}
          >
            <SelectTrigger className="bg-white border border-muted focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-muted shadow-lg">
              <SelectItem value="one-time">📝 One-time Task</SelectItem>
              <SelectItem value="daily">🔄 Daily Task</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-destructive">{errors.type}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex pt-4 justify-end">
          <Button
            type="submit"
            className="text-lg gap-2"
            disabled={isLoading}
          >
            {dopamineIcon && <span aria-hidden>{dopamineIcon}</span>}
            {isLoading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </Card>
  );
} 