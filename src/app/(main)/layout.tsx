import AppSidebar from '@/components/layout/sidebar';
import AppHeader from '@/components/layout/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
