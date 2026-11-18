"use client";

import * as React from "react";
import { Building2, ChevronsUpDown, Plus } from "lucide-react";

import { switchOrganization } from "@/app/actions/switch-organization";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/sidebar";

export type OrganizationOption = {
  id: string;
  name: string;
  role: string;
};

export function OrganizationSwitcher({
  orgs,
  activeOrganizationId,
}: {
  orgs: OrganizationOption[];
  activeOrganizationId: string | null;
}) {
  const { isMobile } = useSidebar();
  const [isPending, startTransition] = React.useTransition();

  const activeOrg = orgs.find(
    (org) => org.id === activeOrganizationId
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              disabled={isPending}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Building2 className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeOrg?.name ?? "Select organization"}
                </span>
                <span className="truncate text-xs">
                  {activeOrg?.role ?? "No active organization"}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>

            {orgs.map((org) => (
              <DropdownMenuItem
                key={org.id}
                disabled={isPending}
                onClick={() => {
                  if (org.id === activeOrganizationId) return;

                  startTransition(async () => {
                    await switchOrganization(org.id);
                  });
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Building2 className="size-3.5 shrink-0" />
                </div>

                <div className="flex flex-col">
                  <span>{org.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {org.role}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem disabled className="gap-2 p-2">
              <Plus className="size-4" />
              Add organization
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}