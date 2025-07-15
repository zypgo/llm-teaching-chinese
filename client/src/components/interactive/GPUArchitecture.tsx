import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  Activity, 
  BarChart3,
  Clock,
  Layers
} from 'lucide-react';

interface ComponentInfo {
  name: string;
  description: string;
  count: number;
  performance: string;
  isActive: boolean;
}

export const GPUArchitecture: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('sm');
  const [animationActive, setAnimationActive] = useState(false);

  const components: Record<string, ComponentInfo> = {
    sm: {
      name: '流多处理器 (SM)',
      description: 'GPU的核心计算单元，包含多个CUDA核心和Tensor Core',
      count: 108,
      performance: '每个SM包含128个CUDA核心',
      isActive: selectedComponent === 'sm'
    },
    cuda: {
      name: 'CUDA核心',
      description: '基本的浮点运算单元，执行线程指令',
      count: 13824,
      performance: '1.98 GHz基频',
      isActive: selectedComponent === 'cuda'
    },
    tensor: {
      name: 'Tensor Core',
      description: '专用于深度学习的矩阵运算加速器',
      count: 432,
      performance: '312 TFLOPS (FP16)',
      isActive: selectedComponent === 'tensor'
    },
    memory: {
      name: 'HBM3内存',
      description: '高带宽内存，为GPU提供数据',
      count: 80,
      performance: '3.35 TB/s带宽',
      isActive: selectedComponent === 'memory'
    },
    cache: {
      name: 'L2缓存',
      description: '二级缓存，减少内存访问延迟',
      count: 50,
      performance: '高速缓存访问',
      isActive: selectedComponent === 'cache'
    }
  };

  const architectureLayers = [
    {
      name: 'Grid层',
      description: '包含所有线程块的顶层组织',
      color: 'bg-blue-100 dark:bg-blue-900',
      elements: ['Block 0,0', 'Block 0,1', 'Block 1,0', 'Block 1,1']
    },
    {
      name: 'Block层', 
      description: '共享内存和同步的线程组',
      color: 'bg-green-100 dark:bg-green-900',
      elements: ['Warp 0', 'Warp 1', 'Warp 2', 'Warp 3']
    },
    {
      name: 'Warp层',
      description: '32个线程的执行单元',
      color: 'bg-purple-100 dark:bg-purple-900', 
      elements: ['Thread 0-31']
    },
    {
      name: 'Thread层',
      description: '基本执行单元',
      color: 'bg-orange-100 dark:bg-orange-900',
      elements: ['寄存器', '私有内存']
    }
  ];

  const memoryHierarchy = [
    {
      name: '寄存器',
      latency: '1 cycle',
      bandwidth: '~8TB/s',
      size: '64KB/SM',
      accessibility: '线程私有'
    },
    {
      name: '共享内存',
      latency: '~20 cycles',
      bandwidth: '~2TB/s', 
      size: '256KB/SM',
      accessibility: '线程块共享'
    },
    {
      name: 'L1缓存',
      latency: '~30 cycles',
      bandwidth: '~1TB/s',
      size: '256KB/SM', 
      accessibility: '自动管理'
    },
    {
      name: 'L2缓存',
      latency: '~200 cycles',
      bandwidth: '~500GB/s',
      size: '50MB',
      accessibility: '全局共享'
    },
    {
      name: '全局内存',
      latency: '~500 cycles',
      bandwidth: '3.35TB/s',
      size: '80GB',
      accessibility: '所有线程'
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={selectedComponent} onValueChange={setSelectedComponent}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sm">SM</TabsTrigger>
          <TabsTrigger value="cuda">CUDA</TabsTrigger>
          <TabsTrigger value="tensor">Tensor</TabsTrigger>
          <TabsTrigger value="memory">内存</TabsTrigger>
          <TabsTrigger value="cache">缓存</TabsTrigger>
        </TabsList>

        {Object.entries(components).map(([key, component]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {key === 'sm' && <Cpu className="h-5 w-5" />}
                  {key === 'cuda' && <Activity className="h-5 w-5" />}
                  {key === 'tensor' && <Zap className="h-5 w-5" />}
                  {key === 'memory' && <HardDrive className="h-5 w-5" />}
                  {key === 'cache' && <BarChart3 className="h-5 w-5" />}
                  {component.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{component.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">数量</span>
                      <Badge variant="outline">{component.count}{key === 'memory' ? 'GB' : key === 'cache' ? 'MB' : ''}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">性能</span>
                      <span className="text-sm text-muted-foreground">{component.performance}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">利用率模拟</div>
                    <Progress 
                      value={animationActive ? Math.random() * 100 : 75} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              CUDA执行层次
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {architectureLayers.map((layer, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{layer.name}</h4>
                  <Badge variant="outline">{layer.elements.length}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{layer.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {layer.elements.map((element, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded text-xs text-center ${layer.color} 
                        ${animationActive ? 'animate-pulse' : ''}`}
                    >
                      {element}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Button 
              onClick={() => setAnimationActive(!animationActive)}
              variant="outline" 
              size="sm"
              className="w-full"
            >
              {animationActive ? '停止动画' : '启动动画'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              内存层次结构
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {memoryHierarchy.map((memory, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{memory.name}</h4>
                  <Badge variant={index < 2 ? "default" : "secondary"}>
                    {memory.latency}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">带宽: </span>
                    <span className="font-mono">{memory.bandwidth}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">容量: </span>
                    <span className="font-mono">{memory.size}</span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  访问范围: {memory.accessibility}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};