import { apiService, ApiResponse } from "./api";

export interface Inspection {
  id: string;
  projectId: string;
  projectName?: string;
  type: "asbestos" | "lead" | "mold" | "other";
  status: "draft" | "in_progress" | "completed" | "cancelled";
  scheduledDate: string;
  completedDate?: string;
  inspectorId: string;
  inspectorName?: string;
  location: string;
  notes?: string;
  sampleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionListParams {
  page?: number;
  limit?: number;
  projectId?: string;
  status?: string;
  type?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateInspectionInput {
  projectId: string;
  type: "asbestos" | "lead" | "mold" | "other";
  scheduledDate: string;
  inspectorId: string;
  location: string;
  notes?: string;
}

export interface UpdateInspectionInput extends Partial<CreateInspectionInput> {
  status?: "draft" | "in_progress" | "completed" | "cancelled";
  completedDate?: string;
}

class InspectionService {
  private endpoint = "/inspections";

  async getInspections(params?: InspectionListParams): Promise<ApiResponse<{ inspections: Inspection[]; total: number }>> {
    return apiService.get(this.endpoint, params);
  }

  async getInspectionById(id: string): Promise<ApiResponse<Inspection>> {
    return apiService.get(`${this.endpoint}/${id}`);
  }

  async createInspection(data: CreateInspectionInput): Promise<ApiResponse<Inspection>> {
    return apiService.post(this.endpoint, data);
  }

  async updateInspection(id: string, data: UpdateInspectionInput): Promise<ApiResponse<Inspection>> {
    return apiService.put(`${this.endpoint}/${id}`, data);
  }

  async deleteInspection(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiService.delete(`${this.endpoint}/${id}`);
  }

  async submitInspectionForm(id: string, formData: any): Promise<ApiResponse<{ success: boolean }>> {
    return apiService.post(`${this.endpoint}/${id}/forms`, formData);
  }

  async getInspectionForms(id: string): Promise<ApiResponse<{ forms: any[] }>> {
    return apiService.get(`${this.endpoint}/${id}/forms`);
  }
}

export const inspectionService = new InspectionService();