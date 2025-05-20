"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  variant?: "default" | "outlined" | "elevated";
  fullWidth?: boolean;
  horizontal?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  title,
  description,
  footer,
  variant = "default",
  fullWidth = false,
  horizontal = false,
  className,
  ...props
}, ref) => {
  const variantStyles = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
    outlined: "bg-transparent border border-gray-200 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-md",
  };

  const layoutClasses = horizontal
    ? "flex flex-col md:flex-row md:items-start md:gap-6"
    : "flex flex-col";

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-5",
        variantStyles[variant],
        layoutClasses,
        widthClasses,
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className={cn("mb-4", horizontal && "md:w-1/3")}>
          {title && (
            <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={cn(horizontal && "md:flex-1")}>{children}</div>
      {footer && (
        <div className={cn(
          "mt-4 border-t border-gray-200 pt-4 dark:border-gray-700",
          horizontal && "md:w-full"
        )}>
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = "Card";

export default Card;