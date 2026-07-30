import { Navbar } from '@/components/shared/navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './_components/DashboardSidebar';
import { getMe } from '@/service/getMe';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();

    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Normal Top Navbar */}
            <Navbar user={user} />

            {/* Sidebar + Page Content Area */}
            <SidebarProvider>
                <div className="flex flex-1">
                    <DashboardSidebar user={user} />
                    <main className="flex-1 p-6">
                        <SidebarTrigger className="mb-4" />
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout;