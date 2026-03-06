# 中国地图服务配置说明

本项目已更新为使用符合一个中国原则的地图服务。

## 当前使用的地图

**默认地图：智图（GeoQ）灰色版**

- ✅ 符合一个中国原则
- ✅ 免费使用，无需申请API Key
- ✅ 灰色风格，符合古典主题
- ✅ 稳定可靠

## 可用的地图服务

配置文件位于：`src/data/map.config.js`

### 1. 智图 GeoQ（当前使用，推荐）

**无需API Key，开箱即用**

- `geoq_gray` - 灰色版（默认，适合古典风格）
- `geoq` - 彩色版

### 2. 天地图（官方地图服务）

**需要申请API Key**

- `tianditu_vec` - 矢量地图
- `tianditu_img` - 影像地图（卫星图）
- `tianditu_ter` - 地形图

**申请步骤：**
1. 访问：https://console.tianditu.gov.cn/
2. 注册账号
3. 创建应用
4. 获取API Key
5. 在 `src/data/map.config.js` 中替换 `YOUR_TIANDITU_KEY`

### 3. 高德地图

**需要申请API Key**

- `amap` - 标准地图

**申请步骤：**
1. 访问：https://console.amap.com/
2. 注册开发者账号
3. 创建应用
4. 获取Web服务Key

## 切换地图服务

编辑 `src/data/map.config.js` 文件：

```javascript
// 修改这一行来切换地图
export const DEFAULT_MAP = 'geoq_gray' // 默认值

// 可选值：
// 'geoq_gray'      - 智图灰色（推荐，无需Key）
// 'geoq'           - 智图彩色（无需Key）
// 'tianditu_vec'   - 天地图矢量（需要Key）
// 'tianditu_img'   - 天地图影像（需要Key）
// 'tianditu_ter'   - 天地图地形（需要Key）
// 'amap'           - 高德地图（需要Key）
```

## 地图特性

### 地图范围限制

地图已设置最大边界，限制在中国区域：

```javascript
maxBounds: [[15, 70], [55, 140]]
```

### 缩放级别

- 最小缩放：4（可看到整个中国）
- 最大缩放：18（可看到街道细节）
- 默认缩放：5

### 中心点

默认中心点：[35.0, 110.0]（中国中心位置）

## 使用天地图的完整示例

1. **申请API Key**

访问 https://console.tianditu.gov.cn/ 申请Key

2. **更新配置文件**

编辑 `src/data/map.config.js`：

```javascript
// 将这一行的Key替换为您申请的Key
export const TIANDITU_KEY = 'YOUR_TIANDITU_KEY'

// 切换到天地图
export const DEFAULT_MAP = 'tianditu_vec'
```

3. **重启开发服务器**

```bash
npm run dev
```

## 地图风格对比

| 地图服务 | 风格 | 需要Key | 推荐场景 |
|---------|------|---------|---------|
| 智图灰色 | 灰色调，简洁 | 否 | 古典历史主题（推荐） |
| 智图彩色 | 彩色，现代 | 否 | 现代风格 |
| 天地图矢量 | 标准地图 | 是 | 需要详细地名标注 |
| 天地图影像 | 卫星图 | 是 | 需要真实地形 |
| 天地图地形 | 地形图 | 是 | 需要海拔信息 |
| 高德地图 | 现代风格 | 是 | 城市导航风格 |

## 自定义地图配置

如果需要添加其他符合规范的地图服务，编辑 `src/data/map.config.js`：

```javascript
export const mapConfigs = {
  // ... 现有配置
  
  // 添加新的地图配置
  your_custom_map: {
    name: '您的地图名称',
    layers: [
      {
        url: '瓦片URL/{z}/{x}/{y}.png',
        options: {
          attribution: '&copy; 地图提供者',
          maxZoom: 18
        }
      }
    ]
  }
}
```

## 注意事项

### 1. HTTPS vs HTTP

- 开发环境可以使用HTTP
- 生产环境建议使用HTTPS

如果遇到混合内容警告，可以将URL中的 `http://` 改为 `https://`（如果服务支持）

### 2. 跨域问题

所有推荐的地图服务都已配置CORS，正常情况下不会有跨域问题。

### 3. 使用限额

- **智图GeoQ**：免费，无限额
- **天地图**：个人开发者100万次/天
- **高德地图**：根据申请的套餐而定

### 4. 离线使用

如果需要离线使用，可以：
1. 下载地图瓦片到本地
2. 配置本地瓦片服务器
3. 修改配置文件指向本地服务

## 验证地图是否符合规范

正确的地图应该：

- ✅ 完整显示中国领土
- ✅ 正确标注台湾、香港、澳门
- ✅ 南海诸岛及海域完整
- ✅ 藏南地区标注正确
- ✅ 国界线标注规范

## 常见问题

### Q: 地图加载很慢？

A: 可能的原因：
- 网络问题
- 服务器压力大
- 解决：切换到其他地图服务

### Q: 地图显示空白？

A: 检查：
1. 浏览器控制台是否有错误
2. Network标签页瓦片是否加载成功
3. API Key是否正确（如使用天地图/高德）

### Q: 如何确认使用的是哪个地图？

A: 打开浏览器控制台，应该看到：
```
使用地图服务: 智图灰色
```

### Q: 可以同时显示多个图层吗？

A: 可以，编辑配置文件中的 `layers` 数组，添加多个图层。例如天地图就是底图+标注两个图层。

## 技术支持

如有问题，请检查：
1. `src/data/map.config.js` - 配置文件
2. `src/components/MapView.vue` - 地图组件
3. 浏览器开发者工具的Console和Network标签页

---

**推荐配置**：保持默认的 `geoq_gray`（智图灰色），无需任何配置，开箱即用，符合古典主题。
