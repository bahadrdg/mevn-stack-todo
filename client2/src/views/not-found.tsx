import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import error404 from "@/assets/images/404.svg";

export default function NotFound() {
  return (
    <div className="grid h-screen items-center bg-background pb-8 lg:grid-cols-2 lg:pb-0">
      <div className="text-center">
        <p className="text-base font-semibold text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-2">
          <Button size="lg" asChild>
            <a href="/dashboard">Go back home</a>
          </Button>
          <Button size="lg" variant="ghost">
            Contact support <ArrowRight className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          src={error404}
          width={300}
          height={400}
          className="w-full object-contain lg:max-w-2xl"
          alt="not found image"
        />
      </div>
    </div>
  );
}
