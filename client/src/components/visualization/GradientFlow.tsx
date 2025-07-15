import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, ArrowDown, ArrowUp } from 'lucide-react';

interface LayerNode {
  id: string;
  name: string;
  gradient: number;
  activation: number;
  position: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  gradient: number;
}

export const GradientFlow: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showGradients, setShowGradients] = useState(true);
  
  // 网络结构定义
  const layers = [
    { name: '输出层', nodes: ['出', '力', '层'] },
    { name: '隐藏层3', nodes: ['H3-1', 'H3-2', 'H3-3', 'H3-4'] },
    { name: '隐藏层2', nodes: ['H2-1', 'H2-2', 'H2-3', 'H2-4'] },
    { name: '隐藏层1', nodes: ['H1-1', 'H1-2', 'H1-3', 'H1-4'] },
    { name: '输入层', nodes: ['输', '入', '词', '汇'] }
  ];

  // 生成节点数据
  const generateNodes = (): LayerNode[] => {
    const nodes: LayerNode[] = [];
    const layerHeight = 80;
    const nodeSpacing = 60;
    
    layers.forEach((layer, layerIndex) => {
      const y = layerIndex * layerHeight + 50;
      const startX = 150 - (layer.nodes.length - 1) * nodeSpacing / 2;
      
      layer.nodes.forEach((nodeName, nodeIndex) => {
        const x = startX + nodeIndex * nodeSpacing;
        
        // 模拟梯度值（反向传播时梯度逐层减小）
        const gradientMagnitude = Math.exp(-(layerIndex * 0.5)) * (0.5 + Math.random() * 0.5);
        const gradient = showGradients ? gradientMagnitude : 0;
        
        nodes.push({
          id: `${layerIndex}-${nodeIndex}`,
          name: nodeName,
          gradient: gradient,
          activation: Math.random() * 0.8 + 0.2,
          position: { x, y }
        });
      });
    });
    
    return nodes;
  };

  // 生成连接数据
  const generateConnections = (nodes: LayerNode[]): Connection[] => {
    const connections: Connection[] = [];
    
    for (let i = 0; i < layers.length - 1; i++) {
      const fromLayer = layers[i];
      const toLayer = layers[i + 1];
      
      fromLayer.nodes.forEach((_, fromIndex) => {
        toLayer.nodes.forEach((_, toIndex) => {
          const fromId = `${i}-${fromIndex}`;
          const toId = `${i + 1}-${toIndex}`;
          
          connections.push({
            from: fromId,
            to: toId,
            weight: (Math.random() - 0.5) * 2,
            gradient: showGradients ? (Math.random() - 0.5) * 2 : 0
          });
        });
      });
    }
    
    return connections;
  };

  const [nodes, setNodes] = useState<LayerNode[]>(generateNodes());
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const newNodes = generateNodes();
    setNodes(newNodes);
    setConnections(generateConnections(newNodes));
  }, [showGradients, currentStep]);

  // 动画控制
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 100);
    }, 1000 / animationSpeed);
    
    return () => clearInterval(interval);
  }, [isAnimating, animationSpeed]);

  // 获取梯度颜色
  const getGradientColor = (gradient: number): string => {
    const intensity = Math.abs(gradient);
    if (gradient > 0) {
      return `rgba(34, 197, 94, ${intensity})`; // 绿色 - 正梯度
    } else {
      return `rgba(239, 68, 68, ${intensity})`; // 红色 - 负梯度
    }
  };

  // 获取连接线颜色和宽度
  const getConnectionStyle = (connection: Connection) => {
    const intensity = Math.abs(connection.gradient);
    const width = Math.max(1, intensity * 3);
    const color = connection.gradient > 0 ? '#22c55e' : '#ef4444';
    const opacity = showGradients ? intensity : 0.3;
    
    return {
      stroke: color,
      strokeWidth: width,
      opacity: opacity
    };
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setNodes(generateNodes());
    setConnections(generateConnections(generateNodes()));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>梯度反向传播可视化</span>
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              size="sm"
              variant="outline"
            >
              {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 控制面板 */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              动画速度: {animationSpeed}x
            </label>
            <Slider
              value={[animationSpeed]}
              onValueChange={([value]) => setAnimationSpeed(value)}
              min={0.5}
              max={3}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showGradients"
              checked={showGradients}
              onChange={(e) => setShowGradients(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="showGradients" className="text-sm font-medium">
              显示梯度流
            </label>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span>正向传播</span>
            <ArrowDown className="h-4 w-4 text-red-500 ml-4" />
            <span>反向传播</span>
          </div>
        </div>

        {/* 网络可视化 */}
        <div className="bg-slate-900 rounded-lg p-4 overflow-auto">
          <svg width="400" height="420" viewBox="0 0 400 420" className="w-full h-auto">
            {/* 连接线 */}
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              
              if (!fromNode || !toNode) return null;
              
              const style = getConnectionStyle(connection);
              
              return (
                <line
                  key={index}
                  x1={fromNode.position.x}
                  y1={fromNode.position.y}
                  x2={toNode.position.x}
                  y2={toNode.position.y}
                  {...style}
                  className="transition-all duration-300"
                />
              );
            })}
            
            {/* 节点 */}
            {nodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={12}
                  fill={showGradients ? getGradientColor(node.gradient) : '#64748b'}
                  stroke="#ffffff"
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
                <text
                  x={node.position.x}
                  y={node.position.y + 4}
                  textAnchor="middle"
                  className="text-xs font-medium fill-white"
                >
                  {node.name}
                </text>
                
                {/* 梯度值显示 */}
                {showGradients && (
                  <text
                    x={node.position.x + 20}
                    y={node.position.y}
                    className="text-xs fill-green-400"
                  >
                    {node.gradient.toFixed(2)}
                  </text>
                )}
              </g>
            ))}
            
            {/* 层标签 */}
            {layers.map((layer, index) => (
              <text
                key={index}
                x={20}
                y={index * 80 + 55}
                className="text-sm font-medium fill-gray-300"
              >
                {layer.name}
              </text>
            ))}
          </svg>
        </div>

        {/* 梯度消失/爆炸说明 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-medium text-red-500 mb-2">梯度消失问题</h4>
            <p className="text-sm text-muted-foreground">
              在深层网络中，梯度从输出层向输入层传播时会逐渐减小，
              导致靠近输入层的参数更新缓慢。
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <h4 className="font-medium text-yellow-500 mb-2">解决方案</h4>
            <p className="text-sm text-muted-foreground">
              残差连接、层归一化、合适的激活函数等技术可以缓解梯度消失问题。
            </p>
          </div>
        </div>

        {/* 公式说明 */}
        <div className="p-4 rounded-lg bg-accent/50 border border-accent">
          <h4 className="font-medium mb-2">反向传播公式</h4>
          <div className="space-y-2 text-sm font-mono">
            <div>∂L/∂w = ∂L/∂y × ∂y/∂w</div>
            <div>∂L/∂x = ∂L/∂y × ∂y/∂x</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            L: 损失函数, w: 权重, x: 输入, y: 输出
          </p>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p>
            <strong>可视化说明：</strong>绿色表示正梯度，红色表示负梯度，
            颜色深浅表示梯度大小。观察梯度如何从输出层传播到输入层。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};