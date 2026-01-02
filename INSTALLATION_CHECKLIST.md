# Installation Verification Checklist

Use this checklist to verify that Focus Flow is installed and working correctly on your browser.

## Pre-Installation Checklist

### For Chrome Users
- [ ] Downloaded/cloned the repository
- [ ] Using the original `manifest.json` file (don't rename anything)
- [ ] Chrome version 88 or higher (`chrome://version`)

### For Firefox Users
- [ ] Downloaded/cloned the repository
- [ ] Renamed `manifest_firefox.json` to `manifest.json`
- [ ] Backed up original `manifest.json` (optional but recommended)
- [ ] Firefox version 109 or higher (`about:support`)

## Installation Verification

### Chrome Installation Verification
- [ ] Opened `chrome://extensions`
- [ ] Enabled "Developer mode"
- [ ] Clicked "Load unpacked"
- [ ] Selected the `focus-flow-extension` folder
- [ ] Extension appears in extensions list
- [ ] No error messages shown

### Firefox Installation Verification
- [ ] Opened `about:debugging#/runtime/this-firefox`
- [ ] Clicked "Load Temporary Add-on..."
- [ ] Selected a file from the `focus-flow-extension` folder
- [ ] Extension appears in add-ons list
- [ ] No error messages shown
- [ ] Extension icon visible in toolbar (puzzle piece → News Feed Eradicator)

## Functionality Verification

Test each feature to ensure everything works:

### Basic Functionality
- [ ] Click extension icon → Settings page opens
- [ ] Settings page loads without errors
- [ ] Can see theme selection (Light/Dark/Glass/Nature)
- [ ] Can see platform toggles (Facebook/Twitter/Instagram/YouTube)

### Feed Blocking
Visit each platform and verify the feed is hidden (default is on for Facebook, Twitter, Instagram; off for YouTube):

- [ ] Facebook: Feed replaced with quote
- [ ] Twitter/X: Feed replaced with quote
- [ ] Instagram: Feed replaced with quote
- [ ] YouTube: Works normally (off by default)

### Quote Display
- [ ] Quote appears on blocked feeds
- [ ] Quote is readable and well-formatted
- [ ] Quote attribution shown (author name)
- [ ] Can click to refresh quote

### Theme Changes
Test each theme:
- [ ] Light theme: Clean white background
- [ ] Dark theme: Dark background with light text
- [ ] Glass theme: Transparent/glassmorphism effect
- [ ] Nature theme: Nature-inspired design

### Timer Mode
- [ ] Can select timer duration (1min, 5min, 15min, 30min, 1hr, 2hr, Forever)
- [ ] Timer starts correctly
- [ ] Feed becomes accessible during timer
- [ ] Feed gets blocked again after timer expires
- [ ] Can turn timer off

### Bedtime Mode
- [ ] Can enable bedtime mode for each platform
- [ ] Grayscale filter applies when enabled
- [ ] Can disable bedtime mode
- [ ] Filter removes when disabled

### Custom Quotes
- [ ] Can add custom quote with author name
- [ ] Custom quote appears in rotation
- [ ] Can delete custom quotes
- [ ] Custom quotes persist after browser restart (Chrome only for Firefox temporary addon)

### Quote Screenshot
- [ ] Can click screenshot/download button on quote
- [ ] Image downloads correctly
- [ ] Image contains quote and author
- [ ] Image quality is good

## Storage/Persistence Verification

### Chrome
- [ ] Settings persist after closing and reopening Chrome
- [ ] Custom quotes persist after restart
- [ ] Timer state persists after restart

### Firefox (Temporary Add-on)
- [ ] Settings work during session
- [ ] ⚠️ Extension removed after closing Firefox (expected behavior)
- [ ] Need to reinstall extension after Firefox restart

### Firefox (Permanent Installation)
If you've signed and installed permanently:
- [ ] Extension persists after Firefox restart
- [ ] Settings persist after restart
- [ ] Custom quotes persist after restart

## Troubleshooting

If any items fail, try these steps:

### General
1. Refresh the page (Ctrl+F5 / Cmd+Shift+R)
2. Check browser console for errors (F12 → Console)
3. Reinstall the extension
4. Check that you're using the correct manifest for your browser

### Chrome-Specific
1. Ensure Developer Mode is enabled
2. Try disabling other extensions temporarily
3. Check `chrome://extensions` for errors

### Firefox-Specific
1. Ensure you renamed `manifest_firefox.json` to `manifest.json`
2. Check Firefox version is 109+
3. Try in Firefox Developer Edition
4. Check `about:debugging` for errors

## Getting Help

If you've gone through this checklist and still have issues:

1. Check existing documentation:
   - [README.md](README.md)
   - [FIREFOX_INSTALLATION.md](FIREFOX_INSTALLATION.md) (Firefox)
   - [BROWSER_SUPPORT.md](BROWSER_SUPPORT.md) (Technical)

2. Open an issue on GitHub with:
   - Browser name and version
   - Operating system
   - Which checklist items failed
   - Any error messages from console
   - Screenshots if applicable

## Success! 🎉

If all applicable items are checked:
- ✅ Your installation is complete and working correctly!
- ✅ Enjoy a distraction-free browsing experience!
- ✅ Consider starring the repository if you find it useful!

---

**Note**: Some storage-related features won't persist in Firefox temporary add-ons. This is a Firefox limitation, not an extension bug. See [FIREFOX_INSTALLATION.md](FIREFOX_INSTALLATION.md) for permanent installation options.
