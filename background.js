// focus-flow-extension/background.js

// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'settings.html' });
});

// Initialize default settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['settings'], (result) => {
    if (!result.settings) {
      chrome.storage.local.set({
        settings: {
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
          timerEndTime: null,
        }
      });
    }
  });
});

// Check timer status periodically
setInterval(() => {
  chrome.storage.local.get(['settings'], (result) => {
    if (result.settings && result.settings.timerEndTime) {
      if (Date.now() > result.settings.timerEndTime) {
        result.settings.timerEndTime = null;
        result.settings.timerDuration = 'off';
        chrome.storage.local.set({ settings: result.settings });
      }
    }
  });
}, 1000);


// 🎯 NEW: Smart reload logic
// START: ADDED KEY
const CUSTOM_QUOTES_KEY = 'customQuotes';

const platformDomains = {
    hideFacebook: ['*://*.facebook.com/*'],
    bedtimeFacebook: ['*://*.facebook.com/*'],
    hideTwitter: ['*://*.twitter.com/*', '*://*.x.com/*'],
    bedtimeTwitter: ['*://*.twitter.com/*', '*://*.x.com/*'],
    hideInstagram: ['*://*.instagram.com/*'],
    bedtimeInstagram: ['*://*.instagram.com/*'],
    hideYoutube: ['*://*.youtube.com/*'],
    bedtimeYoutube: ['*://*.youtube.com/*'],
};

function reloadTabs(urlsToReload) {
    if (!urlsToReload || urlsToReload.length === 0) return;
    const urlPatterns = Array.isArray(urlsToReload) ? urlsToReload : [urlsToReload];
    
    // Use a Set to avoid reloading the same tab multiple times
    const uniqueUrls = [...new Set(urlPatterns)];

    uniqueUrls.forEach(urlPattern => {
        chrome.tabs.query({ url: urlPattern }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    // START: MODIFIED LISTENER
    if (namespace !== 'local') return;

    // Check if settings changed
    if (changes.settings) {
        const oldSettings = changes.settings.oldValue;
        const newSettings = changes.settings.newValue;

        if (!oldSettings) return; 

        // If a global setting (theme, timer) changed, reload all affected tabs.
        if (oldSettings.theme !== newSettings.theme || oldSettings.timerDuration !== newSettings.timerDuration) {
            const allUrlsToReload = [];
            for (const key in platformDomains) {
                if (newSettings[key]) { // If any setting for a platform is on
                    allUrlsToReload.push(...platformDomains[key]);
                }
            }
            reloadTabs(allUrlsToReload);
            return; 
        }

        // Check for platform-specific toggle changes.
        for (const settingKey in platformDomains) {
            if (oldSettings[settingKey] !== newSettings[settingKey]) {
                reloadTabs(platformDomains[settingKey]);
            }
        }
    }

    // Check if custom quotes changed
    if (changes[CUSTOM_QUOTES_KEY]) {
        // New quotes were added. We need to reload all active tabs
        // so their content.js scripts can fetch the new list.
        
        // Get all unique URLs from platformDomains
        const allUrlsSet = new Set();
        Object.values(platformDomains).forEach(urlList => {
            urlList.forEach(url => allUrlsSet.add(url));
        });
        const allUrlsToReload = Array.from(allUrlsSet);
        
        reloadTabs(allUrlsToReload);
    }
    // END: MODIFIED LISTENER
});