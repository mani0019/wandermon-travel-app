# 🌍 Wandermon Travel App

**Wandermon** is a full-stack vacation rental web application inspired by Airbnb. 🏡 Users can browse listings, book stays, leave reviews, and property owners can create and manage their listings. The app is built using Node.js, Express, MongoDB, EJS, and Bootstrap for a responsive and user-friendly experience. 💻✨

## 🚀 Features

- 🔑 User authentication (signup, login, logout) with Passport.js  
- 🏠 Create, view, edit, and delete property listings  
- 🖼️ Upload images using Cloudinary  
- 🌆 Browse listings by category: Rooms, Hotels, Popular spots, Beach, etc.  
- ⭐ Review and rating system for properties  
- 💰 Display pricing with optional GST/tax toggle  
- 💬 Flash messages for success/error notifications  
- 🔒 Secure routes and input validation using Joi and custom middleware  
- 📱 Responsive design for desktop and mobile  

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Frontend:** EJS templating, Bootstrap, Font Awesome  
- **Authentication:** Passport.js  
- **File Uploads:** Cloudinary  
- **Validation & Error Handling:** Joi, custom middleware  

## 🗂️ Project Structure


wandermon/
│
├─ controllers/ # Route controllers
├─ models/ # Mongoose models
├─ routers/ # Express route files
├─ public/ # Static assets (CSS, JS, images)
├─ views/ # EJS templates
├─ utils/ # Helper functions
├─ init/ # Initial setup / seed data
├─ app.js # Main server file
├─ package.json
└─ README.md


## Installation

1. Clone the repository:  
```
git clone https://github.com/mani0019/wandermon-travel-app.git
cd wandermon-travel-app
```
2.Install dependencies:'
npm install

3.Create a .env file in the root folder with your configuration:
PORT=8080
DB_URL=<your-mongodb-url>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
SESSION_SECRET=<any-secret-key>

4.Start the server:
5.http://localhost:8080

#Usage
Browse listings from the homepage
Sign up or login to add new listings or leave reviews
Use the search bar to quickly find properties
Toggle “Display Taxes” to see pricing with GST
View property details, images, and reviews on each listing page
#Contact

Developer: Manish Kurhe
GitHub: https://github.com/mani0019


---




