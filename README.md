# 🎓 Institute Management System

A comprehensive web application for managing institute operations including courses, students, and messages.

## Architecture

- **Backend**: Spring Boot REST API with H2 database
- **Frontend**: Angular 17 with Angular Material
- **Database**: H2 in-memory database (for development)
- **Containerization**: Docker Compose

## Features

### Dashboard
- Overview of system statistics
- Quick navigation to all modules
- Real-time data display

### Course Management
- Create, read, update, and delete courses
- Course listing with search and filter
- Form validation and error handling

### Student Management
- View student information
- Student listing and details

### Message Management
- View messages from students and visitors
- Expandable message cards for better readability

## Getting Started

### Prerequisites

- **Java 17+** - [Download here](https://adoptium.net/)
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Quick Setup (Recommended)

1. **Run the setup script**:
   ```bash
   setup.bat
   ```

2. **Start the system**:
   ```bash
   start-system.bat
   ```

3. **Access the application**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console

### Manual Setup

1. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Backend**:
   ```bash
   cd backend/backend
   mvnw.cmd spring-boot:run
   ```

3. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```

### Troubleshooting

If you encounter any issues, check the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) file for common solutions.

**Common Issues:**
- **Dependencies not found**: Run `setup.bat` or `npm install` in frontend directory
- **Port conflicts**: Ensure ports 8080 and 4200 are available
- **Java/Node not found**: Verify installations and PATH variables

## API Documentation

### Course Endpoints
- `GET /admin/courses` - Get all courses
- `POST /admin/courses` - Create new course
- `GET /admin/courses/{id}` - Get course by ID
- `PUT /admin/courses/{id}` - Update course
- `DELETE /admin/courses/{id}` - Delete course

### Student Endpoints
- `GET /admin/students` - Get all students
- `GET /admin/students/{id}` - Get student by ID

### Message Endpoints
- `GET /admin/messages` - Get all messages
- `GET /admin/messages/{id}` - Get message by ID

## Technology Stack

### Backend
- Spring Boot 3.x
- Spring Data JPA
- H2 Database
- Maven
- JUnit 5 for testing

### Frontend
- Angular 17
- Angular Material
- TypeScript
- RxJS
- Standalone components
- Lazy loading

## Folder Structure
