import Link from "next/link";
import MainLayout from "@/components/layout/main-layout";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Container from "@/components/ui/container";

export default function HomePage() {
  return (
    <MainLayout>
      <Container className="pb-16 pt-20 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Greenhouse{" "}
          <span className="relative whitespace-nowrap text-primary">
            <span className="relative">Management System</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700 dark:text-gray-300">
          A comprehensive digital inspection system for hazardous materials
          management, streamlining your workflow from inspection to reporting.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="mt-36 lg:mt-44">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900 dark:bg-gray-900 dark:text-white">
                Key Features
              </span>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Digital Forms",
                description:
                  "Transform paper forms into digital workflows with customizable templates for various inspection types.",
              },
              {
                title: "Sample Management",
                description:
                  "Track samples from collection through laboratory analysis with barcode integration and real-time status updates.",
              },
              {
                title: "Comprehensive Reporting",
                description:
                  "Generate professional reports with automated data compilation, customizable templates, and digital delivery options.",
              },
              {
                title: "Equipment Tracking",
                description:
                  "Manage inspection equipment inventory, maintenance schedules, and calibration records in one place.",
              },
              {
                title: "AirTable Integration",
                description:
                  "Seamlessly sync data with AirTable for enhanced collaboration and custom workflow automation.",
              },
              {
                title: "Mobile-First Design",
                description:
                  "Work efficiently in the field with a responsive interface that functions online and offline on any device.",
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                title={feature.title}
                className="transition-all duration-300 hover:shadow-lg hover:border-primary/30 dark:hover:border-primary-light/30"
              >
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}