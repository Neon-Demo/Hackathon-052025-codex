"use client";

import { useEffect, useState } from "react";

type MediaQueryType = "xs" | "sm" | "md" | "lg" | "xl" | "custom";

export function useMediaQuery(type: MediaQueryType, customQuery?: string): boolean {
  const getQuery = (): string => {
    switch (type) {
      case "xs":
        return "(min-width: 320px)";
      case "sm":
        return "(min-width: 481px)";
      case "md":
        return "(min-width: 769px)";
      case "lg":
        return "(min-width: 1025px)";
      case "xl":
        return "(min-width: 1201px)";
      case "custom":
        return customQuery || "";
      default:
        return "";
    }
  };

  // Initialize with null to indicate we don't know the match yet (server-side)
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Set to true by default on server to prevent layout shift
    if (typeof window === "undefined") return;

    const query = getQuery();
    const media = window.matchMedia(query);

    // Update matches state
    const updateMatches = () => {
      setMatches(media.matches);
    };

    // Initialize with the current state
    updateMatches();

    // Listen for changes
    media.addEventListener("change", updateMatches);

    // Cleanup
    return () => {
      media.removeEventListener("change", updateMatches);
    };
  }, [type, customQuery]);

  return matches;
}