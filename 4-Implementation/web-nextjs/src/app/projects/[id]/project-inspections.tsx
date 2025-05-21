"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useInspections } from "@/hooks/useInspections";
import { capitalize } from "@/lib/utils";

interface ProjectInspectionsProps {
  projectId: string;
}

export default function ProjectInspections({ projectId }: ProjectInspectionsProps) {
  const router = useRouter();
  const { inspections, loading, error, refetch } = useInspections({ projectId });
  const [sortBy, setSortBy] = useState<"date" | "type" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (field: "date" | "type" | "status") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedInspections = [...inspections].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.scheduledDate).getTime();
      const dateB = new Date(b.scheduledDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    if (sortBy === "type") {
      return sortOrder === "asc" 
        ? a.type.localeCompare(b.type) 
        : b.type.localeCompare(a.type);
    }
    if (sortBy === "status") {
      return sortOrder === "asc" 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  const handleNewInspection = () => {
    console.log("Create new inspection for project:", projectId);
    router.push(`/inspections/new?projectId=${projectId}`);
  };

  const handleViewInspection = (inspectionId: string) => {
    console.log("View inspection:", inspectionId);
    router.push(`/inspections/${inspectionId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Project Inspections</h2>
        <Button onClick={handleNewInspection}>New Inspection</Button>
      </div>

      {loading && <p>Loading inspections...</p>}
      {error && <p className="text-red-600">Error loading inspections: {error.message}</p>}

      {!loading && !error && inspections.length === 0 && (
        <Card>
          <div className="py-8 text-center text-gray-500">
            <p>No inspections found for this project.</p>
            <Button onClick={handleNewInspection} className="mt-4">
              Create First Inspection
            </Button>
          </div>
        </Card>
      )}

      {!loading && !error && inspections.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    <span>Date</span>
                    {sortBy === "date" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    <span>Type</span>
                    {sortBy === "type" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {sortBy === "status" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {sortedInspections.map((inspection) => (
                <tr
                  key={inspection.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleViewInspection(inspection.id)}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    #{inspection.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(inspection.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {capitalize(inspection.type)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        inspection.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : inspection.status === "in_progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : inspection.status === "cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {capitalize(inspection.status.replace("_", " "))}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {inspection.location}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewInspection(inspection.id);
                      }}
                      className="text-primary hover:text-primary-dark"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}