# Admin Dashboard Implementation Plan (Premium UI + Full CRUD)
Project: CV Website (Next.js App Router + Supabase)
Goal: Replace placeholder dashboard with a premium SaaS-level admin interface for managing CV content.

---

## 0) Targets
- `/` = public CV (no auth required)
- `/login` = admin login only (no signup)
- `/dashboard/*` = admin panel (auth required)

---

## 1) Design System (must match public theme)
- Background: `#050505`
- Panel: `#0B0F0B`
- Primary: `#29FF4F`
- Border: `rgba(41,255,79,0.15)`
- Text: `#EDEDED`
- Muted: `#A3A3A3`
- Hover glow: `shadow-[0_0_30px_rgba(41,255,79,0.12)]`
- Motion: Framer Motion (page fade, modal scale, card hover)

UX rules:
- Spacing: generous (py-10 / gap-6 / max-w-6xl)
- Cards: subtle border + glow on hover
- Inputs: dark, neon focus ring
- Empty states: professional + CTA button
- Optimistic updates + toast notifications

---

## 2) Route & Folder Structure (App Router)
Create these routes:

- `app/login/page.tsx`
- `app/dashboard/layout.tsx`
- `app/dashboard/page.tsx` (Overview)
- `app/dashboard/profile/page.tsx`
- `app/dashboard/experience/page.tsx`
- `app/dashboard/projects/page.tsx`
- `app/dashboard/education/page.tsx`
- `app/dashboard/skills/page.tsx`
- `app/dashboard/settings/page.tsx`

Components:
- `components/dashboard/DashboardSidebar.tsx`
- `components/dashboard/DashboardHeader.tsx`
- `components/dashboard/StatsCard.tsx`
- `components/dashboard/DataList.tsx`
- `components/dashboard/CrudModal.tsx`
- `components/dashboard/EmptyState.tsx`
- `components/ui/*` (buttons, inputs, dialog, toast)

Lib:
- `lib/data/admin.ts` (all Supabase queries in one place)
- `lib/validators/*` (zod schemas)

---

## 3) Access Control
### 3.1 Signup Disabled
- Supabase: disable “Allow new users to sign up”
- Code: remove all signUp UI/logic

### 3.2 Dashboard Protected
Implement middleware/guard:
- If pathname starts with `/dashboard` and no session -> redirect `/login`
- Allow `/` and `/login` without auth

### 3.3 Single Admin
- Only the existing Supabase user can login.
- Optional: hard-check `user.email === ADMIN_EMAIL` from env.
  - `ADMIN_EMAIL=enesxbozkurt@gmail.com` (optional)

---

## 4) Dashboard Layout (app/dashboard/layout.tsx)
### Layout behavior
- Desktop: fixed left sidebar (260px) + header + content
- Mobile: sidebar becomes drawer (hamburger in header)

### Header
- left: hamburger (mobile only), breadcrumbs optional
- right: avatar + email + logout button
- backdrop blur, subtle bottom border

### Sidebar
- nav items with icons
- active item: neon left bar + primary text
- hover: bg-primary/10

Nav items:
- Overview
- Profile
- Experience
- Projects
- Education
- Skills
- Settings

---

## 5) Overview Page (app/dashboard/page.tsx)
### Sections
1) Welcome block (short)
2) Stats grid (4 cards)
   - Last updated
   - CV public/private
   - Projects count
   - Skills count
3) Quick actions
   - Add Experience
   - Add Project

Data:
- Fetch CV + counts (experiences/projects/skills/education)
- If no CV exists: show CTA “Create CV” (but in single-admin scenario create automatically)

---

## 6) Profile Page (app/dashboard/profile/page.tsx)
Form fields:
- full_name
- title
- bio (textarea)
- location
- email (display only or editable)
- linkedin
- github
- website
- avatar upload

Avatar:
- Prefer: upload to Supabase Storage `avatars` bucket
- Store `avatar_url` in `profiles.avatar_url`
- Provide fallback to initial letter if no avatar

UI:
- Two-column on desktop, single on mobile
- Save button primary + toast

---

## 7) CRUD Pages (Experience / Projects / Education / Skills)
General CRUD UX:
- List view: cards in a stack (or grid for projects)
- Top bar: page title + “Add” primary button
- Each item card: summary + edit/delete icon buttons
- Add/Edit uses `CrudModal` (animated)
- Delete requires confirm dialog

### 7.1 Experience
List view: timeline-like cards (admin version still premium)
Fields:
- company, role, start_date, end_date, is_current, summary, order_no
Sort by:
- order_no asc, then start_date desc

Modal:
- Company (input)
- Role (input)
- Start date (date)
- End date (date)
- Current toggle
- Summary (textarea)

### 7.2 Projects
Grid view cards (2 columns desktop, 1 mobile)
Fields:
- name, description, tech_stack, live_url, repo_url, order_no

Modal:
- Name
- Description
- Tech stack (comma separated or tag input)
- Live URL
- Repo URL

### 7.3 Education
Card list (or mini timeline)
Fields:
- school, degree, field, start_date, end_date, order_no

### 7.4 Skills
Category grouping:
- category: Frontend/Backend/Database/Tools/Other
- Each category panel shows badges

Modal:
- name
- category (select)
- level (optional)
- order_no

---

## 8) Settings Page (app/dashboard/settings/page.tsx)
- Public toggle (cvs.is_public)
- Slug edit (cvs.slug)
  - Validate: lowercase, a-z0-9-, unique
- Optional: “Download CV PDF” placeholder
- Danger zone (optional): reset content

---

## 9) Data Layer (lib/data/admin.ts)
Create reusable functions:
- getSessionUser()
- getOrCreateProfile(userId)
- getOrCreateCv(userId)
- updateProfile(payload)
- updateCvSettings(payload)
- listExperiences(cvId)
- upsertExperience(cvId, payload)
- deleteExperience(id)
(and similarly for projects, education, skills)

Rules:
- Use server-side Supabase client for dashboard routes.
- Use RLS; no service role key in frontend.

Optimistic UI:
- In client components, update local state first then call server action.
- On failure, rollback and toast error.

---

## 10) UI Components (Premium)
Must implement:
- `StatsCard`: icon + big value + label + subtle glow
- `DataList`: consistent list spacing
- `CrudModal`: header + form + footer actions, motion scale-in
- `EmptyState`: title + description + CTA

Toasts:
- success “Saved”
- error “Something went wrong”
- delete “Deleted”

Loading:
- skeletons for lists/cards (not spinner only)

---

## 11) Verification / Acceptance Criteria
### Routing
- `/` loads CV without auth
- `/login` shows only login (no signup links)
- `/dashboard` redirects to `/login` if not logged in

### Security
- Only authenticated admin can CRUD
- Public users cannot access dashboard endpoints
- RLS policies enforced

### CRUD
- Experience: create/edit/delete works
- Projects: create/edit/delete works
- Education: create/edit/delete works
- Skills: create/edit/delete works
- Profile: save works
- Settings: public toggle + slug update works

### UI Quality
- Responsive (mobile drawer)
- Consistent theme with public site
- Hover glow + transitions
- Empty states + skeletons
- No “coming soon” text left

---

## 12) Notes
- Keep public site visuals untouched; only add dashboard.
- Reuse existing theme tokens/classes.
- Use Framer Motion lightly (no heavy animations).
- Ensure forms are keyboard accessible and focus states visible.
