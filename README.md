# Bookify - Firebase Powered Book Store

Bookify is a React-based web application that allows users to list books for sale, browse available books, view detailed information, and place orders. It utilizes Firebase for authentication and database management.

## Features

-   **User Authentication**: Sign up and Login using Email/Password or Google Sign-In.
-   **List Books**: Authenticated users can list books with details like Name, ISBN, Price, and Cover Image.
-   **Browse Books**: View a collection of all listed books on the Home page.
-   **Book Details**: Click on any book to view full details including the seller's information.
-   **Order System**: Users can place orders for books.
-   **Order History**: Sellers can view orders received for their listed books.
-   **Responsive UI**: Built with React Bootstrap for a clean and mobile-friendly interface.

## Tech Stack

-   **Frontend**: React (Vite)
-   **Styling**: React Bootstrap, Bootstrap CSS
-   **Backend / Database**: Firebase Firestore
-   **Authentication**: Firebase Config (Email/Password, Google)
-   **Routing**: React Router DOM

## Project Structure

```
src/
├── components/
│   ├── navbar.jsx       # Navigation bar
│   └── card.jsx         # Book display card
├── context/
│   └── firebase.jsx     # Firebase configuration and context provider
├── pages/
│   ├── home.jsx         # Main page listing all books
│   ├── login.jsx        # User login page
│   ├── register.jsx     # User registration page
│   ├── listings.jsx     # Page to add new book listings
│   ├── detail.jsx       # Book detail and order page
│   └── orders.jsx       # Page to view received orders
├── App.jsx              # Main application component with routing
└── main.jsx             # Entry point
```

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Open in Browser**
    Navigate to `http://localhost:5173`
