# PortfolioMaker - beginner version
HTML + CSS + JavaScript + Supabase (online database). No server or terminal needed.

## Setup
1. Create a free project at supabase.com.
2. SQL Editor > New query > paste `supabase.sql` > Run.
3. Project Settings > API: copy the Project URL and the **anon public** key into `js/config.js`.
   (Never share the database password or the service_role key.)
4. VS Code: install the **Live Server** extension, right-click `index.html` > Open with Live Server.
5. Check Supabase > Table Editor > portfolios to see your saved data.

## Publish
Drag the whole folder to app.netlify.com/drop (or use GitHub Pages / Vercel) and submit the link.

## Files (one job each)
| File | Job |
|---|---|
| index.html | Home page |
| create.html, js/create.js | Information form (add and edit) |
| templates.html, js/choose.js | Choose 1 of 3 templates |
| view.html, js/view.js | Generated portfolio, edit, delete |
| manage.html, js/manage.js | List of portfolios |
| js/template1.js / template2.js / template3.js | The 3 designs |
| js/helpers.js | Small shared functions |
| js/db.js | All Supabase code (add, get, update, delete) |
| js/config.js | Your Supabase URL and key |
| supabase.sql | Creates the database table |
