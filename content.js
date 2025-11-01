// focus-flow-extension/content.js

// START: MODIFIED QUOTES LOGIC
const CUSTOM_QUOTES_KEY = 'customQuotes';

// This will be populated by init()
let allQuotes = [];
// END: MODIFIED QUOTES LOGIC

// Get current site
function getCurrentSite() {
  const hostname = window.location.hostname;
  if (hostname.includes('facebook.com')) return 'facebook';
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'twitter';
  if (hostname.includes('instagram.com')) return 'instagram';
  if (hostname.includes('youtube.com')) return 'youtube';
  return null;
}

// shouldHideFeed function remains the same
function shouldHideFeed(settings, site) {
  if (!settings || !site) {
    return false;
  }
  if (settings.timerDuration === 'forever') {
    return false;
  }
  if (settings.timerEndTime && Date.now() < settings.timerEndTime) {
    return false;
  }
  switch (site) {
    case 'facebook': return settings.hideFacebook;
    case 'twitter': return settings.hideTwitter;
    case 'instagram': return settings.hideInstagram;
    case 'youtube': return settings.hideYoutube;
    default: return false;
  }
}

// 🎯 UPDATED: Function to check if bedtime mode should be applied for the specific site
function shouldApplyBedtimeMode(settings, site) {
    if (!settings || !site) {
        return false;
    }
    switch (site) {
        case 'facebook': return settings.bedtimeFacebook;
        case 'twitter': return settings.bedtimeTwitter;
        case 'instagram': return settings.bedtimeInstagram;
        case 'youtube': return settings.bedtimeYoutube;
        default: return false;
    }
}


// Create quote display function
function createQuoteDisplay(currentTheme) {
  const container = document.createElement('div');
  container.className = `nfe-quote-container theme-${currentTheme}`;
  container.innerHTML = `
    <div class="nfe-quote-content">
      <div class="nfe-timer-display"></div>
      <div class="nfe-quote-icon">✨</div>
      <blockquote class="nfe-quote-text"></blockquote>
      <div class="nfe-quote-author"></div>
      <div class="nfe-button-wrapper">
        <button class="nfe-new-quote-btn">New Quote</button>
        <button class="nfe-save-image-btn">Save as Image</button>
      </div>
      <div class="nfe-focus-message">Stay focused on what matters most 🎯</div>
      <button class="nfe-timer-toggle">Auto-Refresh: ON</button>
    </div>
  `;

  // --- Element Selectors ---
  const quoteTextEl = container.querySelector('.nfe-quote-text');
  const quoteAuthorEl = container.querySelector('.nfe-quote-author');
  const newQuoteBtn = container.querySelector('.nfe-new-quote-btn');
  const saveImageBtn = container.querySelector('.nfe-save-image-btn');
  const timerToggleBtn = container.querySelector('.nfe-timer-toggle');
  const timerDisplayEl = container.querySelector('.nfe-timer-display');

  // --- State Variables ---
  let isAutoRefreshOn = true;
  let countdown = 60;
  let autoRefreshInterval;

  // --- Functions ---
  const changeQuote = () => {
    quoteTextEl.classList.add('nfe-quote-fade');
    quoteAuthorEl.classList.add('nfe-quote-fade');

    setTimeout(() => {
        // This now uses the global 'quotes' array, which is merged
        const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
        quoteTextEl.textContent = `"${randomQuote.text}"`;
        quoteAuthorEl.textContent = `— ${randomQuote.author}`;

        quoteTextEl.classList.remove('nfe-quote-fade');
        quoteAuthorEl.classList.remove('nfe-quote-fade');
    }, 200);
  };

  const stopAutoRefresh = () => {
    isAutoRefreshOn = false;
    clearInterval(autoRefreshInterval);
    timerToggleBtn.textContent = 'Auto-Refresh: OFF';
    timerToggleBtn.classList.remove('active');
    timerDisplayEl.textContent = '';
  };

  const startAutoRefresh = () => {
    isAutoRefreshOn = true;
    clearInterval(autoRefreshInterval);
    countdown = 60;
    timerToggleBtn.textContent = 'Auto-Refresh: ON';
    timerToggleBtn.classList.add('active');
    
    autoRefreshInterval = setInterval(() => {
      countdown--;
      timerDisplayEl.textContent = `Next quote in ${countdown}s`;
      if (countdown <= 0) {
        changeQuote();
        countdown = 60;
      }
    }, 1000);
  };

  // --- Event Listeners ---
  newQuoteBtn.addEventListener('click', () => {
    changeQuote();
    if (isAutoRefreshOn) {
      startAutoRefresh();
    }
  });
  
  timerToggleBtn.addEventListener('click', () => {
    if (isAutoRefreshOn) {
      stopAutoRefresh();
    } else {
      startAutoRefresh();
    }
  });

  if (typeof domtoimage === 'object') {
      saveImageBtn.addEventListener('click', () => {
          const quoteContent = container.querySelector('.nfe-quote-content');
          const rect = quoteContent.getBoundingClientRect();

          domtoimage.toPng(quoteContent, {
              width: rect.width,
              height: rect.height
          })
          .then(function (dataUrl) {
              const link = document.createElement('a');
              link.download = 'focus-flow-quote.png';
              link.href = dataUrl;
              link.click();
          })
          .catch(function (error) {
              console.error('Oops, something went wrong with dom-to-image!', error);
          });
      });
  } else {
      saveImageBtn.style.display = 'none';
      console.error("dom-to-image library not found. Save button is hidden.");
  }

  // --- Initial Setup ---
  // START: Check if quotes array is populated
  if (allQuotes.length > 0) {
    changeQuote();
  } else {
    // This is a fallback in case storage fails, though unlikely
    quoteTextEl.textContent = "Loading quotes...";
    quoteAuthorEl.textContent = "— Focus Flow";
  }
  // END: Check
  startAutoRefresh();

  return container;
}


