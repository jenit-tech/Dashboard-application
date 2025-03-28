
# Dashboard Application with MERN Stack

This project is a dashboard application built with the MERN stack (MongoDB, Express, React, Node.js). It features a customizable dashboard with various widgets that can be rearranged, resized, and saved.

## Project Structure

- `server/` - Backend code (Node.js, Express, MongoDB)
- `src/` - Frontend code (React, TypeScript, Tailwind CSS)

## Features

- Toggle between demo mode and real data
- Customizable widgets (add, remove, rearrange)
- Responsive design
- Data visualization with charts
- Backend API with MongoDB database

## Setup

### Frontend

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

The application should be available at http://localhost:5173

### Backend

1. Navigate to the server directory

```bash
cd server
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the server directory with the following:

```
MONGODB_URI=mongodb://localhost:27017/dashboard-app
PORT=5000
NODE_ENV=development
```

4. Make sure MongoDB is running locally, or update the MONGODB_URI to point to your MongoDB instance

5. Start the server

```bash
npm run dev
```

The API should be available at http://localhost:5000

## Usage

- When you first load the application, you will see the dashboard in "Demo Mode" with empty data
- Toggle the "Demo Mode" switch to load real data from the backend
- Click "Customize Widget" to add, remove, or rearrange widgets
- Use the "Share" button to share your dashboard
- Use the "Filter" button to filter data

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Recharts for data visualization
- Tanstack Query for data fetching

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- REST API

## Deployment

### Frontend

Build the frontend:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Backend

For production, update the `.env` file in the server directory:

```
MONGODB_URI=your_production_mongodb_uri
PORT=5000
NODE_ENV=production
```

Start the server:

```bash
npm start
```

## License

This project is licensed under the MIT License.
