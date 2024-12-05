# PlaceTrack  

**PlaceTrack** is a platform designed to streamline off-campus placement drives, providing secure authentication, real-time location tracking, and efficient data management for students and teachers.  

## Features  
- **Secure Authentication**: Role-based access for students and teachers using JWT.  
- **Slot Creation**: Students can create slots with details such as company name, location, date, and time.  
- **Proof Upload**: Students can upload selfies and real-time location as proof of attendance.  
- **Data Filtering**: Teachers can filter student records based on section and batch.  
- **Export Data**: Filtered student data can be exported in PDF format.  

## Technologies Used  
- **Backend**: Node.js, Express.js  
- **Frontend**: EJS, Tailwind CSS  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  
- **File Uploads**: Cloudinary  
- **Hosting**: Render  

## Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/<your-username>/placetrack.git
   ```  

2. Navigate to the project directory:  
   ```bash
   cd placetrack
   ```  

3. Install dependencies:  
   ```bash
   npm install
   ```  

4. Create a `.env` file in the root directory and add the following environment variables:  
   ```env
   MONGO_URI=<your_mongodb_connection_string>  
   JWT_SECRET=<your_jwt_secret>  
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>  
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>  
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>  
   ```  

5. Start the server:  
   ```bash
   npm start
   ```  

6. Access the application at `http://localhost:3000`.  

## Usage  
- Teachers can log in to filter student records, and export data.  
- Students can log in to create placement slots, upload proof of attendance with location.  

## Project Links  
- **Live Demo**: [PlaceTrack](https://placetrack.onrender.com)  

## Contributing  
Contributions are welcome! Please follow these steps:  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/your-feature-name`).  
3. Commit your changes (`git commit -m 'Add some feature'`).  
4. Push to the branch (`git push origin feature/your-feature-name`).  
5. Open a pull request.  

## License  
This project is licensed under the [MIT License](LICENSE).  

## Contact  
For any inquiries or feedback, feel free to reach out:  
- **Email**: mail.ashutosh246@gmail.com  
- **LinkedIn**: [linkedin.com/in/ashutosh-037463220](https://www.linkedin.com/in/ashutosh-037463220/)  
- **GitHub**: [github.com/Ashutosh021](https://github.com/Ashutosh021)  
```  

Customize the repository link and any additional sections as needed!
