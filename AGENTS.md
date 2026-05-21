# AGENTS.md

You are helping build a web app called "Mood Tracker".

The app will be hosted on GitHub Pages, so it must be a fully static website using only:
- HTML
- CSS
- JavaScript

Do NOT use:
- React
- Vite
- Node.js
- npm packages
- Backend servers
- Databases

The app must work by simply opening `index.html`.

---

# Main Goal

Create a simple and clean Mood Tracker app where users can:
- Select their mood
- Add a short note
- Save mood entries
- View past mood entries
- Delete entries
- Keep data saved in the browser using localStorage

---

# Mood Options

Include these moods:
- Happy
- Okay
- Sad
- Angry
- Tired
- Stressed

Each mood should have:
- An emoji
- A color theme if possible

---

# Required Features

## Add Mood Entry
The user can:
- Choose a mood
- Write an optional note
- Click a save button

Each saved entry should contain:
- Mood
- Emoji
- Note
- Date
- Time

---

## Mood History
Display all saved entries in a clean card layout.

Each card should include:
- Mood
- Emoji
- Note
- Timestamp
- Delete button

Newest entries should appear first.

---

## Local Storage
Use browser localStorage to:
- Save mood entries
- Load entries when the page refreshes
- Persist data between visits

---

## Clear All Button
Add a button that:
- Deletes all mood entries
- Asks for confirmation before clearing

---

# UI Design

The design should be:
- Modern
- Minimal
- Mobile friendly
- Calm and colorful

Use:
- Rounded cards
- Soft shadows
- Smooth hover effects
- Responsive layout

Preferred colors:
- Light backgrounds
- Soft blues
- Pastel colors

---

# File Structure

Create these files:

/index.html
/style.css
/script.js
/AGENTS.md

---

# Coding Style

Keep the code:
- Beginner friendly
- Readable
- Well organized
- Commented where useful

Use:
- Functions for reusable logic
- Clear variable names
- Simple DOM manipulation

Avoid:
- Overengineering
- Large frameworks
- Complex patterns

---

# JavaScript Requirements

The JavaScript should:
- Load saved entries on page load
- Save entries to localStorage
- Render entries dynamically
- Delete single entries
- Clear all entries
- Validate user input

---

# Extra Features (Optional)

If possible, also add:
- Mood statistics
- Dark mode toggle
- Simple mood chart
- Search or filter moods
- Daily streak tracker

---

# Final Result

The final app should feel like a personal mood journal that is simple, relaxing, and easy to use.
