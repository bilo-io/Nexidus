import {
    Calendar,
    Home,
    Inbox,
    LucideProps,
    Search,
    Settings
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

export interface AppSidebarItem {
    title: string | React.ReactElement;
    url: string;
    icon: string | React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export interface AppSidebarGroup {
    name: string,
    items?: AppSidebarItem[],
}

export function AppSidebar({
    // hasGroups,
    items,
    groups
}: {
    hasGroups?: boolean;
    items?: AppSidebarItem[],
    groups?: AppSidebarGroup[]
}) {
    return (
        <Sidebar>
            <SidebarHeader>
                Header
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupContent>

                    <SidebarMenu>
                        {
                            groups ? groups.map((group: AppSidebarGroup) => (
                                <SidebarGroup key={group.name}>
                                    {group?.name?.length > 0
                                        ? <SidebarGroupLabel>{group?.name}</SidebarGroupLabel>
                                        : null
                                    }
                                    {
                                        group.items?.map((item: AppSidebarItem, i: number) => (
                                            <SidebarMenuItem key={`${i}-${item?.title as string}`}>
                                                <SidebarMenuButton asChild>
                                                    <a href={item?.url}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </SidebarGroup>
                            ))
                                : null
                        }

                        {
                            items ? (
                                <SidebarGroup>
                                    {
                                        items?.map((item: AppSidebarItem, i: number) => (
                                            <SidebarMenuItem key={`${i}-${item?.title as string}`}>
                                                <SidebarMenuButton asChild>
                                                    <a href={item?.url}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </SidebarGroup>

                            ) : null
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
                {/* <SidebarGroup>
                    <SidebarGroupLabel>Features</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {(items || defaultItems)?.map((item: AppSidebarItem, i: number) => (
                                <SidebarMenuItem key={`${i}-${item?.title as string}`}>
                                    <SidebarMenuButton asChild>
                                        <a href={item?.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
            </SidebarContent>
            <SidebarFooter>
                Footer
            </SidebarFooter>
        </Sidebar >
    )
}
