import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "nav" | "header" | "footer";
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
