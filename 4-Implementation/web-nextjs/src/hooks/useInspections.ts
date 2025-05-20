"use client";

import { useState, useEffect, useCallback } from "react";
import { inspectionService, Inspection, InspectionListParams, ApiError } from "@/services";

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

  const fetchInspections = useCallback(async (newParams?: InspectionListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentParams = newParams || params;
      if (newParams) {
        setParams(newParams);
      }
      
      const response = await inspectionService.getInspections(currentParams);
      setInspections(response.data.inspections);
      setTotal(response.data.total);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const refetch = useCallback(() => fetchInspections(), [fetchInspections]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  return { inspections, total, loading, error, fetchInspections, refetch };
}