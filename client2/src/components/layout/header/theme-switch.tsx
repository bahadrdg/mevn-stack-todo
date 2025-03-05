import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="sm"
      variant="link"
      className="text-foreground additional-style-class" 
      onClick={toggleTheme}
    >
      {theme === 'light' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
