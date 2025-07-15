import React from 'react';
import { Database, Filter, CheckCircle, AlertTriangle } from 'lucide-react';
import { CodeTabs } from '@/components/interactive/CodeTabs';

export const DataContent: React.FC = () => {
  const dataCleaningCode = {
    pytorch: `# 数据清洗示例 - PyTorch 版本
import re
import pandas as pd
from datasets import Dataset

class TextCleaner:
    def __init__(self):
        # 定义清洗规则
        self.url_pattern = re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
        self.email_pattern = re.compile(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b')
        
    def clean_text(self, text):
        # 移除 URL 和邮箱
        text = self.url_pattern.sub('[URL]', text)
        text = self.email_pattern.sub('[EMAIL]', text)
        
        # 移除过多的空白字符
        text = re.sub(r'\\s+', ' ', text).strip()
        
        # 过滤过短的文本
        if len(text) < 50:
            return None
            
        return text

# 数据质量评估
def assess_data_quality(texts):
    """评估数据质量指标"""
    stats = {
        'total_texts': len(texts),
        'avg_length': sum(len(t) for t in texts) / len(texts),
        'duplicates': len(texts) - len(set(texts)),
        'empty_ratio': sum(1 for t in texts if not t.strip()) / len(texts)
    }
    return stats`,
    
    tensorflow: `# 数据清洗示例 - TensorFlow 版本
import tensorflow as tf
import tensorflow_text as tf_text
import re

class TFTextProcessor:
    def __init__(self):
        # 创建文本清洗的 TensorFlow 操作
        self.url_pattern = rb'http[s]?://[^\\s]+'
        self.email_pattern = rb'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
        
    @tf.function
    def clean_batch(self, texts):
        """批量清洗文本数据"""
        # 移除 URL 和邮箱
        texts = tf.strings.regex_replace(texts, self.url_pattern, b'[URL]')
        texts = tf.strings.regex_replace(texts, self.email_pattern, b'[EMAIL]')
        
        # 标准化空白字符
        texts = tf.strings.regex_replace(texts, rb'\\s+', b' ')
        texts = tf.strings.strip(texts)
        
        return texts
        
    def filter_by_length(self, dataset, min_length=50, max_length=2048):
        """根据长度过滤数据"""
        def length_filter(text):
            length = tf.strings.length(text)
            return tf.logical_and(length >= min_length, length <= max_length)
            
        return dataset.filter(length_filter)

# 创建数据管道
def create_data_pipeline(file_paths, batch_size=1000):
    """创建高效的数据处理管道"""
    dataset = tf.data.TextLineDataset(file_paths)
    processor = TFTextProcessor()
    
    # 应用清洗和过滤
    dataset = dataset.batch(batch_size)
    dataset = dataset.map(processor.clean_batch, num_parallel_calls=tf.data.AUTOTUNE)
    dataset = dataset.unbatch()
    dataset = processor.filter_by_length(dataset)
    
    return dataset.prefetch(tf.data.AUTOTUNE)`
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
          <Database className="h-10 w-10 text-info mb-4" />
          <h3 className="font-semibold text-lg mb-2">数据收集</h3>
          <p className="text-muted-foreground">从多种来源获取高质量训练数据</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Filter className="h-10 w-10 text-warning mb-4" />
          <h3 className="font-semibold text-lg mb-2">数据清洗</h3>
          <p className="text-muted-foreground">去除噪声，提升数据质量</p>
        </div>
      </div>

      <div>
        <h2>数据是大模型的基石</h2>
        <p>
          高质量的训练数据是大模型成功的关键因素。数据的质量、多样性和规模直接影响模型的性能表现。
          本章将深入探讨如何系统性地收集、清洗和预处理大规模文本数据。
        </p>

        <h3>数据来源</h3>
        <ul>
          <li><strong>网络爬取</strong>：CommonCrawl、维基百科、新闻网站</li>
          <li><strong>文学作品</strong>：Project Gutenberg、开源书籍</li>
          <li><strong>代码仓库</strong>：GitHub、开源代码库</li>
          <li><strong>学术论文</strong>：arXiv、公开研究数据</li>
          <li><strong>对话数据</strong>：论坛、社交媒体（匿名化处理）</li>
        </ul>

        <h3>数据质量标准</h3>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-success/10 border border-success/20">
            <CheckCircle className="h-5 w-5 text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-success">高质量特征</h4>
              <ul className="text-sm text-muted-foreground mt-1">
                <li>语法正确，逻辑清晰</li>
                <li>信息丰富，知识密度高</li>
                <li>来源可靠，内容真实</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive">需要清洗的内容</h4>
              <ul className="text-sm text-muted-foreground mt-1">
                <li>个人隐私信息</li>
                <li>重复或垃圾内容</li>
                <li>有害或偏见内容</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>数据清洗流程</h3>
        <p>
          数据清洗是确保训练数据质量的关键步骤。以下是典型的清洗流程和代码实现：
        </p>

        <CodeTabs codes={dataCleaningCode} />

        <h3>数据去重策略</h3>
        <p>
          大规模数据集中往往存在大量重复内容，需要采用高效的去重算法：
        </p>
        <ul>
          <li><strong>精确去重</strong>：使用哈希算法识别完全相同的文本</li>
          <li><strong>近似去重</strong>：基于 MinHash 或 SimHash 的相似性检测</li>
          <li><strong>语义去重</strong>：使用句子嵌入计算语义相似度</li>
        </ul>

        <h3>数据统计与分析</h3>
        <p>
          在清洗过程中，需要持续监控数据质量指标：
        </p>
        <ul>
          <li>文本长度分布</li>
          <li>语言检测结果</li>
          <li>词汇丰富度</li>
          <li>主题多样性</li>
          <li>清洗前后数据量变化</li>
        </ul>

        <blockquote>
          优质的数据清洗不仅能提升模型性能，还能减少训练时间和计算资源消耗。
          投入充分的时间进行数据预处理是非常值得的。
        </blockquote>
      </div>
    </div>
  );
};