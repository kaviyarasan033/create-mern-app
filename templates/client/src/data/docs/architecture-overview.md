# MERN Pro Architecture Overview

Welcome to the modernized MERN Pro documentation. This project follows a professional MVC-inspired structure for scalability and maintainability.

## 📁 Directory Structure

- `src/api/`: Centralized API configuration and request handling.
- `src/assets/`: Global styles, images, and brand assets.
- `src/components/layout/`: Structural elements like Navbar and Sidebar.
- `src/components/ui/`: Reusable interface components (Buttons, Modals).
- `src/hooks/`: Extracted business logic controllers.
- `src/pages/`: Route-level view components.
- `src/redux/`: State management (if implemented).
- `src/services/`: Third-party integrations (Firebase, etc.).
- `src/utils/`: Helper functions and formatting utilities.

## 🚀 Built-in Solutions

### 1. Auto-Upgrade System
Maintain your project health with a single command:
```bash
npm run upgrade-system
```
This script audits dependencies, handles security fixes, and verifies build integrity.

### 2. High-Performance API Layer
Located in `src/api/apiClient.js`, our API layer includes:
- Automatic token injection.
- Re-authentication logic on token expiration.
- Toast notifications for backend errors.

## 🛠 Adding New Features

1. **Create an API Service**: Define your endpoints in `src/api/`.
2. **Implement Business Logic**: Extract logic into a custom hook in `src/hooks/`.
3. **Build the View**: Use UI components from `src/components/ui/` in your page.
4. **Register the Route**: Add the page to `App.jsx`.
