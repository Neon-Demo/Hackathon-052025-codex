"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import { projectService, Project, ApiError } from "@/services";
import { capitalize } from "@/lib/utils";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

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

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Details</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error.message}</p>}
      {project && !loading && !error && (
        <Card>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {project.name}
            </p>
            <p>
              <span className="font-semibold">Client:</span> {project.clientName || project.clientId}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {capitalize(project.status)}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {project.address}
            </p>
            <p>
              <span className="font-semibold">Start Date:</span> {project.startDate}
            </p>
            {project.endDate && (
              <p>
                <span className="font-semibold">End Date:</span> {project.endDate}
              </p>
            )}
            {project.description && (
              <p className="pt-4 text-gray-700 dark:text-gray-300">{project.description}</p>
            )}
          </div>
        </Card>
      )}
    </MainLayout>
  );
}
