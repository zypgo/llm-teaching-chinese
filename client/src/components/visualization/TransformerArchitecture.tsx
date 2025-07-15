import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Text, OrbitControls, Box, Sphere } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

interface LayerBoxProps {
  position: [number, number, number];
  color: string;
  label: string;
  isActive: boolean;
}

function LayerBox({ position, color, label, isActive, ...props }: LayerBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (isActive && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[2, 0.8, 2]}
        {...props}
      >
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isActive ? 0.9 : 0.6}
          emissive={isActive ? color : '#000000'}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </Box>
      <Text
        position={[0, 0, 1.2]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function AttentionFlow({ isAnimating }: { isAnimating: boolean }) {
  const positions = [
    [-3, 2, 0], [0, 2, 0], [3, 2, 0],
    [-3, 0, 0], [0, 0, 0], [3, 0, 0],
    [-3, -2, 0], [0, -2, 0], [3, -2, 0]
  ];
  
  return (
    <>
      {positions.map((pos, index) => (
        <Sphere key={index} position={pos as [number, number, number]} args={[0.1]}>
          <meshStandardMaterial 
            color="#4f46e5" 
            emissive="#4f46e5"
            emissiveIntensity={isAnimating ? 0.5 : 0.1}
          />
        </Sphere>
      ))}
      
      {/* 注意力连接效果 */}
      {isAnimating && positions.map((startPos, i) => 
        positions.slice(i + 1).map((endPos, j) => {
          // 在连接线中间添加小球表示连接
          const midPoint = [
            (startPos[0] + endPos[0]) / 2,
            (startPos[1] + endPos[1]) / 2,
            (startPos[2] + endPos[2]) / 2
          ] as [number, number, number];
          
          return (
            <Sphere key={`${i}-${j}`} position={midPoint} args={[0.05]}>
              <meshStandardMaterial 
                color="#60a5fa" 
                transparent 
                opacity={0.6}
                emissive="#60a5fa"
                emissiveIntensity={0.3}
              />
            </Sphere>
          );
        })
      )}
    </>
  );
}

export const TransformerArchitecture: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(0);
  
  const layers = [
    { name: '输入嵌入', color: '#ef4444', y: -4 },
    { name: '位置编码', color: '#f97316', y: -2.5 },
    { name: '多头注意力', color: '#eab308', y: -1 },
    { name: '残差连接', color: '#22c55e', y: 0.5 },
    { name: '前馈网络', color: '#06b6d4', y: 2 },
    { name: '输出层', color: '#8b5cf6', y: 3.5 }
  ];

  const handlePlay = () => {
    setIsAnimating(true);
    // 自动循环高亮每一层
    const interval = setInterval(() => {
      setCurrentLayer(prev => {
        const next = (prev + 1) % layers.length;
        if (next === 0) {
          setIsAnimating(false);
          clearInterval(interval);
        }
        return next;
      });
    }, 2000);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentLayer(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Transformer 架构可视化</span>
          <div className="flex space-x-2">
            <Button
              onClick={handlePlay}
              disabled={isAnimating}
              size="sm"
              variant="outline"
            >
              <Play className="h-4 w-4 mr-2" />
              演示
            </Button>
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
      <CardContent>
        <div className="h-96 w-full bg-slate-900 rounded-lg overflow-hidden">
          <React.Suspense fallback={
            <div className="h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>加载3D场景中...</p>
              </div>
            </div>
          }>
            <div className="h-full flex items-center justify-center text-white bg-slate-800">
              <div className="text-center">
                <div className="mb-4 text-lg font-semibold">Transformer Architecture Visualization</div>
                <div className="space-y-2">
                  {layers.map((layer, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-2 rounded mx-4 transition-all duration-300 ${
                        currentLayer === index 
                          ? 'bg-opacity-100 shadow-lg transform scale-105' 
                          : 'bg-opacity-60'
                      }`}
                      style={{ backgroundColor: layer.color }}
                    >
                      <span className="text-white font-medium">{layer.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  3D visualization temporarily disabled for compatibility
                </p>
              </div>
            </div>
          </React.Suspense>
        </div>
        
        {/* 图例 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {layers.map((layer, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 p-2 rounded ${
                currentLayer === index ? 'bg-primary/20 border border-primary' : 'bg-muted/30'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: layer.color }}
              />
              <span className="text-sm">{layer.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            🎮 <strong>交互说明：</strong>拖拽旋转视角，滚轮缩放，点击"演示"查看数据流动过程
          </p>
        </div>
      </CardContent>
    </Card>
  );
};