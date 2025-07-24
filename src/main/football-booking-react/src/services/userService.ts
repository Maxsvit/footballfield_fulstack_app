import api from "./api.ts";

class UserService {
  async getAllUsers() {
    const response = await api.get("/users");
    return response.data;
  }

  async deleteUser(id: number) {
    return api.delete(`/users/${id}`);
  }

  async getCurrentUser() {
    const response = await api.get("/users/me");
    return response.data;
  }

  async updateUser(id: number, data: any) {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  }
}

export default new UserService();
