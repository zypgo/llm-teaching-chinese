import React from 'react';
import { Play, TrendingUp, Cpu } from 'lucide-react';
import { CodeTabs } from '@/components/interactive/CodeTabs';
import { TrainingSim } from '@/components/interactive/TrainingSim';

export const PretrainingContent: React.FC = () => {
  const pretrainingCode = {
    pytorch: `# PyTorch 预训练核心代码
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from transformers import GPT2Config, GPT2LMHeadModel
import math

class PreTrainingLoop:
    def __init__(self, model, tokenizer, device='cuda'):
        self.model = model.to(device)
        self.tokenizer = tokenizer
        self.device = device
        
        # 优化器配置
        self.optimizer = torch.optim.AdamW(
            model.parameters(),
            lr=1e-4,
            betas=(0.9, 0.95),
            weight_decay=0.1
        )
        
        # 学习率调度器
        self.scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
            self.optimizer, T_max=10000
        )
        
    def train_step(self, batch):
        """单步训练"""
        self.model.train()
        self.optimizer.zero_grad()
        
        # 前向传播
        input_ids = batch['input_ids'].to(self.device)
        attention_mask = batch['attention_mask'].to(self.device)
        
        outputs = self.model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=input_ids  # 自回归任务
        )
        
        loss = outputs.loss
        perplexity = torch.exp(loss)
        
        # 反向传播
        loss.backward()
        
        # 梯度裁剪
        torch.nn.utils.clip_grad_norm_(self.model.parameters(), 1.0)
        
        # 参数更新
        self.optimizer.step()
        self.scheduler.step()
        
        return {
            'loss': loss.item(),
            'perplexity': perplexity.item(),
            'learning_rate': self.scheduler.get_last_lr()[0]
        }
        
    def train_epoch(self, dataloader, epoch):
        """训练一个 epoch"""
        total_loss = 0
        num_batches = 0
        
        for step, batch in enumerate(dataloader):
            metrics = self.train_step(batch)
            total_loss += metrics['loss']
            num_batches += 1
            
            # 记录训练进度
            if step % 100 == 0:
                print(f"Epoch {epoch}, Step {step}: "
                      f"Loss={metrics['loss']:.4f}, "
                      f"PPL={metrics['perplexity']:.2f}, "
                      f"LR={metrics['learning_rate']:.2e}")
                      
        return total_loss / num_batches`,
        
    tensorflow: `# TensorFlow 预训练实现
import tensorflow as tf
from transformers import TFAutoModel, AutoTokenizer
import numpy as np

class TFPreTrainer:
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer
        
        # 优化器配置
        self.optimizer = tf.keras.optimizers.AdamW(
            learning_rate=1e-4,
            beta_1=0.9,
            beta_2=0.95,
            weight_decay=0.1
        )
        
        # 损失函数
        self.loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(
            from_logits=True, reduction=tf.keras.losses.Reduction.NONE
        )
        
    @tf.function
    def train_step(self, input_ids, attention_mask):
        """使用 tf.function 装饰的训练步骤"""
        with tf.GradientTape() as tape:
            # 前向传播
            outputs = self.model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                training=True
            )
            
            # 计算损失（下一个词预测）
            shift_logits = outputs.logits[..., :-1, :]
            shift_labels = input_ids[..., 1:]
            
            # 应用注意力掩码
            mask = attention_mask[..., 1:]
            loss = self.loss_fn(shift_labels, shift_logits)
            loss = tf.reduce_sum(loss * tf.cast(mask, tf.float32))
            loss = loss / tf.reduce_sum(tf.cast(mask, tf.float32))
            
        # 反向传播
        gradients = tape.gradient(loss, self.model.trainable_variables)
        
        # 梯度裁剪
        gradients = [tf.clip_by_norm(g, 1.0) for g in gradients]
        
        # 参数更新
        self.optimizer.apply_gradients(
            zip(gradients, self.model.trainable_variables)
        )
        
        return loss, tf.exp(loss)  # 返回损失和困惑度
        
    def create_training_dataset(self, texts, batch_size=8, max_length=512):
        """创建训练数据集"""
        def generator():
            for text in texts:
                encoded = self.tokenizer(
                    text,
                    max_length=max_length,
                    truncation=True,
                    padding='max_length',
                    return_tensors='tf'
                )
                yield {
                    'input_ids': encoded['input_ids'][0],
                    'attention_mask': encoded['attention_mask'][0]
                }
        
        dataset = tf.data.Dataset.from_generator(
            generator,
            output_types={
                'input_ids': tf.int32,
                'attention_mask': tf.int32
            },
            output_shapes={
                'input_ids': tf.TensorShape([max_length]),
                'attention_mask': tf.TensorShape([max_length])
            }
        )
        
        return dataset.batch(batch_size).prefetch(tf.data.AUTOTUNE)`
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Play className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">训练流程</h3>
          <p className="text-muted-foreground">系统化的预训练方法</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">损失监控</h3>
          <p className="text-muted-foreground">实时追踪训练进度</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Cpu className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">计算优化</h3>
          <p className="text-muted-foreground">高效利用计算资源</p>
        </div>
      </div>

      <div>
        <h2>预训练流程详解</h2>
        <p>
          预训练是大语言模型获得通用语言理解能力的关键阶段。通过在大规模无标注文本上
          进行自监督学习，模型能够学习到丰富的语言知识和模式。
        </p>

        <h3>预训练目标</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">因果语言建模（CLM）</h4>
            <p className="text-sm text-muted-foreground">
              如 GPT 系列，给定前文预测下一个词，适合文本生成任务。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">掩码语言建模（MLM）</h4>
            <p className="text-sm text-muted-foreground">
              如 BERT，随机掩码部分词汇并预测，适合文本理解任务。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">前缀语言建模（PLM）</h4>
            <p className="text-sm text-muted-foreground">
              如 GLM，结合双向编码和自回归生成的优势。
            </p>
          </div>
        </div>

        <h3>训练超参数配置</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">参数</th>
                <th className="border border-border p-3 text-left">推荐值</th>
                <th className="border border-border p-3 text-left">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-mono">learning_rate</td>
                <td className="border border-border p-3">1e-4 ~ 5e-4</td>
                <td className="border border-border p-3">学习率，影响收敛速度</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">batch_size</td>
                <td className="border border-border p-3">8-64</td>
                <td className="border border-border p-3">批量大小，根据显存调整</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">warmup_steps</td>
                <td className="border border-border p-3">2000-10000</td>
                <td className="border border-border p-3">学习率预热步数</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">weight_decay</td>
                <td className="border border-border p-3">0.01-0.1</td>
                <td className="border border-border p-3">权重衰减，防止过拟合</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>实际训练代码</h3>
        <p>
          以下展示了 PyTorch 和 TensorFlow 的预训练实现：
        </p>

        <CodeTabs codes={pretrainingCode} />

        <h3>交互式训练模拟</h3>
        <p>
          下面的组件可以让你直观体验不同超参数对训练过程的影响：
        </p>

        <TrainingSim />

        <h3>训练技巧与优化</h3>
        <ul>
          <li><strong>梯度累积</strong>：在显存受限时模拟大批量训练</li>
          <li><strong>混合精度</strong>：使用 FP16 降低显存占用和训练时间</li>
          <li><strong>梯度裁剪</strong>：防止梯度爆炸，通常设为 1.0</li>
          <li><strong>学习率调度</strong>：余弦退火或线性衰减</li>
          <li><strong>检查点保存</strong>：定期保存模型状态</li>
        </ul>

        <h3>常见问题排查</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-destructive">
            <h4 className="font-medium text-destructive">损失不下降</h4>
            <p className="text-sm">检查学习率是否过大/过小，数据是否正确加载</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">显存溢出</h4>
            <p className="text-sm">减小批量大小，使用梯度累积，启用混合精度</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-info">
            <h4 className="font-medium text-info">训练速度慢</h4>
            <p className="text-sm">优化数据加载，使用多 GPU 并行，检查 I/O 瓶颈</p>
          </div>
        </div>

        <blockquote>
          预训练是一个资源密集的过程，需要仔细监控训练指标和资源使用情况。
          合理的超参数设置和优化技巧能显著提升训练效率。
        </blockquote>
      </div>
    </div>
  );
};