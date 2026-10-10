-- Run this ONCE in Supabase: SQL Editor > New query > paste > Run
create table portfolios (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  title       text,
  email       text not null,
  phone       text,
  address     text,
  about       text,
  photo       text,                       -- profile picture (small image saved as text)
  education   jsonb not null default '[]', -- [{school, degree, year}]
  skills      jsonb not null default '[]', -- ["HTML","CSS"]
  projects    jsonb not null default '[]', -- [{title, description, link}]
  experience  jsonb not null default '[]', -- [{company, role, period, description}]
  links       jsonb not null default '{}', -- {facebook, linkedin, github, website}
  template    text not null default 'simple' check (template in ('simple','modern','creative')),
  created_at  timestamptz not null default now()
);
alter table portfolios enable row level security;
-- No login in this project, so everyone may add / read / edit / delete.
create policy "open access" on portfolios for all using (true) with check (true);
