import { Badge } from "@/components/ui/badge";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function PostTag({ children }: Props) {
  return (
    <Badge variant="outline" className="text-primary border-primary">
      {children}
    </Badge>
  );
}
