# 地图加载失败 - 快速修复

## 问题诊断

按F12打开浏览器控制台，查看错误信息：

### 1. 检查Network标签页

查看是否有红色失败的请求：

**常见错误：**
- `404 Not Found` - 地图服务URL错误
- `403 Forbidden` - 需要API Key或被拒绝访问
- `Mixed Content` - HTTPS网站加载HTTP资源
- `CORS` - 跨域问题

### 2. 检查Console标签页

应该看到的正常信息：
```
地图对象创建成功
使用地图服务: 高德地图
地图初始化成功
```

## 快速修复方案

### 方案A：使用高德地图（推荐，已设为默认）

**无需任何配置**，项目已更新为使用高德地图。

1. 重新启动项目：
```bash
npm run dev
```

2. 刷新浏览器页面

### 方案B：切换到OpenStreetMap（最稳定）

如果高德地图也失败，编辑 `src/data/map.config.js`：

```javascript
// 找到这一行（约第121行）
export const DEFAULT_MAP = 'amap'

// 改为
export const DEFAULT_MAP = 'osm'
```

保存后刷新浏览器。

### 方案C：使用智图GeoQ

编辑 `src/data/map.config.js`：

```javascript
export const DEFAULT_MAP = 'geoq_gray'  // 灰色版
// 或
export const DEFAULT_MAP = 'geoq'       // 彩色版
// 或
export const DEFAULT_MAP = 'geoq_warm'  // 暖色版
```

### 方案D：使用天地图（需要申请Key）

1. 申请天地图Key：https://console.tianditu.gov.cn/

2. 编辑 `src/data/map.config.js`：
```javascript
export const TIANDITU_KEY = '你申请的Key'
export const DEFAULT_MAP = 'tianditu_vec'
```

## 地图服务稳定性排序

| 排名 | 地图服务 | 稳定性 | 需要Key | 说明 |
|-----|---------|--------|---------|------|
| 1 | OpenStreetMap | ⭐⭐⭐⭐⭐ | 否 | 最稳定 |
| 2 | 高德地图 | ⭐⭐⭐⭐⭐ | 否 | 国内快速 |
| 3 | 智图GeoQ | ⭐⭐⭐⭐ | 否 | 偶尔不稳定 |
| 4 | 天地图 | ⭐⭐⭐⭐⭐ | 是 | 官方地图 |

## 网络问题排查

### 1. 检查是否能访问地图服务

在浏览器中直接打开以下URL测试：

**高德地图测试：**
```
https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=6&y=3&z=4
```

**智图测试：**
```
https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/4/3/6
```

**OSM测试：**
```
https://tile.openstreetmap.org/4/12/6.png
```

如果以上URL都无法打开，说明是网络问题。

### 2. 公司网络/防火墙

如果在公司网络，可能被防火墙拦截：
- 尝试切换到手机热点
- 联系IT部门开通地图服务访问权限

### 3. HTTPS混合内容

如果部署到HTTPS网站，确保地图URL也是HTTPS。

所有配置已更新为HTTPS，应该没有此问题。

## 完整测试代码

如果以上都不行，创建测试文件 `test-map.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        #map { height: 600px; }
    </style>
</head>
<body>
    <h1>地图测试</h1>
    <div id="map"></div>
    
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        console.log('开始测试...');
        
        const map = L.map('map').setView([35.0, 110.0], 5);
        
        // 测试高德地图
        L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: ['1', '2', '3', '4'],
            attribution: '高德地图'
        }).addTo(map);
        
        console.log('地图初始化完成');
        
        setTimeout(() => {
            console.log('3秒后检查：如果能看到地图，说明高德可用');
        }, 3000);
    </script>
</body>
</html>
```

在浏览器中打开此文件测试。

## 常见错误解决

### 错误1：`Uncaught Error: Map container not found`

**原因**：地图容器未准备好

**解决**：已在代码中使用 `nextTick`，应该已修复

### 错误2：`Failed to load resource: net::ERR_BLOCKED_BY_CLIENT`

**原因**：广告拦截器拦截了地图请求

**解决**：
1. 关闭广告拦截器
2. 或在无痕模式下测试

### 错误3：地图显示但全是灰色方块

**原因**：瓦片加载失败

**解决**：
1. 查看Network标签页，看哪些瓦片失败
2. 切换到其他地图服务

### 错误4：`Mixed Content` 警告

**原因**：HTTPS页面加载HTTP资源

**解决**：配置已全部更新为HTTPS，应该已修复

## 推荐配置（按优先级）

### 第一优先：高德地图
```javascript
export const DEFAULT_MAP = 'amap'
```
- ✅ 稳定快速
- ✅ 符合一个中国原则
- ✅ 无需Key
- ✅ 国内访问快

### 第二优先：OpenStreetMap
```javascript
export const DEFAULT_MAP = 'osm'
```
- ✅ 全球最稳定
- ✅ 无需Key
- ⚠️ 国外服务器，可能稍慢

### 第三优先：智图GeoQ
```javascript
export const DEFAULT_MAP = 'geoq_gray'
```
- ✅ 灰色风格适合古典主题
- ✅ 无需Key
- ⚠️ 偶尔不稳定

### 第四优先：天地图
```javascript
export const TIANDITU_KEY = '你的Key'
export const DEFAULT_MAP = 'tianditu_vec'
```
- ✅ 官方地图
- ✅ 最符合规范
- ❌ 需要申请Key

## 验证修复成功

启动项目后，在浏览器控制台应该看到：

```
地图对象创建成功
使用地图服务: 高德地图  （或其他你选择的地图）
地图初始化成功
```

并且：
- ✅ 左侧可以看到地图
- ✅ 地图可以拖动和缩放
- ✅ Network标签页显示瓦片图片加载成功（200状态）

## 还是不行？

1. 清除浏览器缓存
2. 重启开发服务器
3. 尝试不同的浏览器
4. 检查防火墙/代理设置
5. 使用 `test-map.html` 单独测试

如果单独测试文件能显示地图，说明问题在Vue项目配置中。
如果单独测试也不行，说明是网络环境问题。
