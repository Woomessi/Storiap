# 标题图片使用说明

## 当前配置

项目标题已改为图片格式，位于：`public/images/title.svg`

## 如何替换标题图片

### 方案1：使用自己的图片

1. 准备你的标题图片文件（推荐格式：SVG、PNG、或WebP）
2. 将图片命名为 `title.svg`（或其他格式如 `title.png`）
3. 放置到 `public/images/` 目录
4. 如果使用非SVG格式，需要修改 `src/components/TextView.vue` 中的图片路径：
   ```vue
   <img src="/images/title.png" alt="三國志地名志" class="title-image" />
   ```

### 方案2：使用当前的SVG图片

当前已提供一个SVG格式的标题图片，你可以：
- 直接使用（无需修改）
- 编辑 `public/images/title.svg` 文件来自定义样式

## 图片规格建议

### 尺寸建议
- **推荐宽度**: 300-500px
- **推荐高度**: 40-60px
- **宽高比**: 约 6:1 到 10:1

### 格式建议
1. **SVG** (推荐)
   - 优点：矢量格式，无限缩放不失真
   - 缺点：需要一定的SVG知识
   - 适用场景：所有情况

2. **PNG**
   - 优点：支持透明背景，质量高
   - 缺点：文件较大，放大会模糊
   - 建议：使用2x或3x分辨率

3. **WebP**
   - 优点：文件小，质量高
   - 缺点：部分老浏览器不支持
   - 建议：配合PNG作为后备

## 自适应配置

标题图片已配置为完全自适应：

### CSS配置
```css
.title-image {
  max-width: 100%;        /* 不超过容器宽度 */
  max-height: 50px;       /* 正常屏幕最大高度 */
  height: auto;           /* 保持宽高比 */
  width: auto;
  object-fit: contain;    /* 保持比例适配 */
}
```

### 响应式断点
- **小屏幕 (<768px)**: max-height: 40px
- **超小屏幕 (<480px)**: max-height: 32px
- **大屏幕 (>1600px)**: max-height: 60px

## 窗口缩放测试

确保在以下场景测试：
1. 浏览器窗口从最小拖动到最大
2. 使用Ctrl + 鼠标滚轮缩放页面
3. 在移动设备上查看
4. 拖动左右分隔条调整文本框宽度

所有场景下，图片应：
- ✅ 保持比例不变形
- ✅ 不超出容器
- ✅ 清晰可见
- ✅ 不遮挡其他元素

## 常见问题

### Q: 图片显示不出来？
A: 检查：
1. 图片路径是否正确（必须在 `public/images/` 目录）
2. 文件名是否匹配代码中的路径
3. 浏览器缓存是否需要清除（Ctrl+Shift+R）

### Q: 图片太大或太小？
A: 修改 `src/components/TextView.vue` 中的CSS：
```css
.title-image {
  max-height: 50px;  /* 调整这个值 */
}
```

### Q: 图片变形了？
A: 确保CSS包含：
```css
.title-image {
  height: auto;
  width: auto;
  object-fit: contain;
}
```

### Q: 想要不同的对齐方式？
A: 修改 `.title-image` 的 `display` 属性：
```css
.title-image {
  display: block;        /* 默认：居左 */
  display: inline-block; /* 行内元素 */
  margin: 0 auto;        /* 配合block时居中 */
}
```

## 版本信息

- 版本：v1.8.0-image-title
- 更新日期：2024年2月
- 基础版本：v1.7.3-final-complete
