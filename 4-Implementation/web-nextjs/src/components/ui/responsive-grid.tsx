"use client";

import { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  className?: string;
}

export default function ResponsiveGrid({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = { xs: "gap-4", sm: "gap-4", md: "gap-6", lg: "gap-6", xl: "gap-8" },
  className = "",
}: ResponsiveGridProps) {
  // Create responsive grid classes
  const gridCols = [
    `grid-cols-${columns.xs || 1}`,
    `sm:grid-cols-${columns.sm || columns.xs || 1}`,
    `md:grid-cols-${columns.md || columns.sm || columns.xs || 1}`,
    `lg:grid-cols-${columns.lg || columns.md || columns.sm || columns.xs || 1}`,
    `xl:grid-cols-${columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 1}`,
  ].join(" ");

  // Create responsive gap classes
  const gapClasses = [
    gap.xs || "",
    gap.sm ? `sm:${gap.sm}` : "",
    gap.md ? `md:${gap.md}` : "",
    gap.lg ? `lg:${gap.lg}` : "",
    gap.xl ? `xl:${gap.xl}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`grid ${gridCols} ${gapClasses} ${className}`}>
      {children}
    </div>
  );
}