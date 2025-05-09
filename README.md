# TaskManagement
A simple web app to organize, prioritize, and conquer your daily tasks!

## Features
- Add new tasks
- Set task priorities (High, Medium, Low)
- Smooth UI with modern gradients
- Secure authentication system

## Tech Stack
- React.js (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)
- Tailwind CSS (Styling)

## Architecture & Technical Choices
- **Frontend**: React was chosen for its component-based architecture and efficient rendering. Tailwind CSS was used for styling because of its utility-first approach, which allows for quick development and highly customizable designs.
- **Backend**: Node.js with Express was used for the backend due to its scalability and the ability to handle multiple concurrent requests efficiently. MongoDB is used for the database because it is flexible and easily handles schema-less data.
- **Authentication**: JWT (JSON Web Tokens) is used for secure user authentication. This allows for stateless authentication and is commonly used for API-based applications.

## Database Schema
### Users
- `name`: string (User's full name)
- `email`: string (User's email address)
- `password`: string (User's password, hashed)

### Tasks
- `title`: string (Task title)
- `description`: string (Task description)
- `priority`: string (Task priority: High, Medium, Low)
- `status`: string (Task status: Complete, Incomplete)
- `userId`: ObjectId (Reference to the user who created the task)


- creation date of task is handled by database itself


You can seed the database with test data using the following commands:
```json
// Example user
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "hashedpassword123",
}

// Example task
{
    "title": "Complete project documentation",
    "description": "Write and submit the final documentation for the project",
    "priority": "High",
}


## Installation

1. Open your terminal or command prompt.

2. Clone the repo:
    ```bash
    git clone https://github.com/abhishek-0018/TaskManagement
    ```

3. Navigate into the folders and install dependencies:
    ```bash
    cd Frontend
    npm install or npm i

    cd ../

    cd Backend
    npm install or npm i
    ```

4. Set up your environment variables:
    - Create a `.env` file in the root of the project.
    - Add your MongoDB URI in the `.env` file like this:
      ```bash
      MONGODB_URI=your_mongodb_connection_uri
      ```
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=<any random string>
    ACCESS_TOKEN_EXPIRY=<n>d
    REFRESH_TOKEN_SECRET=<any random string>
    REFRESH_TOKEN_EXPIRY=<n>d

    Here n is number of days you want token to exist

5. Run the app:
    ```bash
    npm run dev for both frontend and backend
    ```

### MongoDB URI
- If you are using a local MongoDB setup, the URI might look like:
  ```bash
  MONGODB_URI=mongodb://localhost:27017/your-database-name

- If you are using MongoDB Atlas, you can get the URI from your Atlas dashboard:
    MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority

