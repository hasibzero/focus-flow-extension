# Browser Support

Focus Flow supports both Google Chrome and Mozilla Firefox!

## Quick Start

### Chrome Users
- Use the existing `manifest.json` file
- Follow the Chrome installation instructions in the [README](README.md)

### Firefox Users  
- Use `manifest_firefox.json` (rename it to `manifest.json`)
- Follow the Firefox installation guide in [FIREFOX_INSTALLATION.md](FIREFOX_INSTALLATION.md)

## Technical Details

### Manifest Differences

The main difference between Chrome and Firefox versions is in the manifest file:

| Feature | Chrome (manifest.json) | Firefox (manifest_firefox.json) |
|---------|------------------------|----------------------------------|
| Manifest Version | 3 | 3 |
| Background Script | `"service_worker": "background.js"` | `"scripts": ["background.js"]` |
| Browser Metadata | Not required | `browser_specific_settings` with gecko ID |
| Minimum Version | Chrome 88+ | Firefox 109+ |

### JavaScript Compatibility

All JavaScript files (`background.js`, `content.js`, `settings.js`, `quotes.js`) are **100% compatible** with both browsers without any modifications. This is because:

1. Firefox implements the `chrome.*` API for compatibility
2. Both browsers support the same Web APIs (storage, tabs, etc.)
3. Content scripts work identically on both platforms

### Features Support Matrix

All features work identically on both browsers:

| Feature | Chrome | Firefox |
|---------|--------|---------|
| Hide Facebook Feed | ✅ | ✅ |
| Hide Twitter/X Feed | ✅ | ✅ |
| Hide Instagram Feed | ✅ | ✅ |
| Hide YouTube Feed | ✅ | ✅ |
| Inspirational Quotes | ✅ | ✅ |
| Custom Quotes | ✅ | ✅ |
| Themes (Light/Dark/Glass/Nature) | ✅ | ✅ |
| Timer Mode | ✅ | ✅ |
| Bedtime Mode | ✅ | ✅ |
| Quote Screenshot | ✅ | ✅ |

## Development

### For Contributors

When developing features:

1. **Code once**: All JavaScript works on both browsers
2. **Test on both**: Ensure manifest files stay in sync
3. **Update both manifests**: Keep version numbers and permissions aligned

### Maintaining Both Versions

When updating the extension:

1. Make code changes to `.js`, `.css`, and `.html` files normally
2. Update version in both `manifest.json` and `manifest_firefox.json`
3. Keep permissions and other settings synchronized between manifests
4. Test on both Chrome and Firefox before releasing

## Why Separate Manifests?

Chrome and Firefox have different requirements for background scripts in Manifest V3:

- **Chrome** requires service workers for better performance and security
- **Firefox** (even in MV3) uses traditional background scripts for broader compatibility

Rather than using a complex polyfill or build system, we maintain two simple manifest files. This ensures:
- ✅ Optimal performance on each browser
- ✅ Simple maintenance without build tools
- ✅ Easy debugging and development
- ✅ No runtime overhead

The approach follows the principle: **"Don't overwrite the main file"** as requested in the original issue.
