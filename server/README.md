
# Dashboard Application Backend

This is the backend for the Dashboard Application.

## Setup

1. Clone this repository
2. Navigate to the server directory

```bash
cd server
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in the server directory and add the following:

```
MONGODB_URI=mongodb://localhost:27017/dashboard-app
PORT=5000
NODE_ENV=development
```

5. Start the server

```bash
npm run dev
```

## API Endpoints

### Dashboard

- `GET /api/dashboard/data` - Get dashboard data
- `GET /api/dashboard/layout/:userId` - Get dashboard layout for user
- `POST /api/dashboard/layout` - Save dashboard layout

### Widgets

- `GET /api/widgets` - Get available widgets

### Users

- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Port to run the server on
- `NODE_ENV` - Environment (development, production)
