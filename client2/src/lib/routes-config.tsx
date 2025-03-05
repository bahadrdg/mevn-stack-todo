type PageRoutesType = {
  title: string;
  items: PageRoutesItemType;
};

type PageRoutesItemType = {
  title: string;
  href: string;
  icon?: string;
  isComing?: boolean;
  isNew?: boolean;
  newTab?: boolean;
  items?: PageRoutesItemType;
}[];

export const page_routes: PageRoutesType[] = [
  {
    title: "Dashboards",
    items: [
      {
        title: "Todo",
        href: "/",
        icon: "SquareCheck"
      },
      // {
      //   title: "Default",
      //   href: "/",
      //   icon: "ChartPie"
      // },
      // {
      //   title: "E-commerce",
      //   href: "/ecommerce",
      //   icon: "ShoppingBag"
      // },
      // { title: "CRM", href: "/dashboard/crm", icon: "BarChart" },
      // {
      //   title: "Website Analytics",
      //   href: "/website-analytics",
      //   icon: "Gauge"
      // },
      // {
      //   title: "Project Management",
      //   href: "/project-management",
      //   icon: "FolderDot"
      // },
      // {
      //   title: "File Manager",
      //   href: "/file-manager",
      //   icon: "Folder"
      // },
      // { title: "Crypto", href: "/crypto", icon: "WalletMinimal" },
      // { title: "Academy", href: "/academy", icon: "GraduationCap" },
      // { title: "Hospital Management", href: "/hospital-management", icon: "Activity" }
    ]
  },
  // {
  //   title: "Apps",
  //   items: [
  //     { title: "Chats", href: "/apps/chat", icon: "MessageSquare" },
  //     { title: "Inbox", href: "/dashboard/apps/inbox", icon: "Mail", isComing: true },
  //     { title: "Kanban", href: "/dashboard/apps/kanban", icon: "SquareKanban", isComing: true },
  //     {
  //       title: "Todo List",
  //       href: "/dashboard/apps/todo-list",
  //       icon: "SquareCheck",
  //       isComing: true
  //     },
  //     { title: "Notes", href: "/dashboard/apps/notes", icon: "StickyNote", isComing: true },
  //     { title: "Calendar", href: "/dashboard/apps/calendar", icon: "Calendar", isComing: true },
  //     { title: "File Manager", href: "#", icon: "Package", isComing: true },
  //     { title: "Api Keys", href: "/apps/api-keys", icon: "Key", isComing: false }
  //   ]
  // },
  // {
  //   title: "Pages",
  //   items: [
  //     {
  //       title: "Landing Page",
  //       href: "#",
  //       icon: "Proportions",
  //       isComing: true
  //     },
  //     {
  //       title: "Profile",
  //       href: "/pages/profile",
  //       icon: "ContactRound"
  //     },
  //     { title: "Users", href: "/pages/users", icon: "Users" },
  //     {
  //       title: "Settings",
  //       href: "/pages/settings",
  //       icon: "Settings",
  //       items: [
  //         { title: "Profile", href: "/pages/settings/profile" },
  //         { title: "Account", href: "/pages/settings/account" },
  //         { title: "Appearance", href: "/pages/settings/appearance" },
  //         { title: "Notifications", href: "/pages/settings/notifications" },
  //         { title: "Display", href: "/pages/settings/display" }
  //       ]
  //     },
  //     {
  //       title: "Orders",
  //       href: "/pages/orders",
  //       icon: "PackageSearch",
  //       items: [
  //         { title: "Order List", href: "/pages/orders" },
  //         { title: "Order Detail", href: "/pages/orders/detail" }
  //       ]
  //     },
  //     {
  //       title: "Products",
  //       href: "/dashboard/pages/products",
  //       icon: "PackageSearch",
  //       items: [
  //         { title: "Product List", href: "/pages/products" },
  //         { title: "Product Detail", href: "/pages/products/detail" },
  //         { title: "Add Product", href: "/pages/products/create" }
  //       ]
  //     },
  //     {
  //       title: "Pricing",
  //       href: "#",
  //       icon: "BadgeDollarSign",
  //       items: [
  //         { title: "Column Pricing", href: "/pages/pricing/column" },
  //         { title: "Table Pricing", href: "/pages/pricing/table" },
  //         { title: "Single Pricing", href: "/pages/pricing/single" }
  //       ]
  //     },
  //     {
  //       title: "Authentication",
  //       href: "/",
  //       icon: "Fingerprint",
  //       items: [
  //         { title: "Login v1", href: "/dashboard/login/v1" },
  //         { title: "Login v2", href: "/dashboard/login/v2" },
  //         { title: "Register v1", href: "/dashboard/register/v1" },
  //         { title: "Register v2", href: "/dashboard/register/v2" },
  //         { title: "Forgot Password", href: "/dashboard/forgot-password" }
  //       ]
  //     },
  //     {
  //       title: "Error Pages",
  //       href: "/",
  //       icon: "Fingerprint",
  //       items: [
  //         { title: "404", href: "/dashboard/pages/error/404" },
  //         { title: "500", href: "/dashboard/pages/error/500" },
  //         { title: "403", href: "/dashboard/pages/error/403" }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: "Others",
  //   items: [
  //     {
  //       title: "Components",
  //       href: "/components",
  //       icon: "Component",
  //       newTab: true
  //     },
  //     {
  //       title: "Templates",
  //       href: "/templates",
  //       icon: "Component",
  //       newTab: true
  //     },
  //     {
  //       title: "Documentation",
  //       href: "#",
  //       icon: "ClipboardMinus",
  //       isComing: true
  //     }
  //   ]
  // }
];
