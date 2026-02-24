"use client";

import { useState, useEffect } from "react";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setIsMounted(true);

    // Show loader for initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // During SSR and initial hydration, render children without loader
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {isLoading && <GlobalLoader />}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </>
  );
}
