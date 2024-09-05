import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { Link } from "@radix-ui/react-navigation-menu";

const NavBar = () => {
  return (
    <nav>
      <NavigationMenu className="relative z-10 flex justify-between p-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/actions">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Actions
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/settings">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;
