// ===== Data Management =====

// Mood configuration with emojis and colors
const moods = {
    'Happy': { emoji: '😊', class: 'happy' },
    'Okay': { emoji: '😐', class: 'okay' },
    'Sad': { emoji: '😢', class: 'sad' },
    'Angry': { emoji: '😠', class: 'angry' },
    'Tired': { emoji: '😴', class: 'tired' },
    'Stressed': { emoji: '😰', class: 'stressed' }
};

// Storage key for localStorage
const STORAGE_KEY = 'moodTrackerEntries';

// Current selected mood
let currentMood = null;
let entries = [];

// ===== Initialize App =====

document.addEventListener('DOMContentLoaded', function() {
    loadEntries();
    setupEventListeners();
    renderEntries();
});

// ===== Event Listeners =====

function setupEventListeners() {
    // Mood button listeners
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
        btn.addEventListener('click', selectMood);
    });

    // Save button listener
    document.getElementById('saveBtn').addEventListener('click', addEntry);

    // Clear all button listener
    document.getElementById('clearAllBtn').addEventListener('click', clearAllEntries);

    // Enter key to save from note input
    document.getElementById('noteInput').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            addEntry();
        }
    });
}

// ===== Mood Selection =====

function selectMood(event) {
    const btn = event.currentTarget;
    const mood = btn.dataset.mood;
    const emoji = btn.dataset.emoji;

    // Remove active class from all buttons
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    // Update current mood
    currentMood = {
        name: mood,
        emoji: emoji
    };

    // Update selected mood display
    updateSelectedMoodDisplay();
}

// ===== Selected Mood Display =====

function updateSelectedMoodDisplay() {
    const selectedMoodDiv = document.getElementById('selectedMood');
    
    if (currentMood) {
        selectedMoodDiv.innerHTML = `
            <div>
                <span style="font-size: 1.8rem; margin-right: 10px;">${currentMood.emoji}</span>
                <span style="font-size: 1.1rem; color: #333;">You selected: <strong>${currentMood.name}</strong></span>
            </div>
        `;
    } else {
        selectedMoodDiv.innerHTML = '<p>Select a mood above</p>';
    }
}

// ===== Add Entry =====

function addEntry() {
    // Validate that a mood is selected
    if (!currentMood) {
        alert('Please select a mood first!');
        return;
    }

    // Get note from input
    const noteInput = document.getElementById('noteInput');
    const note = noteInput.value.trim();

    // Create entry object
    const entry = {
        id: Date.now(), // Use timestamp as unique ID
        mood: currentMood.name,
        emoji: currentMood.emoji,
        note: note,
        timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Add entry to array (newest first)
    entries.unshift(entry);

    // Save to localStorage
    saveEntries();

    // Clear form
    clearForm();

    // Re-render entries
    renderEntries();
}

// ===== Clear Form =====

function clearForm() {
    // Clear note input
    document.getElementById('noteInput').value = '';

    // Clear mood selection
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    currentMood = null;
    updateSelectedMoodDisplay();
}

// ===== Delete Entry =====

function deleteEntry(id) {
    // Find and remove entry
    entries = entries.filter(entry => entry.id !== id);

    // Save to localStorage
    saveEntries();

    // Re-render entries
    renderEntries();
}

// ===== Clear All Entries =====

function clearAllEntries() {
    // Ask for confirmation
    if (entries.length === 0) {
        alert('No entries to clear!');
        return;
    }

    const confirmed = confirm('Are you sure you want to delete all entries? This cannot be undone.');

    if (confirmed) {
        entries = [];
        saveEntries();
        renderEntries();
    }
}

// ===== LocalStorage Functions =====

// Load entries from localStorage
function loadEntries() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
            entries = JSON.parse(stored);
        } else {
            entries = [];
        }
    } catch (error) {
        console.error('Error loading entries from localStorage:', error);
        entries = [];
    }
}

// Save entries to localStorage
function saveEntries() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
        console.error('Error saving entries to localStorage:', error);
        alert('Could not save entry. Your browser storage may be full.');
    }
}

// ===== Render Entries =====

function renderEntries() {
    const container = document.getElementById('entriesContainer');

    // Clear container
    container.innerHTML = '';

    // Check if there are entries
    if (entries.length === 0) {
        container.innerHTML = '<p class="empty-message">No entries yet. Start tracking your mood!</p>';
        return;
    }

    // Create card for each entry
    entries.forEach(entry => {
        const card = createMoodCard(entry);
        container.appendChild(card);
    });
}

// ===== Create Mood Card =====

function createMoodCard(entry) {
    const card = document.createElement('div');
    card.className = `mood-card ${moods[entry.mood]?.class || ''}`;

    // Format note (show "No note" if empty)
    const noteText = entry.note ? entry.note : '<em>No note added</em>';

    card.innerHTML = `
        <div class="mood-card-content">
            <div class="mood-card-header">
                <span class="card-emoji">${entry.emoji}</span>
                <span class="card-mood-name">${entry.mood}</span>
            </div>
            <div class="card-note">${escapeHtml(noteText)}</div>
            <div class="card-timestamp">${entry.timestamp}</div>
        </div>
        <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
    `;

    return card;
}

// ===== Utility Functions =====

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
