# ARCHITECTURE.md

# Mood Tracker Architecture

## Overview

Mood Tracker is a simple static web application that allows users to track their moods over time.

The app is designed to:
- Run entirely in the browser
- Be hosted on GitHub Pages
- Use localStorage for persistence
- Require no backend or database

The application uses plain HTML, CSS, and JavaScript.

---

# Tech Stack

Frontend:
- HTML5
- CSS3
- Vanilla JavaScript

Storage:
- Browser localStorage

Hosting:
- GitHub Pages

---

# Application Structure

The project contains four main files:

/index.html
/style.css
/script.js
/AGENTS.md

Optional:
/ARCHITECTURE.md

---

# Component Breakdown

## index.html

Responsible for:
- App layout
- Mood form
- Mood history container
- Buttons and inputs

Main sections:
- Header
- Mood input form
- Mood history list
- Clear all button

---

## style.css

Responsible for:
- App styling
- Responsive layout
- Mood card design
- Animations and hover effects
- Light/Dark mode styles if added

Design goals:
- Clean
- Minimal
- Calm
- Mobile friendly

---

## script.js

Responsible for:
- Handling user interactions
- Saving data
- Loading data
- Rendering mood entries
- Updating the UI dynamically

Main JavaScript functions:

### loadEntries()
Loads saved entries from localStorage.

### saveEntries()
Saves all entries to localStorage.

### renderEntries()
Displays all mood cards on the screen.

### addEntry()
Creates a new mood entry.

### deleteEntry(id)
Deletes one entry.

### clearAllEntries()
Deletes all saved entries.

---

# Data Structure

Mood entries should be stored as an array of objects.

Example:

```js
[
  {
    id: 1,
    mood: "Happy",
    emoji: "😊",
    note: "Had a great day",
    timestamp: "2026-05-21T14:30:00"
  }
]
```

The array should be saved in localStorage using JSON.

Key name:
```js
"moodTrackerEntries"
```

---

# User Flow

1. User opens app
2. App loads saved entries from localStorage
3. User selects a mood
4. User optionally writes a note
5. User clicks save
6. Entry appears instantly
7. Entry persists after refresh

---

# UI Behavior

## Mood Cards
Each card displays:
- Emoji
- Mood name
- Note
- Date/time
- Delete button

Newest entries appear first.

---

# Responsiveness

The app should:
- Work on desktop
- Work on mobile
- Resize cleanly
- Use flexible layouts

Suggested:
- CSS Flexbox
- CSS Grid

---

# Error Handling

The app should:
- Prevent invalid saves
- Handle empty notes gracefully
- Avoid crashing if localStorage is empty
- Safely parse JSON

---

# Optional Features

Possible future additions:
- Mood statistics
- Charts
- Dark mode
- Mood streaks
- Search/filter system
- Export/import entries

---

# Performance Goals

The app should:
- Load quickly
- Use minimal resources
- Avoid unnecessary complexity

No external dependencies are required.

---

# Deployment

Deployment target:
GitHub Pages

Requirements:
- Static files only
- No server-side code
- No build tools required

The app should work immediately after uploading the files to a GitHub repository and enabling GitHub Pages.
