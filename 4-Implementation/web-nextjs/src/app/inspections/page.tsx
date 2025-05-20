"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import ResponsiveGrid from "@/components/ui/responsive-grid";
import InspectionCard from "@/components/inspections/inspection-card";
import { useInspections } from "@/hooks/useInspections";
import { Search } from "lucide-react";

export default function InspectionsPage() {
  const { inspections, loading, error, fetchInspections } = useInspections();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInspections({ searchTerm, status, type });
  };

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inspections</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Search and manage all inspections</p>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-2">
            <Input
              id="search"
              label="Search"
              placeholder="Project, location or inspector"
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
              {["draft", "in_progress", "completed", "cancelled"].map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              id="type"
              className="form-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              {["asbestos", "lead", "mold", "other"].map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button type="submit" isLoading={loading} leftIcon={<Search size={16} />}>Search</Button>
          </div>
        </form>
      </Card>

      {error && (
        <div className="mb-6 rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error.message}
        </div>
      )}

      {inspections.length === 0 && !loading && (
        <p className="text-gray-600 dark:text-gray-400">No inspections found. Adjust your search criteria.</p>
      )}

      <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }} gap={{ xs: "gap-4", md: "gap-6", lg: "gap-6" }}>
        {inspections.map((inspection) => (
          <InspectionCard key={inspection.id} inspection={inspection} />
        ))}
      </ResponsiveGrid>

      {loading && (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">Loading inspections...</div>
      )}
    </MainLayout>
  );
}
