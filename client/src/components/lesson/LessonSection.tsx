import React, { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface LessonSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const LessonSection: React.FC<LessonSectionProps> = ({
  id,
  title,
  children,
  className
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentChapter, updateChapterProgress } = useStore();
  
  const isActive = currentChapter === id;

  // 监听滚动，更新进度
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // 如果用户正在查看此章节，更新进度
            updateChapterProgress(id, 25); // 基础查看进度
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [id, updateChapterProgress]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "pt-12 pb-16 scroll-mt-20 transition-all duration-300",
        isActive && "animate-fade-in-up",
        className
      )}
    >
      {/* 章节标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 gradient-primary bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-glow rounded-full"></div>
      </div>

      {/* 章节内容 */}
      <div className="lesson-card prose-custom">
        {children}
      </div>
    </section>
  );
};