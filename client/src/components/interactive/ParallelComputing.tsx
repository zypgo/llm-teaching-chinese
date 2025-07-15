import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  BarChart3,
  Clock,
  Zap
} from 'lucide-react';

interface ComputeTask {
  id: number;
  status: 'pending' | 'running' | 'completed';
  progress: number;
  startTime?: number;
  duration: number;
}

interface ComputeUnit {
  id: number;
  currentTask?: ComputeTask;
  utilization: number;
}

export const ParallelComputing: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [computeMode, setComputeMode] = useState<'serial' | 'parallel'>('serial');
  const [tasks, setTasks] = useState<ComputeTask[]>([]);
  const [cpuUnits, setCpuUnits] = useState<ComputeUnit[]>([]);
  const [gpuUnits, setGpuUnits] = useState<ComputeUnit[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  // 初始化计算单元
  useEffect(() => {
    setCpuUnits(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      utilization: 0
    })));
    
    setGpuUnits(Array.from({ length: 64 }, (_, i) => ({
      id: i,
      utilization: 0
    })));
  }, []);

  // 生成任务
  const generateTasks = () => {
    const newTasks: ComputeTask[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      status: 'pending',
      progress: 0,
      duration: Math.random() * 2000 + 1000 // 1-3秒随机时长
    }));
    setTasks(newTasks);
    setCompletedTasks(0);
    setTotalTime(0);
  };

  // 串行计算模拟
  const runSerialComputation = () => {
    let currentTaskIndex = 0;
    const startTime = Date.now();
    
    const processNextTask = () => {
      if (currentTaskIndex >= tasks.length) {
        setIsRunning(false);
        setTotalTime(Date.now() - startTime);
        return;
      }

      const task = tasks[currentTaskIndex];
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'running', startTime: Date.now() }
          : t
      ));

      // 更新CPU利用率
      setCpuUnits(prev => prev.map((unit, idx) => 
        idx === 0 ? { ...unit, utilization: 95 } : { ...unit, utilization: 0 }
      ));

      // 模拟任务进度
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, progress } : t
        ));

        if (progress >= 100) {
          clearInterval(progressInterval);
          setTasks(prev => prev.map(t => 
            t.id === task.id ? { ...t, status: 'completed', progress: 100 } : t
          ));
          setCompletedTasks(prev => prev + 1);
          currentTaskIndex++;
          setTimeout(processNextTask, 100);
        }
      }, task.duration / 10);
    };

    processNextTask();
  };

  // 并行计算模拟
  const runParallelComputation = () => {
    const startTime = Date.now();
    const availableUnits = [...gpuUnits];
    let taskQueue = [...tasks];
    let activeTasks = new Map<number, NodeJS.Timeout>();

    const assignTask = () => {
      if (taskQueue.length === 0 && activeTasks.size === 0) {
        setIsRunning(false);
        setTotalTime(Date.now() - startTime);
        return;
      }

      // 为空闲的GPU单元分配任务
      availableUnits.forEach((unit, index) => {
        if (taskQueue.length > 0 && !unit.currentTask) {
          const task = taskQueue.shift()!;
          
          // 分配任务给GPU单元
          setGpuUnits(prev => prev.map((u, i) => 
            i === index 
              ? { ...u, currentTask: task, utilization: 90 + Math.random() * 10 }
              : u
          ));

          setTasks(prev => prev.map(t => 
            t.id === task.id 
              ? { ...t, status: 'running', startTime: Date.now() }
              : t
          ));

          // 模拟任务进度
          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += 20;
            setTasks(prev => prev.map(t => 
              t.id === task.id ? { ...t, progress } : t
            ));

            if (progress >= 100) {
              clearInterval(progressInterval);
              activeTasks.delete(task.id);
              
              setTasks(prev => prev.map(t => 
                t.id === task.id ? { ...t, status: 'completed', progress: 100 } : t
              ));
              
              setGpuUnits(prev => prev.map((u, i) => 
                i === index 
                  ? { ...u, currentTask: undefined, utilization: 0 }
                  : u
              ));
              
              setCompletedTasks(prev => prev + 1);
              setTimeout(assignTask, 50);
            }
          }, task.duration / 5);

          activeTasks.set(task.id, progressInterval);
        }
      });
    };

    assignTask();
  };

  const startComputation = () => {
    if (tasks.length === 0) {
      generateTasks();
      return;
    }

    setIsRunning(true);
    if (computeMode === 'serial') {
      runSerialComputation();
    } else {
      runParallelComputation();
    }
  };

  const resetComputation = () => {
    setIsRunning(false);
    setTasks([]);
    setCompletedTasks(0);
    setTotalTime(0);
    setCpuUnits(prev => prev.map(unit => ({ ...unit, utilization: 0 })));
    setGpuUnits(prev => prev.map(unit => ({ ...unit, utilization: 0, currentTask: undefined })));
  };

  const efficiencyScore = computeMode === 'parallel' && totalTime > 0 
    ? Math.round((completedTasks / (totalTime / 1000)) * 10) / 10
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            并行计算演示
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Tabs value={computeMode} onValueChange={(value) => setComputeMode(value as 'serial' | 'parallel')}>
              <TabsList>
                <TabsTrigger value="serial">串行计算 (CPU)</TabsTrigger>
                <TabsTrigger value="parallel">并行计算 (GPU)</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Button 
                onClick={startComputation} 
                disabled={isRunning}
                variant="default"
                size="sm"
              >
                <Play className="h-4 w-4 mr-1" />
                {tasks.length === 0 ? '生成任务' : '开始计算'}
              </Button>
              
              <Button 
                onClick={resetComputation} 
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                重置
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedTasks}</div>
              <div className="text-sm text-muted-foreground">已完成任务</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {totalTime > 0 ? (totalTime / 1000).toFixed(1) : '0.0'}s
              </div>
              <div className="text-sm text-muted-foreground">总耗时</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {efficiencyScore}
              </div>
              <div className="text-sm text-muted-foreground">任务/秒</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {computeMode === 'serial' ? 'CPU核心状态' : 'GPU核心状态'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {computeMode === 'serial' ? (
                <div className="grid grid-cols-4 gap-2">
                  {cpuUnits.slice(0, 8).map((unit, index) => (
                    <div
                      key={unit.id}
                      className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium
                        ${unit.utilization > 0 
                          ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700' 
                          : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                        }`}
                    >
                      Core {index}
                      {unit.utilization > 0 && (
                        <div className="ml-1 text-blue-600">{unit.utilization}%</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    GPU核心利用率 (显示前64个核心)
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {gpuUnits.slice(0, 64).map((unit) => (
                      <div
                        key={unit.id}
                        className={`h-6 w-6 rounded border
                          ${unit.utilization > 0 
                            ? 'bg-green-400 border-green-500' 
                            : 'bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                          }`}
                        title={`Core ${unit.id}: ${unit.utilization.toFixed(0)}%`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    绿色: 活跃核心 | 灰色: 空闲核心
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              任务队列状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>总任务数</span>
                <Badge variant="outline">{tasks.length}</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>等待中</span>
                  <span className="text-gray-600">
                    {tasks.filter(t => t.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>执行中</span>
                  <span className="text-blue-600">
                    {tasks.filter(t => t.status === 'running').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>已完成</span>
                  <span className="text-green-600">
                    {tasks.filter(t => t.status === 'completed').length}
                  </span>
                </div>
              </div>

              {tasks.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">整体进度</div>
                  <Progress 
                    value={(completedTasks / tasks.length) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {Math.round((completedTasks / tasks.length) * 100)}% 完成
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            性能对比分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">串行计算 (CPU)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>核心数量</span>
                    <span className="font-mono">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>并发任务</span>
                    <span className="font-mono">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>任务切换开销</span>
                    <span className="font-mono">低</span>
                  </div>
                  <div className="flex justify-between">
                    <span>适用场景</span>
                    <span className="font-mono">复杂逻辑</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">并行计算 (GPU)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>核心数量</span>
                    <span className="font-mono">13,824</span>
                  </div>
                  <div className="flex justify-between">
                    <span>并发任务</span>
                    <span className="font-mono">数千</span>
                  </div>
                  <div className="flex justify-between">
                    <span>内存带宽</span>
                    <span className="font-mono">高</span>
                  </div>
                  <div className="flex justify-between">
                    <span>适用场景</span>
                    <span className="font-mono">矩阵运算</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">为什么GPU更适合深度学习？</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• <strong>大规模并行:</strong> 神经网络计算可以分解为大量独立的矩阵运算</li>
                <li>• <strong>高内存带宽:</strong> 快速读取大量参数和激活值</li>
                <li>• <strong>专用指令:</strong> Tensor Core为混合精度矩阵乘法优化</li>
                <li>• <strong>SIMD架构:</strong> 同一指令可并行处理多个数据元素</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};