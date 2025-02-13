# Bynry Inc Backend Intern Project

## 🚀 Overview
This is the backend implementation for the **Bynry Inc Backend Intern Project**, built with **FastAPI**. The backend handles **user authentication, service request management, file uploads, and real-time request tracking**. 

The API is designed to work seamlessly with the **React + TypeScript frontend**, ensuring a smooth and responsive user experience.

## 🛠 Tech Stack
### **Frontend (React + TypeScript)**
- **React with TypeScript** → Component-based UI
- **Vite** → Fast build tooling
- **Tailwind CSS** → Utility-first styling
- **Shadcn/UI** → Prebuilt components
- **File Upload Handling** → Upload attachments
- **Real-time Status Updates** → Live tracking using WebSockets

### **Backend (Python)**
- **FastAPI** → High-performance API framework
- **Pydantic** → Data validation and serialization
- **SQLAlchemy** → ORM for database interactions
- **Python-Jose** → JWT authentication handling
- **Python-Multipart** → File uploads support
- **Pillow** → Image processing

## 📌 Features
✅ **User Authentication** (JWT-based login system)
✅ **Service Request Management** (Create, view, cancel requests)
✅ **File Upload Handling** (Attach documents to requests)
✅ **Real-time Status Updates** (Live tracking using WebSockets)
✅ **CORS Middleware** (For seamless frontend integration)
✅ **Auto-Generated API Documentation** (Swagger UI)

## 🏗️ Installation & Setup

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/your-repo/bynry-backend.git
cd bynry-backend
```

### **Step 2: Create Virtual Environment & Install Dependencies**
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **Step 3: Start the Server**
```sh
uvicorn main:app --reload
```

The backend will now be running at **http://localhost:8000**.

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/users/` | Create a new user account |
| **POST** | `/token` | Login and get access token |
| **POST** | `/service-requests/` | Create a new service request |
| **GET** | `/service-requests/` | Get user's service requests |
| **PUT** | `/service-requests/{id}/cancel` | Cancel a service request |
| **POST** | `/service-requests/{id}/attachments/` | Upload file attachments |

### **API Documentation**
You can access the **interactive API documentation** at:
- **Swagger UI** → [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc** → [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🔐 Authentication
The backend uses **JWT (JSON Web Token)** for authentication. To access protected routes:
1. **Login** using `/token` endpoint with valid credentials.
2. **Retrieve the access token** from the response.
3. **Include the token** in the `Authorization` header:
   ```sh
   Authorization: Bearer your_jwt_token_here
   ```

## 🚀 Deployment
To deploy the backend, you can use **Docker, AWS, Vercel, or Railway**. Here’s a basic **Docker setup**:

### **Docker Deployment**
```sh
docker build -t bynry-backend .
docker run -p 8000:8000 bynry-backend
```

## 🤝 Contributing
If you'd like to contribute:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push the branch** (`git push origin feature-name`)
5. **Open a Pull Request** 🚀

## 📜 License
This project is licensed under the **MIT License**.

---
**Built with ❤️ using FastAPI & SQLAlchemy**

