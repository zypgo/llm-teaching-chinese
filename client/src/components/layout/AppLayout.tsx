import React, { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LessonSidebar } from './LessonSidebar';
import { TopHeader } from './TopHeader';
import { MainContent } from './MainContent';
import { useStore } from '@/store/useStore';

export const AppLayout: React.FC = () => {
  const { isDarkMode, sidebarCollapsed } = useStore();

  // 初始化主题
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <LessonSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopHeader />
          <MainContent />
        </div>
      </div>
    </SidebarProvider>
  );
};