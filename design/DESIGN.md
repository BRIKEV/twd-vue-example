# Design — TWD Vue Example

Reference for designers prototyping on top of this app. It documents what the
UI **actually uses today** (extracted from the code), so prototypes start from
the real baseline instead of a guess.

- **Stack:** Vue 3 + Tailwind CSS v4 with the default theme. There is no custom
  theme, no `@theme` overrides and no component library — every value below is
  a stock Tailwind token.
- **Source of truth:** `src/App.vue`, `src/views/*.vue`, `src/index.css`.
- **Mode:** light only. There is no dark mode.

---

## 1. Design tokens

Tailwind v4 defines colors in OKLCH. Hex values are sRGB conversions for design
tools (Figma, Sketch, Penpot); use the OKLCH value when you need an exact match.

### 1.1 Color

#### Neutrals (Tailwind `gray`)

| Token | Hex | OKLCH | Used for |
|---|---|---|---|
| `gray-50` | `#f9fafb` | `oklch(98.5% 0.002 247.839)` | Page background |
| `white` | `#ffffff` | — | Cards, header (at 80% opacity) |
| `gray-200` | `#e5e7eb` | `oklch(92.8% 0.006 264.531)` | Header bottom border |
| `gray-300` | `#d1d5dc` | `oklch(87.2% 0.01 258.338)` | Input borders |
| `gray-500` | `#6a7282` | `oklch(55.1% 0.027 264.364)` | Tertiary text: meta (dates), loading, empty state |
| `gray-600` | `#4a5565` | `oklch(44.6% 0.03 256.802)` | Secondary text: descriptions, subtitles, helper text |
| `gray-700` | `#364153` | `oklch(37.3% 0.034 259.733)` | Form labels |
| `gray-800` | `#1e2939` | `oklch(27.8% 0.033 256.848)` | Body copy on the home page |
| `gray-900` | `#101828` | `oklch(21% 0.034 264.665)` | Primary text and headings |

#### Brand / primary (Tailwind `blue`)

| Token | Hex | OKLCH | Used for |
|---|---|---|---|
| `blue-500` | `#2b7fff` | `oklch(62.3% 0.214 259.815)` | Focus ring on inputs |
| `blue-600` | `#155dfc` | `oklch(54.6% 0.245 262.881)` | Primary button, links, nav hover |
| `blue-700` | `#1447e6` | `oklch(48.8% 0.243 264.376)` | Primary button hover |

#### Danger (Tailwind `red`)

| Token | Hex | OKLCH | Used for |
|---|---|---|---|
| `red-600` | `#e7000b` | `oklch(57.7% 0.245 27.325)` | Destructive button (Delete) |
| `red-700` | `#c10007` | `oklch(50.5% 0.213 27.518)` | Destructive button hover |

There are no success, warning or info colors yet. If a prototype needs them,
pick from the Tailwind palette (`green`, `amber`, `sky`) at the same 600/700
steps so they stay consistent.

#### Semantic aliases (suggested names for prototypes)

| Alias | Maps to |
|---|---|
| `bg/page` | `gray-50` |
| `bg/surface` | `white` |
| `bg/header` | `white` @ 80% + backdrop blur |
| `border/subtle` | `gray-200` |
| `border/input` | `gray-300` |
| `text/primary` | `gray-900` |
| `text/body` | `gray-800` |
| `text/label` | `gray-700` |
| `text/secondary` | `gray-600` |
| `text/muted` | `gray-500` |
| `text/on-accent` | `white` |
| `accent/default` | `blue-600` |
| `accent/hover` | `blue-700` |
| `focus/ring` | `blue-500` |
| `danger/default` | `red-600` |
| `danger/hover` | `red-700` |

### 1.2 Typography

**Font family:** system sans-serif stack (Tailwind `font-sans`), no web fonts:

```
ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
'Helvetica Neue', 'Noto Sans', Arial, sans-serif
```

For prototypes use **Inter** or the OS default (SF Pro on macOS, Segoe UI on
Windows) as a close stand-in.

**Type scale in use:**

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `text-6xl` | 60px / 3.75rem | 60px (1) | Bold 700 | Home hero title |
| `text-4xl` | 36px / 2.25rem | 40px | Bold 700 | Page title ("My Todos") |
| `text-xl` | 20px / 1.25rem | 28px | Semibold 600 | Section titles, app name in header, home subtitle (regular) |
| `text-lg` | 18px / 1.125rem | 28px | Semibold 600 / Regular 400 | Card title / home body copy |
| `text-base` | 16px / 1rem | 24px | Regular 400 / Semibold 600 | Default body, card description, buttons |
| `text-sm` | 14px / 0.875rem | 20px | Medium 500 / Regular 400 | Nav links, form labels, meta text, helper text |

**Weights:** 400 regular, 500 medium, 600 semibold, 700 bold.

### 1.3 Spacing

Base unit is **4px** (Tailwind `--spacing: 0.25rem`). Values in use:

