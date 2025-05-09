import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StrokedTextProps = {
  children: ReactNode;
  size: "lg" | "sm" | "md";
  className?: string;
};

function StrokedText({ children, size, className }: StrokedTextProps) {
  const strokeClass =
    size === "lg"
      ? "text-stroke-lg"
      : size === "md"
      ? "text-stroke-md"
      : "text-stroke-sm";
  return (
    <div className="relative">
      {/* texto atras para sensação de stroke */}
      <span className={cn("text-md absolute", className, strokeClass)}>
        {children}
      </span>
      <span className={cn("text-md text-white relative z-10", className)}>
        {children}
      </span>
    </div>
  );
}

export default StrokedText;
