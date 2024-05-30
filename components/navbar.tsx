"use client";
import icon from "@/app/icon.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LayoutDashboardIcon } from "lucide-react";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
export default function Navigation({ session }: { session: Session | null }) {
  const { name, email, image } = session?.user || {};
  const navigationItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[] = [
      {
        icon: <LayoutDashboardIcon />,
        label: "Dashboard",
        href: "/",
      },
    ];
  return (
    <div className="flex h-16 min-w-full items-center justify-between bg-background/70 backdrop-blur-md px-6 z-50 fixed -mt-16">
      <div className="flex items-center justify-start">
        <Image src={icon} alt="z1g Project" className="size-8" />
        <span className="ml-2 mr-4 text-xl font-bold">z1g Project</span>
        <NavigationMenu className="flex items-center justify-start">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="mr-2 flex size-4 items-center justify-center">
                      {item.icon}
                    </span>{" "}
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={image || ""} />
              <AvatarFallback>
                {name ? name?.charAt(0) : email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 mt-4 w-48">
            <DropdownMenuLabel>
              <p>{name || email}</p>
              <p className="text-xs font-light text-muted-foreground">
                {name ? email : name}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/logout">Log Out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
