"use client";

import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { Inspection } from "@/services";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface InspectionCardProps {
  inspection: Inspection;
}

export default function InspectionCard({ inspection }: InspectionCardProps) {
  return (
    <Card
      title={inspection.projectName || inspection.projectId}
      description={inspection.location}
      className="flex flex-col justify-between"
    >
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Inspector: {inspection.inspectorName || inspection.inspectorId}
      </div>
      <div className="mt-1 text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
        {inspection.type} &bull; {inspection.status.replace("_", " ")}
      </div>
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Scheduled: {formatDate(inspection.scheduledDate)}
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/inspections/${inspection.id}`}>
          <Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>View</Button>
        </Link>
        <Link href={`/inspections/${inspection.id}/edit`}>
          <Button variant="ghost" size="sm" leftIcon={<Pencil size={16} />}>Edit</Button>
        </Link>
      </div>
    </Card>
  );
}
