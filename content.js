// focus-flow-extension/content.js

// START: MODIFIED QUOTES LOGIC
const CUSTOM_QUOTES_KEY = 'customQuotes';

// This is now the fallback/default list
const defaultQuotes = [
    // --- Allama Iqbal ---
    { text: "The ultimate aim of the ego is not to see something, but to be something.", author: "Allama Iqbal" },
    { text: "Nations are born in the hearts of poets, they prosper and die in the hands of politicians.", author: "Allama Iqbal" },
    { text: "Be not entangled in this world of days and nights; Thou hast another time and space as well.", author: "Allama Iqbal" },
    { text: "The life of the individual has meaning only insofar as it aids in making the life of the collective more beautiful and noble.", author: "Allama Iqbal" },
    { text: "If you wish to be a Muslim, be a devoted slave of God, not of the world.", author: "Allama Iqbal" },
    { text: "Vision without power does bring moral elevation but cannot give a lasting culture.", author: "Allama Iqbal" },
    { text: "Words, without power, is mere philosophy.", author: "Allama Iqbal" },
    { text: "The person who is not disturbed by the distress of others is not a human being.", author: "Allama Iqbal" },
    { text: "From love's plectrum arises the song of life: love is the light of life, love is the fire of life.", author: "Allama Iqbal" },
    { text: "Become a mountain from a straw. Heed the message of the crawling ant.", author: "Allama Iqbal" },
    { text: "I have seen the movement of the sinews of the sky, And the blood coursing in the veins of the moon.", author: "Allama Iqbal" },
    { text: "An infidel with a wakeful heart is better than a religious man who is asleep in the mosque.", author: "Allama Iqbal" },
    { text: "My ancestors were Brahmins. They spent their lives in search of god. I am spending my life in search of man.", author: "Allama Iqbal" },
    { text: "Man is primarily governed by passion and instinct.", author: "Allama Iqbal" },
    { text: "But only a brief moment is granted to the brave one breath or two, whose wage is the long nights of the grave.", author: "Allama Iqbal" },
    // --- Rumi ---
    { text: "The wound is the place where the Light enters you.", author: "Rumi" },
    { text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.", author: "Rumi" },
    { text: "Stop acting so small. You are the universe in ecstatic motion.", author: "Rumi" },
    { text: "What you seek is seeking you.", author: "Rumi" },
    { text: "Don't grieve. Anything you lose comes round in another form.", author: "Rumi" },
    { text: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.", author: "Rumi" },
    { text: "You were born with wings, why prefer to crawl through life?", author: "Rumi" },
    { text: "Raise your words, not voice. It is rain that grows flowers, not thunder.", author: "Rumi" },
    { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi" },
    { text: "The minute I heard my first love story, I started looking for you, not knowing how blind that was. Lovers don't finally meet somewhere. They're in each other all along.", author: "Rumi" },
    { text: "Let the beauty we love be what we do. There are hundreds of ways to kneel and kiss the ground.", author: "Rumi" },
    { text: "Set your life on fire. Seek those who fan your flames.", author: "Rumi" },
    { text: "Be like a tree and let the dead leaves drop.", author: "Rumi" },
    { text: "There is a voice that doesn't use words. Listen.", author: "Rumi" },
    { text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
    { text: "When you do things from your soul, you feel a river moving in you, a joy.", author: "Rumi" },
    { text: "Grief can be the garden of compassion.", author: "Rumi" },
    { text: "If you are irritated by every rub, how will your mirror be polished?", author: "Rumi" },
    { text: "Silence is the language of God, all else is poor translation.", author: "Rumi" },
    { text: "I want to sing like the birds sing, not worrying about who hears or what they think.", author: "Rumi" },
    { text: "The moon stays bright when it doesn't avoid the night.", author: "Rumi" },
    { text: "Be empty of worrying. Think of who created thought.", author: "Rumi" },
    { text: "As you start to walk on the way, the way appears.", author: "Rumi" },
    { text: "Sell your cleverness and buy bewilderment.", author: "Rumi" },
    { text: "These pains you feel are messengers. Listen to them.", author: "Rumi" },
    { text: "Respond to every call that excites your spirit.", author: "Rumi" },
    { text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.", author: "Rumi" },
    { text: "The quieter you become, the more you are able to hear.", author: "Rumi" },
    { text: "Why do you stay in prison when the door is so wide open?", author: "Rumi" },
    { text: "This is a subtle truth. Whatever you love you are.", author: "Rumi" },
    { text: "In your light I learn how to love. In your beauty, how to make poems.", author: "Rumi" },
    { text: "Everything in the universe is within you. Ask all from yourself.", author: "Rumi" },
    { text: "When the soul lies down in that grass, the world is too full to talk about ideas, language, even the phrase each other doesn't make any sense.", author: "Rumi" }, 
    { text: "Live life as if everything is rigged in your favor.", author: "Rumi" },
    { text: "The garden of the world has no limit except in your mind.", author: "Rumi" },
    { text: "Wherever you stand, be the soul of that place.", author: "Rumi" },
    { text: "Don't be satisfied with stories, how things have gone with others. Unfold your own myth.", author: "Rumi" },
    { text: "Patience is the key to joy.", author: "Rumi" },
    { text: "When you let go of who you are, you become who you might be.", author: "Rumi" },
    { text: "Wear gratitude like a cloak and it will feed every corner of your life.", author: "Rumi" },
    { text: "The breeze at dawn has secrets to tell you. Don't go back to sleep.", author: "Rumi" },
    { text: "It's your road and yours alone, others may walk it with you, but no one can walk it for you.", author: "Rumi" },
    { text: "The only lasting beauty is the beauty of the heart.", author: "Rumi" },
    { text: "Only from the heart can you touch the sky.", author: "Rumi" },

    // --- Mirza Ghalib ---
    { text: "I have a thousand desires, all of which are fatal. Many of my desires have been met, yet I yearn for more.", author: "Mirza Ghalib" },
    { text: "This is not my fate, that I should meet my beloved. Had I lived longer, I would have kept waiting.", author: "Mirza Ghalib" },
    { text: "We know the reality of paradise, but to keep the heart happy, Ghalib, this thought is good.", author: "Mirza Ghalib" },
    { text: "Love has rendered me worthless, Ghalib. Otherwise, I too was a man of substance.", author: "Mirza Ghalib" },
    { text: "The day of death is certain. Why then does sleep not come all night?", author: "Mirza Ghalib" },
    { text: "If there is a paradise on earth, it is this, it is this, it is this.", author: "Mirza Ghalib" },
    { text: "When nothing existed, God was there. Had nothing been, God would have been. My being has defeated me. Had I not been, what would have been?", author: "Mirza Ghalib" },
    { text: "In love, there is no difference between life and death. I live by seeing the one for whom I would die.", author: "Mirza Ghalib" },
    { text: "I am not a fan of that which merely courses through the veins. If it does not drip from the eyes, then it is not blood.", author: "Mirza Ghalib" },
    { text: "How much darkness there is in the evening's shadows, ask those birds who have no home.", author: "Mirza Ghalib" },
    { text: "A sigh needs a lifetime to have an effect. Who can live long enough to see your tresses settled?", author: "Mirza Ghalib" },
    { text: "We have hopes of loyalty from those who do not know what loyalty is.", author: "Mirza Ghalib" },
    { text: "When a man becomes accustomed to sorrow, the sorrow fades away. So many difficulties fell upon me that they became easy.", author: "Mirza Ghalib" },
    { text: "O foolish heart, what has happened to you? After all, what is the remedy for this pain?", author: "Mirza Ghalib" },
    { text: "You are not the only master of poetry, Ghalib. They say in the past there was a Mir as well.", author: "Mirza Ghalib" },
    { text: "The world is a playground for children before me. Night and day, this spectacle unfolds before me.", author: "Mirza Ghalib" },
    { text: "Do not go by the lines on the palm of the hand, Ghalib. Luck is bestowed even on those who do not have hands.", author: "Mirza Ghalib" },
    { text: "If the heart itself is the pain, what is one to do?", author: "Mirza Ghalib" },
    { text: "Go on, now, to a place where no one is. No one to speak your language, no one to share your tongue.", author: "Mirza Ghalib" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Mirza Ghalib" },
    { text: "Upon seeing her, a glow appears on my face. And she thinks the sick man's condition is good.", author: "Mirza Ghalib" },
    { text: "Love demands patience, desire is restless. What color shall I paint the heart, until you savage it?", author: "Mirza Ghalib" },

    // --- Other Philosophical & Literary Quotes ---
    { text: "The mystery of human existence lies not in just staying alive, but in finding something to live for.", author: "Fyodor Dostoevsky" },
    { text: "If you want to overcome the whole world, overcome yourself.", author: "Fyodor Dostoevsky" },
    { text: "By believing passionately in something that still does not exist, we create it.", author: "Franz Kafka" },
    { text: "Start with what is right rather than what is acceptable.", author: "Franz Kafka" },
    { text: "In the midst of winter, I found there was, within me, an invincible summer.", author: "Albert Camus" },
    { text: "He who has a why to live for can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
    { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Søren Kierkegaard" },
    { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
    { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
    { text: "In a time of deceit telling the truth is a revolutionary act.", author: "George Orwell" },
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "The greatest victory is that which requires no battle.", author: "Sun Tzu" },
    { text: "It does not matter how slowly you go so long as you do not stop.", author: "Confucius" },
    { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Judge a man by his questions rather than by his answers.", author: "Voltaire" },
    
    // --- Original Islamic Quotes ---
    { text: "The seeking of knowledge is obligatory for every Muslim.", author: "Prophet Muhammad (PBUH)" },
    { text: "The richest of the rich is the one who is not a prisoner of greed.", author: "Ali ibn Abi Talib (RA)" },
    { text: "Patience is a pillar of faith.", author: "Umar ibn al-Khattab (RA)" },
    { text: "Knowledge without action is wastefulness and action without knowledge is foolishness.", author: "Imam Al-Ghazali" },
    { text: "What has reached you was never meant to miss you and what has missed you was never meant to reach you.", author: "Prophet Muhammad (PBUH)" },
    { text: "So verily, with the hardship, there is relief.", author: "Quran 94:5" },
    { text: "The greatest of richness is the richness of the soul.", author: "Prophet Muhammad (PBUH)" },
    { text: "Do not be a slave to others when Allah has created you free.", author: "Ali ibn Abi Talib (RA)" },
    { text: "Do not belittle any good deed, even meeting your brother with a cheerful face.", author: "Prophet Muhammad (PBUH)" },
    { text: "The fruit of knowledge is to be humble.", author: "Imam Al-Ghazali" }
];

// This will be populated by init()
let quotes = [];
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
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
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
  if (quotes.length > 0) {
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
    quotes = [...defaultQuotes, ...customQuotes];
    
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