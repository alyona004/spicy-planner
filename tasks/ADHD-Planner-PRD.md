# ADHD/Autistic Mind Planner - Product Requirements Document

## Overview
A Notion-style planner specifically designed for ADHD and autistic minds, focusing on task management with energy levels, time blocks, and flexible task types. The MVP will provide a clean, distraction-free interface for creating and managing tasks with visual organization that supports different cognitive processing styles.

## Core Features

### 1. Task Management System
- **Task Creation**: Users can create tasks with comprehensive metadata
- **Task Properties**:
  - `id`: UUID for unique identification
  - `title`: Task description/name
  - `state`: Task completion status (pending/done)
  - `block`: Time of day allocation (morning/afternoon/evening)
  - `energy`: Energy level required (low/medium/high)
  - `type`: Task frequency (daily/one-time)
  - `created_time`: Timestamp of creation

### 2. Planner Interface
- **Unified View**: Display all tasks regardless of completion status
- **Visual Organization**: Clear visual hierarchy and spacing
- **Accessibility**: High contrast, readable fonts, and intuitive navigation
- **Responsive Design**: Works seamlessly across devices

## User Experience Goals

### For ADHD Minds
- **Reduced Cognitive Load**: Simple, clean interface with minimal distractions
- **Visual Clarity**: Clear task states and energy levels
- **Flexible Organization**: Tasks organized by time blocks and energy levels
- **Completion Tracking**: Visual feedback for task completion

### For Autistic Minds
- **Predictable Interface**: Consistent layout and interaction patterns
- **Sensory-Friendly**: Muted colors, appropriate spacing, and clear typography
- **Structured Information**: Logical grouping and categorization
- **Customizable Views**: Ability to see all tasks in one place

## Technical Requirements

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: Local storage for data persistence
- **TypeScript**: Full type safety throughout the application

### Data Structure
```typescript
interface Task {
  id: string;           // UUID
  title: string;        // Task description
  state: 'pending' | 'done';
  block: 'morning' | 'afternoon' | 'evening';
  energy: 'low' | 'medium' | 'high';
  type: 'daily' | 'one-time';
  created_time: string; // ISO timestamp
}
```

### User Interface Components
1. **Task Creation Form**: Modal or inline form for adding new tasks
2. **Task List**: Grid or list view showing all tasks
3. **Task Cards**: Individual task components with completion toggle
4. **Filter/Sort Options**: Organize by block, energy, type, or state
5. **Header/Navigation**: Clean, minimal navigation

## Success Metrics
- **Usability**: Intuitive task creation and management
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast loading and smooth interactions
- **Data Persistence**: Reliable local storage of tasks

## Future Enhancements (Post-MVP)
- Dopamine triggers
- Goals management
- Task editing and deletion
- Task categories/tags
- Calendar week planner
- Progress tracking and analytics
- Export/import functionality
- Cloud synchronization
- Custom themes and accessibility options

## Technical Constraints
- Local storage only (no backend required for MVP)
- Mobile-first responsive design
- No external dependencies beyond Next.js ecosystem
- Focus on performance and accessibility 