"use client";

import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { Project } from "@/services";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card title={project.name} description={project.address} className="flex flex-col justify-between">
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Client: {project.clientName || project.clientId}
      </div>
      <div className="mt-1 text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
        Status: {project.status}
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/projects/${project.id}`}>
          <Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>View</Button>
        </Link>
        <Link href={`/projects/${project.id}/edit`}>
          <Button variant="ghost" size="sm" leftIcon={<Pencil size={16} />}>Edit</Button>
        </Link>
      </div>
    </Card>
  );
}
