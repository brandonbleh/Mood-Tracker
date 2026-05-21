// ===== Data Management =====
const STORAGE_KEY = 'moodTrackerEntries';
let entries = [];
let selectedMood = null;

// ===== Load entries from localStorage on page load =====
function loadEntries() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        entries = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading entries:', error);
        entries = [];
    }
}

// ===== Save entries to localStorage =====
function saveEntries() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
        console.error('Error saving entries:', error);
    }
}

// ===== Generate unique ID =====
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// ===== Format timestamp =====
function formatTimestamp(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// ===== Add a new mood entry =====
function addEntry() {
    if (!selectedMood) {
        alert('Please select a mood!');
        return;
    }

    const note = document.getElementById('note').value.trim();
    const now = new Date();

    const entry = {
        id: generateId(),
        mood: selectedMood.mood,
        emoji: selectedMood.emoji,
        note: note,
        timestamp: now.toISOString()
    };

    // Add to beginning of array (newest first)
    entries.unshift(entry);
    saveEntries();

    // Clear form
    document.getElementById('note').value = '';
    selectedMood = null;
    updateMoodSelection();
    renderEntries();
}

// ===== Delete a single entry =====
function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    saveEntries();
    renderEntries();
}

// ===== Clear all entries =====
function clearAllEntries() {
    if (entries.length === 0) {
        alert('No entries to clear!');
        return;
    }

    if (confirm('Are you sure you want to delete ALL mood entries? This cannot be undone.')) {
        entries = [];
        saveEntries();
        renderEntries();
    }
}

// ===== Update selected mood display =====
function updateMoodSelection() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    const selectedMoodSpan = document.getElementById('selected-mood');
    const saveBtn = document.getElementById('save-btn');

    moodBtns.forEach(btn => {
        btn.classList.remove('selected');
    });

    if (selectedMood) {
        moodBtns.forEach(btn => {
            if (btn.dataset.mood === selectedMood.mood) {
                btn.classList.add('selected');
            }
        });
        selectedMoodSpan.textContent = `Selected: ${selectedMood.emoji} ${selectedMood.mood}`;
        saveBtn.disabled = false;
    } else {
        selectedMoodSpan.textContent = '';
        saveBtn.disabled = true;
    }
}

// ===== Render all mood entries =====
function renderEntries() {
    const historyContainer = document.getElementById('mood-history');

    if (entries.length === 0) {
        historyContainer.innerHTML = '<p class="empty-message">No mood entries yet. Start by selecting a mood above!</p>';
        return;
    }

    historyContainer.innerHTML = entries.map(entry => {
        const date = new Date(entry.timestamp);
        const formattedTime = formatTimestamp(date);

        return `
            <div class="mood-card">
                <div class="mood-card-header">
                    <div class="mood-info">
                        <span class="mood-emoji">${entry.emoji}</span>
                        <div>
                            <div class="mood-name">${entry.mood}</div>
                            <div class="mood-time">${formattedTime}</div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteEntry('${entry.id}')">Delete</button>
                </div>
                ${entry.note ? `<div class="mood-note">${escapeHtml(entry.note)}</div>` : ''}
            </div>
        `;
    }).join('');
}

// ===== Escape HTML to prevent XSS =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Load existing entries
    loadEntries();
    renderEntries();

    // Mood selection buttons
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectedMood = {
                mood: this.dataset.mood,
                emoji: this.dataset.emoji
            };
            updateMoodSelection();
        });
    });

    // Save button
    document.getElementById('save-btn').addEventListener('click', addEntry);

    // Clear all button
    document.getElementById('clear-all-btn').addEventListener('click', clearAllEntries);

    // Allow Enter key to submit note and save
    document.getElementById('note').addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            addEntry();
        }
    });
});