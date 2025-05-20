"use client";

import { useSession } from "next-auth/react";
import MainLayout from "@/components/layout/main-layout";
import Card from "@/components/ui/card";
import { 
  ClipboardList, 
  FileSpreadsheet, 
  FileCheck, 
  Clock, 
  CalendarClock,
  Beaker
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <MainLayout requireAuth>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Active Projects"
          description="Projects currently in progress"
          className="bg-blue-50 dark:bg-blue-900/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                12
              </div>
              <div className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                3 due this week
              </div>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-800">
              <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card
          title="Pending Inspections"
          description="Inspections awaiting completion"
          className="bg-amber-50 dark:bg-amber-900/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                8
              </div>
              <div className="mt-1 text-sm text-amber-600 dark:text-amber-400">
                2 high priority
              </div>
            </div>
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-800">
              <FileSpreadsheet className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </Card>

        <Card
          title="Reports to Review"
          description="Reports pending review"
          className="bg-purple-50 dark:bg-purple-900/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                5
              </div>
              <div className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                1 overdue
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800">
              <FileCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card
          title="Recent Activity"
          className="md:col-span-2"
        >
          <div className="space-y-4">
            {[
              {
                type: "Sample",
                action: "Results received",
                item: "Sample #AS-2023-05-12-001",
                time: "2 hours ago",
                icon: Beaker,
                iconColor: "text-green-500",
              },
              {
                type: "Inspection",
                action: "Completed",
                item: "Riverside Plaza Phase 2",
                time: "Yesterday",
                icon: FileSpreadsheet,
                iconColor: "text-blue-500",
              },
              {
                type: "Report",
                action: "Generated",
                item: "Oakland Heights Survey",
                time: "2 days ago",
                icon: FileCheck,
                iconColor: "text-purple-500",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 border-b border-gray-200 pb-4 last:border-0 last:pb-0 dark:border-gray-700"
              >
                <div
                  className={`rounded-full bg-gray-100 p-2 dark:bg-gray-800 ${activity.iconColor}`}
                >
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.type} {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.item}
                  </p>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Upcoming Calendar"
        >
          <div className="space-y-3">
            {[
              {
                title: "Project Kickoff",
                project: "Westfield Commercial",
                date: "Today, 2:00 PM",
              },
              {
                title: "Site Inspection",
                project: "Martin Residence",
                date: "Tomorrow, 10:00 AM",
              },
              {
                title: "Client Meeting",
                project: "Riverdale School District",
                date: "May 23, 1:30 PM",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0 dark:border-gray-700"
              >
                <div className="rounded-md bg-primary-light/20 p-2 dark:bg-primary-dark/30">
                  <CalendarClock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {event.project}
                  </p>
                  <p className="mt-1 text-xs font-medium text-primary">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}