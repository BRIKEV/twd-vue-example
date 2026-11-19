# Auth + profile flow

Prototype for the user authentication flow (login, register) and a dedicated profile/config screen where the user completes their profile (first name, last name). Styled per `design/DESIGN.md` (Tailwind tokens, light mode, header with backdrop blur, cards `shadow-md`, primary `blue-600` buttons, 8px radius). Adds an active nav state, one of the known gaps in the current app.

## Screens

- `#/login` → real route `/login` — email + password form, error banner on invalid credentials, link to register. If a session already exists, redirects to profile.
- `#/register` → real route `/register` — email + password (min 8 chars), duplicate-email error banner. On success creates session and lands on `/profile` (name filled later, not at registration).
- `#/profile` → real route `/profile` — requires session, else redirects to `/login`. Avatar with initials, editable Nombre / Apellidos, read-only email (from session), inline "Cambios guardados" confirmation, logout link.

## Acceptance criteria (TWD scenarios)

- New user registers and lands on profile showing their email.
- Wrong credentials show the error banner and no session is created.
- Ana logs in, edits first/last name → avatar and displayed name update, "Cambios guardados" appears.
- Profile email field is read-only (disabled).
- Logout returns to login; visiting `/profile` without a session redirects to login.

## Notes for development

- Endpoints are **proposed** (not confirmed in the repo):
  - `POST /api/auth/login { email, password }` → 200 + session · 401 invalid credentials
  - `POST /api/auth/register { email, password }` → 201 + session · 409 duplicate email
  - `PATCH /api/me { firstName, lastName }` → 200 + updated user
  - `POST /api/auth/logout` → 204, clears session
- User data (`firstName`, `lastName`) does not exist yet in the Todos data model; needs a `/api/me` source of truth.
- Error state on forms is new (red banner, `red-600`); success confirmation uses green (`green-600` equivalent) — not yet in the design guide palette.
- Interactive element labels kept as in the app (Email, Contraseña, Nombre, Apellidos, Entrar, Registrarse, Guardar cambios) so tests keep working.

## Open questions

- Should registration collect first/last name in the same form, or leave it as a post-registration completion step (as prototyped)?