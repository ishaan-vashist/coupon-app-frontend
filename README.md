# Coupon App

## Overview
Coupon App is a full-stack web application that allows users to claim discount coupons, while admins can manage and track the coupons. The platform ensures fair distribution of coupons using IP-based and cookie-based claim restrictions.

## Live Demo
🚀 **Deployed Backend**: [Coupon App Backend](https://coupon-app-1v1o.onrender.com)
🚀 **Deployed Frontend**: [Coupon App Frontend](https://coupon-app-frontend-seven.vercel.app/)

## Features
### User Features
✅ Browse available coupons  
✅ Claim a coupon (one per user at a time)  
✅ Responsive and interactive UI  

### Admin Features
✅ Secure login with JWT authentication  
✅ View and manage coupons  
✅ Add new coupons  
✅ Delete or update coupon status  
✅ View claim history (IP-based tracking)  

## Tech Stack
- **Frontend**: React, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Security**: Rate limiting to prevent abuse
- **Deployment**: Render (Backend), Netlify (Frontend)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud database)
- **npm or yarn**

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/coupon-app-backend.git
   cd coupon-app-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/your-repo/coupon-app-frontend.git
   cd coupon-app-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

## API Endpoints
### Public Endpoints
- **GET** `/api/coupons/available` - Fetch available coupons
- **PUT** `/api/coupons/claim/:id` - Claim a specific coupon

### Admin Endpoints (Requires Authentication)
- **POST** `/api/admin/login` - Admin login
- **GET** `/api/admin/coupons` - View all coupons
- **POST** `/api/admin/add` - Add a new coupon
- **DELETE** `/api/admin/coupon/delete/:id` - Delete a coupon
- **GET** `/api/admin/claim-history` - View claim history

## Testing Credentials
**Admin Login**  
👤 **Username**: `admin`  
🔑 **Password**: `admin123`  

## Screenshots
📷 *[Add Screenshots of the Application Here]*

## Future Improvements
- User authentication and accounts
- Coupon expiration dates
- More advanced security features

## License
MIT License

