"use client";

import { useToast } from "@/components/ui/use-toast";

export function Toast(message: string) {
  const { toast } = useToast();

  return (
    <>
      {toast({
        description: message,
      })}
    </>
  );
}
