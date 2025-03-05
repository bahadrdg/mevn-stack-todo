import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, LogOut } from "lucide-react";
import avatar from "@/assets/images/avatars/1.png";
import { useUserStore } from "@/store/useUserStore";
import AuthService from "@/services/authServices";
import { useEffect } from "react";

export default function UserMenu() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const authService = new AuthService();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const userData = await authService.getUser();
          setUser(userData);
        } catch (error) {
          console.error("Kullanıcı bilgileri alınamadı:", error);
        }
      }
    };

    fetchUser();
  }, [user]);

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  }

  

  return (
    <div className="ms-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 rounded-full">
            <AvatarImage
              src={avatar}
              alt="user avatar"
            />
            <AvatarFallback className="rounded-lg">{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={avatar}
                  alt="user avatar"
                />
                <AvatarFallback className="rounded-lg">{user?.username?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Merhaba {user?.username}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles className="me-2 size-4" />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck className="me-2 size-4" />
              Hesap
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <CreditCard className="me-2 size-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="me-2 size-4" />
              Notifications
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="me-2 size-4" />
            Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
