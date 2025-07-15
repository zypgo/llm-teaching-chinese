import React from 'react';
import { BookMarked, Link, Users } from 'lucide-react';

export const ResourcesContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <BookMarked className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">学习资源</h3>
          <p className="text-muted-foreground">精选论文、书籍和课程</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Link className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">工具平台</h3>
          <p className="text-muted-foreground">开发框架和部署工具</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Users className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">社区生态</h3>
          <p className="text-muted-foreground">开源项目和交流社区</p>
        </div>
      </div>

      <div>
        <h2>延伸阅读与资源</h2>
        <p>
          大语言模型领域发展迅速，持续学习新技术和最佳实践至关重要。
          本章汇总了精选的学习资源、工具平台和社区资源，助你深入掌握 LLM 技术栈。
        </p>

        <h3>必读论文</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">基础架构</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Attention Is All You Need (2017):</strong> Transformer 架构奠基之作</li>
              <li>• <strong>BERT (2018):</strong> 双向编码器表示，理解式模型典范</li>
              <li>• <strong>GPT-1/2/3 系列:</strong> 自回归生成模型的演进历程</li>
              <li>• <strong>T5 (2019):</strong> Text-to-Text Transfer Transformer 统一框架</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">训练技术</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Scaling Laws (2020):</strong> 模型规模与性能的关系研究</li>
              <li>• <strong>PaLM (2022):</strong> 5400 亿参数模型训练经验</li>
              <li>• <strong>Chinchilla (2022):</strong> 计算最优的训练策略</li>
              <li>• <strong>LLaMA (2023):</strong> 高效的开源大模型</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">对齐与安全</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>InstructGPT (2022):</strong> 人类反馈强化学习</li>
              <li>• <strong>Constitutional AI (2022):</strong> 基于原则的 AI 对齐</li>
              <li>• <strong>Red Teaming (2022):</strong> 大模型的安全性测试</li>
              <li>• <strong>LoRA (2021):</strong> 低秩适应的参数高效微调</li>
            </ul>
          </div>
        </div>

        <h3>推荐书籍</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <h4 className="font-medium">理论基础</h4>
            <div className="space-y-3">
              <div className="p-3 rounded bg-muted/50 border">
                <h5 className="font-medium text-sm">《深度学习》- Ian Goodfellow</h5>
                <p className="text-xs text-muted-foreground">深度学习的数学基础和核心概念</p>
              </div>
              <div className="p-3 rounded bg-muted/50 border">
                <h5 className="font-medium text-sm">《Natural Language Processing with Python》</h5>
                <p className="text-xs text-muted-foreground">NLP 实践和 NLTK 库应用</p>
              </div>
              <div className="p-3 rounded bg-muted/50 border">
                <h5 className="font-medium text-sm">《Speech and Language Processing》- Jurafsky</h5>
                <p className="text-xs text-muted-foreground">语言处理的经典教科书</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">实践应用</h4>
            <div className="space-y-3">
              <div className="p-3 rounded bg-muted/50 border">
                <h5 className="font-medium text-sm">《Transformers for Natural Language Processing》</h5>
                <p className="text-xs text-muted-foreground">Transformer 模型的实战指南</p>
              </div>
              <div className="p-3 rounded bg-muted/50 border">
                <h5 className="font-medium text-sm">《Building LLMs for Production》</h5>
                <p className="text-xs text-muted-foreground">大模型的工程化部署</p>
              </div>
              <div className="p-3 rounded bg-muted/50 border">
                <h5 className="font-medium text-sm">《AI Safety Fundamentals》</h5>
                <p className="text-xs text-muted-foreground">AI 安全与对齐的基础知识</p>
              </div>
            </div>
          </div>
        </div>

        <h3>在线课程</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">课程名称</th>
                <th className="border border-border p-3 text-left">提供方</th>
                <th className="border border-border p-3 text-left">级别</th>
                <th className="border border-border p-3 text-left">重点内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3">CS224N: NLP with Deep Learning</td>
                <td className="border border-border p-3">Stanford</td>
                <td className="border border-border p-3">高级</td>
                <td className="border border-border p-3">理论基础和前沿技术</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3">Hugging Face Course</td>
                <td className="border border-border p-3">Hugging Face</td>
                <td className="border border-border p-3">中级</td>
                <td className="border border-border p-3">实践应用和工具使用</td>
              </tr>
              <tr>
                <td className="border border-border p-3">Deep Learning Specialization</td>
                <td className="border border-border p-3">Coursera</td>
                <td className="border border-border p-3">入门</td>
                <td className="border border-border p-3">基础概念和编程实现</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3">Fast.ai Practical Deep Learning</td>
                <td className="border border-border p-3">Fast.ai</td>
                <td className="border border-border p-3">中级</td>
                <td className="border border-border p-3">实践导向的快速入门</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>开发框架与工具</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <h4 className="font-medium mb-2 text-info">训练框架</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Transformers:</strong> Hugging Face 生态系统</p>
                <p><strong>DeepSpeed:</strong> 微软的分布式训练</p>
                <p><strong>FairScale:</strong> Facebook 的模型并行</p>
              </div>
              <div>
                <p><strong>Colossal-AI:</strong> 高效的大模型训练</p>
                <p><strong>Megatron-LM:</strong> NVIDIA 的大规模训练</p>
                <p><strong>PaddlePaddle:</strong> 百度的深度学习平台</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">推理部署</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>vLLM:</strong> 高吞吐量推理引擎</p>
                <p><strong>TensorRT-LLM:</strong> NVIDIA 推理优化</p>
                <p><strong>Text Generation Inference:</strong> HF 推理服务</p>
              </div>
              <div>
                <p><strong>FastChat:</strong> 对话模型部署</p>
                <p><strong>Triton Inference Server:</strong> 模型服务</p>
                <p><strong>BentoML:</strong> 模型部署平台</p>
              </div>
            </div>
          </div>
        </div>

        <h3>数据集资源</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-3">
            <h4 className="font-medium">预训练数据</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Common Crawl:</strong> 大规模网页数据</li>
              <li>• <strong>OpenWebText:</strong> GPT-2 复现数据</li>
              <li>• <strong>C4:</strong> T5 训练的清洗数据</li>
              <li>• <strong>The Pile:</strong> 多领域文本集合</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">指令数据</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Alpaca:</strong> 斯坦福指令跟随数据</li>
              <li>• <strong>ShareGPT:</strong> 对话交互数据</li>
              <li>• <strong>Dolly:</strong> Databricks 开源数据</li>
              <li>• <strong>LIMA:</strong> 少样本对齐数据</li>
            </ul>
          </div>
        </div>

        <h3>社区与开源项目</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-accent/50 border border-accent">
            <h4 className="font-medium mb-2">主要开源项目</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>LLaMA:</strong> Meta 开源基础模型</p>
                <p><strong>Vicuna:</strong> 基于 LLaMA 的对话模型</p>
                <p><strong>Alpaca:</strong> 斯坦福指令微调模型</p>
                <p><strong>ChatGLM:</strong> 清华双语对话模型</p>
              </div>
              <div>
                <p><strong>Falcon:</strong> TII 开源大模型</p>
                <p><strong>MPT:</strong> MosaicML 的训练代码</p>
                <p><strong>Open Assistant:</strong> 开源 AI 助手</p>
                <p><strong>LangChain:</strong> LLM 应用开发框架</p>
              </div>
            </div>
          </div>
        </div>

        <h3>专业会议与期刊</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-3">
            <h4 className="font-medium">顶级会议</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>NeurIPS:</strong> 神经信息处理系统大会</li>
              <li>• <strong>ICML:</strong> 国际机器学习大会</li>
              <li>• <strong>ACL:</strong> 计算语言学协会年会</li>
              <li>• <strong>EMNLP:</strong> 自然语言处理实证方法</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">重要期刊</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>JMLR:</strong> 机器学习研究期刊</li>
              <li>• <strong>TACL:</strong> 计算语言学学报</li>
              <li>• <strong>AI Magazine:</strong> AI 综合性期刊</li>
              <li>• <strong>Nature Machine Intelligence:</strong> 顶级AI期刊</li>
            </ul>
          </div>
        </div>

        <h3>学习路径建议</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-primary">
            <h4 className="font-medium text-primary">初学者路径</h4>
            <p className="text-sm">深度学习基础 → NLP 入门 → Transformer 理解 → 实践项目</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">进阶开发者</h4>
            <p className="text-sm">预训练实践 → 微调技术 → 部署优化 → 安全性研究</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">研究方向</h4>
            <p className="text-sm">前沿论文跟踪 → 理论创新 → 开源贡献 → 学术发表</p>
          </div>
        </div>

        <h3>持续学习建议</h3>
        <ul>
          <li><strong>关注趋势：</strong>订阅 AI 研究周报，关注顶级会议动态</li>
          <li><strong>动手实践：</strong>复现经典论文，参与开源项目贡献</li>
          <li><strong>交流讨论：</strong>参加技术会议，加入专业社群</li>
          <li><strong>知识分享：</strong>写技术博客，做技术分享</li>
          <li><strong>跨界学习：</strong>关注相关领域如认知科学、哲学等</li>
        </ul>

        <div className="my-8 p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <h4 className="font-medium text-primary mb-3">恭喜完成学习！</h4>
          <p className="text-sm text-muted-foreground mb-4">
            你已经系统学习了大语言模型的完整技术栈，从基础概念到实际应用。
            这只是起点，LLM 领域仍在快速发展，继续保持学习热情，探索更多可能性！
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">数据处理 ✓</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">模型架构 ✓</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">预训练 ✓</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">微调优化 ✓</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">部署推理 ✓</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">安全评估 ✓</span>
          </div>
        </div>

        <blockquote>
          技术的学习永无止境，但掌握了核心原理和实践方法，
          你就有了在 AI 浪潮中乘风破浪的能力。愿你在 LLM 的道路上走得更远！
        </blockquote>
      </div>
    </div>
  );
};