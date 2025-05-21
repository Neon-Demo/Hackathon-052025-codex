"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { projectService, Project, ApiError } from "@/services";
import { capitalize } from "@/lib/utils";
import ProjectInspections from "./project-inspections";

type TabType = "details" | "inspections" | "samples" | "docs";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("details");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await projectService.getProjectById(id);
        setProject(response.data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <Card>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {project?.name}
              </p>
              <p>
                <span className="font-semibold">Client:</span> {project?.clientName || project?.clientId}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {capitalize(project?.status || "")}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {project?.address}
              </p>
              <p>
                <span className="font-semibold">Start Date:</span> {project?.startDate}
              </p>
              {project?.endDate && (
                <p>
                  <span className="font-semibold">End Date:</span> {project?.endDate}
                </p>
              )}
              {project?.description && (
                <p className="pt-4 text-gray-700 dark:text-gray-300">{project?.description}</p>
              )}
            </div>
          </Card>
        );
      case "inspections":
        return <ProjectInspections projectId={id} />;
      case "samples":
        return <div className="p-4 text-gray-500">Samples tab content (coming soon)</div>;
      case "docs":
        return <div className="p-4 text-gray-500">Documents tab content (coming soon)</div>;
      default:
        return null;
    }
  };

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Project {project ? `#${project.id}` : "Details"}
        </h1>
        {project && !loading && !error && (
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">STATUS:</span> {capitalize(project.status)}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">CLIENT:</span> {project.clientName || project.clientId}
            </span>
          </div>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error.message}</p>}
      
      {project && !loading && !error && (
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
                onClick={() => setActiveTab("inspections")}
                className={`pb-3 ${
                  activeTab === "inspections"
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Inspections
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
                onClick={() => setActiveTab("docs")}
                className={`pb-3 ${
                  activeTab === "docs"
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Docs
              </button>
            </div>
          </div>

          {renderTabContent()}
        </>
      )}
    </MainLayout>
  );
}
