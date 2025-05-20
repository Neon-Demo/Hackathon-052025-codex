"use client";

import { useState, useEffect, useCallback } from "react";
import { sampleService, Sample, SampleListParams, ApiError } from "@/services";

interface UseSamplesReturnType {
  samples: Sample[];
  total: number;
  loading: boolean;
  error: ApiError | null;
  fetchSamples: (params?: SampleListParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useSamples(initialParams?: SampleListParams): UseSamplesReturnType {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [params, setParams] = useState<SampleListParams | undefined>(initialParams);

  const fetchSamples = useCallback(async (newParams?: SampleListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentParams = newParams || params;
      if (newParams) {
        setParams(newParams);
      }
      
      const response = await sampleService.getSamples(currentParams);
      setSamples(response.data.samples);
      setTotal(response.data.total);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const refetch = useCallback(() => fetchSamples(), [fetchSamples]);

  useEffect(() => {
    fetchSamples();
  }, [fetchSamples]);

  return { samples, total, loading, error, fetchSamples, refetch };
}