"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useInspections } from "@/hooks/useInspections";
import { capitalize } from "@/lib/utils";

export default function InspectionsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const { inspections, loading, error, fetchInspections } = useInspections();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    await fetchInspections({
      searchTerm,
      status: status || undefined,
      type: type || undefined
    });
  };

  const handleCreateNew = () => {
    router.push("/inspections/new");
  };

  const handleViewInspection = (id: string) => {
    router.push(`/inspections/${id}`);
  };

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inspections</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Search and manage inspections
        </p>
      </div>

      <Card className="mb-6" title="Inspection Search">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <Input
            id="search"
            placeholder="Search by location or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2"
          />
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-input md:col-span-1"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-input md:col-span-1"
          >
            <option value="">All Types</option>
            <option value="asbestos">Asbestos</option>
            <option value="lead">Lead</option>
            <option value="mold">Mold</option>
            <option value="other">Other</option>
          </select>
          <Button type="submit" className="md:col-span-1">
            Search
          </Button>
        </form>
      </Card>

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Results</h2>
        <Button onClick={handleCreateNew}>New Inspection</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Location
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-sm">
                    Loading...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-sm text-red-600">
                    {error.message}
                  </td>
                </tr>
              )}
              {!loading && !error && inspections.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-sm">
                    No inspections found
                  </td>
                </tr>
              )}
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    #{inspection.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {inspection.projectName || inspection.projectId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {capitalize(inspection.type)}
                  </td>
                  <td className="px-4 py-3 text-sm">
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
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(inspection.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {inspection.location}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <Link
                      href={`/inspections/${inspection.id}`}
                      className="text-primary hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewInspection(inspection.id);
                      }}
                    >
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