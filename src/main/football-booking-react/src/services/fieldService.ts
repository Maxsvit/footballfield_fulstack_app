import api from "./api.ts";

class FieldService {
  async getFields(): Promise<any[]> {
    const response = await api.get("/fields");
    return response.data;
  }

  async getFieldById(id: string | number): Promise<any> {
    const response = await api.get(`/fields/${id}`);
    return response.data;
  }

  async createField(data: any) {
    const response = await api.post("/fields", data);
    return response.data;
  }

  async updateField(id: string, data: any) {
    const response = await api.put(`/fields/${id}`, data);
    return response.data;
  }

  async deleteField(id: string) {
    const response = await api.delete(`/fields/${id}`);
    return response.data;
  }
}

export default new FieldService();
