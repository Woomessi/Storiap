# 可拖动分隔条功能说明

## 功能介绍

现在你可以通过拖动中间的分隔条来自由调整地图和文本区域的宽度比例。

## 使用方法

### 桌面端（鼠标）

1. **找到分隔条**：位于地图和文本区域之间，颜色为浅棕色
2. **鼠标悬停**：鼠标移到分隔条上时，颜色会变深，鼠标图标变为 ↔️
3. **拖动调整**：按住鼠标左键拖动分隔条
4. **释放固定**：松开鼠标，新的比例即被保存

### 移动端（触摸）

1. **找到分隔条**：位于地图和文本之间的窄条
2. **触摸拖动**：用手指按住分隔条左右拖动
3. **释放固定**：松开手指，新的比例即被保存

## 调整范围

为了保持良好的使用体验，系统设置了调整范围限制：

- **地图区域**：最小 30%，最大 80%
- **文本区域**：最小 20%，最大 70%（自动计算）

### 推荐比例

| 使用场景 | 地图 | 文本 | 说明 |
|---------|------|------|------|
| 专注地图 | 70% | 30% | 查看地理位置时 |
| 平衡模式 | 60% | 40% | 默认比例 |
| 专注阅读 | 40% | 60% | 阅读传记时 |
| 极简阅读 | 30% | 70% | 最大文本区域 |

## 视觉反馈

分隔条的三种状态：

1. **正常状态**：浅棕色（#d4c5a9）
2. **悬停状态**：深棕色（#a0826d）
3. **拖动状态**：更深棕色（#8b7355）

分隔条中央有一条白色细线，方便识别。

## 技术特性

### 自动适配

- ✅ 地图会自动调整渲染尺寸
- ✅ 文本区域会自动重排
- ✅ 滚动条会自动调整
- ✅ 响应式布局

### 性能优化

- 使用节流优化拖动性能
- 延迟调整地图尺寸，避免频繁重绘
- GPU加速的过渡动画

### 兼容性

- ✅ 支持现代浏览器（Chrome、Firefox、Edge、Safari）
- ✅ 支持触摸设备（平板、手机）
- ✅ 支持多显示器

## 常见问题

### Q: 拖动后地图显示不正常？

A: 地图会自动调整，如果有问题：
1. 等待1-2秒让地图重新渲染
2. 手动缩放地图一下
3. 刷新页面

### Q: 能否记住我设置的比例？

A: 当前版本在刷新页面后会恢复默认比例（60:40）。
未来可以添加本地存储功能来记住你的偏好。

### Q: 移动端如何使用？

A: 在手机或平板上，用手指直接拖动分隔条即可。
建议在横屏模式下使用，体验更好。

### Q: 分隔条太窄，不好点击？

A: 分隔条实际的点击区域比视觉宽度大，左右各延伸10px，
总共约26px的点击宽度，方便操作。

### Q: 能否通过快捷键调整？

A: 当前版本仅支持鼠标/触摸拖动。
未来可以添加键盘快捷键功能。

## 自定义调整

如果想修改默认比例或调整范围，编辑 `src/App.vue`：

### 修改默认比例

```javascript
// 找到这几行（约第16-17行）
const mapWidth = ref(60)  // 改为你想要的百分比
const textWidth = ref(40)  // 改为你想要的百分比
```

### 修改调整范围

```javascript
// 找到这几行（约第41-42行）
// 限制范围：地图最小30%，最大80%
if (newMapWidth >= 30 && newMapWidth <= 80) {
  // 修改30和80为你想要的范围
}
```

### 修改分隔条样式

编辑 `src/App.vue` 的 `<style>` 部分：

```css
.resizer {
  width: 6px;  /* 修改宽度 */
  background: var(--border-color);  /* 修改颜色 */
}

.resizer:hover {
  background: #a0826d;  /* 修改悬停颜色 */
}
```

## 高级功能（可选）

### 添加本地存储

在 `App.vue` 中添加以下代码来保存用户偏好：

```javascript
import { watch } from 'vue'

// 加载保存的比例
onMounted(() => {
  const saved = localStorage.getItem('mapWidth')
  if (saved) {
    mapWidth.value = parseFloat(saved)
    textWidth.value = 100 - mapWidth.value
  }
})

// 监听变化并保存
watch(mapWidth, (newWidth) => {
  localStorage.setItem('mapWidth', newWidth.toString())
})
```

### 添加快捷键

```javascript
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    // Ctrl + 左箭头：扩大文本区域
    if (e.ctrlKey && e.key === 'ArrowLeft') {
      mapWidth.value = Math.max(30, mapWidth.value - 5)
      textWidth.value = 100 - mapWidth.value
    }
    // Ctrl + 右箭头：扩大地图区域
    if (e.ctrlKey && e.key === 'ArrowRight') {
      mapWidth.value = Math.min(80, mapWidth.value + 5)
      textWidth.value = 100 - mapWidth.value
    }
    // Ctrl + 0：重置为默认
    if (e.ctrlKey && e.key === '0') {
      mapWidth.value = 60
      textWidth.value = 40
    }
  })
})
```

### 添加预设按钮

在界面上添加快速切换按钮：

```vue
<template>
  <div class="preset-buttons">
    <button @click="setRatio(70, 30)">专注地图</button>
    <button @click="setRatio(60, 40)">平衡</button>
    <button @click="setRatio(40, 60)">专注阅读</button>
  </div>
</template>

<script>
const setRatio = (map, text) => {
  mapWidth.value = map
  textWidth.value = text
}
</script>
```

## 设计理念

这个功能的设计遵循以下原则：

1. **直观性**：分隔条的外观和行为符合用户直觉
2. **流畅性**：拖动过程平滑，没有卡顿
3. **安全性**：有范围限制，防止极端情况
4. **可访问性**：支持鼠标和触摸两种交互方式

## 反馈与建议

如果你在使用过程中有任何问题或建议，欢迎反馈！

可能的改进方向：
- 添加双击分隔条恢复默认比例
- 添加动画过渡效果
- 添加比例显示提示
- 添加预设比例快捷按钮
- 记住用户偏好设置
