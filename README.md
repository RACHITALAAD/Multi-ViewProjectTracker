# 📋 Project Tracker - Multi-View Task Management UI

A high-performance project management interface featuring three synchronized views, custom drag-and-drop, virtual scrolling, and live collaboration indicators. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 📊 Three Synchronized Views
- **Kanban Board** - Organize tasks into 4 columns (To Do, In Progress, In Review, Done)
- **List View** - Sortable table with virtual scrolling for 500+ tasks
- **Timeline View** - Gantt chart visualization with drag-based layout
- Instant switching between views with no data re-fetch

### 🎯 Custom Drag-and-Drop System
- **No external libraries** - Pure pointer event implementation
- Mouse and touch support
- Drag ghost animation with opacity feedback
- Drop zone highlighting
- Smart snapback for invalid drops
- Placeholder preservation during drag

### ⚡ Virtual Scrolling
- Only renders visible rows + 5-row buffer
- Handles 500+ tasks without performance degradation
- Smooth scrolling with no flicker or gaps
- Correct scrollbar sizing maintained

### 🤝 Live Collaboration Indicators
- Simulated multi-user presence
- Real-time avatar display on viewed tasks
- Top bar showing active viewers
- Automatic user movement animation

### 🔍 Advanced Filtering
- Multi-select filters - Status, Priority, Assignee, Due Date
- Instant filtering (no submit button)
- URL-synced state for bookmarking & sharing
- Back-navigation support

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Zustand** for state management
- **Tailwind CSS** for styling
- **React Router DOM** for URL sync
- **Date-fns** for date manipulation
- **Vite** for build tooling

### No External Libraries Used For
- ✋ Drag-and-drop (custom pointer events)
- 📜 Virtual scrolling (custom calculations)
- 🎨 UI components (all custom built)

## 📈 Performance

- **Lighthouse Score** - 88+
- **Virtual Scrolling** - Maintains 60fps with 500+ tasks
- **Render Optimization** - Memoization & context splitting
- **Bundle Size** - ~120KB gzipped

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ & npm

### Installation

```bash
git clone 

cd project-tracker

npm install

npm run dev