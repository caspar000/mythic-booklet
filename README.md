# Mythic Booklet

The session log for our Mythic Bastionland campaign, live at <https://caspar000.github.io/mythic-booklet/>.

It's an Astro site. Content lives in `src/content/` as Markdown: `sessions`, `knights`, `npcs`, `myths`, `holdings`, and `campaign/index.md` for the home page. Every push to `main` rebuilds the site and deploys it to GitHub Pages.

## Editing in the browser

Go to <https://caspar000.github.io/mythic-booklet/admin/>. Saving there commits to `main`, and the site updates about a minute later.

You sign in with a GitHub token that is kept only in your browser:

1. On GitHub, go to Settings → Developer settings → Fine-grained tokens → Generate new token.
2. Under Repository access, pick "Only select repositories" and choose `mythic-booklet`.
3. Under Permissions, set **Contents** to "Read and write".
4. Paste the token on the admin login screen.

Visitors who open `/admin` see only the login screen. A token without write access to this repo can't save anything. To give a player access, add them as a collaborator on the repo; they make their own token.

## Local work

```sh
bun install
bun run dev     # http://localhost:4321/mythic-booklet/
bun run check   # type-check content and pages
```

Rank is worked out from Glory using the thresholds in `src/lib/rank.ts`.
