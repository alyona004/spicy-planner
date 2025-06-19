# ADHD Planner - Development Tasks

## 1. Project Setup & Foundation

### 1.1 Initialize Next.js Project
- [x] Set up Next.js 14 with TypeScript, Tailwind CSS, and App Router
- [x] Configure ESLint and import aliases
- [x] Set up project structure with components, types, and services directories

**Files Created/Modified:**
- `package.json` - Next.js 14 with TypeScript, Tailwind, ESLint
- `tsconfig.json` - TypeScript configuration with strict mode and path mapping
- `next.config.ts` - Next.js configuration
- `src/` directory structure with app/, components/, types/, services/

### 1.2 Install and Configure Dependencies
- [x] Install Shadcn UI and Radix UI components
- [x] Set up Tailwind CSS configuration
- [x] Install UUID generation library
- [x] Configure TypeScript paths and strict mode

**Files Created/Modified:**
- `components.json` - Shadcn UI configuration
- `src/lib/utils.ts` - Utility functions for class merging
- `src/components/ui/` - Shadcn UI components (button, card, dialog, form, input, label, select, checkbox)
- `package.json` - Added dependencies: @radix-ui/*, class-variance-authority, clsx, tailwind-merge, lucide-react, uuid, @types/uuid, zod, next-safe-action

### 1.3 Create Type Definitions
- [x] Define Task interface with all required properties
- [x] Create enums for state, block, energy, and type values
- [x] Set up ActionResponse types for server actions
- [x] Create utility types for form validation

**Files Created:**
- `src/types/task.ts` - Task interface, TaskState, TimeBlock, EnergyLevel, TaskType types
- `src/types/actions.ts` - ActionResponse, TaskActionResponse interfaces
- `src/types/forms.ts` - Zod schemas for form validation (createTaskSchema, updateTaskSchema)

## 2. Core Data Management

### 2.1 Implement Local Storage Service
- [x] Create localStorage service for task persistence
- [x] Implement CRUD operations (create, read, update, delete)
- [x] Add error handling and data validation
- [x] Create data migration utilities for future updates

**Files Created:**
- `src/services/localStorage.ts` - LocalStorageService class with:
  - CRUD operations (getAllTasks, getTaskById, createTask, updateTask, deleteTask)
  - Data validation with detailed error logging
  - Migration system (version tracking, automatic data migration)
  - Error handling for localStorage quota and invalid data

### 2.2 Create Task Management Utilities
- [x] Implement UUID generation for task IDs
- [x] Create timestamp utilities for created_time
- [x] Build task validation functions
- [x] Create task sorting and filtering utilities

**Files Created:**
- `src/services/taskUtils.ts` - Utility functions:
  - `generateTaskId()` - UUID generation with browser compatibility fallback
  - `createTimestamp()` - ISO timestamp generation
  - `validateTask()` - Type guard for task validation
  - `getTaskValidationErrors()` - Detailed validation error reporting
  - `sortTasks()` - Flexible sorting by any task field
  - `filterTasks()` - Multi-criteria task filtering

## 3. User Interface Components

### 3.1 Design System Setup
- [x] Configure Shadcn UI theme for accessibility
- [x] Create custom color palette for ADHD/autistic-friendly design
- [x] Set up typography scale and spacing
- [x] Create reusable component variants

**Files Created/Modified:**
- `src/app/page.tsx` — now a minimal home page with a link to the design system demos
- `src/app/design/page.tsx` — new page with all design system demos (button variants, input, checkbox, card, color palette, typography & spacing, component variants)
- `src/components/ui/button.tsx` — all button variants updated for accessibility and ADHD/autistic-friendly design
- `src/components/ui/badge.tsx` — Badge component with 6 variants (primary, secondary, success, warning, destructive, muted)
- `src/components/ui/alert.tsx` — Alert component with 4 variants (info, success, warning, destructive) and accessible icons
- `src/components/ui/divider.tsx` — Divider component for visual separation
- `src/components/ui/section.tsx` — Section component for grouping content with ADHD-friendly styling
- `src/components/ui/tag.tsx` — Tag/Chip component with 4 variants (primary, secondary, accent, muted)
- `tailwind.config.js` — custom color palette, font family, and typography scale added
- `src/app/globals.css` — CSS variables for color palette

### 3.2 Header and Navigation
- [x] Create clean, minimal header component
- [x] Add navigation for different views (if needed)
- [x] Implement responsive design for mobile/desktop
- [x] Add accessibility features (ARIA labels, keyboard navigation)

**Files Created/Modified:**
- `src/components/adhd-planner/header.tsx` — Clean header component with:
  - Sticky positioning with backdrop blur
  - Responsive navigation (desktop links, mobile menu button)
  - ADHD-friendly focus indicators and hover states
  - Accessible ARIA labels and keyboard navigation
  - "🌶️ Planner" branding with hot pepper emoji
- `src/app/layout.tsx` — Updated to include header and proper layout structure
- `src/app/page.tsx` — Redesigned home page with hero section and features, updated branding
- `src/app/planner/page.tsx` — Basic planner page with task management interface

### 3.3 Task Creation Form
- [x] Build modal or inline form for task creation
- [x] Implement form validation with Zod
- [x] Create form fields for all task properties
- [x] Add accessibility features and error handling
- [x] Style form with ADHD-friendly design principles

**Files Created/Modified:**
- `src/components/adhd-planner/task-form.tsx` — Task creation form with:
  - White background, shadow, and border for separation
  - All task fields (title, block, energy, type) with emojis and clear labels
  - Zod validation and error display
  - Select boxes styled with white background and border
  - Dopamine-boosting random icon on the Create Task button
  - X close button in the top-right corner
  - Right-aligned action button (not centered or stretched)
- `src/app/design/page.tsx` — Added TaskForm demo section for live preview and testing

### 3.4 Task Card Component
- [x] Design individual task card with all properties (except created_time)
- [x] Implement completion toggle functionality
- [x] Add visual indicators for energy levels and time blocks
- [x] Create responsive card layout
- [x] Add hover states and interactions

**Files Created/Modified:**
- `src/components/adhd-planner/task-card.tsx` — TaskCard component displaying title, state, block, energy, and type with:
  - ADHD/autistic-friendly design
  - Completion toggle (checkbox, strikethrough, faded, Done badge)
  - Visually distinct badge colors for energy and time block, with accessibility labels
  - Fully responsive layout: flex, wrapping, spacing, and mobile-friendly touch targets
  - Subtle, accessible hover and active states for card
- `src/app/design/page.tsx` — TaskCard demo section with interactive completion toggle and visual indicators

### 3.5 Task List/Grid Component
- [x] Create container for displaying all tasks
- [x] Add tab bar above the list/grid (Today active, Week/Goals disabled)
- [x] Add energy filter controls above the list/grid
- [x] Add prominent Add Task button above the list/grid (with random dopamine icon)
- [x] Color TaskCard border by energy (high=green, medium=secondary, low=muted) and add drag handle icon
- [x] Implement grid/list view toggle
- [x] Add empty state for no tasks
- [x] Create loading states and error handling
- [x] Implement responsive layout

**Files Created/Modified:**
- `src/components/adhd-planner/task-list.tsx` — TaskList component rendering a vertical list or grid of TaskCards, passing through interactive completion toggles, and showing:
  - Friendly empty state with icon and message
  - Loading state (spinner, message)
  - Error state (icon, message, details)
  - Improved grid responsiveness and mobile-friendly spacing
- `src/components/adhd-planner/task-card.tsx` — TaskCard border color now uses palette: high=green, medium=secondary, low=muted; drag handle icon added
- `src/app/design/page.tsx` — TaskList demo section with:
  - Multiple sample tasks and interactive completion toggles
  - Tab bar above the list/grid (Today active, Week/Goals disabled)
  - Energy filter controls (High, Medium, Low) above the list/grid
  - Add Task button above the list/grid, with random dopamine-boosting icon
  - TaskCard border color by energy and drag handle icon
  - Grid/list view toggle for TaskList
  - TaskList empty, loading, and error state demos

## 4. Core Functionality

### 4.1 Task Creation Flow
- [ ] Connect form to localStorage service
- [ ] Implement server action for task creation
- [ ] Add success/error feedback
- [ ] Create optimistic updates for better UX
- [ ] Handle form reset after successful creation

### 4.2 Task Display and Management
- [ ] Load and display all tasks from localStorage
- [ ] Implement task completion toggle
- [ ] Add visual feedback for state changes
- [ ] Create task filtering by properties
- [ ] Implement task sorting options

### 4.3 Data Persistence
- [ ] Ensure all changes are saved to localStorage
- [ ] Implement data backup/recovery
- [ ] Add data validation on load
- [ ] Handle localStorage quota exceeded errors

## 5. Accessibility and UX

### 5.1 Accessibility Implementation
- [ ] Add proper ARIA labels and roles
- [ ] Implement keyboard navigation
- [ ] Ensure color contrast meets WCAG standards
- [ ] Add screen reader support
- [ ] Test with accessibility tools

### 5.2 ADHD/Autistic-Friendly Features
- [ ] Implement high contrast mode option
- [ ] Add focus indicators and clear visual hierarchy
- [ ] Create predictable interaction patterns
- [ ] Minimize distractions and unnecessary elements
- [ ] Add clear visual feedback for all actions

### 5.3 Responsive Design
- [ ] Test and optimize for mobile devices
- [ ] Ensure touch-friendly interactions
- [ ] Implement responsive typography
- [ ] Optimize layout for different screen sizes

## 6. Testing and Polish

### 6.1 Component Testing
- [ ] Test all form validations
- [ ] Verify localStorage operations
- [ ] Test accessibility features
- [ ] Validate responsive behavior

### 6.2 User Experience Testing
- [ ] Test task creation flow
- [ ] Verify task completion functionality
- [ ] Test data persistence across sessions
- [ ] Validate accessibility compliance

### 6.3 Performance Optimization
- [ ] Optimize component rendering
- [ ] Implement proper loading states
- [ ] Add error boundaries
- [ ] Optimize localStorage operations

## 7. Documentation and Deployment

### 7.1 Code Documentation
- [ ] Add JSDoc comments for all functions
- [ ] Document component props and interfaces
- [ ] Create README with setup instructions
- [ ] Document accessibility features

### 7.2 Deployment Preparation
- [ ] Configure build settings
- [ ] Set up environment variables
- [ ] Create deployment scripts
- [ ] Test production build

## Implementation Priority
1. **Phase 1**: Setup, types, and basic localStorage (Tasks 1.1-2.2) ✅ **COMPLETED**
2. **Phase 2**: Core UI components (Tasks 3.1-3.5)
3. **Phase 3**: Core functionality (Tasks 4.1-4.3)
4. **Phase 4**: Accessibility and polish (Tasks 5.1-6.3)
5. **Phase 5**: Documentation and deployment (Tasks 7.1-7.2)

## Success Criteria
- [ ] Users can create tasks with all required properties
- [ ] All tasks are displayed regardless of completion status
- [ ] Tasks persist across browser sessions
- [ ] Interface meets accessibility standards
- [ ] Application works smoothly on mobile and desktop
- [ ] Code is clean, typed, and well-documented 