| Step | px | Typical use |
|---|---|---|
| 1 | 4 | Label → input gap, small button vertical padding |
| 2 | 8 | Input vertical padding, card title → description |
| 3 | 12 | Description → meta, Delete button horizontal padding, primary CTA vertical padding |
| 4 | 16 | Page gutter, nav gap, form field gap, list item gap, input horizontal padding |
| 6 | 24 | Card padding, CTA horizontal padding |
| 8 | 32 | Form card → list gap, page title bottom margin, home section gap |
| 10 | 40 | Main content top/bottom padding |
| 12 | 48 | Todos page top/bottom padding |

### 1.4 Radius

| Token | Value | Used for |
|---|---|---|
| `rounded` | 4px | Small buttons (Delete) |
| `rounded-lg` | 8px | Cards, inputs, primary buttons |

### 1.5 Elevation

| Token | Value | Used for |
|---|---|---|
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)` | Cards at rest |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)` | Todo card on hover |

The header uses no shadow: a 1px `gray-200` bottom border plus `backdrop-blur`
(8px) over a translucent white background.

### 1.6 Motion

| Token | Value |
|---|---|
| Duration | 150ms default; 200ms on buttons and cards in the Todos view |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |

Only color, shadow and focus-ring changes are animated. No entrance or page
transitions.

### 1.7 Layout

| Token | Value | Used for |
|---|---|---|
| `max-w-6xl` | 1152px | Header and main content container |
| `max-w-2xl` | 672px | Home hero and Todos column |
| Page gutter | 16px (→ 24px at `sm`, 32px at `lg` on Todos) | Horizontal padding |
| Header | sticky, `z-10`, 16px vertical padding | |

**Breakpoints** (Tailwind defaults): `sm` 640px · `md` 768px · `lg` 1024px ·
`xl` 1280px. The layout is single-column at every size; breakpoints only change
padding.

---

## 2. Components

### 2.1 App header

- Full width, sticky, `white` at 80% opacity with backdrop blur, 1px `gray-200`
  bottom border.
- Inner container `max-w-6xl`, centered, 16px padding, space-between.
- Left: app name "TWD Vue Example" — `text-xl` semibold `gray-900`.
- Right: nav links Home · About · Todos — `text-sm` medium, 16px gap, hover
  `blue-600`. **There is no active-route state today** (a gap worth designing).

### 2.2 Buttons

| Variant | Background | Hover | Text | Padding (V × H) | Radius | Notes |
|---|---|---|---|---|---|---|
| Primary (large) | `blue-600` | `blue-700` | white, semibold | 12 × 24 | 8px | Min width 200px (home counter) |
| Primary (block) | `blue-600` | `blue-700` | white, semibold | 8 × 16 | 8px | Full width (form submit) |
| Danger (small) | `red-600` | `red-700` | white, semibold | 4 × 12 | 4px | Inline action in cards |

Not defined yet: secondary/ghost button, disabled state, loading state, focus
ring for buttons (only the browser default).

### 2.3 Form fields

- Label: `text-sm` medium `gray-700`, 4px above the field.
- Input / textarea / date: full width, 8 × 16 padding, 1px `gray-300` border,
  8px radius, white background, `text-base`.
- Focus: border becomes transparent, 2px `blue-500` ring, no outline.
- Placeholder: browser default gray.
- Textarea: 3 rows.
- Fields stacked with 16px gap.

Not defined yet: error state, helper text, required indicator, disabled state.
Validation today is silent — the form just doesn't submit if a field is empty.

### 2.4 Card

- White, 8px radius, `shadow-md`, 24px padding.
- Interactive (todo item): `shadow-lg` on hover, 200ms transition.
- Todo item anatomy:
  1. Row: title (`text-lg` semibold `gray-900`) left, Delete button right, top-aligned.
  2. Description (`text-base` `gray-600`), 8px below the row.
  3. Meta line "Date: YYYY-MM-DD" (`text-sm` `gray-500`), 12px below.

### 2.5 Feedback states

| State | Current treatment |
|---|---|
| Loading | Centered text "Loading todos..." in `gray-500`. No spinner/skeleton. |
| Empty | Card with centered text "No todos yet. Create one above!" in `gray-500`. |
| Error | None — errors only go to the console. |

### 2.6 Link

Inline text link: `blue-600`, underlined, medium weight. No distinct hover or
visited style.

---

## 3. Screens

| Route | Screen | Content |
|---|---|---|
| `/` | Home | Centered hero: "Welcome to TWD" (`text-6xl`), subtitle, link to the docs, primary counter button "Count is N", helper text. |
| `/about` | About | Single unstyled `h1` "This is an about page". Placeholder — free to design. |
| `/todos` | Todos | Page title "My Todos", "Create a New Todo" form card (Title, Description, Date, Create Todo), then "Todo Items" list of cards with Delete. |

### Data model (Todos)

```ts
{ id: string; title: string; description: string; date: string /* YYYY-MM-DD */ }
```

Use realistic lengths in prototypes: titles are short (2–6 words), descriptions
one or two sentences.

---

