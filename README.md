<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>BookMySpot - Online Seat Booking System</h1>
    <p>
        BookMySpot is an online seat booking system designed to make the process of reserving seats at various venues quick and convenient. Whether it's for movies, concerts, or events, BookMySpot allows users to easily browse available seats, select their preferred seats, and make secure bookings.
    </p>
    <h2>Features</h2>
    <ul>
        <li>User Registration and Login: Users can create an account on BookMySpot by providing their details and log in securely to access the booking features.</li>
        <li>Seat Selection and Booking: Users can view the seating layout for a venue, select available seats, and proceed to book them.</li>
        <li>Seat Cancellation: Users can cancel their seat bookings if they are unable to attend the event.</li>
        <li>Unique PnrNumber: Each booking is assigned a unique PnrNumber, which serves as a reference for the booking.</li>
    </ul>
    <h2>Technologies Used</h2>
    <ul>
         <h2>Frontend:</h2>
    <ul>
        <li><strong>React.js:</strong> A popular JavaScript library for building user interfaces. React.js was chosen for its component-based architecture, which allows for the creation of reusable UI elements.</li>
        <li><strong>React Router:</strong> Used for managing navigation and routing in the React application, allowing users to move between different pages and components.</li>
        <li><strong>Material-UI:</strong> A React component library that provides pre-built components and styles for building responsive and attractive user interfaces.</li>
        <li><strong>HTML/CSS:</strong> Used for structuring the webpage and styling the components to enhance the user interface and user experience.</li>
        <li><strong>Axios:</strong> A promise-based HTTP client for making API requests from the frontend to the backend server, facilitating communication between the two layers.</li>
    </ul>
    <h2>Backend:</h2>
    <ul>
        <li><strong>Spring Boot:</strong> A popular Java-based framework for building web applications and microservices. Spring Boot was chosen for its ease of use, robustness, and extensive ecosystem.</li>
        <li><strong>Spring Data JPA:</strong> Provides support for easy implementation of data access and persistence layers using Java Persistence API (JPA) with Spring applications.</li>
        <li><strong>MySQL Database:</strong> Used for storing user data, seat bookings, and other application-related information in a relational database.</li>
    </ul>
    </ul>
     <h2>API Documentation</h2>
     <h4>User</h4>
    <ol>
        <li><strong>POST /api/user/register:</strong> Allows users to register by providing a username and password.</li>
        <li><strong>POST /api/user/login:</strong> Allows registered users to log in by providing their username and password.</li>
        <li><strong>PATCH /api/user/userdata/{username}:</strong> Allows users to update their username by providing their current username and the new username.</li>
    </ol>
    <h4>UserBooking</h4>
    <ol>
        <li><strong>POST /api/userbooking/booking:</strong> Book a seat for a user. Requires a UserBooking object in the request body and the username as a query parameter.</li>
        <li><strong>GET /api/userbooking/bookedSeats:</strong> Get a list of booked seats for a specific date and time. Requires date and time as query parameters.</li>
        <li><strong>GET /api/userbooking/fetchbooked:</strong> Fetch booked seats for a specific PnrNumber. Requires pnrNumber as a query parameter.</li>
        <li><strong>DELETE /api/userbooking/cancelling:</strong> Cancel booked seats. Requires pnrNumber and seatNos as query parameters.</li>
    </ol>
    <h4>BookingDetails</h4>
    <ol>
        <li><strong>POST /api/book/details:</strong> Add booking details for a user. Requires a list of BookingDetail objects in the request body, along with username and pnrNumber as query parameters.</li>
    </ol>
    <h2>Steps</h2>
    <ol>
        <li>Clone the Repository: <br> •	git clone https://github.com/thumarkrisha/Online-Seat-Booking-FSD</li>
        <li>Set Up the Backend (Spring Boot): <br> • Open the backend directory in your Java IDE.<br>
•	Configure MySQL database settings in application.properties.<br>
•	Run the Spring Boot application.<br>
</li>
        <li>Set Up the Frontend (React.js):<br>•	Open the frontend directory in your code editor.<br>
•	Install dependencies: npm install.<br>
•	Start the React development server: npm start.<br>
</li>
        <li>Access the Application:<br>•	Open your browser and go to http://localhost:3000.</li>
        <li>Using the Application:<br>•	Register or login to access seat booking features.<br>
•	Book seats, cancel bookings, edit your profile, and logout.<br>
</li>
    </ol>
    <h2>Contributor</h2>
    <p>Krisha Thumar</p>
</body>
</html>
