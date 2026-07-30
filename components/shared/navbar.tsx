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
import { logout } from '@/service/logout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { NavbarProps } from '@/lib/types';

// Navigation items configuration
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'News', href: '/news' },
    { label: 'Premium', href: '/premium' },
];

// User dropdown items configuration
const userMenuItems = [
    { label: 'Profile', icon: User, id: 'profile' },
    { label: 'Dashboard', icon: HelpCircle, id: 'dashboard' },
    { label: 'Settings', icon: Settings, id: 'settings' },
    { label: 'Logout', icon: LogOut, id: 'logout', isDanger: true },
];

export function Navbar({ user }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleMenuBarAction = async (actionId: string) => {
        console.log(`[Navbar] Menu action triggered: ${actionId}`);

        if (actionId === "logout") {
            const toastId = toast.loading("Logging out...");
            try {
                await logout();
                toast.success("User Logged Out Successfully", { id: toastId });
                router.push("/login");
            } catch (error) {
                console.error("Logout error:", error);
                toast.error("Logout failed. Please try again.", { id: toastId });
            }
        } else if (actionId === "profile") {
            router.push("/dashboard/profile");
        } else if (actionId === "dashboard") {

            if (user.data?.profile.role === "USER") {
                router.push("/dashboard");
            } else if (user.data?.profile.role === "AUTHOR") {
                router.push("/author-dashboard");
            } else if (user.data?.profile.role === "ADMIN") {
                router.push("/admin-dashboard");
            }

        } else if (actionId === "settings") {
            toast.info("Settings page is under construction");
        }
    };

    const isLoggedIn = user?.success === true && !!user?.data;
    const name = user?.data?.profile?.name || "User";
    const email = user?.data?.profile?.email || "";
    const profilePhoto = user?.data?.profile?.profile?.profilePhoto;

    // Generate initials (e.g. "John Doe" -> "JD")
    const initials = name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || "U";

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-center gap-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 font-semibold text-lg shrink-0 absolute left-4">
                    <div className="px-3 py-1.5 rounded-xl bg-linear-to-r from-primary to-indigo-600 flex items-center justify-center text-primary-foreground font-bold tracking-tight shadow-sm hover:opacity-90 transition-all">
                        NextJS Press
                    </div>
                </Link>

                {/* Navigation Links - Centered (Desktop) */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
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
                            className="md:hidden rounded-lg border-border bg-background"
                        >
                            <Menu className="size-4 text-foreground/80" />
                        </Button>

                        <SheetContent side="left" className="w-64">
                            <SheetHeader>
                                <SheetTitle className="text-left font-bold text-xl bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                                    NextJS Press
                                </SheetTitle>
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
                                            className="w-full justify-start font-medium text-muted-foreground hover:text-foreground"
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* User Action - Right */}
                <div className="absolute right-4 flex items-center gap-4">
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-full border border-border bg-background/50 p-1 pr-3 hover:bg-accent/40 focus:outline-none transition-all duration-200 group cursor-pointer">
                                    <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-linear-to-br from-primary to-indigo-600 text-white font-semibold items-center justify-center shadow-inner">
                                        {profilePhoto ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={profilePhoto} alt={name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-xs tracking-wider font-bold">{initials}</span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground hidden sm:inline-block max-w-30 truncate">
                                        {name}
                                    </span>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                                <DropdownMenuLabel className="font-normal p-3">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold leading-none text-foreground">{name}</p>
                                            {user?.data?.profile?.role && (
                                                <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary capitalize ring-1 ring-inset ring-primary/20">
                                                    {user.data.profile.role.toLowerCase()}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs leading-none text-muted-foreground/80 truncate">{email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border/60" />

                                {userMenuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isLogoutItem = item.id === 'logout';
                                    return (
                                        <DropdownMenuItem
                                            key={item.id}
                                            variant={isLogoutItem ? "destructive" : "default"}
                                            onClick={() => handleMenuBarAction(item.id)}
                                            className="cursor-pointer rounded-xl"
                                        >
                                            <Icon className="size-4 mr-2" />
                                            <span>{item.label}</span>
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button
                                variant="default"
                                size="sm"
                                className="font-medium bg-linear-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-full px-5 cursor-pointer"
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

