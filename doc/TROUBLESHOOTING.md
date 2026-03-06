# 故障排查指南 Troubleshooting Guide

## 地图不显示的常见问题及解决方案

### 问题1：地图容器是空白的

**原因**：
- Leaflet CSS 未正确加载
- 地图容器没有高度
- Leaflet 图标路径错误

**解决方案**：

1. **确保 Leaflet CSS 已加载**

在 `index.html` 中确认有以下代码：
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

2. **在 MapView.vue 中导入 CSS**

```javascript
import 'leaflet/dist/leaflet.css'
```

3. **修复 Leaflet 图标路径**

在 MapView.vue 的 `<script setup>` 中添加：
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

4. **确保地图容器有高度**

在 MapView.vue 的 style 中：
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

### 问题2：地图瓦片不加载

**症状**：地图显示但没有瓦片图像

**原因**：
- 网络问题
- 瓦片服务器不可用
- CORS 策略限制

**解决方案**：

1. **检查网络连接**

打开浏览器开发者工具（F12），查看 Network 标签页，检查是否有失败的请求。

2. **更换地图服务商**

如果 OpenTopoMap 不可用，可以更换为其他服务：

```javascript
// OpenStreetMap 标准地图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map)

// 或者使用 CartoDB 浅色地图
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap, © CartoDB',
  maxZoom: 19
}).addTo(map)
```

### 问题3：控制台报错 "map container is already initialized"

**原因**：地图被初始化两次

**解决方案**：

1. 在 onMounted 中添加检查：
```javascript
onMounted(() => {
  nextTick(() => {
    if (map) {
      console.log('地图已经初始化')
      return
    }
    
    map = L.map(mapContainer.value, {
      // ...配置
    })
  })
})
```

2. 确保组件卸载时清理地图：
```javascript
import { onUnmounted } from 'vue'

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
```

### 问题4：地图显示但尺寸不正确

**原因**：地图初始化时容器尺寸为0

**解决方案**：

在地图初始化后调用：
```javascript
onMounted(() => {
  // 初始化地图...
  
  // 延迟调整尺寸
  setTimeout(() => {
    if (map) {
      map.invalidateSize()
    }
  }, 100)
})
```

### 问题5：在生产构建后地图不显示

**原因**：
- 资源路径问题
- CSS 未正确打包
- 图标文件未包含在构建中

**解决方案**：

1. **确保 Leaflet CSS 在构建中**

在 `vite.config.js` 中：
```javascript
export default defineConfig({
  // ...其他配置
  css: {
    postcss: {
      plugins: []
    }
  }
})
```

2. **使用 CDN 资源作为备用**

在 index.html 中保留 CDN 链接：
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

### 问题6：点击地名后地图不跳转

**症状**：点击文本中的地名，地图没有反应

**原因**：
- 事件监听未正确绑定
- places 数据中缺少对应地点
- map 对象为 null

**解决方案**：

1. **检查 places.js 中是否有该地点**

```javascript
console.log('可用地点:', Object.keys(places))
```

2. **确保 map 已初始化**

在 createMarker 函数开头添加：
```javascript
const createMarker = (placeName, placeData, year, faction) => {
  if (!map) {
    console.error('地图未初始化')
    return null
  }
  // ...
}
```

3. **检查事件传递**

在 TextView.vue 中添加调试：
```javascript
const handlePlaceClick = (event) => {
  const target = event.target
  if (target.classList.contains('place-name')) {
    const placeName = target.dataset.place
    console.log('点击地名:', placeName)
    console.log('地点数据:', places[placeName])
    // ...
  }
}
```

## 调试技巧

### 1. 使用浏览器开发者工具

**Chrome DevTools (F12)**

- **Console 标签页**：查看错误信息和 console.log 输出
- **Network 标签页**：检查资源加载情况
- **Elements 标签页**：检查 DOM 结构和 CSS

### 2. 添加调试日志

在关键位置添加 console.log：

```javascript
// 地图初始化
onMounted(() => {
  console.log('开始初始化地图')
  console.log('地图容器:', mapContainer.value)
  
  map = L.map(mapContainer.value, {
    center: [35.0, 110.0],
    zoom: 5
  })
  
  console.log('地图对象:', map)
})

// 地名点击
const handlePlaceClick = (event) => {
  console.log('点击事件:', event)
  console.log('目标元素:', event.target)
}
```

### 3. 检查 CSS 样式

在浏览器中右键点击地图区域 → 检查元素，查看：
- 容器是否有高度和宽度
- z-index 是否被覆盖
- display 属性是否正确

### 4. 验证 Leaflet 安装

在浏览器控制台中运行：
```javascript
console.log(L.version)
```

应该输出 Leaflet 版本号（如 "1.9.4"）

## 完整的检查清单

- [ ] npm install 成功完成
- [ ] Leaflet CSS 已加载（检查 Network 标签页）
- [ ] 地图容器有明确的高度（检查 Elements 标签页）
- [ ] Leaflet 图标路径已修复
- [ ] 地图瓦片正在加载（检查 Network 标签页）
- [ ] 控制台没有 JavaScript 错误
- [ ] places.js 中包含所需的地点数据
- [ ] 事件监听器已正确绑定

## 测试用最小示例

如果以上都无效，创建一个最小测试文件 `test-map.html`：

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    #map { 
      height: 500px; 
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([35.0, 110.0], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    console.log('测试地图初始化成功');
  </script>
</body>
</html>
```

如果这个简单示例工作正常，说明问题在 Vue 集成部分。

## 获取帮助

如果问题仍未解决：

1. 打开浏览器开发者工具
2. 截取 Console 标签页的错误信息
3. 截取 Network 标签页显示失败的请求
4. 检查 `npm run dev` 命令的输出
5. 创建 Issue 并附上以上信息

## 常用命令

```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install

# 清除 Vite 缓存
rm -rf node_modules/.vite
npm run dev

# 检查依赖版本
npm list vue
npm list leaflet

# 强制重新安装特定包
npm install leaflet@1.9.4 --force
```
