import { SidebarNav } from "./sidebar-nav";
import { Outlet } from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/pages/settings/profile"
  },
  {
    title: "Account",
    href: "/pages/settings/account"
  },
  {
    title: "Appearance",
    href: "/pages/settings/appearance"
  },
  {
    title: "Notifications",
    href: "/pages/settings/notifications"
  },
  {
    title: "Display",
    href: "/pages/settings/display"
  }
];

export default function SettingsLayout() {
  return (
    <>
      <div className="mb-6 space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
      </div>
    </>
  );
}
