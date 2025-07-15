import React from 'react';
import { Brain, Sparkles, TrendingUp } from 'lucide-react';

export const IntroContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">智能学习</h3>
          <p className="text-muted-foreground">系统性掌握大模型技术栈</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Sparkles className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">实践导向</h3>
          <p className="text-muted-foreground">代码示例和交互实验</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <TrendingUp className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">循序渐进</h3>
          <p className="text-muted-foreground">从基础到高级的完整路径</p>
        </div>
      </div>

      <div>
        <h2>什么是大型语言模型（LLM）？</h2>
        <p>
          大型语言模型（Large Language Model，LLM）是基于 Transformer 架构的深度学习模型，
          通过在大规模文本数据上进行预训练，能够理解和生成人类语言。这些模型展现出了令人印象深刻的
          语言理解、推理和创作能力。
        </p>

        <h3>核心特征</h3>
        <ul>
          <li><strong>规模庞大</strong>：参数量通常在数十亿到数千亿级别</li>
          <li><strong>预训练机制</strong>：在海量无标注文本数据上进行自监督学习</li>
          <li><strong>涌现能力</strong>：在达到一定规模后展现出意想不到的能力</li>
          <li><strong>通用性强</strong>：可以处理多种自然语言处理任务</li>
        </ul>

        <h3>发展历程</h3>
        <p>
          从 2017 年 Transformer 架构的提出，到 GPT 系列、BERT、T5 等模型的发展，
          再到 ChatGPT、GPT-4 等对话式 AI 的突破，大模型技术经历了快速发展。
        </p>

        <h3>应用领域</h3>
        <ul>
          <li>自然语言处理：文本生成、翻译、摘要</li>
          <li>对话系统：智能客服、AI 助手</li>
          <li>代码生成：程序辅助编写、调试</li>
          <li>创意写作：小说、诗歌、剧本创作</li>
          <li>教育辅助：个性化学习、答疑解惑</li>
        </ul>

        <blockquote>
          本课程将带你深入理解大模型的完整生命周期，从数据准备、模型架构、
          预训练流程到后训练优化和部署应用，让你全面掌握 LLM 技术栈。
        </blockquote>
      </div>
    </div>
  );
};