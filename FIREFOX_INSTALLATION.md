# Firefox Installation Guide

## Quick Setup for Firefox

Follow these steps to install Focus Flow on Mozilla Firefox:

### Step 1: Prepare the Extension

1. Download or clone this repository to your computer
2. Navigate to the `focus-flow-extension` folder
3. **Important**: Rename or copy `manifest_firefox.json` to `manifest.json`
   - Option A: Backup the original `manifest.json` (rename it to `manifest_chrome.json`)
   - Option B: Copy `manifest_firefox.json` and rename the copy to `manifest.json`

### Step 2: Load in Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click the **"Load Temporary Add-on..."** button
3. Navigate to your `focus-flow-extension` folder
4. Select the `manifest.json` file (or any file in the folder)
5. The extension should now be loaded and active!

### Step 3: Verify Installation

1. Click on the puzzle piece icon in Firefox's toolbar
2. You should see "News Feed Eradicator" in the list
3. Click on it to open the settings page
4. Visit Facebook, Twitter, Instagram, or YouTube to see the extension in action

## Important Notes

### Temporary Add-on Limitations

When you load an extension as a "Temporary Add-on" in Firefox:
- The extension will be **removed when you close Firefox**
- You'll need to reload it each time you restart Firefox
- This is Firefox's security measure for unsigned extensions

### For Permanent Installation

To install the extension permanently, you have two options:

#### Option 1: Firefox Developer Edition / Nightly
1. Install [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [Firefox Nightly](https://www.mozilla.org/firefox/channel/desktop/#nightly)
2. Set `xpinstall.signatures.required` to `false` in `about:config`
3. Package the extension as a `.xpi` file and install it

#### Option 2: Publish to Firefox Add-ons (AMO)
1. Create an account on [addons.mozilla.org](https://addons.mozilla.org)
2. Package the extension as a `.xpi` file
3. Submit it for review
4. Once approved, it can be installed permanently from the add-ons store

## Browser Compatibility

This extension requires:
- **Firefox 109 or later** (for Manifest V3 support)
- If you're using an older version of Firefox, please update to the latest version

## Differences from Chrome Version

The Firefox version has the following differences:
- Uses `manifest_firefox.json` instead of `manifest.json`
- Background script configuration uses `"scripts"` array instead of `"service_worker"`
- Includes Firefox-specific metadata in `browser_specific_settings`

All core functionality (content blocking, quotes, themes, timers, bedtime mode) works identically to the Chrome version.

## Troubleshooting

### Extension doesn't load
- Make sure you've renamed `manifest_firefox.json` to `manifest.json`
- Check that you're using Firefox 109 or later
- Try refreshing the extension from `about:debugging`

### Extension disappears after closing Firefox
- This is expected behavior for temporary add-ons
- See "For Permanent Installation" section above

### Settings don't save
- Make sure the extension has storage permissions (check in `about:addons`)
- Try reinstalling the extension

## Need Help?

If you encounter any issues:
1. Check the [main README](README.md) for general information
2. Open an issue on GitHub with details about your problem
3. Include your Firefox version and operating system

Enjoy a distraction-free browsing experience! 🎯
