import React from 'react';
import { Zap, Server, Gauge } from 'lucide-react';

export const InferenceContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">推理加速</h3>
          <p className="text-muted-foreground">优化推理速度和效率</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Server className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">部署架构</h3>
          <p className="text-muted-foreground">可扩展的服务系统</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Gauge className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">性能监控</h3>
          <p className="text-muted-foreground">实时监控和调优</p>
        </div>
      </div>

      <div>
        <h2>推理与部署优化</h2>
        <p>
          将训练好的大模型部署到生产环境是一个复杂的工程挑战。需要在推理速度、
          资源消耗、服务质量之间找到最佳平衡，确保模型能够稳定高效地服务用户。
        </p>

        <h3>推理优化技术</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">模型量化（Quantization）</h4>
            <p className="text-sm text-muted-foreground mb-2">
              将模型权重从 FP32/FP16 降低到 INT8/INT4，显著减少内存使用和计算量
            </p>
            <ul className="text-sm space-y-1">
              <li>• 动态量化：推理时实时量化激活值</li>
              <li>• 静态量化：使用校准数据预先量化</li>
              <li>• QAT：训练时感知量化，效果最佳</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">模型剪枝（Pruning）</h4>
            <p className="text-sm text-muted-foreground mb-2">
              移除不重要的权重连接，减少模型参数量和计算复杂度
            </p>
            <ul className="text-sm space-y-1">
              <li>• 非结构化剪枝：移除个别权重</li>
              <li>• 结构化剪枝：移除整个神经元或通道</li>
              <li>• 渐进式剪枝：训练过程中逐步剪枝</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">知识蒸馏（Distillation）</h4>
            <p className="text-sm text-muted-foreground mb-2">
              使用大模型（教师）指导小模型（学生）学习，保持性能的同时减少模型大小
            </p>
            <ul className="text-sm space-y-1">
              <li>• 特征蒸馏：匹配中间层表示</li>
              <li>• 响应蒸馏：匹配最终输出分布</li>
              <li>• 渐进式蒸馏：分阶段压缩</li>
            </ul>
          </div>
        </div>

        <h3>硬件加速方案</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">硬件类型</th>
                <th className="border border-border p-3 text-left">特点</th>
                <th className="border border-border p-3 text-left">适用场景</th>
                <th className="border border-border p-3 text-left">优化重点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-mono">GPU</td>
                <td className="border border-border p-3">高并行度，生态成熟</td>
                <td className="border border-border p-3">通用推理，批处理</td>
                <td className="border border-border p-3">批量大小，显存管理</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">TPU</td>
                <td className="border border-border p-3">专门设计，能效高</td>
                <td className="border border-border p-3">大规模部署</td>
                <td className="border border-border p-3">计算图优化</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">ASIC</td>
                <td className="border border-border p-3">定制化，极高效率</td>
                <td className="border border-border p-3">特定模型，高吞吐</td>
                <td className="border border-border p-3">算子融合</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-mono">CPU</td>
                <td className="border border-border p-3">通用性强，成本低</td>
                <td className="border border-border p-3">边缘推理，小模型</td>
                <td className="border border-border p-3">向量化，多线程</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>部署架构设计</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <h4 className="font-medium mb-2 text-info">微服务架构</h4>
            <ul className="text-sm space-y-1">
              <li>• 模型服务：专门负责推理计算</li>
              <li>• 网关服务：请求路由和负载均衡</li>
              <li>• 缓存服务：缓存热点请求结果</li>
              <li>• 监控服务：性能指标收集和告警</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-medium mb-2">容器化部署</h4>
            <div className="text-sm space-y-2">
              <p><strong>Docker 容器：</strong>环境隔离，版本管理</p>
              <p><strong>Kubernetes：</strong>容器编排，自动扩缩容</p>
              <p><strong>Helm Charts：</strong>配置管理，一键部署</p>
            </div>
          </div>
        </div>

        <h3>性能优化策略</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-3">
            <h4 className="font-medium">延迟优化</h4>
            <div className="space-y-2">
              <div className="p-3 rounded bg-success/10 border border-success/20 text-sm">
                <strong>模型并行：</strong>将大模型分割到多个 GPU
              </div>
              <div className="p-3 rounded bg-success/10 border border-success/20 text-sm">
                <strong>KV 缓存：</strong>缓存注意力计算结果
              </div>
              <div className="p-3 rounded bg-success/10 border border-success/20 text-sm">
                <strong>投机解码：</strong>使用小模型预测，大模型验证
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">吞吐量优化</h4>
            <div className="space-y-2">
              <div className="p-3 rounded bg-warning/10 border border-warning/20 text-sm">
                <strong>动态批处理：</strong>智能合并请求批次
              </div>
              <div className="p-3 rounded bg-warning/10 border border-warning/20 text-sm">
                <strong>流水线并行：</strong>重叠计算和数据传输
              </div>
              <div className="p-3 rounded bg-warning/10 border border-warning/20 text-sm">
                <strong>异步处理：</strong>非阻塞式请求处理
              </div>
            </div>
          </div>
        </div>

        <h3>监控与运维</h3>
        <div className="space-y-4">
          <h4 className="font-medium">关键指标监控</h4>
          <ul className="space-y-2">
            <li><strong>延迟指标：</strong>P50、P95、P99 响应时间</li>
            <li><strong>吞吐量：</strong>QPS（每秒查询数）、TPS（每秒 Token 数）</li>
            <li><strong>资源利用率：</strong>GPU/CPU 使用率、内存占用</li>
            <li><strong>错误率：</strong>超时、异常、服务不可用比例</li>
            <li><strong>成本效益：</strong>单位请求成本、资源 ROI</li>
          </ul>
        </div>

        <h3>边缘部署考虑</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium text-primary mb-2">挑战</h4>
            <ul className="text-sm space-y-1">
              <li>• 资源受限（CPU、内存、存储）</li>
              <li>• 网络不稳定或断网场景</li>
              <li>• 功耗和散热限制</li>
              <li>• 实时性要求高</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium text-success mb-2">解决方案</h4>
            <ul className="text-sm space-y-1">
              <li>• 极度压缩的轻量级模型</li>
              <li>• 本地缓存和离线推理</li>
              <li>• 混合云边架构</li>
              <li>• 硬件加速芯片支持</li>
            </ul>
          </div>
        </div>

        <h3>成本优化建议</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-primary">
            <h4 className="font-medium text-primary">资源规划</h4>
            <p className="text-sm">根据业务峰值合理配置资源，使用弹性伸缩</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">模型选择</h4>
            <p className="text-sm">在精度和成本间平衡，选择合适的模型大小</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">缓存策略</h4>
            <p className="text-sm">充分利用缓存减少重复计算，降低计算成本</p>
          </div>
        </div>

        <blockquote>
          推理优化是一个系统工程，需要从模型、硬件、软件、架构等多个维度统筹考虑。
          关键是根据业务需求找到性能、成本、复杂度之间的最佳平衡点。
        </blockquote>
      </div>
    </div>
  );
};