import React from 'react';
import { Shield, Target, AlertTriangle } from 'lucide-react';

export const EvaluationContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Target className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">性能评估</h3>
          <p className="text-muted-foreground">全面的能力测试体系</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Shield className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">安全防护</h3>
          <p className="text-muted-foreground">对抗有害和恶意输入</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">风险管控</h3>
          <p className="text-muted-foreground">识别和缓解潜在风险</p>
        </div>
      </div>

      <div>
        <h2>模型评估与安全性</h2>
        <p>
          大语言模型的评估不仅要关注性能指标，更要重视安全性、公平性和可靠性。
          建立全面的评估体系和安全防护机制，是负责任地部署 AI 系统的关键。
        </p>

        <h3>性能评估维度</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">语言理解能力</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>阅读理解：</strong>SQuAD、RACE、MultiRC 等数据集</li>
              <li>• <strong>常识推理：</strong>CommonsenseQA、HellaSwag</li>
              <li>• <strong>逻辑推理：</strong>LogiQA、RTE、数学推理</li>
              <li>• <strong>多语言能力：</strong>XNLI、XQuAD 跨语言测试</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium mb-2 text-success">生成质量评估</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>流畅性：</strong>语法正确性、表达自然度</li>
              <li>• <strong>连贯性：</strong>逻辑一致性、上下文关联</li>
              <li>• <strong>创造性：</strong>新颖性、多样性指标</li>
              <li>• <strong>事实准确性：</strong>知识正确性验证</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">任务特化能力</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>代码生成：</strong>HumanEval、MBPP 编程测试</li>
              <li>• <strong>数学推理：</strong>GSM8K、MATH 数学解题</li>
              <li>• <strong>科学知识：</strong>MMLU 多学科理解</li>
              <li>• <strong>对话能力：</strong>PersonaChat、Empathetic</li>
            </ul>
          </div>
        </div>

        <h3>评估方法与工具</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left">评估类型</th>
                <th className="border border-border p-3 text-left">方法</th>
                <th className="border border-border p-3 text-left">优点</th>
                <th className="border border-border p-3 text-left">局限性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-semibold">自动评估</td>
                <td className="border border-border p-3">BLEU、ROUGE、困惑度</td>
                <td className="border border-border p-3">快速、标准化、可重复</td>
                <td className="border border-border p-3">可能与人类判断不符</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border p-3 font-semibold">人工评估</td>
                <td className="border border-border p-3">专家打分、众包标注</td>
                <td className="border border-border p-3">更贴近实际使用感受</td>
                <td className="border border-border p-3">成本高、主观性强</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-semibold">模型评估</td>
                <td className="border border-border p-3">GPT-4、Claude 评分</td>
                <td className="border border-border p-3">接近人类水平、高效</td>
                <td className="border border-border p-3">可能存在偏见</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>安全性挑战</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <h4 className="font-medium mb-2 text-destructive">有害内容生成</h4>
            <p className="text-sm text-muted-foreground mb-2">
              模型可能生成暴力、色情、仇恨言论等有害内容
            </p>
            <ul className="text-sm space-y-1">
              <li>• 内容过滤器：关键词黑名单、分类器检测</li>
              <li>• 安全微调：使用安全数据集进行额外训练</li>
              <li>• 人工审核：关键场景的人工监督</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium mb-2 text-warning">偏见与歧视</h4>
            <p className="text-sm text-muted-foreground mb-2">
              训练数据中的偏见可能导致模型输出存在歧视性
            </p>
            <ul className="text-sm space-y-1">
              <li>• 偏见检测：性别、种族、宗教等维度测试</li>
              <li>• 数据去偏：平衡训练数据，减少偏见来源</li>
              <li>• 公平性约束：在训练目标中加入公平性项</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <h4 className="font-medium mb-2 text-info">隐私泄露风险</h4>
            <p className="text-sm text-muted-foreground mb-2">
              模型可能记忆并泄露训练数据中的私人信息
            </p>
            <ul className="text-sm space-y-1">
              <li>• 差分隐私：在训练中添加噪声保护隐私</li>
              <li>• 记忆性测试：检查是否能输出训练数据</li>
              <li>• 数据脱敏：移除训练数据中的敏感信息</li>
            </ul>
          </div>
        </div>

        <h3>对抗攻击与防护</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-3">
            <h4 className="font-medium">常见攻击方式</h4>
            <div className="space-y-2">
              <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-sm">
                <strong>提示注入：</strong>构造特殊输入绕过安全限制
              </div>
              <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-sm">
                <strong>角色扮演：</strong>让模型扮演恶意角色
              </div>
              <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-sm">
                <strong>越狱攻击：</strong>诱导模型违反安全策略
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">防护措施</h4>
            <div className="space-y-2">
              <div className="p-3 rounded bg-success/10 border border-success/20 text-sm">
                <strong>输入检查：</strong>预处理阶段过滤恶意输入
              </div>
              <div className="p-3 rounded bg-success/10 border border-success/20 text-sm">
                <strong>输出监控：</strong>实时检测异常输出模式
              </div>
              <div className="p-3 rounded bg-success/10 border border-success/20 text-sm">
                <strong>系统提示：</strong>加强模型的安全意识
              </div>
            </div>
          </div>
        </div>

        <h3>负责任 AI 实践</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-accent/50 border border-accent">
            <h4 className="font-medium mb-2">透明度原则</h4>
            <ul className="text-sm space-y-1">
              <li>• 明确告知用户正在与 AI 交互</li>
              <li>• 公开模型的能力限制和潜在风险</li>
              <li>• 提供模型决策的可解释性信息</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-medium mb-2">可控性保障</h4>
            <ul className="text-sm space-y-1">
              <li>• 用户可以中断或修正 AI 行为</li>
              <li>• 提供多种输出选项供用户选择</li>
              <li>• 建立人工干预和监督机制</li>
            </ul>
          </div>
        </div>

        <h3>持续监控体系</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-primary">
            <h4 className="font-medium text-primary">实时监控</h4>
            <p className="text-sm">监控模型输出质量、安全性和用户反馈</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">定期评估</h4>
            <p className="text-sm">定期在新数据集上测试模型性能退化</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">应急响应</h4>
            <p className="text-sm">建立快速响应机制处理安全事件</p>
          </div>
        </div>

        <h3>评估工具与平台</h3>
        <ul>
          <li><strong>Hugging Face Evaluate：</strong>标准化评估库</li>
          <li><strong>EleutherAI LM Evaluation：</strong>大模型评估框架</li>
          <li><strong>Stanford HELM：</strong>全面评估基准</li>
          <li><strong>Microsoft Fairlearn：</strong>公平性评估工具</li>
          <li><strong>Google What-If Tool：</strong>模型行为分析</li>
        </ul>

        <blockquote>
          评估和安全是大语言模型部署的最后一道防线，也是最重要的一道防线。
          只有建立了完善的评估体系和安全机制，才能确保 AI 技术的负责任应用。
        </blockquote>
      </div>
    </div>
  );
};