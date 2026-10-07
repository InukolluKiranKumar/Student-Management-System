# Student Management System

A student management app built with React JS, Bootstrap and a json-server REST API.

## Features

- Add, view, edit and delete students (CRUD)
- Search across roll number, name, email and address
- Sorting by any column, ascending or descending, by clicking the column heading
- Pagination with Prev and Next buttons
- Dashboard showing the total number of students and the latest entry

## Tech stack

- Frontend: React JS (Vite) with Bootstrap
- Backend: json-server (data file: studDb.json)
- HTTP client: Axios

## How to run

Requires Node.js. Open two terminal windows in the project folder.

Terminal 1, start the backend on port 3000:

    npm install
    npx json-server --watch studDb.json --port 3000

If json-server complains about --watch, use this instead:

    npx json-server studDb.json --port 3000

Terminal 2, start the frontend:

    npm run dev

Then open the local address shown in the terminal (usually http://localhost:5173).

## Author

Inukollu KiranKumar, Java Full Stack, May 2026 Batch (11 AM)
