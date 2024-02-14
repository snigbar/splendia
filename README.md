

# Splendia Hotel Booking App

### [Live Link](https://splendia.onrender.com/)  - Please wait for a while for the site to load.... (free tier )

This repository contains the source code for the Splendia Hotel Booking App. The project is organized into three main folders: `frontend`, `backend`, and `e2e` (end-to-end tests). Below is an overview of each component along with the technologies used.

## Features

- **Registration and Login:**
  - Users can register and log in to their accounts securely.

- **Form Handling with React Hook Form:**
  - Utilizes React Hook Form for efficient and flexible form handling.

- **API Handling with React Query:**
  - React Query is used for fetching, caching, and updating API data seamlessly.

- **Seamless Routing and Toast Messages:**
  - Integrated routing for smooth navigation and toast messages for informative feedback.

- **Hotel Management:**
  - Add hotels with images.
  - Edit existing hotels.
  - View your added hotels.

- **Search and Filter Hotels:**
  - Search and filter hotels using the power of Context API.

- **Booking Hotels with Stripe:**
  - Securely book hotels using Stripe for payment processing.

- **Session Storage for Search Data:**
  - Save search data to session storage for a seamless user experience.

- **View Your Bookings:**
  - Users can view their booked hotels.

- **Responsive and Beautiful UI Design:**
  - Completely responsive design with a beautiful user interface.


## Frontend

The `frontend` folder contains the client-side code of the Splendia Hotel Booking App.

### Technologies Used:
- React: A JavaScript library for building user interfaces.
- React Router: Declarative routing for React applications.
- React Hook Form: Performant, flexible, and extensible forms with easy-to-use validation.
- React Query: Hooks for fetching, caching, and updating asynchronous data.
- Stripe Elements: Stripe's pre-built UI components for card inputs.

### Dependencies:
- `@stripe/react-stripe-js`: Stripe React components for handling payments.
- `react-datepicker`: Datepicker component for selecting dates.
- `swiper`: Modern touch slider.
- `tailwind-merge`: Utility to merge Tailwind CSS classes.

## Backend

The `backend` folder contains the server-side code of the Splendia Hotel Booking App.

### Technologies Used:
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- MongoDB with Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
- JSON Web Tokens (JWT): Securely transmit information between parties.
- Stripe: Payment processing platform for online businesses.
- Cloudinary: Media management platform for image and video uploads.

### Dependencies:
- `bcrypt`: Library to help you hash passwords.
- `dotenv`: Module to load environment variables from a `.env` file.
- `jsonwebtoken`: Implementation of JSON Web Tokens.
- `mongoose`: MongoDB object modeling for Node.js.
- `stripe`: Official Stripe API library.
- `zod`: TypeScript-first schema declaration and validation library.

## End-to-End Tests

The `e2e` folder contains end-to-end tests for the Splendia Hotel Booking App.

### Technologies Used:
- Playwright Test: Framework for end-to-end testing web apps.

### Dependencies:
- `@playwright/test`: End-to-end testing library for Playwright.

# Splendia Hotel Booking App

## How to Clone and Install

To clone and install the Splendia Hotel Booking App, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```
**Navigate to the Project Directory:**
```
cd splendia-hotel-booking-app
```
**Install Dependencies for Each Component:**
***Frontend***
```
cd frontend
npm install
```
***Backend***
```
cd backend
npm install
```
******
```
cd e2e
npm install
```
**Set Environment Variables for Backend:**
- Create a .env file in the backend directory and set the required variables (e.g., MongoDB connection string, Stripe API keys).
- Create .env.local file in root of Frontend folder and stripe key and your backend url

**Start the Development Servers:**

***Frontend***
```
cd frontend
npm run dev
```
***Backend***
```
cd backend
npm run start
```
******
```
You'll be able to run end to end test from vscode test panel
(Use VS code playwright extension )
```


