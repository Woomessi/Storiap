# 开发指南 Development Guide

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装步骤

```bash
# 1. 进入项目目录
cd sanguo-map-project

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 在浏览器中打开
# 默认地址: http://localhost:3000
```

## 项目架构

### 技术选型理由

1. **Vue 3 Composition API**
   - 更好的逻辑复用
   - TypeScript友好
   - 更清晰的代码组织

2. **Vite**
   - 快速的开发服务器启动
   - 高效的HMR（热模块替换）
   - 优化的生产构建

3. **Leaflet**
   - 轻量级地图库
   - 丰富的插件生态
   - 易于自定义

### 组件设计

```
App.vue (状态管理中心)
├── MapView.vue (地图视图)
│   ├── 地图初始化
│   ├── 标记管理
│   └── 信息面板
└── TextView.vue (文本视图)
    ├── 选择器
    ├── 内容展示
    └── 地名点击处理
```

## 数据管理

### 添加新地点的完整流程

1. **在 places.js 中添加坐标**

```javascript
export const places = {
  // ... 现有地点
  '新城': { 
    lat: 34.56, 
    lng: 112.34, 
    modernName: '现代城市名' 
  }
}
```

2. **在传记文本中标记地名**

```html
<p>
  某年某月，军至
  <a class="place-name shu" 
     data-place="新城" 
     data-year="220年" 
     data-faction="shu">新城</a>
  大战三日。
</p>
```

3. **数据属性说明**
   - `class`: 必须包含 `place-name` 和阵营类名
   - `data-place`: 地点名称（必须与places.js中的键完全匹配）
   - `data-year`: 事件发生年份
   - `data-faction`: 阵营（wei/shu/wu/neutral）

### 添加新传记的完整流程

1. **确定传记位置**
   - 魏书：data.wei.biographies
   - 蜀书：data.shu.biographies
   - 吴书：data.wu.biographies

2. **添加传记结构**

```javascript
{
  id: 'shu-3', // 唯一ID，建议格式：书名-序号
  title: '诸葛亮传第五', // 传记标题
  persons: [
    {
      id: 'shu-3-zhugeliang', // 唯一ID
      name: '诸葛亮', // 人物名称
      content: {
        title: '诸葛亮传', // 内容标题
        text: `传记正文内容...` // HTML格式
      }
    }
  ]
}
```

3. **编写传记内容**
   - 使用 `<p>` 标签包裹段落
   - 使用地名标记格式标注地点
   - 保持文言文风格

## 样式定制

### 修改配色方案

编辑 `src/assets/styles/main.css`：

```css
:root {
  /* 阵营颜色 */
  --color-wei: #4a5568;
  --color-shu: #c53030;
  --color-wu: #2c5282;
  
  /* 主题颜色 */
  --bg-paper: #f7f3e9;
  --text-primary: #1a202c;
}
```

### 修改字体

在 `index.html` 中更改Google Fonts链接：

```html
<link href="https://fonts.googleapis.com/css2?family=你的字体&display=swap" rel="stylesheet">
```

然后在CSS中应用：

```css
body {
  font-family: '你的字体', serif;
}
```

### 地图图层定制

在 `MapView.vue` 中修改：

```javascript
// 更换为其他地图提供商
L.tileLayer('地图瓦片URL/{z}/{x}/{y}.png', {
  attribution: '归属信息',
  maxZoom: 18
}).addTo(map)
```

可选地图提供商：
- OpenStreetMap: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- OpenTopoMap: `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png`
- CartoDB: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`

## 性能优化建议

### 1. 数据懒加载

如果传记内容很多，可以考虑按需加载：

```javascript
// biographies.js
export async function loadBiography(bookId, bioId) {
  const module = await import(`./biographies/${bookId}/${bioId}.js`)
  return module.default
}
```

### 2. 地图标记优化

当地点数量很多时，使用聚合插件：

```bash
npm install leaflet.markercluster
```

### 3. 图片优化

如果添加历史地图图片，使用WebP格式并实现懒加载。

## 调试技巧

### 1. Vue Devtools

安装Vue Devtools浏览器扩展来调试组件状态。

### 2. 控制台日志

在关键位置添加日志：

```javascript
console.log('地点被点击:', placeName, placeData)
```

### 3. 地图调试

在MapView.vue中暴露map实例：

```javascript
defineExpose({
  map,
  markers
})
```

然后在浏览器控制台访问：

```javascript
$vm.map // 访问地图实例
```

## 常见问题

### Q: 地图不显示怎么办？

A: 检查以下几点：
1. Leaflet CSS是否正确加载
2. 地图容器是否有高度
3. 网络是否能访问地图瓦片服务器

### Q: 地名点击没反应？

A: 确保：
1. `data-place` 值与 places.js 中的键完全匹配
2. 事件监听已正确添加
3. 浏览器控制台没有JavaScript错误

### Q: 如何修改地图初始位置？

A: 在 MapView.vue 中修改：

```javascript
map = L.map(mapContainer.value, {
  center: [纬度, 经度], // 修改这里
  zoom: 缩放级别
})
```

## 扩展功能建议

### 1. 时间轴功能

添加时间滑块，动态展示不同时期的地图变化。

### 2. 搜索功能

添加地名和人物搜索功能。

### 3. 导出功能

允许用户导出地图截图或传记内容。

### 4. 多语言支持

使用 vue-i18n 添加英文版本。

### 5. 路径追踪

展示历史人物的行军路线。

## 部署

### 构建生产版本

```bash
npm run build
```

### 部署到静态服务器

将 `dist` 目录上传到服务器即可。

### 部署到 GitHub Pages

1. 修改 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. 构建并推送到 gh-pages 分支

### 部署到 Vercel/Netlify

直接连接GitHub仓库，自动部署。

## 贡献指南

### 提交代码

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m '添加某功能'`
4. 推送分支：`git push origin feature/新功能`
5. 创建 Pull Request

### 代码规范

- 使用2空格缩进
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 添加必要的注释

## 参考资料

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Leaflet 官方文档](https://leafletjs.com/)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [三国志原文](https://ctext.org/wiki.pl?if=gb&res=765939)

## 更新日志

### v1.0.0 (2024-01-30)

- ✨ 初始版本发布
- 📖 支持魏、蜀、吴三书
- 🗺️ 地图地名联动功能
- 🎨 中国风UI设计

---

如有其他问题，请查看 README.md 或创建 Issue。
