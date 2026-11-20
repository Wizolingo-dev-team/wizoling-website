import { CloudSun, Sun, Moon, type LucideIcon } from "lucide-react";

export function getGreeting(): {
  text: string;
  Icon: LucideIcon;
} {
  const hour = new Date().getHours();

  if (hour < 12) return { text: "Good morning", Icon: CloudSun };
  if (hour < 18) return { text: "Good afternoon", Icon: Sun };
  return { text: "Good evening", Icon: Moon };
}

