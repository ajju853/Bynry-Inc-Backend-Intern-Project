
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface ServiceRequest {
  id?: string;
  requestType: string;
  description: string;
  address: string;
  contactNumber: string;
  status?: string;
  createdAt?: string;
  attachments?: File[];
}

export const authApi = {
  login: async (email: string, password: string) => {
    return api.post("/auth/login/", { email, password });
  },
  logout: async () => {
    return api.post("/auth/logout/");
  },
  getCurrentUser: async () => {
    return api.get("/auth/user/");
  },
};

export const serviceApi = {
  submitRequest: async (request: ServiceRequest) => {
    const formData = new FormData();
    Object.keys(request).forEach((key) => {
      if (key === "attachments" && request.attachments) {
        request.attachments.forEach((file) => {
          formData.append("attachments", file);
        });
      } else {
        formData.append(key, request[key as keyof ServiceRequest] as string);
      }
    });
    return api.post("/service-requests/", formData);
  },

  getRequestStatus: async (requestId: string) => {
    return api.get(`/service-requests/${requestId}/`);
  },

  getServices: async () => {
    return api.get("/services/");
  }
};
