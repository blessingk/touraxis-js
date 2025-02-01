# Task Management API

This is a simple task management API built with Node.js, Express, and MongoDB. The API provides endpoints for managing users and tasks, along with a scheduled job that checks for overdue tasks.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone git@github.com:blessingk/touraxis-js.git
cd touraxis-js
```

### 2. Install Dependencies
Run the following command to install all the necessary dependencies:

```bash
npm install
```

### 3. Configure MongoDB Connection
Open the src/config/database.ts file and update the database configuration with your MongoDB connection string. For MongoDB, you'll use the mongoose package to connect.

Example connection setup using MongoDB:
```bash
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/task_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
```
If you're using MongoDB Atlas, update the connection string to match your MongoDB Atlas URI.

### 4. Configure Environment Variables
Optionally, create a .env file in the root directory to manage environment-specific configurations (such as database credentials, API keys, etc.).

Here’s an example .env file:
```bash
MONGO_URI=mongodb://localhost:27017/task_management
PORT=3000
```

### 5. Run the Application
Once you've configured the database, you can start the application using:

```bash
npm run start
```
This will start the server on the port specified in the PORT environment variable (default: 3000). The app will be accessible at:

```bash
http://localhost:3000
```

### 6. Testing the API
The API exposes the following routes:

User Routes:
```bash
POST /api/users: Create a new user
GET /api/users: Get all users
GET /api/users/:id: Get a specific user by ID
PUT /api/users/:id: Update a specific user by ID
DELETE /api/users/:id: Update a specific user by ID
```
Task Routes:
```bash
POST /api/users/:userId/tasks: Create a new task for a user
GET /api/users/:userId/tasks: Get all tasks for a user
GET /api/users/:userId/tasks/:taskId: Get a specific task for a user
PUT /api/users/:userId/tasks/:taskId: Update a specific task for a user
DELETE /api/users/:userId/tasks/:taskId: Delete a specific task for a user
```

### 7. Scheduled Job for Overdue Tasks
A scheduled job runs every minute and checks for tasks that are "pending" and past their date_time. If any are found, their status will be updated to "done". This job is managed using node-schedule.

## Project Structure
```src/index.ts:``` Entry point for the Express server

```src/config/database.ts:``` MongoDB connection configuration

```src/models:``` Contains Mongoose models for User and Task

```src/routes:``` Defines Express routes for users and tasks

```src/controllers:``` Contains logic for handling user and task API requests

```src/services/taskService.ts:``` Contains the checkPendingTasks service that updates overdue tasks

### Dependencies
```express:``` Web framework for Node.js

```mongoose:``` MongoDB ODM for interacting with the database

```body-parser:``` Middleware to parse incoming request bodies

```node-schedule:``` Used to schedule the job that checks overdue tasks
