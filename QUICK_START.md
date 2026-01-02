# Quick Start Guide

Choose your browser and follow the instructions:

## 🟦 Chrome Users

**You're all set!** Just follow the existing installation instructions:

1. Clone or download this repository
2. Open `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `focus-flow-extension` folder

✅ Uses `manifest.json` (already configured for Chrome)

## 🟧 Firefox Users

**One extra step needed:**

1. Clone or download this repository
2. Navigate to the `focus-flow-extension` folder
3. **Rename** `manifest_firefox.json` to `manifest.json`
   - You may want to backup the original `manifest.json` first
4. Open Firefox and go to `about:debugging#/runtime/this-firefox`
5. Click "Load Temporary Add-on..."
6. Select the `manifest.json` file

✅ Uses `manifest_firefox.json` → `manifest.json`

⚠️ **Note**: The extension will be removed when Firefox closes. See [FIREFOX_INSTALLATION.md](FIREFOX_INSTALLATION.md) for permanent installation options.

## 📚 Need More Help?

- **Firefox users**: See [FIREFOX_INSTALLATION.md](FIREFOX_INSTALLATION.md)
- **Technical details**: See [BROWSER_SUPPORT.md](BROWSER_SUPPORT.md)
- **Full documentation**: See [README.md](README.md)

## ✨ Features (Both Browsers)

All features work identically on Chrome and Firefox:
- ✅ Block Facebook, Twitter/X, Instagram, YouTube feeds
- ✅ Inspirational quotes with custom themes
- ✅ Timer mode for temporary access
- ✅ Bedtime mode (grayscale filter)
- ✅ Custom quotes
- ✅ Quote screenshots

Enjoy a distraction-free browsing experience! 🎯
