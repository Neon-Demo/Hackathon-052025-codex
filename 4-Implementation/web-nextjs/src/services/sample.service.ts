import { apiService, ApiResponse } from "./api";

export interface Sample {
  id: string;
  sampleId: string; // Human-readable ID (e.g., AS-2023-05-12-001)
  inspectionId: string;
  projectId: string;
  type: "bulk" | "air" | "wipe" | "soil" | "water" | "other";
  material?: string;
  location: string;
  collectedById: string;
  collectedByName?: string;
  collectionDate: string;
  labId?: string;
  labName?: string;
  status: "collected" | "submitted" | "analyzing" | "analyzed" | "rejected";
  result?: string;
  resultDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SampleListParams {
  page?: number;
  limit?: number;
  inspectionId?: string;
  projectId?: string;
  status?: string;
  type?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateSampleInput {
  inspectionId: string;
  projectId: string;
  type: "bulk" | "air" | "wipe" | "soil" | "water" | "other";
  material?: string;
  location: string;
  collectedById: string;
  collectionDate: string;
  labId?: string;
  notes?: string;
}

export interface UpdateSampleInput extends Partial<CreateSampleInput> {
  status?: "collected" | "submitted" | "analyzing" | "analyzed" | "rejected";
  result?: string;
  resultDate?: string;
}

class SampleService {
  private endpoint = "/samples";

  async getSamples(params?: SampleListParams): Promise<ApiResponse<{ samples: Sample[]; total: number }>> {
    return apiService.get(this.endpoint, params);
  }

  async getSampleById(id: string): Promise<ApiResponse<Sample>> {
    return apiService.get(`${this.endpoint}/${id}`);
  }

  async createSample(data: CreateSampleInput): Promise<ApiResponse<Sample>> {
    return apiService.post(this.endpoint, data);
  }

  async updateSample(id: string, data: UpdateSampleInput): Promise<ApiResponse<Sample>> {
    return apiService.put(`${this.endpoint}/${id}`, data);
  }

  async deleteSample(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiService.delete(`${this.endpoint}/${id}`);
  }

  async bulkCreateSamples(samples: CreateSampleInput[]): Promise<ApiResponse<{ samples: Sample[] }>> {
    return apiService.post(`${this.endpoint}/bulk`, { samples });
  }

  async updateSampleResults(id: string, data: { result: string; resultDate: string }): Promise<ApiResponse<Sample>> {
    return apiService.patch(`${this.endpoint}/${id}/results`, data);
  }
}

export const sampleService = new SampleService();