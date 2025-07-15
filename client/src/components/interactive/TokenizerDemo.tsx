import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AutoTokenizer } from '@huggingface/transformers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Scissors, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface TokenInfo {
  id: number;
  token: string;
  start: number;
  end: number;
}

interface TokenizerStatus {
  loading: boolean;
  ready: boolean;
  error?: string;
}

export const TokenizerDemo: React.FC = () => {
  const [inputText, setInputText] = useState('Hello, how are you doing today? This is a tokenization demo!');
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenizerStatus, setTokenizerStatus] = useState<TokenizerStatus>({
    loading: false,
    ready: false
  });
  const [isTokenizing, setIsTokenizing] = useState(false);
  const tokenizerRef = useRef<any>(null);

  const initializeTokenizer = useCallback(async () => {
    if (tokenizerRef.current || tokenizerStatus.loading) return;

    setTokenizerStatus({ loading: true, ready: false });
    
    try {
      // 加载 GPT-2 分词器
      const tokenizer = await AutoTokenizer.from_pretrained('Xenova/gpt2');
      tokenizerRef.current = tokenizer;
      setTokenizerStatus({ loading: false, ready: true });
    } catch (error) {
      console.error('分词器初始化失败:', error);
      setTokenizerStatus({
        loading: false,
        ready: false,
        error: `分词器加载失败: ${error instanceof Error ? error.message : '未知错误'}`
      });
    }
  }, [tokenizerStatus.loading]);

  const tokenizeText = useCallback(async () => {
    if (!tokenizerRef.current || isTokenizing || !inputText.trim()) return;

    setIsTokenizing(true);
    setTokens([]);

    try {
      // 编码文本
      const encodedResult = await tokenizerRef.current.encode(inputText);
      const tokenIds = encodedResult.tolist ? encodedResult.tolist() : Array.from(encodedResult);
      
      // 解码每个token
      const tokenInfos: TokenInfo[] = [];
      let currentPos = 0;
      
      for (let i = 0; i < tokenIds.length; i++) {
        const tokenId = tokenIds[i];
        const tokenText = await tokenizerRef.current.decode([tokenId], { skip_special_tokens: false });
        
        // 在原始文本中找到这个token的位置
        const tokenStart = inputText.indexOf(tokenText, currentPos);
        const tokenEnd = tokenStart + tokenText.length;
        
        tokenInfos.push({
          id: tokenId,
          token: tokenText,
          start: tokenStart >= 0 ? tokenStart : currentPos,
          end: tokenStart >= 0 ? tokenEnd : currentPos + tokenText.length
        });
        
        currentPos = tokenStart >= 0 ? tokenEnd : currentPos + tokenText.length;
      }
      
      setTokens(tokenInfos);
    } catch (error) {
      console.error('分词失败:', error);
      // 显示错误但不设置tokens为空
      console.log(`分词失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsTokenizing(false);
    }
  }, [inputText, isTokenizing]);

  // 自动分词当文本改变时
  useEffect(() => {
    if (tokenizerStatus.ready && inputText.trim()) {
      const debounceTimer = setTimeout(() => {
        tokenizeText();
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [inputText, tokenizerStatus.ready, tokenizeText]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      tokenizerRef.current = null;
    };
  }, []);

  // 生成颜色
  const getTokenColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-red-100 text-red-800 border-red-200',
      'bg-orange-100 text-orange-800 border-orange-200',
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          分词器实时演示 - BPE (Byte Pair Encoding)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 分词器状态显示 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={tokenizerStatus.ready ? "default" : "secondary"}>
              {tokenizerStatus.ready ? '已就绪' : tokenizerStatus.loading ? '加载中' : '未加载'}
            </Badge>
            {tokenizerStatus.loading && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">加载分词器...</span>
              </div>
            )}
          </div>
          
          {!tokenizerStatus.ready && !tokenizerStatus.loading && (
            <Button onClick={initializeTokenizer} size="sm">
              <Download className="h-4 w-4 mr-1" />
              加载分词器
            </Button>
          )}
        </div>

        {/* 错误提示 */}
        {tokenizerStatus.error && (
          <Alert variant="destructive">
            <AlertDescription>{tokenizerStatus.error}</AlertDescription>
          </Alert>
        )}

        <Separator />

        {/* 输入区域 */}
        <div className="space-y-2">
          <label htmlFor="tokenizer-input" className="text-sm font-medium">
            输入文本 (实时分词)：
          </label>
          <Textarea
            id="tokenizer-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入文本查看BPE分词结果..."
            rows={3}
            className="min-h-[80px]"
          />
        </div>

        {/* 手动分词按钮 */}
        <Button
          onClick={tokenizeText}
          disabled={!tokenizerStatus.ready || isTokenizing || !inputText.trim()}
          variant="outline"
          size="sm"
        >
          {isTokenizing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              分词中...
            </>
          ) : (
            <>
              <Scissors className="h-4 w-4 mr-2" />
              重新分词
            </>
          )}
        </Button>

        {/* 分词结果统计 */}
        {tokens.length > 0 && (
          <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-md text-sm">
            <div>
              <span className="font-medium">Token数量：</span>
              <span className="text-primary">{tokens.length}</span>
            </div>
            <div>
              <span className="font-medium">字符数：</span>
              <span className="text-primary">{inputText.length}</span>
            </div>
            <div>
              <span className="font-medium">压缩比：</span>
              <span className="text-primary">
                {(inputText.length / tokens.length).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* 可视化分词结果 */}
        {tokens.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">分词结果可视化：</label>
            
            {/* Token流 */}
            <div className="p-4 border rounded-md bg-background">
              <div className="flex flex-wrap gap-1">
                {tokens.map((token, index) => (
                  <div
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-mono border ${getTokenColor(index)}`}
                    title={`Token ID: ${token.id}, Position: ${token.start}-${token.end}`}
                  >
                    {token.token.replace(/\s/g, '·').replace(/\n/g, '↵')}
                  </div>
                ))}
              </div>
            </div>

            {/* Token详情表 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Token详情：</label>
              <div className="max-h-48 overflow-y-auto border rounded-md">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">索引</th>
                      <th className="p-2 text-left">Token ID</th>
                      <th className="p-2 text-left">Token文本</th>
                      <th className="p-2 text-left">位置</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{index}</td>
                        <td className="p-2 font-mono">{token.id}</td>
                        <td className="p-2 font-mono bg-muted/30">
                          "{token.token.replace(/\s/g, '·').replace(/\n/g, '↵')}"
                        </td>
                        <td className="p-2">{token.start}-{token.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 分词器信息 */}
        <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground">
          <div className="font-medium mb-1">分词器信息</div>
          <div>类型：BPE (Byte Pair Encoding)</div>
          <div>模型：GPT-2</div>
          <div>特点：子词级分词，处理OOV词汇</div>
        </div>
      </CardContent>
    </Card>
  );
};