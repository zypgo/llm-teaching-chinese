import React from 'react';
import { IntroContent } from './intro';
import { DataContent } from './data';
import { TokenizationContent } from './tokenization';
import { TransformerContent } from './transformer';
import { PretrainingContent } from './pretraining';
import { HyperparamsContent } from './hyperparams';
import { ScalingContent } from './scaling';
import { PosttrainingContent } from './posttraining';
import { InferenceContent } from './inference';
import { EvaluationContent } from './evaluation';
import { ResourcesContent } from './resources';
import { RealModelsContent } from './realmodels';
import { GPUContent } from './gpu';

export interface ChapterData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const chapters: ChapterData[] = [
  {
    id: 'intro',
    title: '大模型简介',
    content: <IntroContent />
  },
  {
    id: 'data',
    title: '数据收集与清洗',
    content: <DataContent />
  },
  {
    id: 'tokenization',
    title: '分词与词表',
    content: <TokenizationContent />
  },
  {
    id: 'transformer',
    title: '模型结构与 Transformer 原理',
    content: <TransformerContent />
  },
  {
    id: 'pretraining',
    title: '预训练流程',
    content: <PretrainingContent />
  },
  {
    id: 'hyperparams',
    title: '超参数调节实验',
    content: <HyperparamsContent />
  },
  {
    id: 'scaling',
    title: '检查点与规模化技巧',
    content: <ScalingContent />
  },
  {
    id: 'posttraining',
    title: '后训练：SFT、LoRA、RLHF',
    content: <PosttrainingContent />
  },
  {
    id: 'inference',
    title: '推理与部署优化',
    content: <InferenceContent />
  },
  {
    id: 'evaluation',
    title: '模型评估与安全性',
    content: <EvaluationContent />
  },
  {
    id: 'realmodels',
    title: '🔬 真实模型集成',
    content: <RealModelsContent />
  },
  {
    id: 'gpu',
    title: '⚡ GPU架构与推理优化',
    content: <GPUContent />
  },
  {
    id: 'resources',
    title: '延伸阅读与资源',
    content: <ResourcesContent />
  }
];