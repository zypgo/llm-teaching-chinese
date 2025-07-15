# LLM 全流程学习平台

一个全面的大语言模型（LLM）教育平台，提供从基础概念到高级实现技术的交互式、步骤化学习体验。该平台结合理论内容与实际演示、代码示例和模拟模型交互。

## 🌟 项目特色

- **13个结构化学习章节** - 覆盖从 LLM 基础到高级优化的完整知识体系
- **交互式组件** - 实时模型推理、分词演示、训练模拟等动手实践
- **GPU架构深度讲解** - 专门章节详解 NVIDIA GPU 原理和性能优化
- **多框架代码示例** - 提供 PyTorch 和 TensorFlow 代码对比
- **响应式设计** - 支持桌面和移动设备，深色/浅色模式切换
- **进度跟踪** - 本地保存学习进度，支持章节完成状态

## 📚 学习内容

### 核心章节

1. **🏠 大模型简介** - LLM 基础概念和发展历程
2. **📊 数据收集与清洗** - 训练数据处理和质量控制
3. **✂️ 分词与词表** - 分词算法和词汇表构建
4. **🧠 模型结构与 Transformer 原理** - 深入理解 Transformer 架构
5. **▶️ 预训练流程** - 模型预训练的完整流程
6. **⚙️ 超参数调节实验** - 参数优化和实验设计
7. **📈 检查点与规模化技巧** - 大规模训练策略
8. **🔧 后训练：SFT、LoRA、RLHF** - 微调和对齐技术
9. **🚀 推理与部署优化** - 模型部署和性能优化
10. **🛡️ 模型评估与安全性** - 评估指标和安全考量
11. **🔬 真实模型集成** - 实际模型的集成和使用
12. **⚡ GPU架构与推理优化** - GPU 硬件原理和推理加速
13. **📖 延伸阅读与资源** - 进阶学习资源

### 交互式功能

#### 🎯 模型交互组件
- **模型推理演示** - 在浏览器中直接运行小型语言模型
- **分词器可视化** - 实时展示 BPE 分词过程
- **模型对比工具** - 并排比较不同模型的性能
- **参数探针** - 深入分析模型内部参数和激活

#### 🖥️ GPU 架构可视化
- **GPU 架构图** - 交互式 NVIDIA GPU 组件展示
- **性能对比工具** - 主流 GPU 性能数据对比
- **并行计算演示** - CPU vs GPU 并行处理可视化
- **显存优化策略** - 内存管理技术详解

#### 📊 训练模拟器
- **参数调节** - 实时调整学习率、批大小等超参数
- **损失函数可视化** - 训练过程中损失变化图表
- **注意力热力图** - Transformer 注意力机制可视化
- **梯度流动图** - 反向传播过程可视化

## 🛠️ 技术架构

### 前端技术栈
- **React 18** + **TypeScript** - 现代化前端框架
- **Tailwind CSS** - 原子化 CSS 框架
- **Radix UI** - 无障碍 UI 组件库
- **Zustand** - 轻量级状态管理
- **React Router** - 前端路由
- **Vite** - 快速构建工具

### 后端技术栈
- **Node.js** + **Express** - 服务器端运行环境
- **TypeScript** - 类型安全的 JavaScript
- **PostgreSQL** - 关系型数据库
- **Drizzle ORM** - 类型安全的数据库操作
- **Neon Database** - 无服务器 PostgreSQL

