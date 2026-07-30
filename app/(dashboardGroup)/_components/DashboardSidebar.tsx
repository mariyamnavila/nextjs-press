'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, User } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { sidebarMenuItems } from '../_config/sidebarMenuItems';
import { ISidebarItem, NavbarProps } from '@/lib/types';

// // Navigation links list
// const navItems = [
//     { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
//     { title: 'My Posts', url: '/dashboard/my-posts', icon: FileText },
//     { title: 'Profile', url: '/dashboard/profile', icon: User },
// ];

export function DashboardSidebar({ user }: NavbarProps) {
    const pathname = usePathname();
    // console.log(user.data)

    // const navItems = sidebarMenuItems.USER;
    let navItems: ISidebarItem[] = []
    if (user.data?.profile.role === "USER") {
        navItems = sidebarMenuItems.USER;
    } else if (user.data?.profile.role === "AUTHOR") {
        navItems = sidebarMenuItems.AUTHOR;
    } else if (user.data?.profile.role === "ADMIN") {
        navItems = sidebarMenuItems.ADMIN;
    }


    return (
        <Sidebar className="pt-16">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel font-semibold>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link href={item.href}>
                                                <Icon className="size-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
