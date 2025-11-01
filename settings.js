// focus-flow-extension/settings.js

// START: ADDED KEY
const CUSTOM_QUOTES_KEY = 'customQuotes';

let currentSettings = {
  // Hide Feed Settings
  hideFacebook: true,
  hideTwitter: true,
  hideInstagram: true,
  hideYoutube: false,
  // Bedtime Mode Settings
  bedtimeFacebook: false,
  bedtimeTwitter: false,
  bedtimeInstagram: false,
  bedtimeYoutube: false,
  // General Settings
  theme: 'light',
  timerDuration: 'off',
  timerEndTime: null
};

// Load settings on page load
function loadSettings() {
  chrome.storage.local.get(['settings'], (result) => {
    if (result.settings) {
      currentSettings = result.settings;
      // This will now handle all checkboxes: hide... and bedtime...
      Object.keys(currentSettings).forEach(key => {
        const checkbox = document.getElementById(key);
        if (checkbox && typeof currentSettings[key] === 'boolean') {
          checkbox.checked = currentSettings[key];
        }
      });
      applyTheme(currentSettings.theme);
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentSettings.theme);
      });
      updateTimerButtons(currentSettings.timerDuration);
      if (currentSettings.timerEndTime && currentSettings.timerEndTime > Date.now()) {
        showTimerStatus(currentSettings.timerEndTime);
      }
    }
  });
}

// Save settings function
function saveSettings() {
  chrome.storage.local.set({ settings: currentSettings }, () => { showSaveStatus(); });
}

function showSaveStatus() {
  const status = document.getElementById('saveStatus');
  status.classList.add('show');
  setTimeout(() => { status.classList.remove('show'); }, 2000);
}
function applyTheme(theme) {
  document.body.className = '';
  if (theme === 'dark') { document.body.classList.add('dark-theme'); }
  else if (theme === 'nature') { document.body.classList.add('nature-theme'); }
  else if (theme === 'glass') { document.body.classList.add('glass-theme'); }
}
function updateTimerButtons(duration) {
  document.querySelectorAll('.timer-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.duration === duration);
  });
}
function showTimerStatus(endTime) {
  const statusDiv = document.getElementById('timer-status');
  statusDiv.classList.add('active');
  statusDiv.classList.remove('status-expired');
  function updateStatus() {
    const remaining = endTime - Date.now();
    if (remaining > 0) {
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      statusDiv.textContent = `Feed visible for ${minutes}m ${seconds}s`;
      setTimeout(updateStatus, 1000);
    } else {
      statusDiv.textContent = 'Feeds blocked';
      statusDiv.classList.add('status-expired');
      updateTimerButtons('off');
      setTimeout(() => { statusDiv.classList.remove('active', 'status-expired'); }, 3000);
    }
  }
  updateStatus();
}

// START: ADDED FUNCTION TO SAVE CUSTOM QUOTE
function saveCustomQuote() {
  const textInput = document.getElementById('customQuoteText');
  const authorInput = document.getElementById('customQuoteAuthor');
  const status = document.getElementById('quoteSaveStatus');

  const text = textInput.value.trim();
  const author = authorInput.value.trim();

  if (!text || !author) {
    status.textContent = 'Please fill out both fields.';
    status.classList.add('show');
    setTimeout(() => { status.classList.remove('show'); }, 2000);
    return;
  }

  const newQuote = { text, author };

  chrome.storage.local.get([CUSTOM_QUOTES_KEY], (result) => {
    const quotes = result[CUSTOM_QUOTES_KEY] || [];
    quotes.push(newQuote);
    chrome.storage.local.set({ [CUSTOM_QUOTES_KEY]: quotes }, () => {
      textInput.value = '';
      authorInput.value = '';
      status.textContent = 'Quote saved successfully!';
      status.classList.add('show');
      setTimeout(() => { status.classList.remove('show'); }, 2000);
      loadCustomQuotes();
    });
  });
}
// END: ADDED FUNCTION TO SAVE CUSTOM QUOTE

// START: ADDED FUNCTIONS TO LOAD AND DELETE CUSTOM QUOTES
function loadCustomQuotes() {
  chrome.storage.local.get([CUSTOM_QUOTES_KEY], (result) => {
    const quotes = result[CUSTOM_QUOTES_KEY] || [];
    const quotesList = document.getElementById('customQuotesList');
    quotesList.innerHTML = '';
    quotes.forEach((quote, index) => {
      const quoteElement = document.createElement('div');
      quoteElement.className = 'custom-quote';
      quoteElement.innerHTML = `
        <span>"${quote.text}" - ${quote.author}</span>
        <button class="delete-quote-btn" data-index="${index}">Delete</button>
      `;
      quotesList.appendChild(quoteElement);
    });

    document.querySelectorAll('.delete-quote-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        deleteCustomQuote(index);
      });
    });
  });
}

function deleteCustomQuote(index) {
  chrome.storage.local.get([CUSTOM_QUOTES_KEY], (result) => {
    const quotes = result[CUSTOM_QUOTES_KEY] || [];
    quotes.splice(index, 1);
    chrome.storage.local.set({ [CUSTOM_QUOTES_KEY]: quotes }, () => {
      loadCustomQuotes();
    });
  });
}
// END: ADDED FUNCTIONS TO LOAD AND DELETE CUSTOM QUOTES


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadCustomQuotes();
  
  // A single event listener for all platform checkboxes
  document.querySelectorAll('.platform-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      currentSettings[e.target.id] = e.target.checked;
      saveSettings();
    });
  });
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const theme = e.currentTarget.dataset.theme;
      currentSettings.theme = theme;
      applyTheme(theme);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      saveSettings();
    });
  });
  
  document.querySelectorAll('.timer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const duration = e.currentTarget.dataset.duration;
      currentSettings.timerDuration = duration;
      
      if (duration === 'off' || duration === 'forever') {
        currentSettings.timerEndTime = null;
        document.getElementById('timer-status').classList.remove('active');
      } else {
        const minutes = parseInt(duration);
        currentSettings.timerEndTime = Date.now() + (minutes * 60000);
        showTimerStatus(currentSettings.timerEndTime);
      }
      
      updateTimerButtons(duration);
      saveSettings();
    });
  });

  // START: ADDED EVENT LISTENER FOR NEW BUTTON
  document.getElementById('saveQuoteBtn').addEventListener('click', saveCustomQuote);
  // END: ADDED EVENT LISTENER FOR NEW BUTTON
});