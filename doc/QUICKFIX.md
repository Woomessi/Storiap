# 地图不显示问题 - 快速修复

## 问题描述
编译后地图区域空白，只有文本部分正常显示。

## 已修复的问题

### 1. Leaflet 图标路径问题
在 Vite 构建环境中，Leaflet 默认图标路径会出错。

**解决方法**：在 `MapView.vue` 中添加了图标路径修复代码：

```javascript
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 修复默认图标路径
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})
```

### 2. 地图容器高度问题
确保地图容器有明确的高度设置。

**解决方法**：在 CSS 中添加了：

```css
.map-container {
  flex: 1;
  min-height: 100vh;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
```

### 3. 地图初始化时序问题
使用 `nextTick` 确保 DOM 已准备好。

**解决方法**：

```javascript
import { nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
    // 初始化地图
  })
})
```

### 4. 地图尺寸调整
添加了延迟调用 `invalidateSize()`。

**解决方法**：

```javascript
setTimeout(() => {
  if (map) {
    map.invalidateSize()
  }
}, 100)
```

## 如何使用修复版本

### 方法1：使用新的压缩包
下载 `sanguo-map-project-fixed.zip`，解压后直接使用。

### 方法2：手动修复现有项目

如果你已经下载了旧版本，只需替换 `src/components/MapView.vue` 文件：

1. 打开你的项目目录
2. 找到 `src/components/MapView.vue`
3. 用修复版本的内容替换（完整代码见下方）

## 验证修复

启动项目后，打开浏览器开发者工具（F12）：

1. **Console 标签页应该显示**：
   ```
   地图初始化成功
   ```

2. **Network 标签页应该显示**：
   - Leaflet CSS 成功加载
   - 地图瓦片（.png 图片）正在加载

3. **地图应该显示**：
   - 可以看到中国地形图
   - 可以拖动和缩放
   - 右下角有缩放控件

## 如果仍然不显示

### 步骤1：检查控制台错误
按 F12 打开开发者工具，查看 Console 是否有红色错误信息。

### 步骤2：检查网络连接
确保可以访问 `https://tile.opentopomap.org`

### 步骤3：更换地图服务
如果 OpenTopoMap 不可用，修改 `MapView.vue` 中的瓦片服务：

```javascript
// 替换为 OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 19
}).addTo(map)
```

### 步骤4：清除缓存重启

```bash
# 停止开发服务器（Ctrl+C）
# 清除缓存
rm -rf node_modules/.vite

# 重新启动
npm run dev
```

## 测试清单

- [ ] 执行 `npm install` 无错误
- [ ] 执行 `npm run dev` 启动成功
- [ ] 浏览器打开 http://localhost:3000
- [ ] 左侧可以看到地图（不是空白）
- [ ] 可以拖动地图
- [ ] 可以缩放地图
- [ ] 右侧选择器正常工作
- [ ] 选择人物后可以看到传记
- [ ] 点击传记中的地名，地图会跳转

## 其他注意事项

### 开发环境要求
- Node.js >= 16.0.0
- 现代浏览器（Chrome/Firefox/Edge 最新版本）
- 稳定的网络连接（用于加载地图瓦片）

### 首次启动时间
第一次运行 `npm run dev` 可能需要较长时间：
- npm install 下载依赖：1-3分钟
- Vite 启动开发服务器：5-10秒
- 地图瓦片首次加载：3-5秒

### 生产构建
如果要构建生产版本：

```bash
npm run build
```

构建后的文件在 `dist` 目录，可以部署到任何静态服务器。

## 联系支持

如果问题仍未解决，请：

1. 查看完整的 [故障排查指南](TROUBLESHOOTING.md)
2. 收集以下信息：
   - 浏览器版本
   - Node.js 版本（`node -v`）
   - 控制台错误截图
   - Network 标签页截图
3. 创建 Issue 并附上这些信息

---

最后更新：2024-01-30
版本：v1.0.1-fixed
