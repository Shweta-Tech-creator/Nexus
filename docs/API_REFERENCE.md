# API Reference

## 📚 Interactive Documentation (Swagger)

The backend provides a fully interactive API documentation interface powered by Swagger UI.

**Local URL**: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

### Features
- **Try it out**: Execute API requests directly from the browser.
- **Schemas**: View detailed data models for Users and Tasks.
- **Auth**: easily authenticate with the "Authorize" button.

---

## Authentication
Most endpoints require a JWT token passed in the header:

\`\`\`http
x-auth-token: <your_token_here>
\`\`\`

## Key Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate and receive a token.
- `GET /api/auth/me` - Get current user profile.

### Tasks
- `GET /api/tasks` - List all tasks.
- `POST /api/tasks` - Create a task.
- `PUT /api/tasks/:id` - Update a task.
- `DELETE /api/tasks/:id` - Delete a task.
