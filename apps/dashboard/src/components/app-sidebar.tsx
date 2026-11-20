"use client";

import * as React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/sidebar";

import {
  OrganizationSwitcher,
  type OrganizationOption,
} from "./organization-switcher";

import { NavUser } from "./nav-user";

type SidebarUser = {
  name: string;
  email: string;
  avatar: string | null;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: SidebarUser;
  organizations: OrganizationOption[];
  activeOrganizationId: string | null;
};

export function AppSidebar({
  user,
  organizations,
  activeOrganizationId,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          orgs={organizations}
          activeOrganizationId={activeOrganizationId}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/website">Website</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/domains">Domains</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}