# Project Documentation (fill in the blanks and add screenshots)
**Project title:** Online Portfolio Template Generator
**Description:** A website where users enter their information, save it online, pick 1 of 3 templates, and generate a portfolio they can edit or delete.
**Technologies:** HTML, CSS, JavaScript, Supabase JS library
**Database platform:** Supabase (project name: ________)
**Hosting platform:** ________   **Published URL:** https://________

## Database structure - table `portfolios`
| Column | Type | Meaning |
|---|---|---|
| id | uuid (primary key) | unique ID, made automatically |
| full_name, email | text, required | basic info |
| title, phone, address, about | text | profile details |
| photo | text | profile picture (small image stored as text) |
| education | jsonb list | school, degree, year |
| skills | jsonb list | skill names |
| projects | jsonb list | title, description, link |
| experience | jsonb list | company, role, period, description |
| links | jsonb | facebook, linkedin, github, website |
| template | text | simple / modern / creative |
| created_at | timestamp | date created |

## Screenshots
- Home page / Form / Template selection / Manage page
- Template 1 Simple / Template 2 Modern / Template 3 Creative
- Supabase Table Editor showing saved data
