import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Zap } from 'lucide-react';

interface WordPoint {
  word: string;
  category: string;
  color: string;
  x: number;
  y: number;
}

export const EmbeddingSpace: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [similarityThreshold, setSimilarityThreshold] = useState(1.5);

  // 模拟词嵌入数据
  const wordData = useMemo(() => {
    const categories = {
      technology: { words: ['人工智能', '机器学习', '深度学习', '神经网络', '算法'], color: '#3b82f6' },
      animals: { words: ['猫', '狗', '鸟', '鱼', '马'], color: '#10b981' },
      food: { words: ['苹果', '香蕉', '面包', '牛奶', '米饭'], color: '#f59e0b' },
      emotions: { words: ['快乐', '悲伤', '愤怒', '惊讶', '恐惧'], color: '#ef4444' },
      nature: { words: ['山', '海', '树', '花', '云'], color: '#8b5cf6' }
    };

    const points: WordPoint[] = [];
    
    Object.entries(categories).forEach(([category, data], categoryIndex) => {
      const baseAngle = (categoryIndex / Object.keys(categories).length) * Math.PI * 2;
      const centerX = Math.cos(baseAngle) * 150 + 250;
      const centerY = Math.sin(baseAngle) * 100 + 200;
      
      data.words.forEach((word, wordIndex) => {
        const angle = (wordIndex / data.words.length) * Math.PI * 2;
        const radius = 30 + Math.random() * 20;
        
        points.push({
          word,
          category,
          color: data.color,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius
        });
      });
    });
    
    return points;
  }, []);

  const filteredWordData = useMemo(() => {
    if (selectedCategory === 'all') return wordData;
    return wordData.filter(point => point.category === selectedCategory);
  }, [wordData, selectedCategory]);

  const handleWordClick = (word: string) => {
    setSelectedWord(selectedWord === word ? null : word);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setSelectedWord(null);
  };

  const categories = [
    { value: 'all', label: '全部词汇' },
    { value: 'technology', label: '技术词汇' },
    { value: 'animals', label: '动物' },
    { value: 'food', label: '食物' },
    { value: 'emotions', label: '情感' },
    { value: 'nature', label: '自然' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>词嵌入空间可视化</span>
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              size="sm"
              variant="outline"
            >
              {isAnimating ? '停止' : '动画'}
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">词汇类别</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              相似度阈值: {similarityThreshold.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* 2D 词嵌入空间可视化 */}
        <div className="h-96 w-full bg-slate-900 rounded-lg overflow-hidden relative">
          <svg className="w-full h-full" viewBox="0 0 500 400">
            {/* 坐标轴 */}
            <line x1="50" y1="350" x2="450" y2="350" stroke="#4b5563" strokeWidth="1" />
            <line x1="50" y1="50" x2="50" y2="350" stroke="#4b5563" strokeWidth="1" />
            
            {/* 词汇点 */}
            {filteredWordData.map((point, index) => {
              const isSelected = selectedWord === point.word;
              const distance = selectedWord ? 
                Math.sqrt(
                  Math.pow(point.x - (filteredWordData.find(p => p.word === selectedWord)?.x || 0), 2) +
                  Math.pow(point.y - (filteredWordData.find(p => p.word === selectedWord)?.y || 0), 2)
                ) : 0;
              
              const showConnection = selectedWord && selectedWord !== point.word && distance < 80;
              
              return (
                <g key={point.word}>
                  {/* 连接线 */}
                  {showConnection && selectedWord && (
                    <line
                      x1={filteredWordData.find(p => p.word === selectedWord)?.x}
                      y1={filteredWordData.find(p => p.word === selectedWord)?.y}
                      x2={point.x}
                      y2={point.y}
                      stroke="#60a5fa"
                      strokeWidth="1"
                      opacity="0.6"
                      strokeDasharray="2,2"
                    />
                  )}
                  
                  {/* 词汇圆点 */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected ? 8 : 6}
                    fill={point.color}
                    stroke={isSelected ? "#fff" : "none"}
                    strokeWidth="2"
                    className={`cursor-pointer transition-all duration-300 ${
                      isAnimating ? 'animate-pulse' : ''
                    }`}
                    onClick={() => handleWordClick(point.word)}
                  />
                  
                  {/* 词汇标签 */}
                  <text
                    x={point.x}
                    y={point.y - 12}
                    textAnchor="middle"
                    className="text-xs fill-white pointer-events-none"
                    opacity={isSelected ? 1 : 0.8}
                  >
                    {point.word}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* 选中词汇信息 */}
          {selectedWord && (
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">选中词汇: </span>
                  <span className="text-blue-300">{selectedWord}</span>
                </div>
                <div className="text-sm text-gray-300">
                  点击其他词汇查看语义距离
                </div>
              </div>
            </div>
          )}
          
          {/* 图例 */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-2 rounded text-xs">
            <div className="space-y-1">
              {Object.entries({
                technology: { color: '#3b82f6', label: '技术' },
                animals: { color: '#10b981', label: '动物' },
                food: { color: '#f59e0b', label: '食物' },
                emotions: { color: '#ef4444', label: '情感' },
                nature: { color: '#8b5cf6', label: '自然' }
              }).map(([key, { color, label }]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: color }}
                  ></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 说明文字 */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>词嵌入空间:</strong> 
            每个词汇在高维空间中都有一个向量表示，语义相似的词汇在空间中距离更近。
          </p>
          <p>
            <strong>操作说明:</strong> 
            点击任意词汇查看与其他词汇的语义关系，虚线表示语义相似度。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};