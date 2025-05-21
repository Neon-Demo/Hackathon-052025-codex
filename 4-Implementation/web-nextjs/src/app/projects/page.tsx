"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useProjects } from "@/hooks";
import { capitalize } from "@/lib/utils";

export default function ProjectsPage() {
  const { projects, loading, error, fetchProjects } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    await fetchProjects({ searchTerm, status: status || undefined });
  };

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Search and manage projects
        </p>
      </div>

      <Card className="mb-6" title="Project Search">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <Input
            id="search"
            placeholder="Search by name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2"
          />
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-input md:col-span-2"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button type="submit" className="md:col-span-1">
            Search
          </Button>
        </form>
      </Card>

      <Card title="Results">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  End Date
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-sm">
                    Loading...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-sm text-red-600">
                    {error.message}
                  </td>
                </tr>
              )}
              {!loading && !error && projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-sm">
                    No projects found
                  </td>
                </tr>
              )}
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {project.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {project.clientName || project.clientId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {capitalize(project.status)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {project.startDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {project.endDate || "-"}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </MainLayout>
  );
}
