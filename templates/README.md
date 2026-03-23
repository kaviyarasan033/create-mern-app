# Your ProApp MVC Project 🚀

This project was generated with `create-react-proapp`.

## 📂 Project Structure

- `server/controllers` - Request logic.
- `server/models`      - Database schemas.
- `server/routes`      - API endpoints.
- `server/middleware`  - Auth & validation.
- `server/database`    - Migrations.
- `client/src`         - React frontend with AuthContext.

## 🛠️ CLI Commands (ProApp CLI)

We've included a custom CLI tool for fast development:

- **Create Controller**: `node proapp make:controller MyController`
- **Create Model**: `node proapp make:model MyModel`
- **Create Middleware**: `node proapp make:middleware MyMiddleware`
- **Automated Install**: Handled by the generator!

## 🚀 Getting Started

1. **Setup Env**: Copy `server/.env.example` to `server/.env` and add your keys.
2. **Start Backend**: `cd server && npm run dev`
3. **Start Frontend**: `cd client && npm start`

## ✨ Advanced Features Included
- **JWT Auth**: Full registration and login flow.
- **Global Toast**: Centered notifications ready.
- **Docker Support**: `docker-compose up` to run everything.
- **Logger**: Winston logging in production.
- **Health Checks**: API monitoring middleware.

Happy coding! 🎊
