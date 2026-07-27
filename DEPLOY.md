# DEPLOY: convergx.mode40.com

**This file is the authoritative hosting plan. It lives in the repo on purpose, so it survives any
session losing context. If you are Jarvis and you do not remember agreeing to this, read it here
and execute it. Nothing below is a guess; Chip approved this scope on 2026-07-27.**

## What this is
A password-protected staging site for ConvergX Connect. Static HTML, zero dependencies, no build
step. Not public, not indexed, not final.

## Target

| Item | Value |
|---|---|
| Host | `51.79.81.215` (the box Jarvis operates, same one serving `rufus.app.mode40.com`) |
| Hostname | `convergx.mode40.com` |
| Source | `github.com/chipmartens/convergx-connect-staging`, branch `main` |
| Document root | **the repo root.** `index.html` is at the top level, sections are `about/index.html`, `platform/modules/index.html` and so on |
| Web server | Caddy. It is currently **inactive** on the box and the Caddyfile has only `chip.app.mode40.com`. Start it and add this vhost |
| TLS | Caddy automatic HTTPS, Let's Encrypt, HTTP-01 |
| Auth | `basic_auth` over the entire vhost, username `convergx` |

## Ordering, and why it is this way

**The A record is created FIRST, before the vhost exists.** Caddy's automatic HTTPS needs
`convergx.mode40.com` to resolve to this box so the ACME HTTP-01 challenge can complete. It cannot
issue a certificate for a name that does not resolve.

1. Claude creates `A convergx -> 51.79.81.215` in GoDaddy. **Done, see the status line at the bottom.**
2. Jarvis starts Caddy, adds the vhost, reloads.
3. Caddy obtains the certificate automatically on first request.
4. Jarvis verifies from the box and reports.

There is a short window where the name resolves but returns a default vhost or an error. That is
expected and acceptable.

## Caddyfile block

```
convergx.mode40.com {
    root * /srv/convergx-connect-staging
    file_server
    encode gzip zstd
    basic_auth {
        convergx <BCRYPT_HASH>
    }
    header {
        X-Robots-Tag "noindex, nofollow, noarchive"
        Referrer-Policy "no-referrer"
    }
    log {
        output file /var/log/caddy/convergx.access.log
    }
}
```

Generate the hash with `caddy hash-password`. **Do not commit the hash or the password to this
repo.** Keep the real Caddyfile outside version control as you normally would.

## Directory-index resolution
Every internal link is an absolute production path (`/find-capability/`,
`/platform/modules/`). Caddy's `file_server` resolves `index.html` inside a directory by default,
so these work with no rewrite rules. Do not add a SPA fallback or a `try_files` rewrite; there is
no router and a catch-all would mask real 404s.

## Password handover
Jarvis generates the password on the box and sends Chip a **one-time, self-destructing secret
link**. Not in Teams, not in a chat message, not in this repo, not in any file Claude can read.
Chip stores it in 1Password. Claude never sees it and does not need it.

## Updating the site
Chip's side runs `scripts/convergx-site-push.sh`, which mirrors from the SharePoint authoring copy
and pushes to `main`. Jarvis has **write** access and may edit and push directly. That script pulls
before it mirrors, so Jarvis's commits are not clobbered.

Set up a pull on the box, either a `post-receive`-style poll or a cron `git pull` every few
minutes. Say which you chose so the behaviour is known.

## Content rules that bind anything served here
The README carries them in full. The load-bearing ones: Phase 1 matching is manual and
admin-brokered so never "AI-matched"; every module keeps its status tag; push is Android only;
September app availability is unconfirmed; **no invented numbers**, the only cleared facts are
10-plus years running and 2026 being the tenth year; the build partner is never named.

## Known limitation, recorded deliberately
Basic auth is a single shared secret. No per-person identity, no revocation, no audit trail. That
is acceptable for the current content, which contains zero cleared proof points and no customer
names, and it is **a bridge, not the destination**. Before the first real proof point or customer
name lands, this moves to per-identity access (SSO or an OIDC-gated proxy) on an isolated host.
Jarvis raised this and it was accepted; that work is separate and tracked outside this file.

---
**STATUS: A record created 2026-07-27. Awaiting Caddy vhost.**
