# DEPLOY: convergx.mode40.com

**This describes what IS RUNNING, as of 2026-07-27. It replaces an earlier version describing a
Caddy plan on 51.79.81.215 that was never built. If a copy mentions an A record or a Caddy vhost,
that copy is stale.**

## Live

    http://convergx.mode40.com

| Item | Value |
|---|---|
| Host | **GitHub Pages** |
| Repo | `chipmartens/convergx-connect-staging`, **PUBLIC**, branch `main`, source path `/` |
| DNS | GoDaddy, `CNAME convergx -> chipmartens.github.io`, ttl 600 |
| Document root | repo root. `index.html` at top level, sections at `<section>/index.html` |
| Auth | **NONE.** See the warning below |
| Indexing | `robots.txt` disallow plus `noindex, nofollow, noarchive` on all 30 pages |

Same pattern as `apparel.mode40.com` (brain memory `project_team_apparel_order`).

## `.nojekyll` IS LOAD-BEARING. DO NOT DELETE IT.

GitHub Pages runs Jekyll, which **excludes every path beginning with an underscore**. Without
`.nojekyll` at the repo root, `/_system/tokens.css`, `/_system/styles.css` and `/_system/shell.js`
return 404 and the site renders as unstyled HTML. `/assets/` keeps working, which makes it look
like a CSS bug rather than a hosting one. This cost a round trip. First thing to check if styles
vanish.

## HTTPS

Check state:

    gh api repos/chipmartens/convergx-connect-staging/pages --jq '.https_certificate.state'

Once it reads `approved`:

    gh api -X PUT repos/chipmartens/convergx-connect-staging/pages -f cname=convergx.mode40.com -F https_enforced=true

**If it sits at `none` or `authorization_pending` for hours**, use the unstick procedure from the
`project_team_apparel_order` memory, documented because it happened there too:

1. Delete the `CNAME` file, commit, push
2. Wait about 60 seconds
3. Re-add `CNAME`, commit, push
4. Re-assert via API, because removing the file also clears the Pages **config**:
   `gh api -X PUT .../pages -f cname=convergx.mode40.com`

**The site 404s during that window.** Do not run it while someone is looking at the site.

## Updating

    ./scripts/convergx-site-push.sh "what changed"

Mirrors from the SharePoint authoring copy into `~/Sites/convergx-connect-staging` and pushes.
**Pulls first**, because Jarvis has write access. Never put `.git` in the SharePoint folder;
OneDrive will thrash it.

## THE WARNING

**This site is fully public. The repo is public. There is no password.**

Chip asked for password protection. GitHub Pages cannot do it: static files, no request-time auth,
and any client-side gate is bypassable by viewing source. Making the repo public was the trade that
got it live.

Acceptable right now **only because the content is enforced clean**: zero cleared proof points, no
customer names, no numbers beyond "10-plus years running" and 2026 as the tenth year, build partner
never named.

**Before anything sensitive lands, or before this goes to Kim Van Vliet's network, it needs a real
boundary.** Two known-good routes:

- **Cloudflare Access.** Free, per-identity, revocable, audit log, no shared password. Needs a
  Cloudflare account Chip does not yet have. About fifteen minutes once he does.
- **Matthew's box.** Real basic auth behind Caddy on `51.79.81.215`. **Jarvis cannot do this**: it
  executes in a container (`583ea7d0334d`) with no shell on the host owning Caddy. It can observe
  that box, not act on it. Needs a human with shell access.

Jarvis's read, which was right: basic auth is a single shared secret, no per-person identity, no
revocation, no audit. A bridge, not a destination.
