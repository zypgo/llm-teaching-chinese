import React from 'react';
import { Brain, Layers, Zap } from 'lucide-react';
import { TransformerArchitecture } from '@/components/visualization/TransformerArchitecture';
import { AttentionHeatmap } from '@/components/visualization/AttentionHeatmap';
import { EmbeddingSpace } from '@/components/visualization/EmbeddingSpace';
import { GradientFlow } from '@/components/visualization/GradientFlow';

export const TransformerContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">注意力机制</h3>
          <p className="text-muted-foreground">Self-Attention 的核心原理</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Layers className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">多层结构</h3>
          <p className="text-muted-foreground">编码器与解码器架构</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Zap className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">并行计算</h3>
          <p className="text-muted-foreground">高效的训练与推理</p>
        </div>
      </div>

      <div>
        <h2>Transformer 架构详解</h2>
        <p>
          Transformer 是现代大语言模型的核心架构，彻底改变了自然语言处理领域。
          它的核心创新是完全基于注意力机制，摒弃了传统的循环和卷积结构。
        </p>

        <h3>核心组件</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">自注意力机制（Self-Attention）</h4>
            <p className="text-sm text-muted-foreground">
              允许序列中的每个位置都能关注到其他所有位置，捕捉长距离依赖关系。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">位置编码（Positional Encoding）</h4>
            <p className="text-sm text-muted-foreground">
              为序列中的每个位置添加位置信息，让模型理解词语的顺序。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">前馈网络（Feed Forward）</h4>
            <p className="text-sm text-muted-foreground">
              两层全连接神经网络，增强模型的表达能力。
            </p>
          </div>
        </div>

        <h3>注意力机制公式</h3>
        <div className="my-6 p-6 rounded-lg bg-accent/50 border border-accent">
          <h4 className="font-medium mb-4">Scaled Dot-Product Attention</h4>
          <div className="text-center">
            <div className="text-lg font-mono mb-2">
              Attention(Q, K, V) = softmax(QK^T / √d_k)V
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Q: 查询矩阵 (Query)</p>
              <p>K: 键矩阵 (Key)</p>
              <p>V: 值矩阵 (Value)</p>
              <p>d_k: 键向量的维度</p>
            </div>
          </div>
        </div>

        <h3>多头注意力</h3>
        <p>
          多头注意力允许模型在不同的表示子空间中同时关注不同类型的信息：
        </p>
        <ul>
          <li>将 Q、K、V 分别线性变换为 h 个头</li>
          <li>对每个头独立计算注意力</li>
          <li>将所有头的输出拼接并进行线性变换</li>
        </ul>

        <h3>层归一化与残差连接</h3>
        <p>
          Transformer 中每个子层都使用残差连接和层归一化：
        </p>
        <div className="my-4 p-4 rounded-lg bg-muted/50 border">
          <div className="font-mono text-center">
            LayerNorm(x + SubLayer(x))
          </div>
        </div>

        <h3>GPT vs BERT 架构对比</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
            <h4 className="font-medium text-primary mb-2">GPT（生成式）</h4>
            <ul className="text-sm space-y-1">
              <li>仅使用 Transformer 解码器</li>
              <li>单向（因果）注意力掩码</li>
              <li>自回归生成文本</li>
              <li>适合文本生成任务</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-success/20 bg-success/5">
            <h4 className="font-medium text-success mb-2">BERT（理解式）</h4>
            <ul className="text-sm space-y-1">
              <li>仅使用 Transformer 编码器</li>
              <li>双向注意力机制</li>
              <li>掩码语言模型训练</li>
              <li>适合理解和分类任务</li>
            </ul>
          </div>
        </div>

        <h3>计算复杂度分析</h3>
        <p>
          相比 RNN 和 CNN，Transformer 的主要优势：
        </p>
        <ul>
          <li><strong>并行化</strong>：可以并行处理序列中的所有位置</li>
          <li><strong>长距离依赖</strong>：直接建模任意距离的词语关系</li>
          <li><strong>计算效率</strong>：在现代 GPU 上有更好的计算效率</li>
        </ul>

        <blockquote>
          Transformer 架构的成功不仅在于其技术创新，更在于它为大规模预训练模型
          奠定了基础，成为了 GPT、BERT、T5 等模型的共同基石。
        </blockquote>
      </div>

      {/* 3D架构可视化 */}
      <div className="space-y-4">
        <h2>🎯 3D架构可视化</h2>
        <p>通过3D交互视图深入理解Transformer的层级结构和数据流动过程：</p>
        <TransformerArchitecture />
      </div>

      {/* 注意力机制可视化 */}
      <div className="space-y-4">
        <h2>🔥 注意力权重热力图</h2>
        <p>实时观察自注意力机制如何分配注意力权重，理解词汇间的语义关联：</p>
        <AttentionHeatmap />
      </div>

      {/* 词嵌入空间 */}
      <div className="space-y-4">
        <h2>🌌 词嵌入空间探索</h2>
        <p>在3D空间中探索词向量的分布，直观理解语义相似性和聚类现象：</p>
        <EmbeddingSpace />
      </div>

      {/* 梯度反向传播 */}
      <div className="space-y-4">
        <h2>⚡ 梯度反向传播</h2>
        <p>可视化梯度在网络中的流动，理解深度学习的核心训练机制：</p>
        <GradientFlow />
      </div>
    </div>
  );
};