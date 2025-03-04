  // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="flex min-h-[99vh] flex-col items-start gap-4 px-2 py-8">
      <div className="space-y-2 lg:space-y-4">
        <h2 className="text-3xl font-bold lg:text-5xl">Oops!</h2>
        <p className="text-muted-foreground">Something went wrong!</p>
      </div>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </Button>
    </div>
  );
}
