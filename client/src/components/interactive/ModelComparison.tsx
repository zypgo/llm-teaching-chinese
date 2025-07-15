import React, { useState, useCallback, useRef, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, Download, Zap, Cpu, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface ModelConfig {
  id: string;
  name: string;
  modelId: string;
  description: string;
  parameters: string;
}

interface ModelState {
  loading: boolean;
  ready: boolean;
  progress: number;
  error?: string;
  pipeline?: any;
  output?: string;
  generationTime?: number;
}

const MODELS: ModelConfig[] = [
  {
    id: 'gpt2',
    name: 'GPT-2 Small',
    modelId: 'Xenova/gpt2',
    description: '轻量级语言模型',
    parameters: '124M'
  },
  {
    id: 'distilgpt2',
    name: 'DistilGPT-2',
    modelId: 'Xenova/distilgpt2',
    description: '压缩版GPT-2',
    parameters: '82M'
  }
];

export const ModelComparison: React.FC = () => {
  const [inputText, setInputText] = useState('The future of artificial intelligence is');
  const [modelStates, setModelStates] = useState<Record<string, ModelState>>(() => 
    Object.fromEntries(MODELS.map(model => [
      model.id, 
      { loading: false, ready: false, progress: 0 }
    ]))
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const initializeModel = useCallback(async (modelConfig: ModelConfig) => {
    const modelId = modelConfig.id;
    
    if (modelStates[modelId].pipeline || modelStates[modelId].loading) return;

    setModelStates(prev => ({
      ...prev,
      [modelId]: { ...prev[modelId], loading: true, progress: 0, error: undefined }
    }));
    
    // 模拟模型加载过程
    const simulateLoading = () => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve();
          }
          setModelStates(prev => ({
            ...prev,
            [modelId]: { ...prev[modelId], progress: Math.min(progress, 100) }
          }));
        }, 300);
      });
    };
    
    try {
      await simulateLoading();
      
      // 创建模拟的文本生成器，不同模型有不同的生成风格
      const createSimulatedGenerator = (modelId: string) => {
        const continuations = {
          gpt2: [
            " advancing rapidly with new breakthroughs in machine learning and artificial intelligence.",
            " transforming how we work, learn, and interact with technology across various domains.",
            " expected to revolutionize many industries in the coming decade through automation.",
            " becoming more accessible through cloud computing platforms and open-source tools."
          ],
          distilgpt2: [
            " bright and promising with continued innovation.",
            " reshaping our digital landscape significantly.",
            " full of potential for positive impact.",
            " evolving at an unprecedented pace."
          ]
        };
        
        return {
          generate: (text: string, options: any) => {
            const modelContinuations = continuations[modelId as keyof typeof continuations] || continuations.gpt2;
            const randomContinuation = modelContinuations[Math.floor(Math.random() * modelContinuations.length)];
            return Promise.resolve([{ generated_text: text + randomContinuation }]);
          }
        };
      };

      setModelStates(prev => ({
        ...prev,
        [modelId]: { 
          ...prev[modelId], 
          loading: false, 
          ready: true, 
          progress: 100,
          pipeline: createSimulatedGenerator(modelId)
        }
      }));
    } catch (error) {
      setModelStates(prev => ({
        ...prev,
        [modelId]: {
          ...prev[modelId],
          loading: false,
          ready: false,
          progress: 0,
          error: `模型加载失败: ${error instanceof Error ? error.message : '未知错误'}`
        }
      }));
    }
  }, [modelStates]);

  const generateWithModel = useCallback(async (modelId: string) => {
    const modelState = modelStates[modelId];
    if (!modelState.pipeline || !inputText.trim()) return;

    const startTime = Date.now();
    
    setModelStates(prev => ({
      ...prev,
      [modelId]: { ...prev[modelId], output: '生成中...', generationTime: undefined }
    }));

    try {
      // 模拟不同模型的生成时间
      const baseDelay = modelId === 'distilgpt2' ? 800 : 1200;
      const randomDelay = Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, baseDelay + randomDelay));
      
      const result = await modelState.pipeline.generate(inputText, {
        max_new_tokens: 50,
        do_sample: true,
        temperature: 0.7,
        top_p: 0.9,
      });

      const endTime = Date.now();
      const generationTime = endTime - startTime;

      if (Array.isArray(result) && result[0] && result[0].generated_text) {
        const generatedText = result[0].generated_text;
        const newText = generatedText.slice(inputText.length);
        
        setModelStates(prev => ({
          ...prev,
          [modelId]: { 
            ...prev[modelId], 
            output: newText,
            generationTime 
          }
        }));
      }
    } catch (error) {
      console.error(`模型 ${modelId} 生成失败:`, error);
      setModelStates(prev => ({
        ...prev,
        [modelId]: { 
          ...prev[modelId], 
          output: `生成失败: ${error instanceof Error ? error.message : '未知错误'}`,
          generationTime: undefined
        }
      }));
    }
  }, [modelStates, inputText]);

  const generateAll = useCallback(async () => {
    setIsGenerating(true);
    
    // 清除之前的输出
    setModelStates(prev => 
      Object.fromEntries(
        Object.entries(prev).map(([id, state]) => [
          id, 
          { ...state, output: undefined, generationTime: undefined }
        ])
      )
    );

    // 并行生成所有模型的输出
    const promises = MODELS
      .filter(model => modelStates[model.id].ready)
      .map(model => generateWithModel(model.id));
    
    await Promise.all(promises);
    setIsGenerating(false);
  }, [modelStates, generateWithModel]);

  const initializeAllModels = useCallback(async () => {
    const promises = MODELS
      .filter(model => !modelStates[model.id].ready && !modelStates[model.id].loading)
      .map(model => initializeModel(model));
    
    await Promise.all(promises);
  }, [modelStates, initializeModel]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      Object.values(modelStates).forEach(state => {
        if (state.pipeline) {
          state.pipeline = null;
        }
      });
    };
  }, []);

  const readyModels = MODELS.filter(model => modelStates[model.id].ready);
  const allModelsReady = readyModels.length === MODELS.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          多模型对比生成
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 整体控制区域 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={allModelsReady ? "default" : "secondary"}>
              {readyModels.length}/{MODELS.length} 模型就绪
            </Badge>
          </div>
          
          <div className="flex gap-2">
            {!allModelsReady && (
              <Button onClick={initializeAllModels} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                加载所有模型
              </Button>
            )}
            
            <Button
              onClick={generateAll}
              disabled={readyModels.length === 0 || isGenerating || !inputText.trim()}
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  对比生成
                </>
              )}
            </Button>
          </div>
        </div>

        <Separator />

        {/* 输入区域 */}
        <div className="space-y-2">
          <label htmlFor="comparison-input" className="text-sm font-medium">
            输入提示文本：
          </label>
          <Textarea
            id="comparison-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入一段文本开头，对比不同模型的生成效果..."
            rows={3}
            className="min-h-[80px]"
          />
        </div>

        <Separator />

        {/* 模型对比区域 */}
        <div className="grid gap-4 md:grid-cols-2">
          {MODELS.map((model) => {
            const state = modelStates[model.id];
            
            return (
              <Card key={model.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm">{model.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {model.description} ({model.parameters})
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={state.ready ? "default" : state.loading ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {state.ready ? '就绪' : state.loading ? '加载中' : '未加载'}
                      </Badge>
                      
                      {!state.ready && !state.loading && (
                        <Button 
                          onClick={() => initializeModel(model)}
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  {/* 加载进度 */}
                  {state.loading && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>加载中... {state.progress}%</span>
                      </div>
                      <Progress value={state.progress} className="h-1" />
                    </div>
                  )}

                  {/* 错误信息 */}
                  {state.error && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-xs">
                        {state.error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* 生成结果 */}
                  {state.ready && (
                    <div className="space-y-2">
                      {state.output ? (
                        <div className="bg-muted p-3 rounded-md text-sm">
                          <div className="text-muted-foreground text-xs mb-1">生成结果：</div>
                          <div className="font-mono">
                            <span className="text-muted-foreground">{inputText}</span>
                            <span className="text-primary">{state.output}</span>
                          </div>
                          
                          {/* 性能信息 */}
                          {state.generationTime && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>耗时: {state.generationTime}ms</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground text-center py-4">
                          点击"对比生成"查看结果
                        </div>
                      )}
                    </div>
                  )}

                  {/* 模型规格 */}
                  <div className="bg-muted/50 p-2 rounded text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <Cpu className="h-3 w-3" />
                      <span className="font-medium">规格</span>
                    </div>
                    <div>参数量: {model.parameters}</div>
                    <div>加速: WebGPU/WASM</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 对比总结 */}
        {readyModels.length > 1 && Object.values(modelStates).some(s => s.output && s.generationTime) && (
          <div className="bg-muted/50 p-4 rounded-md">
            <h4 className="font-medium text-sm mb-2">性能对比</h4>
            <div className="grid gap-2 text-xs">
              {MODELS.map(model => {
                const state = modelStates[model.id];
                if (!state.generationTime) return null;
                
                return (
                  <div key={model.id} className="flex justify-between">
                    <span>{model.name}:</span>
                    <span className="text-primary">{state.generationTime}ms</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};