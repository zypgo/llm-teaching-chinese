import React from 'react';
import { LessonSection } from '@/components/lesson/LessonSection';
import { chapters } from '@/content/chapters';

export const MainContent: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {chapters.map((chapter) => (
          <LessonSection
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
          >
            {chapter.content}
          </LessonSection>
        ))}
      </div>
    </main>
  );
};