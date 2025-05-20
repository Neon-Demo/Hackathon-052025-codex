"use client";

import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
  center?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({
  children,
  maxWidth = "lg",
  padding = true,
  center = true,
  as: Component = "div",
  className,
  ...props
}, ref) => {
  const maxWidthClass = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-7xl",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  }[maxWidth];

  const paddingClass = padding ? "px-4 sm:px-6 lg:px-8" : "";
  const centerClass = center ? "mx-auto" : "";

  // Using the cn utility for className merging
  const containerClassName = cn(
    maxWidthClass,
    paddingClass,
    centerClass,
    "w-full",
    className
  );

  return (
    <Component 
      ref={ref}
      className={containerClassName}
      {...props}
    >
      {children}
    </Component>
  );
});

Container.displayName = "Container";

export default Container;