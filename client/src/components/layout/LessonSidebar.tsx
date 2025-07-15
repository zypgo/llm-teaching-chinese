import React from 'react';
import { 
  BookOpen, 
  Database, 
  Type,
  Brain,
  Play,
  Settings,
  CheckCircle,
  Server,
  Shield,
  BookMarked,
  CircleDot,
  Microscope,
  Zap
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

// 章节图标映射
const chapterIcons = {
  intro: BookOpen,
  data: Database,
  tokenization: Type,
  transformer: Brain,
  pretraining: Play,
  hyperparams: Settings,
  scaling: CheckCircle,
  posttraining: Server,
  inference: CircleDot,
  evaluation: Shield,
  realmodels: Microscope,
  gpu: Zap,
  resources: BookMarked,
};

export const LessonSidebar: React.FC = () => {
  const sidebarContext = useSidebar();
  const collapsed = sidebarContext?.state === 'collapsed';
  const { 
    chapters, 
    currentChapter, 
    setCurrentChapter 
  } = useStore();

  const handleChapterClick = (chapterId: string) => {
    setCurrentChapter(chapterId);
    // 平滑滚动到对应章节
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 计算总体进度
  const totalProgress = chapters.reduce((sum, chapter) => sum + chapter.progress, 0) / chapters.length;

  return (
    <Sidebar className={cn(
      "border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-80"
    )}>
      <SidebarContent>
        {/* 品牌标题 */}
        <div className="p-6 border-b border-sidebar-border">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">
                LLM 全流程学习
              </h1>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <Brain className="h-8 w-8 text-sidebar-primary" />
            </div>
          )}
        </div>

        {/* 章节列表 */}
        <SidebarGroup>
          <SidebarGroupLabel>学习章节</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chapters.map((chapter) => {
                const Icon = chapterIcons[chapter.id as keyof typeof chapterIcons] || BookOpen;
                const isActive = currentChapter === chapter.id;
                
                return (
                  <SidebarMenuItem key={chapter.id}>
                    <SidebarMenuButton
                      onClick={() => handleChapterClick(chapter.id)}
                      className={cn(
                        "w-full justify-start transition-all duration-200",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                        !isActive && "hover:bg-sidebar-accent/50"
                      )}
                    >
                      <div className="flex items-center w-full">
                        <Icon className={cn(
                          "h-5 w-5 mr-3 transition-colors",
                          isActive && "text-sidebar-primary",
                          chapter.completed && "text-success"
                        )} />
                        
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="truncate text-sm">
                              {chapter.title}
                            </div>
                            {chapter.progress > 0 && (
                              <div className="mt-1">
                                <Progress 
                                  value={chapter.progress} 
                                  className="h-1"
                                />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {!collapsed && chapter.completed && (
                          <CheckCircle className="h-4 w-4 text-success ml-2" />
                        )}
                      </div>
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
};