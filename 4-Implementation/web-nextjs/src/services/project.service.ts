import { apiService, ApiResponse } from "./api";

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName?: string;
  address: string;
  status: "pending" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate?: string;
  description?: string;
  projectManager?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListParams {
  page?: number;
  limit?: number;
  status?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateProjectInput {
  name: string;
  clientId: string;
  address: string;
  startDate: string;
  endDate?: string;
  description?: string;
  projectManager?: string;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  status?: "pending" | "active" | "completed" | "cancelled";
}

class ProjectService {
  private endpoint = "/projects";

  async getProjects(params?: ProjectListParams): Promise<ApiResponse<{ projects: Project[]; total: number }>> {
    return apiService.get(this.endpoint, params);
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    return apiService.get(`${this.endpoint}/${id}`);
  }

  async createProject(data: CreateProjectInput): Promise<ApiResponse<Project>> {
    return apiService.post(this.endpoint, data);
  }

  async updateProject(id: string, data: UpdateProjectInput): Promise<ApiResponse<Project>> {
    return apiService.put(`${this.endpoint}/${id}`, data);
  }

  async deleteProject(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiService.delete(`${this.endpoint}/${id}`);
  }
}

export const projectService = new ProjectService();