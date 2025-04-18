# Todo App with Daily Task Check-ins

## Project Overview
This is a Todo App built with React, TypeScript, and Tailwind CSS for the frontend, and Node.js with SQLite for the backend. The app allows users to:
- Add daily tasks to track for a specific day.
- Provide a description for each task.
- Check in on tasks daily to mark progress or completion.
- View progress for the day.

## Features
- **Task Management**: Add, edit, delete, and toggle task completion.
- **Daily Check-ins**: Mark tasks as complete or in progress.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **SQLite Database**: Persistent storage for tasks.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite

## Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the app.

## API Endpoints
- GET /tasks: Fetch all tasks.
- POST /tasks: Add a new task.
- PUT /tasks/:id: Update a task.
- DELETE /tasks/:id: Delete a task.
- PATCH /tasks/:id/toggle: Toggle task completion.

## Future enhancements may include:
- User authentication and authorization.
- Task categorization and filtering.
- Integration with third-party APIs for reminders and notifications.
- Improved UI/UX with animations and transitions.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.