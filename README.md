# Transactify

**Author**: Shrey Tarsaria

Transactify is a comprehensive web application that combines a powerful backend API with a modern React frontend. Designed for managing user accounts, balances, and transfers, Transactify provides secure and efficient functionality for financial applications. Built with Node.js, MongoDB, React, and Tailwind CSS, it offers a streamlined, responsive user interface and a robust backend solution.

## Features

- **User Management**: Create, authenticate, and update user information with ease.
- **Balance Tracking**: Track user balances accurately with secure account models.
- **Funds Transfer**: Reliable transaction handling with error checking and rollback mechanisms.
- **Authentication**: Secure user authentication with JWT.
- **Flexible Search**: Powerful search endpoint for bulk user lookups and filters.
- **Responsive UI**: User-friendly, responsive design using React and Tailwind CSS.

## Tech Stack

- **Backend**:
  - **Node.js & Express** - Fast and lightweight server framework
  - **MongoDB & Mongoose** - Flexible and scalable database solution
  - **JWT (JSON Web Tokens)** - Secure token-based authentication
  - **Zod** - Input validation for robust API error handling
- **Frontend**:
  - **React** - Component-based library for building the user interface
  - **Tailwind CSS** - Utility-first CSS framework for responsive, custom styling
 
 ## API Endpoints

### User Endpoints
- **Sign Up**: `POST /api/v1/user/signup`
- **Sign In**: `POST /api/v1/user/signin`
- **Update User**: `PUT /api/v1/user/`
- **Bulk User Search**: `GET /api/v1/user/bulk`
- **Get Username by ID**: `GET /api/v1/user/getUsername`

### Account Endpoints
- **Check Balance**: `GET /api/v1/account/balance`
- **Transfer Funds**: `POST /api/v1/account/transfer`

## Project Structure

```plaintext
Transactify/
│
├── backend/                       # Backend API code
│   ├── index.js                   # Entry point of the application
│   ├── db.js                      # Database schemas and connection setup
│   ├── routes/                    # Route handlers for user and account functionality
│   │   ├── index.js               # Root router
│   │   ├── user.js                # User-related endpoints
│   │   ├── account.js             # Account-related endpoints
│   │   └── middleware.js          # Authentication middleware
│   └── config.js                  # Configuration for environment variables
│
├── frontend/                      # Frontend React application (using JSX)
│   ├── public/                    # Static files (e.g., index.html)
│   ├── src/                       # Source files
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Appbar.jsx         # Top navigation bar
│   │   │   ├── Balance.jsx        # Component to display balance
│   │   │   ├── BottomWarning.jsx  # Warning message at the bottom
│   │   │   ├── Button.jsx         # Reusable button component
│   │   │   ├── Heading.jsx        # Main heading component
│   │   │   ├── InputBox.jsx       # Input fields for forms
│   │   │   ├── SubHeading.jsx     # Subheading component
│   │   │   └── Users.jsx          # Component to display user list
│   │   │
│   │   ├── pages/                 # Main pages for different views
│   │   │   ├── Signup.jsx         # Sign-up page for new users
│   │   │   ├── Signin.jsx         # Sign-in page for returning users
│   │   │   ├── Dashboard.jsx      # User dashboard for managing accounts
│   │   │   └── Send.jsx           # Page for transferring funds
│   │   │
│   │   ├── App.jsx                # Main application file with routing setup
│   │   ├── index.jsx              # Entry point of the React application
│   │   └── styles.css             # Custom styling (includes Tailwind CSS integration)
│
├── tailwind.config.js             # Tailwind CSS configuration file
├── package.json                   # Dependencies and scripts for both frontend and backend
└── README.md                      # Project documentation