// Hide feeds based on site function
function hideFeedForSite(site, currentTheme) {
  let selectorsToHide = [];

  switch (site) {
    case 'facebook':
      // SOLID FIX: More aggressive and specific selectors for feeds and Reels.
      
      // Remove the left-hand menu link to "Reels"
      const reelsLink = document.querySelector('a[href*="/reel/"]');
      if (reelsLink) {
        const parentMenuItem = reelsLink.closest('div[role="listitem"]');
        if (parentMenuItem) {
            parentMenuItem.remove();
        }
      }

      if (window.location.pathname === '/') {
        // On the homepage, hide the entire main content column.
        selectorsToHide = ['[role="main"]'];
      } else if (window.location.pathname.startsWith('/reel/')) {
        // If on the dedicated Reels page, hide the main content.
        selectorsToHide = ['[role="main"]'];
      }
      break;
    case 'twitter':
      selectorsToHide = ['[data-testid="primaryColumn"] [aria-label^="Timeline"]'];
      break;
    case 'instagram':
      selectorsToHide = ['main[role="main"]', 'div._aano'];
      break;
    case 'youtube':
      selectorsToHide = [ '#contents.ytd-rich-grid-renderer', 'ytd-browse[page-subtype="home"] #contents', '#secondary' ];
      break;
  }
  
  if (selectorsToHide.length === 0) return;

  const elements = document.querySelectorAll(selectorsToHide.join(', '));
  elements.forEach(el => {
    if (el.style.display === 'none') return;
    el.style.display = 'none';
    
    const parent = el.parentNode;
    if (parent && !parent.querySelector('.nfe-quote-container')) {
        const quoteContainer = createQuoteDisplay(currentTheme);
        parent.insertBefore(quoteContainer, el);
    }
  });
}

// Main function
function init() {
  const site = getCurrentSite();
  if (!site) return;

  // START: MODIFIED STORAGE CALL
  chrome.storage.local.get(['settings', CUSTOM_QUOTES_KEY], (result) => {
    
    // 1. Populate the quotes array
    const customQuotes = result[CUSTOM_QUOTES_KEY] || [];
    allQuotes = [...quotes, ...customQuotes];
    
    // 2. Continue with settings logic
    if (!result || !result.settings) {
        console.log("News Feed Eradicator: No settings found, not running.");
        return;
    }

    // 🎯 UPDATED: Apply bedtime mode if enabled for this specific site
    if (shouldApplyBedtimeMode(result.settings, site)) {
        document.documentElement.classList.add('nfe-bedtime-mode');
    }

    const currentTheme = result.settings.theme || 'light';
    if (shouldHideFeed(result.settings, site)) {
      // Use MutationObserver to handle dynamically loaded content
      const observer = new MutationObserver((mutations) => {
        hideFeedForSite(site, currentTheme);
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Initial run
      hideFeedForSite(site, currentTheme);
    }
  });
  // END: MODIFIED STORAGE CALL
}

init();