"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import ResponsiveGrid from "@/components/ui/responsive-grid";
import ProjectCard from "@/components/projects/project-card";
import { useProjects } from "@/hooks/useProjects";
import { Search } from "lucide-react";

export default function ProjectsPage() {
  const { projects, loading, error, fetchProjects } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects({ searchTerm, status });
  };

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Search and manage all projects</p>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Input
              id="search"
              label="Project search"
              placeholder="Project name or number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              className="form-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              {['pending', 'active', 'completed', 'cancelled'].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button type="submit" isLoading={loading} leftIcon={<Search size={16} />}>
              Search
            </Button>
          </div>
        </form>
      </Card>

      {error && (
        <div className="mb-6 rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error.message}
        </div>
      )}

      {projects.length === 0 && !loading && (
        <p className="text-gray-600 dark:text-gray-400">No projects found. Adjust your search criteria.</p>
      )}

      <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }} gap={{ xs: 'gap-4', md: 'gap-6', lg: 'gap-6' }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ResponsiveGrid>

      {loading && (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">Loading projects...</div>
      )}
    </MainLayout>
  );
}
