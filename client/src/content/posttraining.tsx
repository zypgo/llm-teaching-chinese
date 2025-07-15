import React from 'react';
import { Target, Wrench, Users } from 'lucide-react';

export const PosttrainingContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Target className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">监督微调</h3>
          <p className="text-muted-foreground">SFT 任务适应训练</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Wrench className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">参数高效</h3>
          <p className="text-muted-foreground">LoRA 适配器训练</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Users className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">人类反馈</h3>
          <p className="text-muted-foreground">RLHF 偏好优化</p>
        </div>
      </div>

      <div>
        <h2>后训练：SFT、LoRA、RLHF</h2>
        <p>
          预训练模型虽然具备了基础的语言理解能力，但往往需要针对具体任务进行进一步优化。
          后训练技术能够让通用模型适应特定领域或任务要求，提升实用性。
        </p>

        <h3>监督微调（Supervised Fine-Tuning, SFT）</h3>
        <div className="space-y-4">
          <p>
            SFT 是最直接的后训练方法，使用任务相关的标注数据对预训练模型进行监督学习。
          </p>
          
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">适用场景</h4>
            <ul className="text-sm space-y-1">
              <li>• 特定领域适应（医疗、法律、金融等）</li>
              <li>• 任务格式学习（问答、摘要、翻译等）</li>
              <li>• 输出风格调整（正式、友好、技术性等）</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-medium mb-2">SFT 训练流程</h4>
            <ol className="text-sm space-y-1">
              <li>1. 准备高质量的指令-回答对数据</li>
              <li>2. 使用较小的学习率（通常为预训练的 1/10）</li>
              <li>3. 短期训练（1-3 个 epoch）避免过拟合</li>
              <li>4. 在验证集上监控性能，及时停止</li>
            </ol>
          </div>
        </div>

        <h3>LoRA（Low-Rank Adaptation）</h3>
        <div className="space-y-4">
          <p>
            LoRA 是一种参数高效的微调方法，通过低秩矩阵分解来减少可训练参数数量。
          </p>

          <div className="my-6 p-6 rounded-lg bg-accent/50 border border-accent">
            <h4 className="font-medium mb-4">LoRA 核心思想</h4>
            <div className="text-center">
              <div className="text-lg font-mono mb-2">
                W = W₀ + ΔW = W₀ + BA
              </div>
              <div className="text-sm text-muted-foreground">
                <p>W₀: 预训练权重（冻结）</p>
                <p>B, A: 低秩矩阵（可训练）</p>
                <p>rank(BA) &lt;&lt; rank(W₀)</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-medium text-success mb-2">LoRA 优势</h4>
              <ul className="text-sm space-y-1">
                <li>✓ 参数量减少 1000 倍</li>
                <li>✓ 训练速度提升显著</li>
                <li>✓ 可插拔式部署</li>
                <li>✓ 避免灾难性遗忘</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <h4 className="font-medium text-warning mb-2">配置要点</h4>
              <ul className="text-sm space-y-1">
                <li>• rank: 通常设为 8-64</li>
                <li>• alpha: 缩放因子，影响适应强度</li>
                <li>• target_modules: 选择关键层</li>
                <li>• dropout: 防止过拟合</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>人类反馈强化学习（RLHF）</h3>
        <div className="space-y-4">
          <p>
            RLHF 通过人类偏好反馈来优化模型行为，使其更符合人类价值观和期望。
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <h4 className="font-medium mb-2 text-info">第一阶段：奖励模型训练</h4>
              <p className="text-sm text-muted-foreground mb-2">
                训练一个奖励模型来预测人类对输出的偏好评分
              </p>
              <ul className="text-sm space-y-1">
                <li>• 收集人类比较数据（A vs B 偏好）</li>
                <li>• 训练分类器预测偏好概率</li>
                <li>• 使用 Bradley-Terry 模型建模偏好</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-medium mb-2 text-success">第二阶段：强化学习优化</h4>
              <p className="text-sm text-muted-foreground mb-2">
                使用 PPO 算法根据奖励模型优化生成策略
              </p>
              <ul className="text-sm space-y-1">
                <li>• 生成候选回答</li>
                <li>• 奖励模型评分</li>
                <li>• PPO 更新策略网络</li>
                <li>• 加入 KL 散度约束防止过度偏移</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>对比分析</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">方法</th>
                <th className="border border-border p-3 text-left">参数量</th>
                <th className="border border-border p-3 text-left">训练成本</th>
                <th className="border border-border p-3 text-left">效果</th>
                <th className="border border-border p-3 text-left">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-mono">Full SFT</td>
                <td className="border border-border p-3">100%</td>
                <td className="border border-border p-3">高</td>
                <td className="border border-border p-3">最佳</td>
                <td className="border border-border p-3">资源充足的任务适应</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">LoRA</td>
                <td className="border border-border p-3">0.1%</td>
                <td className="border border-border p-3">低</td>
                <td className="border border-border p-3">良好</td>
                <td className="border border-border p-3">资源受限的快速适应</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">RLHF</td>
                <td className="border border-border p-3">变化</td>
                <td className="border border-border p-3">极高</td>
                <td className="border border-border p-3">优秀</td>
                <td className="border border-border p-3">对话系统，安全性要求高</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>实践建议</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-primary">
            <h4 className="font-medium text-primary">数据质量优先</h4>
            <p className="text-sm">少量高质量数据胜过大量低质量数据</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">渐进式训练</h4>
            <p className="text-sm">先 SFT 再 RLHF，逐步提升模型能力</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">评估体系</h4>
            <p className="text-sm">建立多维度评估指标，不仅关注性能</p>
          </div>
        </div>

        <h3>新兴技术趋势</h3>
        <ul>
          <li><strong>Constitutional AI</strong>：基于原则的 AI 对齐方法</li>
          <li><strong>Direct Preference Optimization</strong>：简化的偏好优化</li>
          <li><strong>Multi-task LoRA</strong>：支持多任务的适配器</li>
          <li><strong>Few-shot ICL</strong>：上下文学习替代微调</li>
        </ul>

        <blockquote>
          后训练技术的选择需要根据具体需求、资源约束和安全要求来决定。
          LoRA 提供了效率，RLHF 提供了对齐，而传统 SFT 依然是最可靠的基础方法。
        </blockquote>
      </div>
    </div>
  );
};