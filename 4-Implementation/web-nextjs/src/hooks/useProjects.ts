"use client";

import { useState, useEffect, useCallback } from "react";
import { projectService, Project, ProjectListParams, ApiError } from "@/services";

interface UseProjectsReturnType {
  projects: Project[];
  total: number;
  loading: boolean;
  error: ApiError | null;
  fetchProjects: (params?: ProjectListParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useProjects(initialParams?: ProjectListParams): UseProjectsReturnType {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [params, setParams] = useState<ProjectListParams | undefined>(initialParams);

  const fetchProjects = useCallback(async (newParams?: ProjectListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentParams = newParams || params;
      if (newParams) {
        setParams(newParams);
      }
      
      const response = await projectService.getProjects(currentParams);
      setProjects(response.data.projects);
      setTotal(response.data.total);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const refetch = useCallback(() => fetchProjects(), [fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, total, loading, error, fetchProjects, refetch };
}