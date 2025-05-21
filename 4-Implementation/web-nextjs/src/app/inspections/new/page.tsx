"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { inspectionService, CreateInspectionInput, ApiError } from "@/services";
import { useProjects } from "@/hooks";

export default function NewInspectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultProjectId = searchParams?.get("projectId") || "";

  const [formData, setFormData] = useState<CreateInspectionInput>({
    projectId: defaultProjectId,
    type: "asbestos",
    scheduledDate: new Date().toISOString().split("T")[0],
    inspectorId: "current-user", // This would normally be set to the current user's ID
    location: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const { projects, loading: projectsLoading } = useProjects();

  useEffect(() => {
    if (defaultProjectId) {
      setFormData(prev => ({ ...prev, projectId: defaultProjectId }));
    }
  }, [defaultProjectId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await inspectionService.createInspection(formData);
      
      // Navigate to the new inspection's detail page
      router.push(`/inspections/${response.data.id}`);
    } catch (err) {
      setError(err as ApiError);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
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
            New Inspection
          </h1>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create a new inspection
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project
              </label>
              <select
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                required
                className="form-input w-full"
                disabled={projectsLoading}
              >
                <option value="">Select a project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name || project.id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="form-input w-full"
              >
                <option value="asbestos">Asbestos</option>
                <option value="lead">Lead</option>
                <option value="mold">Mold</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Scheduled Date
              </label>
              <Input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter inspection location"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              className="form-input w-full"
              rows={4}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">{error.message}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Inspection"}
            </Button>
          </div>
        </form>
      </Card>
    </MainLayout>
  );
}