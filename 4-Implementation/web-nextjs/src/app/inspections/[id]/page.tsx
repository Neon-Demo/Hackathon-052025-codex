"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { inspectionService, Inspection, ApiError } from "@/services";
import { capitalize } from "@/lib/utils";

type TabType = "details" | "samples" | "forms";

export default function InspectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("details");

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        setLoading(true);
        const response = await inspectionService.getInspectionById(id);
        setInspection(response.data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInspection();
  }, [id]);

  const handleGoToProject = () => {
    if (inspection?.projectId) {
      router.push(`/projects/${inspection.projectId}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <Card>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Type:</span> {capitalize(inspection?.type || "")}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {capitalize((inspection?.status || "").replace("_", " "))}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {inspection?.location}
              </p>
              <p>
                <span className="font-semibold">Scheduled Date:</span> {inspection?.scheduledDate}
              </p>
              {inspection?.completedDate && (
                <p>
                  <span className="font-semibold">Completed Date:</span> {inspection?.completedDate}
                </p>
              )}
              <p>
                <span className="font-semibold">Inspector:</span> {inspection?.inspectorName || inspection?.inspectorId}
              </p>
              {inspection?.sampleCount !== undefined && (
                <p>
                  <span className="font-semibold">Sample Count:</span> {inspection?.sampleCount}
                </p>
              )}
              {inspection?.notes && (
                <p className="pt-4 text-gray-700 dark:text-gray-300">{inspection?.notes}</p>
              )}
            </div>
          </Card>
        );
      case "samples":
        return <div className="p-4 text-gray-500">Samples tab content (coming soon)</div>;
      case "forms":
        return <div className="p-4 text-gray-500">Forms tab content (coming soon)</div>;
      default:
        return null;
    }
  };

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()} 
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Inspection {inspection ? `#${inspection.id}` : "Details"}
          </h1>
        </div>
        {inspection && !loading && !error && (
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">PROJECT:</span>{" "}
              <button
                onClick={handleGoToProject}
                className="text-primary hover:underline"
              >
                {inspection.projectName || inspection.projectId}
              </button>
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">TYPE:</span> {capitalize(inspection.type)}
            </span>
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
          </div>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error.message}</p>}
      
      {inspection && !loading && !error && (
        <>
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-3 ${
                  activeTab === "details"
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("samples")}
                className={`pb-3 ${
                  activeTab === "samples"
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Samples
              </button>
              <button
                onClick={() => setActiveTab("forms")}
                className={`pb-3 ${
                  activeTab === "forms"
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Forms
              </button>
            </div>
          </div>

          {renderTabContent()}
        </>
      )}
    </MainLayout>
  );
}