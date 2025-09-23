"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, QrCode, Gift, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export function BottomNav() {
  const pathname = usePathname();
  const { currentUser } = useAuth();

  const navItems = [
    { href: "/", label: "হোম", icon: Home },
    { href: "/scan", label: "স্ক্যান", icon: QrCode },
    { href: "/rewards", label: "পুরস্কার", icon: Gift },
    { href: "/dashboard", label: "প্রোফাইল", icon: UserIcon },
  ];

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <footer className="sticky bottom-0 mt-auto w-full max-w-md bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10 border-t">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard'));
          
          let label = item.label;
          let href = item.href;

          if (item.href === '/dashboard') {
            if (currentUser) {
              label = currentUser.type === 'customer' ? currentUser.name.split(' ')[0] : currentUser.shopName;
            } else {
              label = "প্রোফাইল";
            }
          }
          
          if (!currentUser && item.href !== '/') {
            href = '/login';
          }

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs w-20 pt-1 text-muted-foreground transition-colors",
                isActive && "text-primary"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="truncate max-w-full">{label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
