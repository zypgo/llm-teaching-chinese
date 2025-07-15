import React from 'react';
import { LessonSection } from '@/components/lesson/LessonSection';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GPUArchitecture } from '@/components/interactive/GPUArchitecture';
import { GPUPerformanceComparison } from '@/components/interactive/GPUPerformanceComparison';
import { ParallelComputing } from '@/components/interactive/ParallelComputing';
import { CodeTabs } from '@/components/interactive/CodeTabs';
import { 
  Zap, 
  Cpu, 
  BarChart3, 
  Activity, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Gauge,
  Clock,
  HardDrive
} from 'lucide-react';

export const GPUContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GPU架构与推理优化
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          深入了解NVIDIA GPU的工作原理、主流GPU性能对比，以及为什么GPU对大模型如此重要
        </p>
      </div>

      <LessonSection id="gpu-fundamentals" title="GPU基础原理">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                CPU vs GPU 对比
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2">CPU（中央处理器）</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 少量高性能核心（4-64核）</li>
                    <li>• 复杂指令集，强大的单线程性能</li>
                    <li>• 大缓存，分支预测，乱序执行</li>
                    <li>• 适合串行计算和复杂逻辑</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">GPU（图形处理器）</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 数千个简单核心（2048-16384核）</li>
                    <li>• 专为并行计算设计</li>
                    <li>• 高内存带宽，SIMD架构</li>
                    <li>• 适合大规模并行矩阵运算</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                为什么GPU适合深度学习
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">矩阵运算</Badge>
                  <span className="text-sm">神经网络本质是大量矩阵乘法</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">并行处理</Badge>
                  <span className="text-sm">数千个数据点可同时计算</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">高带宽</Badge>
                  <span className="text-sm">快速访问大量参数和数据</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">专用指令</Badge>
                  <span className="text-sm">Tensor Core专为AI优化</span>
                </div>
              </div>
              
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  GPU相比CPU在深度学习任务中可提供10-100倍的性能提升
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </LessonSection>

      <LessonSection id="nvidia-architecture" title="NVIDIA GPU架构详解">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                GPU内部架构
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GPUArchitecture />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  内存层次
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">寄存器</span>
                    <Badge variant="secondary">最快</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-muted-foreground">每个线程私有，容量极小</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">共享内存</span>
                    <Badge variant="secondary">快</Badge>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-muted-foreground">线程块共享，程序员控制</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">全局内存</span>
                    <Badge variant="outline">慢</Badge>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-xs text-muted-foreground">所有线程可访问，容量最大</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Tensor Core
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4x4</div>
                  <p className="text-sm text-muted-foreground">矩阵乘法单元</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">FP16性能</span>
                    <span className="text-sm font-mono">312 TFLOPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">INT8性能</span>
                    <span className="text-sm font-mono">624 TOPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">稀疏性能</span>
                    <span className="text-sm font-mono">1248 TOPS</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  流多处理器(SM)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">108</div>
                  <p className="text-sm text-muted-foreground">H100中的SM数量</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div>• 128个CUDA核心</div>
                  <div>• 4个Tensor Core</div>
                  <div>• 256KB共享内存</div>
                  <div>• 65536个寄存器</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="gpu-performance" title="主流GPU性能对比">
        <GPUPerformanceComparison />
      </LessonSection>

      <LessonSection id="parallel-computing" title="并行计算原理">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                CUDA编程模型
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">执行层次结构</h4>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="font-medium text-sm">Grid（网格）</div>
                      <div className="text-xs text-muted-foreground mt-1">包含多个线程块</div>
                    </div>
                    <div className="ml-4 border rounded-lg p-3">
                      <div className="font-medium text-sm">Block（线程块）</div>
                      <div className="text-xs text-muted-foreground mt-1">共享内存空间</div>
                    </div>
                    <div className="ml-8 border rounded-lg p-3">
                      <div className="font-medium text-sm">Thread（线程）</div>
                      <div className="text-xs text-muted-foreground mt-1">基本执行单元</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">内存访问模式</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded">
                      <span className="text-sm font-medium">合并访问</span>
                      <Badge variant="secondary">高效</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                      <span className="text-sm font-medium">跨步访问</span>
                      <Badge variant="outline">中等</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950 rounded">
                      <span className="text-sm font-medium">随机访问</span>
                      <Badge variant="destructive">低效</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ParallelComputing />
        </div>
      </LessonSection>

      <LessonSection id="gpu-inference" title="GPU推理优化">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  推理优化技术
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="font-semibold text-sm mb-1">量化（Quantization）</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      将FP32权重转换为INT8/INT4，减少内存和计算
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">内存压缩4x</Badge>
                      <Badge variant="outline" className="text-xs">速度提升2-4x</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="font-semibold text-sm mb-1">剪枝（Pruning）</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      移除不重要的连接，减少计算量
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">结构化剪枝</Badge>
                      <Badge variant="outline" className="text-xs">非结构化剪枝</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="font-semibold text-sm mb-1">算子融合（Operator Fusion）</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      将多个操作合并为单个GPU kernel
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">减少内存访问</Badge>
                      <Badge variant="outline" className="text-xs">提高缓存利用率</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  推理框架对比
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">TensorRT</div>
                      <div className="text-xs text-muted-foreground">NVIDIA优化引擎</div>
                    </div>
                    <Badge variant="default">最快</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">vLLM</div>
                      <div className="text-xs text-muted-foreground">大模型推理专用</div>
                    </div>
                    <Badge variant="secondary">高效</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">FasterTransformer</div>
                      <div className="text-xs text-muted-foreground">Transformer优化</div>
                    </div>
                    <Badge variant="outline">稳定</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">ONNX Runtime</div>
                      <div className="text-xs text-muted-foreground">跨平台推理</div>
                    </div>
                    <Badge variant="outline">通用</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>GPU推理代码示例</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeTabs 
                codes={{
                  pytorch: `import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# 加载模型到GPU
model = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    torch_dtype=torch.float16,  # 使用半精度
    device_map="auto"           # 自动分配GPU
)
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# 推理设置
model.eval()
torch.set_grad_enabled(False)  # 禁用梯度计算

def generate_text(prompt, max_length=100):
    # 输入编码
    inputs = tokenizer(prompt, return_tensors="pt")
    input_ids = inputs.input_ids.cuda()
    
    # 批量推理
    with torch.cuda.amp.autocast():  # 自动混合精度
        outputs = model.generate(
            input_ids,
            max_length=max_length,
            do_sample=True,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id
        )
    
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# 性能优化
torch.backends.cudnn.benchmark = True  # 优化卷积
model = torch.compile(model)           # PyTorch 2.0编译器`,
                  tensorflow: `import tensorflow as tf
from transformers import TFAutoModelForCausalLM, AutoTokenizer

# 配置GPU内存增长
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    tf.config.experimental.set_memory_growth(gpus[0], True)

# 加载模型
model = TFAutoModelForCausalLM.from_pretrained(
    "gpt2",
    from_tf=True
)
tokenizer = AutoTokenizer.from_pretrained("gpt2")

@tf.function  # 图优化
def generate_batch(input_ids, max_length=100):
    return model.generate(
        input_ids,
        max_length=max_length,
        do_sample=True,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id
    )

def inference_pipeline(texts):
    # 批量处理
    inputs = tokenizer(
        texts, 
        padding=True, 
        truncation=True, 
        return_tensors="tf"
    )
    
    # 混合精度推理
    with tf.keras.mixed_precision.experimental.LossScaleOptimizer:
        outputs = generate_batch(inputs.input_ids)
    
    return [tokenizer.decode(output, skip_special_tokens=True) 
            for output in outputs]

# 使用TensorRT优化（需要TensorFlow-TensorRT）
from tensorflow.python.compiler.tensorrt import trt_convert as trt

converter = trt.TrtGraphConverterV2(
    input_saved_model_dir="model_path",
    precision_mode=trt.TrtPrecisionMode.FP16
)
converter.convert()`
                }}
              />
            </CardContent>
          </Card>
        </div>
      </LessonSection>

      <LessonSection id="memory-optimization" title="显存优化策略">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                显存管理技术
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-2">梯度检查点（Gradient Checkpointing）</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    重新计算而非存储中间激活值
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">内存节省</span>
                    <Badge variant="outline">50-80%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">计算开销</span>
                    <Badge variant="secondary">+20%</Badge>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-2">模型并行（Model Parallelism）</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    将模型分割到多个GPU
                  </p>
                  <div className="text-xs space-y-1">
                    <div>• 张量并行：按维度分割</div>
                    <div>• 流水线并行：按层分割</div>
                    <div>• 混合并行：组合策略</div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-2">ZeRO优化器</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    分片优化器状态和梯度
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>ZeRO-1（优化器状态）</span>
                      <span>4x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ZeRO-2（+梯度）</span>
                      <span>8x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ZeRO-3（+参数）</span>
                      <span>64x</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                性能监控指标
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">GPU利用率</span>
                    <span className="text-sm text-green-600">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">理想范围: 80-100%</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">显存使用率</span>
                    <span className="text-sm text-blue-600">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">建议保持在80%以下</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">内存带宽利用率</span>
                    <span className="text-sm text-purple-600">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">受限于算法复杂度</p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>吞吐量</span>
                    <span className="font-mono">2.3K tokens/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>延迟（首token）</span>
                    <span className="font-mono">45ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>批处理大小</span>
                    <span className="font-mono">32</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </LessonSection>

      <LessonSection id="future-trends" title="GPU发展趋势">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                技术发展方向
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">更高算力</h3>
                  <p className="text-sm text-muted-foreground">
                    每代GPU算力提升2-3倍，专用AI芯片不断涌现
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>H100: 312 TFLOPS</div>
                    <div>H200: 估计500+ TFLOPS</div>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <HardDrive className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold">更大显存</h3>
                  <p className="text-sm text-muted-foreground">
                    HBM3内存技术，单卡显存突破100GB
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>H100: 80GB HBM3</div>
                    <div>未来: 200GB+ HBM4</div>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">能效优化</h3>
                  <p className="text-sm text-muted-foreground">
                    更先进制程工艺，降低功耗和成本
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>H100: 4nm工艺</div>
                    <div>下一代: 3nm工艺</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              GPU技术的快速发展推动了大模型的规模化应用，未来将看到更多专用AI芯片和异构计算架构的出现。
              掌握GPU优化技术对于高效部署大模型至关重要。
            </AlertDescription>
          </Alert>
        </div>
      </LessonSection>
    </div>
  );
};