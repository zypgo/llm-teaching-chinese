import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Play, Shuffle } from 'lucide-react';

interface AttentionCell {
  value: number;
  from: string;
  to: string;
}

const defaultText = "机器学习是人工智能的核心技术";

export const AttentionHeatmap: React.FC = () => {
  const [inputText, setInputText] = useState(defaultText);
  const [tokens, setTokens] = useState<string[]>([]);
  const [attentionMatrix, setAttentionMatrix] = useState<number[][]>([]);
  const [selectedHead, setSelectedHead] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<AttentionCell | null>(null);

  // 模拟分词器
  const tokenize = (text: string): string[] => {
    // 简单的中文分词模拟
    return text.split('').filter(char => char.trim() !== '');
  };

  // 生成模拟注意力权重
  const generateAttentionWeights = (length: number, head: number): number[][] => {
    const matrix: number[][] = [];
    const seed = head * 42; // 不同头部有不同的随机种子
    
    for (let i = 0; i < length; i++) {
      matrix[i] = [];
      let sum = 0;
      
      for (let j = 0; j < length; j++) {
        // 使用伪随机生成器模拟注意力权重
        const distance = Math.abs(i - j);
        const random = Math.sin(seed + i * 17 + j * 23) * 0.5 + 0.5;
        
        // 模拟不同的注意力模式
        let weight = 0;
        switch (head % 4) {
          case 0: // 局部注意力
            weight = Math.exp(-distance * 0.5) * random;
            break;
          case 1: // 长距离注意力
            weight = distance > 2 ? random * 0.8 : random * 0.3;
            break;
          case 2: // 位置偏向
            weight = i === j ? 1.0 : random * 0.4;
            break;
          case 3: // 随机模式
            weight = random;
            break;
        }
        
        matrix[i][j] = weight;
        sum += weight;
      }
      
      // 归一化 (softmax 近似)
      for (let j = 0; j < length; j++) {
        matrix[i][j] = matrix[i][j] / sum;
      }
    }
    
    return matrix;
  };

  // 初始化和更新注意力矩阵
  useEffect(() => {
    const newTokens = tokenize(inputText);
    setTokens(newTokens);
    setAttentionMatrix(generateAttentionWeights(newTokens.length, selectedHead));
  }, [inputText, selectedHead]);

  // 获取热力图颜色
  const getHeatmapColor = (value: number): string => {
    const intensity = Math.min(value * 2, 1); // 放大较小的值
    const red = Math.floor(255 * intensity);
    const blue = Math.floor(255 * (1 - intensity));
    return `rgb(${red}, 50, ${blue})`;
  };

  // 生成随机文本
  const generateRandomText = () => {
    const samples = [
      "深度学习改变了人工智能的发展轨迹",
      "注意力机制是Transformer的核心创新",
      "大语言模型正在重塑自然语言处理",
      "神经网络的并行计算能力极为重要",
      "预训练模型能够理解语言的深层含义"
    ];
    const randomIndex = Math.floor(Math.random() * samples.length);
    setInputText(samples[randomIndex]);
  };

  // 动画演示
  const startAnimation = () => {
    setIsAnimating(true);
    let head = 0;
    const interval = setInterval(() => {
      setSelectedHead(head);
      head = (head + 1) % 8;
      if (head === 0) {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>注意力权重热力图</span>
          <div className="flex space-x-2">
            <Button onClick={generateRandomText} size="sm" variant="outline">
              <Shuffle className="h-4 w-4 mr-2" />
              随机文本
            </Button>
            <Button 
              onClick={startAnimation} 
              disabled={isAnimating}
              size="sm"
              variant="outline"
            >
              <Play className="h-4 w-4 mr-2" />
              演示
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 输入控制 */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">输入文本</label>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入中文文本..."
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              注意力头 #{selectedHead + 1}
            </label>
            <Slider
              value={[selectedHead]}
              onValueChange={([value]) => setSelectedHead(value)}
              min={0}
              max={7}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* 热力图 */}
        {tokens.length > 0 && attentionMatrix.length > 0 && (
          <div className="space-y-4">
            <div className="overflow-auto">
              <div className="relative inline-block min-w-full">
                {/* Y轴标签 (查询词) */}
                <div className="absolute -left-16 top-8">
                  <div className="text-xs text-muted-foreground transform -rotate-90 origin-bottom-left">
                    查询词 (Query)
                  </div>
                </div>
                
                {/* X轴标签 (键值词) */}
                <div className="text-center mb-2">
                  <div className="text-xs text-muted-foreground">键值词 (Key)</div>
                </div>
                
                {/* 列标签 */}
                <div className="flex mb-1 ml-12">
                  {tokens.map((token, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 flex items-center justify-center text-xs font-medium text-center"
                      style={{ minWidth: '32px' }}
                    >
                      {token}
                    </div>
                  ))}
                </div>
                
                {/* 热力图矩阵 */}
                <div className="flex flex-col">
                  {attentionMatrix.map((row, i) => (
                    <div key={i} className="flex items-center">
                      {/* 行标签 */}
                      <div className="w-12 h-8 flex items-center justify-center text-xs font-medium">
                        {tokens[i]}
                      </div>
                      
                      {/* 注意力权重单元格 */}
                      <div className="flex">
                        {row.map((weight, j) => (
                          <div
                            key={j}
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center text-xs cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10 relative"
                            style={{ 
                              backgroundColor: getHeatmapColor(weight),
                              minWidth: '32px'
                            }}
                            onMouseEnter={() => setHoveredCell({
                              value: weight,
                              from: tokens[i],
                              to: tokens[j]
                            })}
                            onMouseLeave={() => setHoveredCell(null)}
                            title={`${tokens[i]} → ${tokens[j]}: ${weight.toFixed(3)}`}
                          >
                            <span className="text-white font-bold text-xs">
                              {(weight * 100).toFixed(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 悬停信息 */}
            {hoveredCell && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-sm">
                  <strong>{hoveredCell.from}</strong> 对 <strong>{hoveredCell.to}</strong> 的注意力权重:
                  <span className="ml-2 font-mono text-primary">
                    {(hoveredCell.value * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            {/* 颜色图例 */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">注意力强度:</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs">低</span>
                <div className="flex">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4"
                      style={{ backgroundColor: getHeatmapColor(i / 9) }}
                    />
                  ))}
                </div>
                <span className="text-xs">高</span>
              </div>
            </div>

            {/* 说明文字 */}
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p>
                <strong>可视化说明：</strong>每个单元格表示查询词(行)对键值词(列)的注意力权重。
                颜色越红表示注意力越强，越蓝表示注意力越弱。数字显示权重百分比。
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};