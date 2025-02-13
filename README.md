# Bynry Inc Backend Intern Project

## 🚀 Overview
This is the backend implementation for the Bynry Inc Backend Intern Project, built with Django. The backend handles user authentication, service request management, file uploads, and request tracking.

The API is designed to work seamlessly with the React + TypeScript frontend, ensuring a smooth and responsive user experience.

## 🦜 Tech Stack

### **Frontend (React + TypeScript)**
- React with TypeScript → Component-based UI
- Vite → Fast build tooling
- Tailwind CSS → Utility-first styling
- Shadcn/UI → Prebuilt components
- File Upload Handling → Upload attachments
- Request Tracking → Track request status in real time

### **Backend (Django + DRF)**
- Django REST Framework → API framework for Django
- PostgreSQL → Relational database for structured data
- Django ORM → Query and manage data
- Django Simple JWT → Token-based authentication
- Django Filters → Advanced search and filtering
- AWS S3 / Local Storage → File uploads management

## 📌 Features

- **User Authentication** (JWT-based login system)
- **Service Request Management** (Create, view, cancel requests)
- **Request Tracking** (View request status, timestamps, and updates)
- **File Upload Handling** (Attach documents to requests with validation)
- **Search & Filtering** (Find requests easily)
- **Pagination** (Efficient data retrieval for large datasets)
- **Admin & Support Tools** (Manage user requests and status updates)
- **CORS Middleware** (For seamless frontend integration)
- **Auto-Generated API Documentation** (Swagger UI)

## 🏢 Installation & Setup

### Step 1: Clone the Repository
```sh
git clone https://github.com/your-repo/bynry-backend.git
cd bynry-backend
```

### Step 2: Create Virtual Environment & Install Dependencies
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 3: Apply Migrations & Start Server
```sh
python manage.py migrate
python manage.py runserver
```
The backend will now be running at `http://localhost:8000/`.

## 💻 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register/` | Create a new user account |
| POST | `/api/v1/auth/login/` | Login and get access token |
| GET | `/api/v1/service-requests/` | Get user’s service requests |
| POST | `/api/v1/service-requests/` | Create a new service request |
| PATCH | `/api/v1/service-requests/{id}/mark_in_progress/` | Mark a request as In Progress |
| PATCH | `/api/v1/service-requests/{id}/resolve/` | Mark a request as Resolved |
| PATCH | `/api/v1/service-requests/{id}/cancel/` | Cancel a service request |
| POST | `/api/v1/service-requests/{id}/upload_attachment/` | Upload file attachments |

## 🛡️ Authentication
The backend uses JWT (JSON Web Token) for authentication. To access protected routes:

1. Login using `/api/v1/auth/login/` with valid credentials.
2. Retrieve the access token from the response.
3. Include the token in the `Authorization` header:
```http
Authorization: Bearer your_jwt_token_here
```

## 🚀 Deployment
To deploy the backend, you can use Docker, AWS, or Railway. Here’s a basic Docker setup:

### Docker Deployment
```sh
docker build -t bynry-backend .
docker run -p 8000:8000 bynry-backend
```

## 🤝 Contributing
If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push the branch (`git push origin feature-name`)
5. Open a Pull Request 🚀

## 📝 License
This project is licensed under the MIT License.
