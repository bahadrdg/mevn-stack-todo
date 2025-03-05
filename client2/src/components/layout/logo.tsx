import { Link } from "react-router-dom";
import logoLight from "../../assets/logo-light.png";
import logo from "../../assets/logo.png";
import { useTheme } from '@/hooks/useTheme';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  const { theme } = useTheme();

  return (
    <Link to="/" className={className}>
      {/* <img src={theme === 'dark' ? logoLight : logo} className="block w-6" alt="shadcn ui kit logo" /> */}
    </Link>
  );
}
