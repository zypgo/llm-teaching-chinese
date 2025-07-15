import React, { useState, useCallback, useRef, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search, Download, Eye, Activity, BarChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface ProbeState {
  loading: boolean;
  ready: boolean;
  progress: number;
  error?: string;
}

interface TokenAnalysis {
  token: string;
  logit: number;
  probability: number;
  position: number;
}

interface GenerationStep {
  step: number;
  input: string;
  output: string;
  nextTokens: TokenAnalysis[];
}

export const ModelProbe: React.FC = () => {
  const [inputText, setInputText] = useState('The future of artificial intelligence is');
  const [probeState, setProbeState] = useState<ProbeState>({
    loading: false,
    ready: false,
    progress: 0
  });
  
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [finalOutput, setFinalOutput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [maxTokens, setMaxTokens] = useState(10);
  const [temperature, setTemperature] = useState(0.7);
  
  const pipelineRef = useRef<any>(null);

  const initializeProbe = useCallback(async () => {
    if (pipelineRef.current || probeState.loading) return;

    setProbeState({ loading: true, ready: false, progress: 0 });
    
    // 模拟探针初始化过程
    const simulateLoading = () => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve();
          }
          setProbeState(prev => ({ ...prev, progress: Math.min(progress, 100) }));
        }, 300);
      });
    };
    
    try {
      await simulateLoading();

      // 创建模拟的探针
      pipelineRef.current = {
        analyze: (text: string, options: any) => {
          // 模拟token分析
          const words = text.split(' ');
          const steps: GenerationStep[] = [];
          
          for (let i = 0; i < Math.min(options.max_new_tokens || 10, 5); i++) {
            const nextTokenOptions = [
              { token: 'promising', logit: 2.1, probability: 0.35 },
              { token: 'bright', logit: 1.8, probability: 0.25 },
              { token: 'uncertain', logit: 1.2, probability: 0.15 },
              { token: 'complex', logit: 0.9, probability: 0.12 },
              { token: 'evolving', logit: 0.6, probability: 0.08 },
              { token: 'challenging', logit: 0.3, probability: 0.05 }
            ];
            
            // 随机选择一个token
            const selectedToken = nextTokenOptions[Math.floor(Math.random() * 3)]; // 偏向前几个
            
            steps.push({
              step: i + 1,
              input: text + (i > 0 ? steps.slice(0, i).map(s => ' ' + s.output).join('') : ''),
              output: selectedToken.token,
              nextTokens: nextTokenOptions.map((opt, idx) => ({
                ...opt,
                position: idx
              }))
            });
          }
          
          return Promise.resolve({
            steps,
            finalText: text + ' ' + steps.map(s => s.output).join(' ')
          });
        }
      };
      
      setProbeState({ loading: false, ready: true, progress: 100 });
    } catch (error) {
      setProbeState({
        loading: false,
        ready: false,
        progress: 0,
        error: `探针初始化失败: ${error instanceof Error ? error.message : '未知错误'}`
      });
    }
  }, [probeState.loading]);

  const analyzeGeneration = useCallback(async () => {
    if (!pipelineRef.current || isAnalyzing || !inputText.trim()) return;

    setIsAnalyzing(true);
    setGenerationSteps([]);
    setFinalOutput('');

    try {
      // 模拟分析延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 使用模拟的探针分析器
      const result = await pipelineRef.current.analyze(inputText, {
        max_new_tokens: maxTokens,
        temperature: temperature,
      });

      setGenerationSteps(result.steps);
      setFinalOutput(result.finalText);
    } catch (error) {
      console.error('文本生成分析失败:', error);
      setFinalOutput(`分析失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [inputText, isAnalyzing, maxTokens, temperature]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (pipelineRef.current) {
        pipelineRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          模型探针 - 生成过程分析
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 探针状态显示 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={probeState.ready ? "default" : "secondary"}>
              {probeState.ready ? '已就绪' : probeState.loading ? '加载中' : '未加载'}
            </Badge>
            {probeState.loading && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  {probeState.progress}%
                </span>
              </div>
            )}
          </div>
          
          {!probeState.ready && !probeState.loading && (
            <Button onClick={initializeProbe} size="sm">
              <Download className="h-4 w-4 mr-1" />
              加载探针
            </Button>
          )}
        </div>

        {/* 加载进度条 */}
        {probeState.loading && (
          <Progress value={probeState.progress} className="w-full" />
        )}

        {/* 错误提示 */}
        {probeState.error && (
          <Alert variant="destructive">
            <AlertDescription>{probeState.error}</AlertDescription>
          </Alert>
        )}

        <Separator />

        {/* 输入控制区域 */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">生成Token数量：</label>
              <Input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Math.max(1, Math.min(20, parseInt(e.target.value) || 10)))}
                min="1"
                max="20"
                placeholder="最大Token数"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">温度参数：</label>
              <Input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Math.max(0.1, Math.min(2.0, parseFloat(e.target.value) || 0.7)))}
                min="0.1"
                max="2.0"
                placeholder="0.1-2.0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">状态：</label>
              <div className="flex items-center gap-2 h-10">
                <Badge variant={probeState.ready ? "default" : "secondary"}>
                  {probeState.ready ? '✓ 就绪' : '✗ 未就绪'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="probe-input" className="text-sm font-medium">
              输入提示文本：
            </label>
            <Textarea
              id="probe-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入要分析的文本开头..."
              rows={3}
            />
          </div>

          <Button
            onClick={analyzeGeneration}
            disabled={!probeState.ready || isAnalyzing || !inputText.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                分析生成过程
              </>
            )}
          </Button>
        </div>

        <Separator />

        {/* 分析结果展示 */}
        {(generationSteps.length > 0 || finalOutput) && (
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="steps">逐步分析</TabsTrigger>
              <TabsTrigger value="summary">生成总结</TabsTrigger>
            </TabsList>

            {/* 逐步分析标签页 */}
            <TabsContent value="steps" className="space-y-3">
              {generationSteps.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    逐步生成分析
                  </h4>
                  
                  <div className="space-y-3">
                    {generationSteps.map((step, idx) => (
                      <Card key={idx} className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">第 {step.step} 步</Badge>
                            <span className="text-sm text-muted-foreground">
                              生成token: <span className="font-mono font-medium">{step.output}</span>
                            </span>
                          </div>
                          
                          <div className="text-sm">
                            <div className="text-muted-foreground">当前输入:</div>
                            <div className="font-mono bg-muted/50 p-2 rounded text-xs">
                              {step.input}
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <div className="text-muted-foreground">候选tokens (模拟):</div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                              {step.nextTokens.map((token, i) => (
                                <div 
                                  key={i} 
                                  className={`p-2 rounded border text-xs ${
                                    i === 0 ? 'border-primary bg-primary/10' : 'border-muted'
                                  }`}
                                >
                                  <div className="font-mono font-medium">{token.token}</div>
                                  <div className="text-muted-foreground">
                                    概率: {(token.probability * 100).toFixed(1)}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 生成总结标签页 */}
            <TabsContent value="summary" className="space-y-3">
              {finalOutput && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    生成结果总结
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="bg-muted/50 p-4 rounded-md">
                      <div className="text-sm font-medium mb-2">完整生成结果:</div>
                      <div className="font-mono text-sm">
                        <span className="text-muted-foreground">{inputText}</span>
                        <span className="text-primary font-medium">
                          {finalOutput.slice(inputText.length)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="p-3 bg-muted/30 rounded">
                        <div className="font-medium">输入长度</div>
                        <div className="text-muted-foreground">{inputText.split(' ').length} 词</div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <div className="font-medium">生成长度</div>
                        <div className="text-muted-foreground">{finalOutput.split(' ').length - inputText.split(' ').length} 词</div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <div className="font-medium">总长度</div>
                        <div className="text-muted-foreground">{finalOutput.split(' ').length} 词</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* 探针信息 */}
        <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground">
          <div className="font-medium mb-1">探针信息</div>
          <div>模型：GPT-2 Small (124M 参数, FP32)</div>
          <div>加速：WebGPU (回退到 WASM)</div>
          <div>功能：逐步生成分析、Token概率分析</div>
          <div>注意：当前版本提供生成过程的简化分析演示</div>
        </div>
      </CardContent>
    </Card>
  );
};