### 机器学习组件
- **Hugging Face Transformers.js** - 浏览器端模型运行
- **WebGPU** - 硬件加速推理（当可用时）
- **本地模型模拟** - 离线学习环境支持

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn
- 现代浏览器（支持 ES2020+）

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd llm-teaching-chinese
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:5000`

### 生产环境部署

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
llm-teaching-chinese/
├── client/                   # 前端代码
│   ├── src/
│   │   ├── components/       # React 组件
│   │   │   ├── interactive/  # 交互式学习组件
│   │   │   ├── layout/      # 布局组件
│   │   │   ├── ui/          # 基础 UI 组件
│   │   │   └── visualization/ # 可视化组件
│   │   ├── content/         # 学习内容
│   │   ├── hooks/           # React Hooks
│   │   ├── pages/           # 页面组件
│   │   └── store/           # 状态管理
├── server/                   # 后端代码
│   ├── routes.ts            # API 路由
│   ├── storage.ts           # 数据存储
│   └── index.ts             # 服务器入口
├── shared/                   # 共享代码
│   └── schema.ts            # 数据模型定义
└── README.md                # 项目说明文档
```

## 🎨 功能亮点

### 智能学习路径
- 章节间逻辑关联，循序渐进的学习体验
- 个性化进度跟踪，支持断点续学
- 实时反馈机制，及时纠正理解偏差

### 实战代码示例
```python
# PyTorch 示例：简单的 Transformer 块
import torch
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, embed_dim, num_heads):
        super().__init__()
        self.attention = nn.MultiheadAttention(embed_dim, num_heads)
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.feed_forward = nn.Sequential(
            nn.Linear(embed_dim, 4 * embed_dim),
            nn.ReLU(),
            nn.Linear(4 * embed_dim, embed_dim)
        )
    
    def forward(self, x):
        # 自注意力机制
        attn_out, _ = self.attention(x, x, x)
        x = self.norm1(x + attn_out)
        
        # 前馈网络
        ff_out = self.feed_forward(x)
        x = self.norm2(x + ff_out)
        
        return x
```

### GPU 性能优化技巧
- **混合精度训练** - 使用 FP16 减少显存占用
- **梯度累积** - 模拟大批量训练效果
- **模型并行** - 跨多 GPU 分布式训练
- **动态填充** - 优化变长序列处理

## 🔧 开发指南

### 添加新章节

1. 在 `client/src/content/` 目录下创建新的内容文件
2. 在 `client/src/content/chapters.tsx` 中注册新章节
3. 更新 `client/src/store/useStore.ts` 中的默认章节列表
4. 在 `client/src/components/layout/LessonSidebar.tsx` 中添加章节图标

### 创建交互式组件

```typescript
// 组件模板
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const InteractiveComponent: React.FC = () => {
  const [state, setState] = useState(initialState);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>交互式组件标题</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 组件内容 */}
      </CardContent>
    </Card>
  );
};
```

### 自定义主题

在 `client/src/index.css` 中修改 CSS 变量：

```css
:root {
  --primary: 210 40% 98%;
  --secondary: 210 40% 96%;
  --accent: 210 40% 94%;
  /* 更多主题变量 */
}

.dark {
  --primary: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --accent: 217.2 32.6% 17.5%;
  /* 深色模式变量 */}
```

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. **Fork 项目** 到您的 GitHub 账户
2. **创建特性分支** (`git checkout -b feature/amazing-feature`)
3. **提交更改** (`git commit -m 'Add some amazing feature'`)
4. **推送到分支** (`git push origin feature/amazing-feature`)
5. **创建 Pull Request**

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 配置的代码风格
- 为新功能编写相应的文档
- 确保所有交互式组件具有良好的用户体验

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- **Hugging Face** - 提供优秀的模型和工具库
- **React 社区** - 丰富的生态系统和组件库
- **Tailwind CSS** - 高效的样式解决方案
- **所有贡献者** - 让这个项目变得更好

## 📞 项目信息

- **项目名称**: LLM 全流程学习平台
- **开源协议**: MIT License

## 🔮 未来规划

- [ ] 增加更多实际模型集成示例
- [ ] 支持用户自定义学习路径
- [ ] 添加社区问答功能
- [ ] 集成更多可视化工具
- [ ] 支持多语言界面
- [ ] 移动端 App 开发

---

**开始您的 LLM 学习之旅吧！** 🚀

如果您觉得这个项目对您有帮助，请给我们一个 ⭐ Star！