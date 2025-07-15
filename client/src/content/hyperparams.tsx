import React from 'react';
import { Settings, TrendingUp, Zap } from 'lucide-react';
import { ParamSlider } from '@/components/interactive/ParamSlider';

export const HyperparamsContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">参数调优</h3>
          <p className="text-muted-foreground">系统化的超参数搜索</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">性能监控</h3>
          <p className="text-muted-foreground">实时跟踪训练指标</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Zap className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">效率优化</h3>
          <p className="text-muted-foreground">最大化训练效果</p>
        </div>
      </div>

      <div>
        <h2>超参数调节实验</h2>
        <p>
          超参数调节是大模型训练成功的关键。不同的超参数设置会显著影响模型的收敛速度、
          最终性能和训练稳定性。本章将系统介绍各类超参数的作用和调节策略。
        </p>

        <h3>核心超参数分类</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">优化器参数</h4>
            <p className="text-sm text-muted-foreground mb-2">
              直接影响参数更新和收敛性能
            </p>
            <ul className="text-sm space-y-1">
              <li>• 学习率 (learning_rate): 0.0001-0.001</li>
              <li>• Beta1, Beta2: Adam 动量参数</li>
              <li>• 权重衰减 (weight_decay): 正则化强度</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">训练配置</h4>
            <p className="text-sm text-muted-foreground mb-2">
              控制训练过程和资源利用
            </p>
            <ul className="text-sm space-y-1">
              <li>• 批量大小 (batch_size): 影响梯度估计质量</li>
              <li>• 序列长度 (max_length): 上下文窗口大小</li>
              <li>• 预热步数 (warmup_steps): 学习率预热</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">模型结构</h4>
            <p className="text-sm text-muted-foreground mb-2">
              决定模型容量和表达能力
            </p>
            <ul className="text-sm space-y-1">
              <li>• 层数 (num_layers): 模型深度</li>
              <li>• 隐藏维度 (hidden_size): 特征维度</li>
              <li>• 注意力头数 (num_heads): 多头注意力</li>
            </ul>
          </div>
        </div>

        <h3>交互式参数调节</h3>
        <p className="mb-4">
          使用下面的滑块来实时体验不同超参数设置对训练的影响：
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <ParamSlider
            label="学习率"
            value={0.001}
            min={0.0001}
            max={0.01}
            step={0.0001}
            description="控制参数更新的步长，过大容易发散，过小收敛慢"
          />
          <ParamSlider
            label="批量大小"
            value={32}
            min={8}
            max={256}
            step={8}
            description="每次更新使用的样本数，影响梯度估计和显存使用"
          />
          <ParamSlider
            label="Dropout 率"
            value={0.1}
            min={0}
            max={0.5}
            step={0.05}
            description="随机丢弃神经元的比例，用于防止过拟合"
          />
          <ParamSlider
            label="权重衰减"
            value={0.01}
            min={0}
            max={0.1}
            step={0.005}
            description="L2 正则化系数，防止权重过大"
          />
        </div>

        <h3>学习率调度策略</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">策略</th>
                <th className="border border-border p-3 text-left">特点</th>
                <th className="border border-border p-3 text-left">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-mono">Constant</td>
                <td className="border border-border p-3">固定学习率</td>
                <td className="border border-border p-3">小规模实验，快速验证</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">Linear Decay</td>
                <td className="border border-border p-3">线性衰减至 0</td>
                <td className="border border-border p-3">简单有效，广泛使用</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">Cosine Annealing</td>
                <td className="border border-border p-3">余弦函数衰减</td>
                <td className="border border-border p-3">收敛更平滑，推荐使用</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">Exponential</td>
                <td className="border border-border p-3">指数衰减</td>
                <td className="border border-border p-3">快速收敛，需小心调节</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>批量大小的影响</h3>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium text-success mb-2">大批量 (&gt;64)</h4>
            <ul className="text-sm space-y-1">
              <li>✓ 梯度估计更准确</li>
              <li>✓ 训练更稳定</li>
              <li>✓ 更好的并行效率</li>
              <li>✗ 需要更多显存</li>
              <li>✗ 可能陷入局部最优</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium text-warning mb-2">小批量 (&lt;32)</h4>
            <ul className="text-sm space-y-1">
              <li>✓ 显存需求低</li>
              <li>✓ 更好的泛化能力</li>
              <li>✓ 训练过程随机性大</li>
              <li>✗ 梯度估计噪声大</li>
              <li>✗ 训练可能不稳定</li>
            </ul>
          </div>
        </div>

        <h3>自动化调参方法</h3>
        <p>
          对于大规模模型，手动调参效率低下，可以采用以下自动化方法：
        </p>
        <ul>
          <li><strong>网格搜索</strong>：在预定义范围内穷举搜索</li>
          <li><strong>随机搜索</strong>：随机采样参数组合</li>
          <li><strong>贝叶斯优化</strong>：基于历史结果指导搜索</li>
          <li><strong>超参数调度</strong>：如 Population Based Training</li>
        </ul>

        <h3>实用调参建议</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-primary">
            <h4 className="font-medium text-primary">开始阶段</h4>
            <p className="text-sm">使用较小学习率和批量，确保训练稳定性</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">中期调优</h4>
            <p className="text-sm">根据损失曲线调整学习率调度和正则化</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">最终微调</h4>
            <p className="text-sm">使用更小学习率进行精细调节</p>
          </div>
        </div>

        <blockquote>
          超参数调节是一门艺术，需要理论知识和实践经验相结合。
          建议先从经典设置开始，再根据具体任务和数据特点进行调整。
        </blockquote>
      </div>
    </div>
  );
};