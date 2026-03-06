# 三国志地名志 Records of the Three Kingdoms Places

一个基于Vue 3和Leaflet的三国志地名映射系统，用于可视化展示三国时期的地理位置和历史传记。

## 项目特点

- 📖 **双屏布局**：左侧地图，右侧文字传记
- 🗺️ **人物路线图**：自动根据时间顺序绘制人物活动轨迹
- 🔍 **智能搜索**：快速搜索人物传记，支持模糊匹配
- 📦 **可折叠面板**：一键收起搜索和选择器，释放65%额外阅读空间
- 🔄 **可调整布局**：拖动中间分隔条自由调整地图和文字的宽度比例
- 🎯 **交互式地图**：使用符合一个中国原则的地图服务
- 📍 **地名定位**：点击文字中的地名，地图自动跳转并显示标记
- ℹ️ **关于我们**：底部可展开的项目信息区域（新！）
- 🏛️ **阵营区分**：不同颜色表示魏、蜀、吴三国阵营
- 📚 **三书结构**：涵盖魏书、蜀书、吴书三大部分
- 🎨 **中国风设计**：采用传统书卷风格的UI设计
- 🇨🇳 **符合规范**：使用符合一个中国原则的地图服务

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **地图库**：Leaflet
- **样式**：原生CSS + Google Fonts

## 项目结构

```
sanguo-map-project/
├── index.html              # 入口HTML文件
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite配置文件
├── README.md               # 项目说明文档
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件
    ├── assets/
    │   └── styles/
    │       └── main.css    # 全局样式
    ├── components/
    │   ├── MapView.vue     # 地图视图组件
    │   └── TextView.vue    # 文本视图组件
    └── data/
        ├── places.js       # 地点坐标数据
        └── biographies.js  # 传记内容数据
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 3. 构建生产版本

```bash
npm run build
```

构建后的文件将在 `dist` 目录

### 4. 预览生产版本

```bash
npm run preview
```

## 数据结构说明

### 地点数据 (places.js)

```javascript
{
  '地名': {
    lat: 纬度,
    lng: 经度,
    modernName: '现代地名'
  }
}
```

### 传记数据 (biographies.js)

```javascript
{
  书卷ID: {
    title: '书卷名称',
    biographies: [
      {
        id: '传记ID',
        title: '传记标题',
        persons: [
          {
            id: '人物ID',
            name: '人物姓名',
            content: {
              title: '内容标题',
              text: '传记文字内容（HTML格式）'
            }
          }
        ]
      }
    ]
  }
}
```

### 地名标记格式

在传记文本中，地名使用以下HTML格式标记：

```html
<a class="place-name [阵营]" 
   data-place="地名" 
   data-year="年份" 
   data-faction="[阵营]">地名</a>
```

阵营可选值：`wei`（魏）、`shu`（蜀）、`wu`（吴）、`neutral`（中立）

## 如何添加新内容

### 1. 添加新地点

编辑 `src/data/places.js`：

```javascript
export const places = {
  // ... 现有地点
  '新地名': { 
    lat: 纬度, 
    lng: 经度, 
    modernName: '现代地名' 
  }
}
```

### 2. 添加新传记

编辑 `src/data/biographies.js`，在相应书卷下添加：

```javascript
{
  id: 'shu-3',
  title: '新传记标题',
  persons: [
    {
      id: 'shu-3-person1',
      name: '人物姓名',
      content: {
        title: '内容标题',
        text: `
          <p>传记内容，使用<a class="place-name shu" 
             data-place="成都" 
             data-year="221年" 
             data-faction="shu">成都</a>格式标记地名。</p>
        `
      }
    }
  ]
}
```

### 3. 添加新书卷

在 `biographies.js` 中添加新的顶级对象，并在 `TextView.vue` 的选择器中添加对应选项。

## 自定义样式

主要样式定义在以下文件：

- `src/assets/styles/main.css` - 全局样式和CSS变量
- `src/components/MapView.vue` - 地图组件样式
- `src/components/TextView.vue` - 文本组件样式

### 地图服务配置

项目使用符合一个中国原则的地图服务。详细配置说明请查看：[中国地图配置指南](CHINA-MAP-GUIDE.md)

**默认地图**：智图（GeoQ）灰色版
- ✅ 符合一个中国原则
- ✅ 免费使用，无需API Key
- ✅ 古典风格

**切换地图**：编辑 `src/data/map.config.js`

可选地图服务：
- 智图GeoQ（灰色/彩色）- 无需Key
- 天地图（矢量/影像/地形）- 需要Key
- 高德地图 - 需要Key

### CSS变量

可在 `main.css` 中修改以下变量来调整配色：

```css
:root {
  --color-wei: #4a5568;    /* 魏国颜色 */
  --color-shu: #c53030;    /* 蜀国颜色 */
  --color-wu: #2c5282;     /* 吴国颜色 */
  --color-neutral: #a0aec0; /* 中立颜色 */
  --bg-paper: #f7f3e9;     /* 背景色 */
  --bg-dark: #2d3748;      /* 深色背景 */
  --text-primary: #1a202c; /* 主文字颜色 */
  --text-secondary: #4a5568; /* 次要文字颜色 */
  --border-color: #d4c5a9; /* 边框颜色 */
}
```

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 常见问题

如果遇到地图不显示等问题，请查看 [故障排查指南](TROUBLESHOOTING.md)

常见问题快速修复：

1. **地图不显示**：检查浏览器控制台（F12）是否有错误
2. **地图瓦片不加载**：尝试更换地图服务商（见故障排查文档）
3. **npm install 失败**：删除 node_modules 和 package-lock.json 后重试
4. **点击地名无反应**：确保地名在 places.js 中已定义

## 开发说明

### 组件说明

- **App.vue**: 主应用组件，负责组件间通信
- **MapView.vue**: 地图视图，处理地图显示和标记
- **TextView.vue**: 文本视图，处理选择器和内容显示

### 核心功能

1. **地名点击联动**：TextView监听地名点击 → 触发place-click事件 → App接收并更新selectedPlace → MapView监听selectedPlace变化 → 更新地图显示

2. **地图标记点击**：MapView标记点击 → 触发place-selected事件 → App更新selectedPlace → 信息面板显示

## 许可证

本项目为教育和学习用途。

## 贡献

欢迎提交Issue和Pull Request来改进项目！

## 联系方式

如有问题或建议，请创建Issue。

---

**注意**：本项目中的历史内容节选自《三国志》，仅用于演示功能。完整内容需要后续添加。
