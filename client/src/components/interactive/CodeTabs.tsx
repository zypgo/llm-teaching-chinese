import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CodeTabsProps {
  codes: {
    pytorch?: string;
    tensorflow?: string;
  };
  className?: string;
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ codes, className }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = async (code: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTab(tabName);
      toast({
        title: "代码已复制",
        description: `${tabName} 代码已复制到剪贴板`,
      });
      
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (error) {
      toast({
        title: "复制失败",
        description: "无法复制代码到剪贴板",
        variant: "destructive",
      });
    }
  };

  const tabs = [];
  if (codes.pytorch) tabs.push({ key: 'pytorch', label: 'PyTorch', code: codes.pytorch });
  if (codes.tensorflow) tabs.push({ key: 'tensorflow', label: 'TensorFlow', code: codes.tensorflow });

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`code-tabs my-6 ${className || ''}`}>
      <Tabs defaultValue={tabs[0].key} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            {tabs.map(tab => (
              <TabsTrigger key={tab.key} value={tab.key} className="text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map(tab => (
          <TabsContent key={tab.key} value={tab.key} className="relative">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 h-8 w-8 p-0"
                onClick={() => copyToClipboard(tab.code, tab.label)}
              >
                {copiedTab === tab.key ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-foreground font-mono whitespace-pre">
                  {tab.code}
                </code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};