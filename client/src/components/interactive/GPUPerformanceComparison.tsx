import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  HardDrive, 
  DollarSign,
  Clock,
  Gauge
} from 'lucide-react';

interface GPUSpec {
  name: string;
  architecture: string;
  process: string;
  cudaCores: number;
  tensorCores: number;
  memory: number;
  memoryBandwidth: number;
  fp16Performance: number;
  int8Performance: number;
  power: number;
  price: number;
  releaseYear: number;
  color: string;
}

export const GPUPerformanceComparison: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('fp16');
  const [comparisonMode, setComparisonMode] = useState<string>('performance');

  const gpus: GPUSpec[] = [
    {
      name: 'H100 SXM',
      architecture: 'Hopper',
      process: '4nm TSMC',
      cudaCores: 13824,
      tensorCores: 432,
      memory: 80,
      memoryBandwidth: 3350,
      fp16Performance: 312,
      int8Performance: 624,
      power: 700,
      price: 30000,
      releaseYear: 2022,
      color: 'bg-green-500'
    },
    {
      name: 'A100 SXM',
      architecture: 'Ampere',
      process: '7nm TSMC',
      cudaCores: 6912,
      tensorCores: 432,
      memory: 80,
      memoryBandwidth: 2039,
      fp16Performance: 156,
      int8Performance: 312,
      power: 400,
      price: 15000,
      releaseYear: 2020,
      color: 'bg-blue-500'
    },
    {
      name: 'V100 SXM',
      architecture: 'Volta',
      process: '12nm TSMC',
      cudaCores: 5120,
      tensorCores: 640,
      memory: 32,
      memoryBandwidth: 900,
      fp16Performance: 62,
      int8Performance: 124,
      power: 300,
      price: 8000,
      releaseYear: 2017,
      color: 'bg-purple-500'
    },
    {
      name: 'RTX 4090',
      architecture: 'Ada Lovelace',
      process: '4nm TSMC',
      cudaCores: 16384,
      tensorCores: 512,
      memory: 24,
      memoryBandwidth: 1008,
      fp16Performance: 165,
      int8Performance: 330,
      power: 450,
      price: 1600,
      releaseYear: 2022,
      color: 'bg-orange-500'
    },
    {
      name: 'RTX 3090',
      architecture: 'Ampere',
      process: '8nm Samsung',
      cudaCores: 10496,
      tensorCores: 328,
      memory: 24,
      memoryBandwidth: 936,
      fp16Performance: 71,
      int8Performance: 142,
      power: 350,
      price: 1500,
      releaseYear: 2020,
      color: 'bg-red-500'
    }
  ];

  const getMetricValue = (gpu: GPUSpec, metric: string): number => {
    switch (metric) {
      case 'fp16': return gpu.fp16Performance;
      case 'int8': return gpu.int8Performance;
      case 'memory': return gpu.memory;
      case 'bandwidth': return gpu.memoryBandwidth;
      case 'efficiency': return gpu.fp16Performance / gpu.power;
      case 'price_perf': return gpu.fp16Performance / (gpu.price / 1000);
      default: return 0;
    }
  };

  const getMetricUnit = (metric: string): string => {
    switch (metric) {
      case 'fp16': return 'TFLOPS';
      case 'int8': return 'TOPS';
      case 'memory': return 'GB';
      case 'bandwidth': return 'GB/s';
      case 'efficiency': return 'TFLOPS/W';
      case 'price_perf': return 'TFLOPS/$K';
      default: return '';
    }
  };

  const maxValue = Math.max(...gpus.map(gpu => getMetricValue(gpu, selectedMetric)));

  const useCases = [
    {
      name: '训练大模型',
      description: '需要大显存和高FP16性能',
      recommendedGPUs: ['H100 SXM', 'A100 SXM'],
      requirements: {
        memory: '高',
        fp16: '极高',
        cost: '高'
      }
    },
    {
      name: '推理部署',
      description: '注重INT8性能和成本效益',
      recommendedGPUs: ['RTX 4090', 'A100 SXM'],
      requirements: {
        memory: '中',
        int8: '高',
        cost: '中'
      }
    },
    {
      name: '研究开发',
      description: '平衡性能和成本',
      recommendedGPUs: ['RTX 4090', 'RTX 3090'],
      requirements: {
        memory: '中',
        fp16: '高',
        cost: '低'
      }
    },
    {
      name: '云端服务',
      description: '最高性能和效率',
      recommendedGPUs: ['H100 SXM'],
      requirements: {
        memory: '极高',
        fp16: '极高',
        cost: '极高'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            主流GPU性能对比
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="fp16">FP16</TabsTrigger>
              <TabsTrigger value="int8">INT8</TabsTrigger>
              <TabsTrigger value="memory">显存</TabsTrigger>
              <TabsTrigger value="bandwidth">带宽</TabsTrigger>
              <TabsTrigger value="efficiency">能效</TabsTrigger>
              <TabsTrigger value="price_perf">性价比</TabsTrigger>
            </TabsList>

            <div className="space-y-3 pt-4">
              {gpus.map((gpu, index) => {
                const value = getMetricValue(gpu, selectedMetric);
                const percentage = (value / maxValue) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${gpu.color}`} />
                        <span className="font-medium text-sm">{gpu.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {gpu.architecture}
                        </Badge>
                      </div>
                      <span className="text-sm font-mono">
                        {value.toFixed(1)} {getMetricUnit(selectedMetric)}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              详细规格对比
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">型号</th>
                    <th className="text-right py-2">显存</th>
                    <th className="text-right py-2">功耗</th>
                    <th className="text-right py-2">价格</th>
                  </tr>
                </thead>
                <tbody>
                  {gpus.map((gpu, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded ${gpu.color}`} />
                          {gpu.name}
                        </div>
                      </td>
                      <td className="text-right py-2 font-mono">{gpu.memory}GB</td>
                      <td className="text-right py-2 font-mono">{gpu.power}W</td>
                      <td className="text-right py-2 font-mono">${gpu.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              应用场景推荐
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <h4 className="font-semibold text-sm">{useCase.name}</h4>
                <p className="text-xs text-muted-foreground">{useCase.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {useCase.recommendedGPUs.map((gpu, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {gpu}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-muted-foreground">显存需求</div>
                    <Badge 
                      variant={useCase.requirements.memory === '极高' ? 'destructive' : 
                               useCase.requirements.memory === '高' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {useCase.requirements.memory}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">性能需求</div>
                    <Badge 
                      variant={useCase.requirements.fp16 === '极高' || useCase.requirements.int8 === '高' ? 'destructive' : 'default'}
                      className="text-xs"
                    >
                      {useCase.requirements.fp16 || useCase.requirements.int8 || '中'}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">成本</div>
                    <Badge 
                      variant={useCase.requirements.cost === '极高' ? 'destructive' : 
                               useCase.requirements.cost === '高' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {useCase.requirements.cost}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            性能发展趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              GPU计算性能随时间的发展变化（FP16 TFLOPS）
            </div>
            
            <div className="space-y-3">
              {gpus.sort((a, b) => a.releaseYear - b.releaseYear).map((gpu, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-mono">{gpu.releaseYear}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{gpu.name}</span>
                      <span className="text-sm font-mono">{gpu.fp16Performance} TFLOPS</span>
                    </div>
                    <Progress 
                      value={(gpu.fp16Performance / maxValue) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-1">关键观察</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 从V100到H100，FP16性能提升了5倍</li>
                <li>• 制程工艺从12nm进步到4nm</li>
                <li>• Tensor Core专用加速器成为标配</li>
                <li>• 显存容量和带宽显著增长</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};