# SEO Planner — Structured SEO Workflow with Versioned Content & Decoupled Auth

This project serves two complementary purposes:

---

### ✅ 1. As an Application

A lightweight SEO planner for managing:

- Content metadata (title, description, keywords)
- AI-assisted metadata generation (via OpenAI)
- Versioned content history with rollback capability

Key features include:

- **Page records** represent current live metadata for URLs.
- **PageVersion records** store a rolling history (max 3) of past content versions, created automatically on meaningful edits.
- **AI integration** enables smart metadata suggestions, which can be reviewed and optionally applied.

---

### ✅ 2. As a System Architecture Showcase

This is also a reference implementation of a modern, cleanly decoupled web architecture:

- **Next.js (frontend)** — manages user interaction, form state, and session hydration.
- **OAuth Express (auth gateway)** — handles login (Google OAuth), token issuance, and session lifecycle.
- **KeystoneJS (API backend)** — stores business data with no session responsibility.

🔁 Keystone is treated as a **pure headless backend**. Session logic is fully externalized — Keystone only trusts verified requests from the frontend or backend services.

The architecture highlights:

- Stateless Keystone with strong access control
- Auth routing via Passport.js in a dedicated Express service
- Unified session state in frontend, hydrated via JWTs
- Scoped API interaction per business logic (e.g. augment metadata, fetch versions, restore content)

---

## 🧠 Content Versioning Strategy

The system implements a smart and practical versioning model:

- `Page` holds the current content for rendering.
- `PageVersion` records historical states, capped to 3 per page.
- On any update, if content is changed, a new version is created and the oldest version is auto-deleted.
- Rollback is supported by copying a version’s content back into the parent `Page`.

This balances editorial control with data hygiene — no sprawl, no sync bugs.

---

## 🛠️ Environment Variables

The OAuth gateway (`oauth-express/`) requires a JWT secret:

```env
JWT_SECRET=your-super-secret-key
```

If this is missing, the gateway will refuse to start. You can generate a secure random value using a tool like:
```openssl rand -hex 32```