import { jwtDecode } from "jwt-decode";
import api from "./api.ts";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  async login(data: LoginRequest): Promise<void> {
    try {
      const response = await api.post("/auth/login", data);
      const { token } = response.data;
      if (!token) {
        throw new Error("No token received from the server");
      }
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    try {
      await api.post("/auth/register", data);
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  getRoles(): string[] {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.roles || [];
      } catch (err) {
        console.error("Error decoding token:", err);
        return [];
      }
    }
    return [];
  }

  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole("ROLE_ADMIN");
  }

  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
