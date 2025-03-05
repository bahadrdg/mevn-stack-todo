import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import academyDashboardLight from "@/assets/images/academy-dashboard-light.svg";
import academyDashboardDark from "@/assets/images/academy-dashboard-dark.svg";
import starShape from "@/assets/images/star-shape.png";

export default function WelcomeCard() {
  return (
    <Card className="relative overflow-hidden lg:col-span-12 xl:col-span-6">
      <CardContent className="grid items-center pt-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="text-3xl">
            Hi, Andrew <span className="text-5xl">👋</span>
          </div>
          <div className="text-3xl">What do you want to learn today with your partner?</div>
          <div className="text-muted-foreground">
            Discover courses, track progress, and achieve your learning goods seamlessly.
          </div>
          <div className="pt-2">
            <Button>Explorer Course</Button>
          </div>
        </div>
        <figure className="hidden lg:col-span-1 lg:block">
          <img
            src={academyDashboardLight}
            className="block dark:hidden"
            alt="..."
          />
          <img
            src={academyDashboardDark}
            className="hidden dark:block"
            alt="..."
          />
        </figure>
        <img
          src={starShape}
          className="pointer-events-none absolute inset-0"
          alt="..."
        />
      </CardContent>
    </Card>
  );
}
