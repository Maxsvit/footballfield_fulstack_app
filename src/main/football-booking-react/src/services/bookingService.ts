import api from "./api.ts";

class BookingService {
  async getAll() {
    const response = await api.get("/bookings");
    return response.data;
  }

  async getById(id: number) {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  }

  async createBooking(data: any) {
    const response = await api.post("/bookings", data);
    return response.data;
  }

  async updateBooking(id: number, data: any) {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  }

  async deleteBooking(id: number) {
    return api.delete(`/bookings/${id}`);
  }
}

export default new BookingService();
