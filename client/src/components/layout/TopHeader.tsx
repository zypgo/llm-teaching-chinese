import React from 'react';
import { Moon, Sun, Menu, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useStore } from '@/store/useStore';

export const TopHeader: React.FC = () => {
  const { 
    currentChapter, 
    chapters, 
    isDarkMode, 
    toggleDarkMode 
  } = useStore();

  const currentChapterData = chapters.find(chapter => chapter.id === currentChapter);

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* 左侧：侧边栏切换 + 当前章节 */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-8 w-8" />
          
          <div className="flex items-center space-x-2 text-foreground">
            <Book className="h-5 w-5 text-primary" />
            <span className="font-medium">
              {currentChapterData?.title || '大模型学习平台'}
            </span>
          </div>
        </div>

        {/* 右侧：工具按钮 */}
        <div className="flex items-center space-x-2">
          {/* 暗黑模式切换 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="h-9 w-9 p-0"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};