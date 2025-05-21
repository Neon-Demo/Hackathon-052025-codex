"use client";

import { useState, useEffect, useCallback } from "react";
import { inspectionService, Inspection, InspectionListParams, ApiError } from "@/services";
import { useMockApi } from "@/providers/mock-api-provider";

interface UseInspectionsReturnType {
  inspections: Inspection[];
  total: number;
  loading: boolean;
  error: ApiError | null;
  fetchInspections: (params?: InspectionListParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useInspections(initialParams?: InspectionListParams): UseInspectionsReturnType {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [params, setParams] = useState<InspectionListParams | undefined>(initialParams);
  
  // Use mock data for development/testing
  const mockApi = useMockApi();
  const useMock = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  const fetchInspections = useCallback(async (newParams?: InspectionListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentParams = newParams || params;
      if (newParams) {
        setParams(newParams);
      }
      
      if (useMock) {
        // Use mock data
        mockApi.fetchInspections(currentParams?.projectId);
        setInspections(mockApi.inspections);
        setTotal(mockApi.inspections.length);
        setLoading(mockApi.loading);
      } else {
        // Use actual API
        const response = await inspectionService.getInspections(currentParams);
        setInspections(response.data.inspections);
        setTotal(response.data.total);
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      if (!useMock) {
        setLoading(false);
      }
    }
  }, [params, mockApi, useMock]);

  // Update local state when mock data changes
  useEffect(() => {
    if (useMock) {
      setInspections(mockApi.inspections);
      setTotal(mockApi.inspections.length);
      setLoading(mockApi.loading);
    }
  }, [mockApi.inspections, mockApi.loading, useMock]);

  const refetch = useCallback(() => fetchInspections(), [fetchInspections]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  return { inspections, total, loading, error, fetchInspections, refetch };
}