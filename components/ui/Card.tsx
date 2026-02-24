import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export default function Card({
  children,
  hover = false,
  className,
  ...props
}: CardProps) {
  const baseStyles =
    "bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden";

  const hoverStyles = hover
    ? "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    : "";

  return (
    <div className={cn(baseStyles, hoverStyles, className)} {...props}>
      {children}
    </div>
  );
}
