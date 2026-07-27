# ConvergX Connect — staging site

Static HTML and CSS. **Zero dependencies, no build step.** Open `index.html` or serve the
directory root; every internal link is an absolute production path (`/find-capability/`), so it
needs a server with directory-index resolution, not `file://`.

    python3 -m http.server 8942

## Rules that matter

1. **Never add npm, a bundler, or node_modules.** The authoring copy lives in a OneDrive-synced
   SharePoint library and a dependency tree there takes the whole library down.
2. **No raw hex, rgb() or font-family in any page.** Everything resolves through
   `_system/tokens.css`. That file is the swap point for when ConvergX's real brand lands, so one
   file changes and the whole site re-skins.
3. **Nav and footer are injected by `_system/shell.js`** into `[data-shell]` containers. The
   `<noscript>` nav inside them is the no-JS fallback and is intentional. Do not hand-edit nav
   markup in a page.
4. **Honesty gates.** Phase 1 matching is manual and admin-brokered, never "AI-matched". Every
   module carries its status tag. Push is Android only. App availability in September is
   unconfirmed. **No invented numbers**: the only cleared facts are 10-plus years running and 2026
   being the tenth year. Never name the build partner. No licensing talk.

## Layout

    index.html            home
    <section>/index.html  every page, matching its production URL
    _system/              tokens.css, styles.css, shell.js
    assets/               logo, self-hosted Manrope, generated imagery
    _dev/_reference.html  component reference, not a public page

Authoring copy of record: SharePoint, Customers > ConvergX > ConvergX Connect > Website.
