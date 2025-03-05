 

import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();
  return (
    <Card>
      <CardContent className="pt-6">
        <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0", className)} {...props}>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-muted",
                "justify-start"
              )}>
              {item.title}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