## 4. Known gaps and inconsistencies

Things a redesign can fix — none are intentional:

- No active nav state, no dark mode, no focus style on buttons.
- No error, success or disabled states anywhere.
- Home and Todos views each repeat `min-h-screen` and `bg-gray-50`, so the page
  scrolls past the header even when content is short.
- About page is unstyled.
- Delete has no confirmation and no undo.
- Date is shown raw (`2025-01-15`), not formatted.
- Browser tab title is the Vite default ("Vite App").
- `HelloWorld.vue`, `WelcomeItem.vue` and `components/icons/*` are unused
  scaffolding from create-vue; ignore them.

---

## 5. Constraints for implementable prototypes

- **Stay within Tailwind tokens.** Anything you design should map to a Tailwind
  class (or a token added to `@theme` in `src/index.css`). Avoid arbitrary
  one-off values.
- **Keep the visible text of interactive elements meaningful.** The app's TWD
  tests find elements by role and accessible name (e.g. the "Create Todo" and
  "Delete" buttons, the "Title", "Description" and "Date" labels). Renaming
  them is fine, but flag it so tests are updated.
- **Keep labels attached to fields.** Every input needs a visible label (or an
  accessible name) — tests and accessibility both depend on it.
- **Contrast:** text should meet WCAG AA (4.5:1 for body text). `gray-500` on
  `white` is about 4.8:1, the lowest contrast in use; don't go lighter for text.

---

## 6. Tokens as JSON

W3C Design Tokens format, ready to import into Tokens Studio or similar tools.

```json
{
  "color": {
    "gray": {
      "50":  { "$type": "color", "$value": "#f9fafb" },
      "200": { "$type": "color", "$value": "#e5e7eb" },
      "300": { "$type": "color", "$value": "#d1d5dc" },
      "500": { "$type": "color", "$value": "#6a7282" },
      "600": { "$type": "color", "$value": "#4a5565" },
      "700": { "$type": "color", "$value": "#364153" },
      "800": { "$type": "color", "$value": "#1e2939" },
      "900": { "$type": "color", "$value": "#101828" }
    },
    "blue": {
      "500": { "$type": "color", "$value": "#2b7fff" },
      "600": { "$type": "color", "$value": "#155dfc" },
      "700": { "$type": "color", "$value": "#1447e6" }
    },
    "red": {
      "600": { "$type": "color", "$value": "#e7000b" },
      "700": { "$type": "color", "$value": "#c10007" }
    },
    "white": { "$type": "color", "$value": "#ffffff" }
  },
  "font": {
    "family": { "sans": { "$type": "fontFamily", "$value": ["ui-sans-serif", "system-ui", "sans-serif"] } },
    "weight": {
      "regular":  { "$type": "fontWeight", "$value": 400 },
      "medium":   { "$type": "fontWeight", "$value": 500 },
      "semibold": { "$type": "fontWeight", "$value": 600 },
      "bold":     { "$type": "fontWeight", "$value": 700 }
    },
    "size": {
      "sm":   { "$type": "dimension", "$value": "14px" },
      "base": { "$type": "dimension", "$value": "16px" },
      "lg":   { "$type": "dimension", "$value": "18px" },
      "xl":   { "$type": "dimension", "$value": "20px" },
      "4xl":  { "$type": "dimension", "$value": "36px" },
      "6xl":  { "$type": "dimension", "$value": "60px" }
    }
  },
  "spacing": {
    "1":  { "$type": "dimension", "$value": "4px" },
    "2":  { "$type": "dimension", "$value": "8px" },
    "3":  { "$type": "dimension", "$value": "12px" },
    "4":  { "$type": "dimension", "$value": "16px" },
    "6":  { "$type": "dimension", "$value": "24px" },
    "8":  { "$type": "dimension", "$value": "32px" },
    "10": { "$type": "dimension", "$value": "40px" },
    "12": { "$type": "dimension", "$value": "48px" }
  },
  "radius": {
    "sm": { "$type": "dimension", "$value": "4px" },
    "lg": { "$type": "dimension", "$value": "8px" }
  },
  "shadow": {
    "md": { "$type": "shadow", "$value": [
      { "offsetX": "0px", "offsetY": "4px", "blur": "6px", "spread": "-1px", "color": "#0000001a" },
      { "offsetX": "0px", "offsetY": "2px", "blur": "4px", "spread": "-2px", "color": "#0000001a" }
    ] },
    "lg": { "$type": "shadow", "$value": [
      { "offsetX": "0px", "offsetY": "10px", "blur": "15px", "spread": "-3px", "color": "#0000001a" },
      { "offsetX": "0px", "offsetY": "4px", "blur": "6px", "spread": "-4px", "color": "#0000001a" }
    ] }
  },
  "motion": {
    "duration": {
      "fast":   { "$type": "duration", "$value": "150ms" },
      "normal": { "$type": "duration", "$value": "200ms" }
    },
    "easing": { "default": { "$type": "cubicBezier", "$value": [0.4, 0, 0.2, 1] } }
  }
}
```
