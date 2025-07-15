import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 章节信息接口
export interface Chapter {
  id: string;
  title: string;
  completed: boolean;
  progress: number; // 0-100
}

// 训练参数接口
export interface TrainingParams {
  learningRate: number;
  batchSize: number;
  epochs: number;
  optimizer: 'adam' | 'sgd' | 'rmsprop';
  warmupSteps: number;
}

// 应用状态接口
interface AppState {
  // 章节相关
  chapters: Chapter[];
  currentChapter: string;
  sidebarCollapsed: boolean;
  
  // 训练模拟相关
  trainingParams: TrainingParams;
  trainingHistory: Array<{
    epoch: number;
    loss: number;
    accuracy?: number;
    timestamp: number;
  }>;
  isTraining: boolean;
  
  // 暗黑模式
  isDarkMode: boolean;
  
  // 动作方法
  setCurrentChapter: (chapterId: string) => void;
  updateChapterProgress: (chapterId: string, progress: number) => void;
  markChapterCompleted: (chapterId: string) => void;
  toggleSidebar: () => void;
  
  updateTrainingParams: (params: Partial<TrainingParams>) => void;
  addTrainingRecord: (record: { epoch: number; loss: number; accuracy?: number }) => void;
  setTrainingStatus: (isTraining: boolean) => void;
  clearTrainingHistory: () => void;
  
  toggleDarkMode: () => void;
}

// 默认章节列表
const defaultChapters: Chapter[] = [
  { id: 'intro', title: '大模型简介', completed: false, progress: 0 },
  { id: 'data', title: '数据收集与清洗', completed: false, progress: 0 },
  { id: 'tokenization', title: '分词与词表', completed: false, progress: 0 },
  { id: 'transformer', title: '模型结构与 Transformer 原理', completed: false, progress: 0 },
  { id: 'pretraining', title: '预训练流程', completed: false, progress: 0 },
  { id: 'hyperparams', title: '超参数调节实验', completed: false, progress: 0 },
  { id: 'scaling', title: '检查点与规模化技巧', completed: false, progress: 0 },
  { id: 'posttraining', title: '后训练：SFT、LoRA、RLHF', completed: false, progress: 0 },
  { id: 'inference', title: '推理与部署优化', completed: false, progress: 0 },
  { id: 'evaluation', title: '模型评估与安全性', completed: false, progress: 0 },
  { id: 'realmodels', title: '🔬 真实模型集成', completed: false, progress: 0 },
  { id: 'gpu', title: '⚡ GPU架构与推理优化', completed: false, progress: 0 },
  { id: 'resources', title: '延伸阅读与资源', completed: false, progress: 0 },
];

// 默认训练参数
const defaultTrainingParams: TrainingParams = {
  learningRate: 0.001,
  batchSize: 32,
  epochs: 10,
  optimizer: 'adam',
  warmupSteps: 100,
};

// 创建 Zustand store
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      chapters: defaultChapters,
      currentChapter: 'intro',
      sidebarCollapsed: false,
      
      trainingParams: defaultTrainingParams,
      trainingHistory: [],
      isTraining: false,
      
      isDarkMode: false,
      
      // 章节相关方法
      setCurrentChapter: (chapterId: string) => {
        set({ currentChapter: chapterId });
      },
      
      updateChapterProgress: (chapterId: string, progress: number) => {
        set((state) => ({
          chapters: state.chapters.map((chapter) =>
            chapter.id === chapterId
              ? { ...chapter, progress: Math.min(100, Math.max(0, progress)) }
              : chapter
          ),
        }));
      },
      
      markChapterCompleted: (chapterId: string) => {
        set((state) => ({
          chapters: state.chapters.map((chapter) =>
            chapter.id === chapterId
              ? { ...chapter, completed: true, progress: 100 }
              : chapter
          ),
        }));
      },
      
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },
      
      // 训练相关方法
      updateTrainingParams: (params: Partial<TrainingParams>) => {
        set((state) => ({
          trainingParams: { ...state.trainingParams, ...params },
        }));
      },
      
      addTrainingRecord: (record: { epoch: number; loss: number; accuracy?: number }) => {
        set((state) => ({
          trainingHistory: [
            ...state.trainingHistory,
            { ...record, timestamp: Date.now() },
          ],
        }));
      },
      
      setTrainingStatus: (isTraining: boolean) => {
        set({ isTraining });
      },
      
      clearTrainingHistory: () => {
        set({ trainingHistory: [] });
      },
      
      // 主题切换
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          // 更新 DOM 主题类
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newDarkMode };
        });
      },
    }),
    {
      name: 'llm-learning-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        chapters: state.chapters,
        currentChapter: state.currentChapter,
        sidebarCollapsed: state.sidebarCollapsed,
        trainingParams: state.trainingParams,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

// 便捷选择器 hooks
export const useChapters = () => useStore((state) => state.chapters);
export const useCurrentChapter = () => useStore((state) => state.currentChapter);
export const useSidebarCollapsed = () => useStore((state) => state.sidebarCollapsed);
export const useTrainingParams = () => useStore((state) => state.trainingParams);
export const useTrainingHistory = () => useStore((state) => state.trainingHistory);
export const useIsTraining = () => useStore((state) => state.isTraining);
export const useIsDarkMode = () => useStore((state) => state.isDarkMode);