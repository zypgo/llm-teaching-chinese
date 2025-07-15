import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, TrendingDown } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const TrainingSim: React.FC = () => {
  const {
    trainingParams,
    trainingHistory,
    isTraining,
    updateTrainingParams,
    addTrainingRecord,
    setTrainingStatus,
    clearTrainingHistory
  } = useStore();

  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [progress, setProgress] = useState(0);

  // 模拟训练函数
  const simulateTraining = useCallback(() => {
    if (currentEpoch >= trainingParams.epochs) {
      setTrainingStatus(false);
      return;
    }

    // 模拟损失计算（简化的指数衰减）
    const baseLoss = 4.0; // 初始损失
    const decayRate = trainingParams.learningRate * 1000; // 学习率影响收敛速度
    const noise = (Math.random() - 0.5) * 0.2; // 添加随机噪声
    
    const loss = baseLoss * Math.exp(-decayRate * currentEpoch) + 0.5 + noise;
    const accuracy = Math.min(95, Math.max(10, 95 * (1 - Math.exp(-decayRate * currentEpoch))));

    addTrainingRecord({
      epoch: currentEpoch + 1,
      loss: Math.max(0.1, loss), // 确保损失不为负
      accuracy: Math.round(accuracy * 100) / 100
    });

    setCurrentEpoch(prev => prev + 1);
    setProgress(((currentEpoch + 1) / trainingParams.epochs) * 100);
  }, [currentEpoch, trainingParams, addTrainingRecord, setTrainingStatus]);

  // 训练循环
  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      simulateTraining();
    }, 500); // 每500ms一个epoch

    return () => clearInterval(interval);
  }, [isTraining, simulateTraining]);

  const handleStart = () => {
    setTrainingStatus(true);
  };

  const handlePause = () => {
    setTrainingStatus(false);
  };

  const handleReset = () => {
    setTrainingStatus(false);
    setCurrentEpoch(0);
    setProgress(0);
    clearTrainingHistory();
  };

  const latestMetrics = trainingHistory[trainingHistory.length - 1];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingDown className="h-5 w-5 text-primary" />
          <span>训练模拟器</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 超参数控制 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                学习率: {trainingParams.learningRate}
              </label>
              <Slider
                value={[trainingParams.learningRate]}
                onValueChange={([value]) => updateTrainingParams({ learningRate: value })}
                min={0.0001}
                max={0.01}
                step={0.0001}
                className="w-full"
                disabled={isTraining}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                批量大小: {trainingParams.batchSize}
              </label>
              <Slider
                value={[trainingParams.batchSize]}
                onValueChange={([value]) => updateTrainingParams({ batchSize: value })}
                min={8}
                max={128}
                step={8}
                className="w-full"
                disabled={isTraining}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                训练轮数: {trainingParams.epochs}
              </label>
              <Slider
                value={[trainingParams.epochs]}
                onValueChange={([value]) => updateTrainingParams({ epochs: value })}
                min={5}
                max={100}
                step={5}
                className="w-full"
                disabled={isTraining}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                预热步数: {trainingParams.warmupSteps}
              </label>
              <Slider
                value={[trainingParams.warmupSteps]}
                onValueChange={([value]) => updateTrainingParams({ warmupSteps: value })}
                min={0}
                max={1000}
                step={50}
                className="w-full"
                disabled={isTraining}
              />
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex space-x-2">
          <Button
            onClick={handleStart}
            disabled={isTraining || currentEpoch >= trainingParams.epochs}
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            开始训练
          </Button>
          <Button
            onClick={handlePause}
            disabled={!isTraining}
            variant="outline"
            size="sm"
          >
            <Pause className="h-4 w-4 mr-2" />
            暂停
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
        </div>

        {/* 训练进度 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>训练进度</span>
            <span>{currentEpoch}/{trainingParams.epochs} epochs</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* 当前指标 */}
        {latestMetrics && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="text-sm text-muted-foreground">当前损失</div>
              <div className="text-lg font-semibold text-destructive">
                {latestMetrics.loss.toFixed(4)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="text-sm text-muted-foreground">准确率</div>
              <div className="text-lg font-semibold text-success">
                {latestMetrics.accuracy?.toFixed(2)}%
              </div>
            </div>
          </div>
        )}

        {/* 简化的损失曲线显示 */}
        {trainingHistory.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">最近训练记录</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {trainingHistory.slice(-5).map((record, index) => (
                <div key={index} className="flex justify-between text-xs p-2 rounded bg-muted/30">
                  <span>Epoch {record.epoch}</span>
                  <span className="text-destructive">Loss: {record.loss.toFixed(4)}</span>
                  {record.accuracy && (
                    <span className="text-success">Acc: {record.accuracy.toFixed(1)}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 训练说明 */}
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p>
            <strong>模拟说明：</strong>这是一个简化的训练模拟器，展示了超参数对训练过程的影响。
            实际训练中，损失下降模式会更复杂，受到数据质量、模型架构、正则化等多种因素影响。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};