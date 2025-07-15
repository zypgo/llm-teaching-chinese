import React from 'react';
import { Zap, Scissors, BarChart, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ModelInference } from '@/components/interactive/ModelInference';
import { TokenizerDemo } from '@/components/interactive/TokenizerDemo';
import { ModelComparison } from '@/components/interactive/ModelComparison';
import { ModelProbe } from '@/components/interactive/ModelProbe';

export const RealModelsContent: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 概述 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">在线推理</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              使用真实的GPT-2模型进行文本生成体验
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分词演示</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              实时查看BPE分词过程和结果
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">模型对比</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              并行运行多个模型比较生成效果
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">模型探针</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              检查模型内部表示和注意力权重
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 各功能模块 */}
      <div className="space-y-8">
        <ModelInference />
        <TokenizerDemo />
        <ModelComparison />
        <ModelProbe />
      </div>

      {/* 技术说明 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>技术实现说明</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🚀 性能优化</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• WebGPU加速推理(回退到CPU)</li>
                <li>• ONNX模型格式优化</li>
                <li>• 渐进式模型加载</li>
                <li>• 内存高效管理</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🔧 架构特点</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 纯浏览器端运行</li>
                <li>• 无服务器依赖</li>
                <li>• 实时交互体验</li>
                <li>• 数据隐私保护</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};