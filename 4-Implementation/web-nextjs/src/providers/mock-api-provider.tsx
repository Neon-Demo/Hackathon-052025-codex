"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Inspection } from "@/services/inspection.service";

// Sample mock data for inspections
const mockInspections: Inspection[] = [
  {
    id: "1",
    projectId: "12345",
    projectName: "Asbestos Removal - Downtown",
    type: "asbestos",
    status: "completed",
    scheduledDate: "2025-05-08",
    completedDate: "2025-05-10",
    inspectorId: "user1",
    inspectorName: "John Doe",
    location: "123 Main St, Floor 1",
    notes: "All samples collected without issues",
    sampleCount: 5,
    createdAt: "2025-05-01T12:00:00Z",
    updatedAt: "2025-05-10T15:30:00Z",
  },
  {
    id: "2",
    projectId: "12345",
    projectName: "Asbestos Removal - Downtown",
    type: "lead",
    status: "in_progress",
    scheduledDate: "2025-05-15",
    inspectorId: "user2",
    inspectorName: "Jane Smith",
    location: "123 Main St, Floor 2",
    notes: "Initial assessment in progress",
    sampleCount: 0,
    createdAt: "2025-05-05T09:00:00Z",
    updatedAt: "2025-05-05T09:00:00Z",
  },
  {
    id: "3",
    projectId: "12345",
    projectName: "Asbestos Removal - Downtown",
    type: "mold",
    status: "draft",
    scheduledDate: "2025-05-25",
    inspectorId: "user1",
    inspectorName: "John Doe",
    location: "123 Main St, Basement",
    notes: "Draft inspection plan for mold assessment",
    createdAt: "2025-05-07T14:20:00Z",
    updatedAt: "2025-05-07T14:20:00Z",
  },
  {
    id: "4",
    projectId: "12345",
    projectName: "Asbestos Removal - Downtown",
    type: "other",
    status: "cancelled",
    scheduledDate: "2025-05-05",
    inspectorId: "user3",
    inspectorName: "Robert Johnson",
    location: "123 Main St, Floor 3",
    notes: "Cancelled due to scheduling conflict",
    createdAt: "2025-04-28T10:15:00Z",
    updatedAt: "2025-05-03T11:45:00Z",
  },
];

// Context type
interface MockApiContextType {
  loading: boolean;
  inspections: Inspection[];
  fetchInspections: (projectId?: string) => void;
}

// Create context
const MockApiContext = createContext<MockApiContextType | undefined>(undefined);

// Provider component
export function MockApiProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [inspections, setInspections] = useState<Inspection[]>([]);

  const fetchInspections = (projectId?: string) => {
    // Simulate API call with delay
    setLoading(true);
    setTimeout(() => {
      if (projectId) {
        setInspections(mockInspections.filter(inspection => inspection.projectId === projectId));
      } else {
        setInspections(mockInspections);
      }
      setLoading(false);
    }, 1000);
  };

  // Initialize with mock data
  useEffect(() => {
    fetchInspections();
  }, []);

  return (
    <MockApiContext.Provider value={{ loading, inspections, fetchInspections }}>
      {children}
    </MockApiContext.Provider>
  );
}

// Hook to use the mock API context
export function useMockApi() {
  const context = useContext(MockApiContext);
  if (context === undefined) {
    throw new Error("useMockApi must be used within a MockApiProvider");
  }
  return context;
}