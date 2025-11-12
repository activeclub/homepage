import type { PropsWithChildren } from "react";
import { Badge } from "@/components/ui/badge";

type Props = PropsWithChildren;

export function PostTag({ children }: Props) {
  return (
    <Badge variant="outline" className="text-primary border-primary">
      {children}
    </Badge>
  );
}
