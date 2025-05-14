# SEO Planner — Lightweight SEO Tool & Decoupled Auth System

This project serves two parallel purposes:

### ✅ 1. As an Application

A lightweight SEO planner for managing structured keyword data, content objectives, and optimization states — designed to be extended for real-world publishing workflows.

### ✅ 2. As a System Architecture Showcase

A fully decoupled authentication and data management setup that demonstrates how:

- **Next.js (frontend)** initiates and reacts to login/logout
- **OAuth Express (auth gateway)** handles login via Google and manages session state
- **Keystone (API backend)** stores user and content data without owning session logic

🔁 Keystone acts as a **pure headless backend**, entirely free from session or identity responsibility — making it cleanly reusable in any system
that can authenticate externally and call its APIs.

The architecture highlights:
- Stateless Keystone integration
- Centralized session handling via Passport + Express
- Client-driven session hydration and updates via Next.js
- Real-time rehydration of user sessions after preference or profile updates

This repo is both a useful app **and** a reference implementation for modern, decoupled web architecture.
