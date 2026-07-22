'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { User, LogOut, Settings, HelpCircle, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Navigation items configuration
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
];

// User dropdown items configuration
const userMenuItems = [
    { label: 'Profile', icon: User, id: 'profile' },
    { label: 'Settings', icon: Settings, id: 'settings' },
    { label: 'Help', icon: HelpCircle, id: 'help' },
    { label: 'Logout', icon: LogOut, id: 'logout', isDanger: true },
];

type IUser = {
    success: boolean;
    message: string,
    data: {
        profile: {
            name: string;
            id: string;
            email: string;
            activeStatus: string;
            role: string;
            createdAt: string;
            updatedAt: string;
            profile: {
                id: string;
                profilePhoto: string | null;
                bio: string | null;
                userId: string;
                createdAt: string;
                updatedAt: string;
            }
        }
    }
}

type NavbarProps = {
    user: IUser;
}

export function Navbar({ user }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleMenuBarAction = (actionId: string) => {
        console.log(`[v0] Menu action triggered: ${actionId}`);

        switch (actionId) {
            case 'profile':
                console.log('[v0] Navigating to profile page');
                router.push('/profile');
                break;

            case 'settings':
                console.log('[v0] Navigating to settings page');
                router.push('/settings');
                break;

            case 'help':
                console.log('[v0] Opening help/support');
                // Example: Open help modal, redirect to help page, or open support chat
                router.push('/help');
                break;

            case 'logout':
                console.log('[v0] Logging out user');
                // Example: Call logout API, clear auth state, redirect to login
                // await logoutUser();
                // router.push('/login');
                console.log('[v0] User logged out successfully');
                break;

            default:
                console.log(`[v0] Unknown action: ${actionId}`);
        }
    };

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-center gap-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 font-semibold text-lg shrink-0 absolute left-4">
                    <div className="px-2 py-1 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        NextJS Press
                    </div>
                    {/* <span className="hidden sm:inline">MyApp</span> */}
                </Link>

                {/* Navigation Links - Centered (Desktop) */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button variant="ghost" size="sm">
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden absolute left-16">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsOpen(true)}
                            className="md:hidden"
                        >
                            <Menu className="size-4" />
                        </Button>

                        <SheetContent side="left" className="w-64">
                            <SheetHeader>
                                <SheetTitle>Navigation</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 mt-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* User Dropdown Menu - Right */}
                <div className="absolute right-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <span className="">{user.data.profile.name || "Name"}</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>{user.data.profile.email || "Email"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {userMenuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <DropdownMenuItem
                                        key={item.id}
                                        onClick={() => handleMenuBarAction(item.id)}
                                        className={item.isDanger ? 'text-destructive focus:text-destructive' : ''}
                                    >
                                        <Icon className="mr-2 size-4" />
                                        <span>{item.label}</span>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
