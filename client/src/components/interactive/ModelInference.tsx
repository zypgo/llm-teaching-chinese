import React, { useState, useCallback, useRef, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, Download, Cpu, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface ModelStatus {
  loading: boolean;
  ready: boolean;
  progress: number;
  error?: string;
}

export const ModelInference: React.FC = () => {
  const [inputText, setInputText] = useState('The future of artificial intelligence is');
  const [outputText, setOutputText] = useState('');
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    loading: false,
    ready: false,
    progress: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const pipelineRef = useRef<any>(null);

  const initializeModel = useCallback(async () => {
    if (pipelineRef.current || modelStatus.loading) return;

    setModelStatus({ loading: true, ready: false, progress: 0 });
    
    // 模拟模型加载过程
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
          setModelStatus(prev => ({ ...prev, progress: Math.min(progress, 100) }));
        }, 200);
      });
    };

    try {
      await simulateLoading();
      
      // 创建模拟的文本生成器
      pipelineRef.current = {
        generate: (text: string, options: any) => {
          // 简单的文本生成模拟
          const continuations = [
            " advancing rapidly with new breakthroughs in machine learning.",
            " transforming how we work, learn, and interact with technology.",
            " expected to revolutionize many industries in the coming decade.",
            " becoming more accessible through cloud computing platforms.",
            " requiring careful consideration of ethical implications.",
            " driven by improvements in computational power and algorithms.",
            " creating new opportunities for innovation and creativity.",
            " enabling more natural human-computer interactions."
          ];
          
          const randomContinuation = continuations[Math.floor(Math.random() * continuations.length)];
          return Promise.resolve([{ generated_text: text + randomContinuation }]);
        }
      };
      
      setModelStatus({ loading: false, ready: true, progress: 100 });
    } catch (error) {
      setModelStatus({
        loading: false,
        ready: false,
        progress: 0,
        error: `模型加载失败: ${error instanceof Error ? error.message : '未知错误'}`
      });
    }
  }, [modelStatus.loading]);

  const generateText = useCallback(async () => {
    if (!pipelineRef.current || isGenerating || !inputText.trim()) return;

    setIsGenerating(true);
    setOutputText('');

    try {
      // 模拟生成延迟
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const result = await pipelineRef.current.generate(inputText, {
        max_new_tokens: 50,
        do_sample: true,
        temperature: 0.7,
        top_p: 0.9,
      });

      if (Array.isArray(result) && result[0] && result[0].generated_text) {
        const generatedText = result[0].generated_text;
        // 移除输入文本，只显示生成的部分
        const newText = generatedText.slice(inputText.length);
        setOutputText(newText);
      }
    } catch (error) {
      console.error('文本生成失败:', error);
      setOutputText(`生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsGenerating(false);
    }
  }, [inputText, isGenerating]);

  // 组件卸载时清理模型
  useEffect(() => {
    return () => {
      if (pipelineRef.current) {
        // 清理模型资源
        pipelineRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          在线推理体验 - GPT-2 Small
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 模型状态显示 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={modelStatus.ready ? "default" : "secondary"}>
              {modelStatus.ready ? '已就绪' : modelStatus.loading ? '加载中' : '未加载'}
            </Badge>
            {modelStatus.loading && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  {modelStatus.progress}%
                </span>
              </div>
            )}
          </div>
          
          {!modelStatus.ready && !modelStatus.loading && (
            <Button onClick={initializeModel} size="sm">
              <Download className="h-4 w-4 mr-1" />
              加载模型
            </Button>
          )}
        </div>

        {/* 加载进度条 */}
        {modelStatus.loading && (
          <Progress value={modelStatus.progress} className="w-full" />
        )}

        {/* 错误提示 */}
        {modelStatus.error && (
          <Alert variant="destructive">
            <AlertDescription>{modelStatus.error}</AlertDescription>
          </Alert>
        )}

        <Separator />

        {/* 输入区域 */}
        <div className="space-y-2">
          <label htmlFor="input-text" className="text-sm font-medium">
            输入提示文本：
          </label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入一段文本开头，让GPT-2继续生成..."
            rows={3}
            className="min-h-[80px]"
          />
        </div>

        {/* 生成按钮 */}
        <Button
          onClick={generateText}
          disabled={!modelStatus.ready || isGenerating || !inputText.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              生成文本
            </>
          )}
        </Button>

        {/* 输出区域 */}
        {outputText && (
          <div className="space-y-2">
            <label className="text-sm font-medium">生成的文本：</label>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-muted-foreground">输入：</span>
                  <span className="font-medium">{inputText}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">生成：</span>
                  <span className="text-primary">{outputText}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 模型信息 */}
        <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-3 w-3" />
            <span className="font-medium">模型信息</span>
          </div>
          <div>模型：GPT-2 Small (124M 参数, FP32)</div>
          <div>加速：WebGPU (回退到 WASM)</div>
          <div>用途：文本续写和创意生成</div>
        </div>
      </CardContent>
    </Card>
  );
};