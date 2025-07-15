import React from 'react';
import { Type, Puzzle, Brain } from 'lucide-react';
import { CodeTabs } from '@/components/interactive/CodeTabs';

export const TokenizationContent: React.FC = () => {
  const tokenizerCode = {
    pytorch: `# 分词器实现 - PyTorch + HuggingFace Transformers
from transformers import AutoTokenizer, GPT2TokenizerFast
import torch

# 加载预训练分词器
tokenizer = AutoTokenizer.from_pretrained('gpt2')

def tokenize_text(text):
    """
    将文本转换为 token IDs
    """
    # 编码文本为 token IDs
    encoded = tokenizer(
        text, 
        return_tensors='pt',  # 返回 PyTorch tensors
        padding=True,         # 填充到相同长度
        truncation=True,      # 截断过长序列
        max_length=512        # 最大序列长度
    )
    
    return {
        'input_ids': encoded['input_ids'],
        'attention_mask': encoded['attention_mask'],
        'tokens': tokenizer.convert_ids_to_tokens(encoded['input_ids'][0])
    }

# 示例使用
text = "大型语言模型是人工智能的重要突破"
result = tokenize_text(text)

print(f"原始文本: {text}")
print(f"Token IDs: {result['input_ids']}")
print(f"Tokens: {result['tokens']}")

# 自定义 BPE 分词器训练
from tokenizers import Tokenizer, models, trainers, pre_tokenizers

def train_custom_tokenizer(texts, vocab_size=50000):
    """训练自定义 BPE 分词器"""
    # 初始化 BPE 模型
    tokenizer = Tokenizer(models.BPE())
    
    # 设置预分词器（按空格和标点分割）
    tokenizer.pre_tokenizer = pre_tokenizers.ByteLevel(add_prefix_space=True)
    
    # 配置训练器
    trainer = trainers.BpeTrainer(
        vocab_size=vocab_size,
        min_frequency=2,
        special_tokens=["<pad>", "<unk>", "<s>", "</s>"]
    )
    
    # 训练分词器
    tokenizer.train_from_iterator(texts, trainer)
    
    return tokenizer`,
    
    tensorflow: `# 分词器实现 - TensorFlow + TensorFlow Text
import tensorflow as tf
import tensorflow_text as tf_text

class TFTokenizer:
    def __init__(self, vocab_file):
        # 加载词汇表
        self.vocab_table = tf.lookup.StaticVocabularyTable(
            tf.lookup.TextFileInitializer(
                vocab_file,
                tf.string,
                tf.lookup.TextFileIndex.WHOLE_LINE,
                tf.int64,
                tf.lookup.TextFileIndex.LINE_NUMBER
            ),
            num_oov_buckets=1  # 未知词桶
        )
        
    @tf.function
    def tokenize(self, texts):
        """将文本批量转换为 token IDs"""
        # 使用 WordPiece 分词
        tokenizer = tf_text.WordpieceTokenizer(
            self.vocab_table,
            unknown_token='[UNK]'
        )
        
        # 分词并转换为 IDs
        tokens = tokenizer.tokenize(texts)
        token_ids = self.vocab_table.lookup(tokens)
        
        return token_ids
        
    def create_padding_mask(self, token_ids, pad_token_id=0):
        """创建填充掩码"""
        return tf.cast(tf.not_equal(token_ids, pad_token_id), tf.float32)

# 使用 SentencePiece 进行子词分割
def create_sentencepiece_tokenizer(texts, vocab_size=32000):
    """创建 SentencePiece 分词器"""
    import sentencepiece as spm
    
    # 训练参数
    train_params = f"""
        --input=training_data.txt
        --model_prefix=sp_model
        --vocab_size={vocab_size}
        --character_coverage=0.9995
        --model_type=bpe
        --split_by_unicode_script=true
        --split_by_number=true
        --split_by_whitespace=true
        --remove_extra_whitespaces=true
        --add_dummy_prefix=true
        --normalization_rule_name=nmt_nfkc_cf
    """
    
    # 保存训练数据
    with open('training_data.txt', 'w', encoding='utf-8') as f:
        for text in texts:
            f.write(text + '\\n')
    
    # 训练模型
    spm.SentencePieceTrainer.train(train_params)
    
    # 加载训练好的模型
    sp = spm.SentencePieceProcessor(model_file='sp_model.model')
    
    return sp`
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20">
          <Type className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">文本分割</h3>
          <p className="text-muted-foreground">将连续文本切分为可处理的单元</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <Puzzle className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">子词编码</h3>
          <p className="text-muted-foreground">BPE 和 SentencePiece 算法</p>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <Brain className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">词汇构建</h3>
          <p className="text-muted-foreground">高效的词汇表设计策略</p>
        </div>
      </div>

      <div>
        <h2>分词与词表构建</h2>
        <p>
          分词（Tokenization）是将原始文本转换为模型可以理解的数字序列的关键步骤。
          高质量的分词策略能显著提升模型的性能和训练效率。
        </p>

        <h3>分词方法演进</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-medium mb-2">1. 基于空格的分词</h4>
            <p className="text-sm text-muted-foreground">
              最简单的方法，按空格和标点符号分割。适用于英语等语言，但词汇表会很大。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-medium mb-2">2. 基于字符的分词</h4>
            <p className="text-sm text-muted-foreground">
              将文本分割为单个字符。词汇表小，但序列变长，丢失语义信息。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium mb-2 text-primary">3. 子词分词（推荐）</h4>
            <p className="text-sm text-muted-foreground">
              介于词级和字符级之间，既保持语义又控制词汇表大小。如 BPE、WordPiece、SentencePiece。
            </p>
          </div>
        </div>

        <h3>BPE（Byte Pair Encoding）算法</h3>
        <p>
          BPE 是目前最流行的子词分割算法，核心思想是迭代地合并最频繁出现的字符对：
        </p>
        <ol>
          <li>将所有词分解为字符序列</li>
          <li>统计所有相邻字符对的频率</li>
          <li>合并频率最高的字符对，形成新的子词</li>
          <li>重复步骤2-3，直到达到目标词汇表大小</li>
        </ol>

        <div className="my-6 p-4 rounded-lg bg-accent/50 border border-accent">
          <h4 className="font-medium mb-2">BPE 示例</h4>
          <div className="text-sm font-mono space-y-1">
            <div>初始: [&quot;h&quot;, &quot;u&quot;, &quot;g&quot;, &quot;&lt;/w&gt;&quot;, &quot;h&quot;, &quot;u&quot;, &quot;g&quot;, &quot;s&quot;, &quot;&lt;/w&gt;&quot;]</div>
            <div>合并 &quot;h&quot;+&quot;u&quot;: [&quot;hu&quot;, &quot;g&quot;, &quot;&lt;/w&gt;&quot;, &quot;hu&quot;, &quot;g&quot;, &quot;s&quot;, &quot;&lt;/w&gt;&quot;]</div>
            <div>合并 &quot;hu&quot;+&quot;g&quot;: [&quot;hug&quot;, &quot;&lt;/w&gt;&quot;, &quot;hug&quot;, &quot;s&quot;, &quot;&lt;/w&gt;&quot;]</div>
            <div>最终: [&quot;hug&quot;, &quot;&lt;/w&gt;&quot;] 和 [&quot;hug&quot;, &quot;s&quot;, &quot;&lt;/w&gt;&quot;]</div>
          </div>
        </div>

        <h3>分词器实现</h3>
        <p>
          以下展示了使用 PyTorch 和 TensorFlow 实现分词器的代码示例：
        </p>

        <CodeTabs codes={tokenizerCode} />

        <h3>词汇表设计要点</h3>
        <ul>
          <li><strong>大小平衡</strong>：通常在 32K-50K 之间，平衡表达能力和计算效率</li>
          <li><strong>特殊 Token</strong>：&lt;pad&gt;、&lt;unk&gt;、&lt;s&gt;、&lt;/s&gt; 等</li>
          <li><strong>多语言支持</strong>：考虑不同语言的字符覆盖率</li>
          <li><strong>领域适应</strong>：针对特定领域添加专门词汇</li>
        </ul>

        <h3>常见问题与解决方案</h3>
        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-l-warning">
            <h4 className="font-medium text-warning">问题：未知词（OOV）过多</h4>
            <p className="text-sm">解决：增加词汇表大小，优化 BPE 训练数据</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-info">
            <h4 className="font-medium text-info">问题：序列长度不一致</h4>
            <p className="text-sm">解决：使用填充（Padding）和注意力掩码</p>
          </div>
          <div className="p-3 rounded border-l-4 border-l-success">
            <h4 className="font-medium text-success">问题：跨语言兼容性</h4>
            <p className="text-sm">解决：使用 SentencePiece，支持多语言统一处理</p>
          </div>
        </div>

        <blockquote>
          选择合适的分词策略是模型成功的关键。现代大模型普遍采用 BPE 或 SentencePiece，
          能够在保持语义信息的同时有效控制词汇表大小。
        </blockquote>
      </div>
    </div>
  );
};