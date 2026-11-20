# Notification settings

Settings page where the user chooses, per notification event, whether they get email and/or push notifications. Channel toggles are per event, with master "All email" / "All push" shortcuts and an explicit save action.

## Screens
- `/settings/notifications` — requires session, else redirect to `/login`. Lists events (Comments, Mentions, Assignments, Weekly digest, Product updates) as cards with an Email and a Push switch each, master toggles row, and a Save changes button with "Preferences saved" / "You have unsaved changes" feedback.

## Acceptance criteria
- Each event shows its current email and push state (Assignments: email on, push off).
- Toggling a single channel flips the switch and shows "You have unsaved changes".
- Saving shows "Preferences saved" and clears the unsaved-changes notice.
- The "All email" master toggle turns email on for every event.

## Notes for development
- Endpoints (proposed): `GET /api/me/notification-preferences` and `PUT /api/me/notification-preferences` with `{ preferences: [{ eventId, email, push }] }` → 200.
- Styling follows design/DESIGN.md (stock Tailwind tokens, light only).
- Open: should a channel be disabled if the user has no push-capable device?

## Open questions
- Push channel availability per device/account (see note above).