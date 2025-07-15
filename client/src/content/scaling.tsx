import React from 'react';
import { CheckCircle, Save, Layers } from 'lucide-react';

export const ScalingContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Save className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">检查点管理</h3>
          <p className="text-muted-foreground">定期保存训练状态</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Layers className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">规模化训练</h3>
          <p className="text-muted-foreground">分布式和并行策略</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <CheckCircle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">稳定性保证</h3>
          <p className="text-muted-foreground">容错和恢复机制</p>
        </div>
      </div>

      <div>
        <h2>检查点与规模化技巧</h2>
        <p>
          大规模模型训练往往需要数天甚至数周时间，期间可能遇到硬件故障、网络中断等问题。
          本章介绍如何通过检查点管理和规模化技术确保训练的稳定性和效率。
        </p>

        <h3>检查点策略</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">定期保存</h4>
            <p className="text-sm text-muted-foreground mb-2">
              按固定间隔保存模型状态，平衡存储成本和恢复粒度
            </p>
            <ul className="text-sm space-y-1">
              <li>• 每 N 个 epoch 或 M 个 step 保存一次</li>
              <li>• 保留最近 K 个检查点，避免存储溢出</li>
              <li>• 关键节点额外保存（如验证集最佳性能）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">增量保存</h4>
            <p className="text-sm text-muted-foreground mb-2">
              只保存变化的部分，减少 I/O 开销
            </p>
            <ul className="text-sm space-y-1">
              <li>• 使用差异化存储技术</li>
              <li>• 压缩检查点文件</li>
              <li>• 异步保存，不阻塞训练</li>
            </ul>
          </div>
        </div>

        <h3>分布式训练架构</h3>
        <div className="my-6">
          <h4 className="font-medium mb-4">数据并行（Data Parallelism）</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <h5 className="font-medium text-info mb-2">原理</h5>
              <p className="text-sm">每个 GPU 持有完整模型副本，处理不同数据批次</p>
            </div>
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <h5 className="font-medium text-info mb-2">适用场景</h5>
              <p className="text-sm">模型较小，可以完全放入单个 GPU 显存</p>
            </div>
          </div>
          
          <h4 className="font-medium mb-4 mt-6">模型并行（Model Parallelism）</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <h5 className="font-medium text-warning mb-2">原理</h5>
              <p className="text-sm">将模型不同部分分布到不同 GPU 上</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <h5 className="font-medium text-warning mb-2">适用场景</h5>
              <p className="text-sm">模型太大，无法放入单个 GPU 显存</p>
            </div>
          </div>
        </div>

        <h3>ZeRO 优化技术</h3>
        <p className="mb-4">
          ZeRO（Zero Redundancy Optimizer）通过分割优化器状态、梯度和参数来大幅减少显存使用：
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">阶段</th>
                <th className="border border-border p-3 text-left">分割内容</th>
                <th className="border border-border p-3 text-left">显存减少</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-mono">ZeRO-1</td>
                <td className="border border-border p-3">优化器状态</td>
                <td className="border border-border p-3">4x</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">ZeRO-2</td>
                <td className="border border-border p-3">优化器状态 + 梯度</td>
                <td className="border border-border p-3">8x</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">ZeRO-3</td>
                <td className="border border-border p-3">优化器状态 + 梯度 + 参数</td>
                <td className="border border-border p-3">根据 GPU 数量线性减少</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>混合精度训练</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-accent/50 border border-accent">
            <h4 className="font-medium mb-2">FP16 + FP32 混合</h4>
            <ul className="text-sm space-y-1">
              <li>• 前向传播和梯度计算使用 FP16</li>
              <li>• 参数更新使用 FP32 保持精度</li>
              <li>• 损失缩放防止梯度下溢</li>
              <li>• 显存使用减少约 50%</li>
            </ul>
          </div>
        </div>

        <h3>故障恢复机制</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-3">
            <h4 className="font-medium">自动重启</h4>
            <div className="p-3 rounded bg-muted/50 border text-sm">
              <p>检测到故障时自动从最近检查点恢复训练</p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">弹性训练</h4>
            <div className="p-3 rounded bg-muted/50 border text-sm">
              <p>动态调整 GPU 数量，适应资源可用性变化</p>
            </div>
          </div>
        </div>

        <h3>性能监控指标</h3>
        <ul>
          <li><strong>吞吐量</strong>：每秒处理的样本数或 token 数</li>
          <li><strong>GPU 利用率</strong>：计算资源使用效率</li>
          <li><strong>通信开销</strong>：分布式训练的网络延迟</li>
          <li><strong>显存使用率</strong>：内存资源利用情况</li>
          <li><strong>I/O 带宽</strong>：数据加载和检查点保存速度</li>
        </ul>

        <h3>最佳实践建议</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-primary">
            <h4 className="font-medium text-primary">检查点策略</h4>
            <p className="text-sm">平衡保存频率和存储成本，关键节点额外备份</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">并行策略</h4>
            <p className="text-sm">根据模型大小和硬件配置选择合适的并行方案</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">监控告警</h4>
            <p className="text-sm">设置完善的监控系统，及时发现和处理异常</p>
          </div>
        </div>

        <blockquote>
          规模化训练不仅是技术问题，更是工程问题。需要在性能、稳定性、成本之间
          找到最佳平衡点，建立完善的监控和容错机制。
        </blockquote>
      </div>
    </div>
  );
};