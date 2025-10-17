// focus-flow-extension/settings.js

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


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
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
});