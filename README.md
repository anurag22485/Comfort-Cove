Here's the updated `README.md` including that Passport.js is used for authentication:

```markdown
# ComfortCove

**ComfortCove** is a web application for managing and listing short-term rental properties, similar to Airbnb. Users can list their properties, manage bookings, and view reviews from other users. The project follows the **MVC architecture** (Model-View-Controller) and includes full **CRUD API** functionality. It is built using Node.js, MongoDB, Cloudinary for image storage, and various third-party APIs such as Mapbox for geocoding. The front-end is styled with **CSS** and **Bootstrap**.

The project is live at: [https://comfortcovee.onrender.com](https://comfortcovee.onrender.com)  
Explore the listings at: [https://comfortcovee.onrender.com/listings](https://comfortcovee.onrender.com/listings)

## Features

- **CRUD API**: Full Create, Read, Update, Delete functionality for property listings and reviews.
- **MVC Architecture**: Separation of concerns for better code organization.
- **Authentication**: Implemented using **Passport.js** for handling user sign up, log in, and log out, with sessions for managing authentication state.
- **Authorization**: Only authenticated users can create or edit listings. Admins have additional privileges.
- Property listings with geolocation support using **Mapbox API**.
- Integrated image hosting via **Cloudinary** for property images.
- **MongoDB Atlas** for scalable database management.
- Deployed on **Render.com** for seamless deployment.
- **HTML, CSS, and Bootstrap** for responsive UI.
- User-friendly interface for browsing listings and managing properties.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anuragsingh22485/Comfort-Cove.git
   ```

2. Navigate into the project directory:
   ```bash
   cd ComfortCove
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add the following variables:
   ```env
   ATLASDB_URL=your_mongodb_url
   MAP_TOKEN=your_mapbox_token
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=your_secret_key
   ```

5. Start the application:
   ```bash
   npm start
   ```

## CRUD API Endpoints

- **Create Listing**: `POST /listings`
- **Get Listings**: `GET /listings`
- **Update Listing**: `PUT /listings/:id`
- **Delete Listing**: `DELETE /listings/:id`
- **Create Review**: `POST /listings/:id/reviews`
- **Get Reviews**: `GET /listings/:id/reviews`

## MVC Architecture

- **Model**: Defines the schema for Listings and Reviews in MongoDB using Mongoose.
- **View**: HTML, CSS, and Bootstrap are used for building the front-end views. Templates are rendered with dynamic content from the controllers.
- **Controller**: Handles application logic, including interacting with the Mapbox API, performing CRUD operations, and initializing the database.

## Authentication & Authorization

- **Authentication**: Implemented using **Passport.js** for user authentication. It handles user sign up, log in, and log out with session-based authentication.
- **Authorization**: Only authenticated users can create or edit listings. Admin users have additional access to sensitive data or actions.

## Front-End

- **HTML** and **CSS** are used for building the structure and style of the web pages.
- **Bootstrap** ensures a responsive and modern design.
- The UI is designed for both desktop and mobile devices, making it easy to browse listings on any platform.

## npm Packages Used

- **express**: Web framework
- **mongoose**: MongoDB object modeling tool
- **dotenv**: Environment variable management
- **passport**: Authentication middleware
- **express-session**: Session management
- **cloudinary**: Cloud storage for images
- **mapbox-sdk**: Mapbox API integration
- **bootstrap**: Front-end framework
- **body-parser**: Middleware for parsing request bodies
- **ejs**: Templating engine
- **mongoose-paginate**: Pagination for Mongoose queries

