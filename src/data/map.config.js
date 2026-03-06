/**
 * 地图配置文件
 * 提供符合一个中国原则的地图服务选项
 */

// 天地图API Key配置
// 请访问 https://console.tianditu.gov.cn/ 申请免费的开发者Key
export const TIANDITU_KEY = 'YOUR_TIANDITU_KEY' // 请替换为您的Key

// 地图服务配置
export const mapConfigs = {
  // OpenStreetMap (临时备用，稳定可靠)
  osm: {
    name: 'OpenStreetMap',
    layers: [
      {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19
        }
      }
    ]
  },

  // 天地图 - 矢量地图
  tianditu_vec: {
    name: '天地图矢量',
    layers: [
      {
        url: 'https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TIANDITU_KEY,
        options: {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          attribution: '&copy; 天地图'
        }
      },
      {
        url: 'https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TIANDITU_KEY,
        options: {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        }
      }
    ]
  },

  // 天地图 - 影像地图
  tianditu_img: {
    name: '天地图影像',
    layers: [
      {
        url: 'https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TIANDITU_KEY,
        options: {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          attribution: '&copy; 天地图'
        }
      },
      {
        url: 'https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TIANDITU_KEY,
        options: {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        }
      }
    ]
  },

  // 天地图 - 地形图
  tianditu_ter: {
    name: '天地图地形',
    layers: [
      {
        url: 'https://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TIANDITU_KEY,
        options: {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          attribution: '&copy; 天地图'
        }
      },
      {
        url: 'https://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TIANDITU_KEY,
        options: {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        }
      }
    ]
  },

  // 高德地图（无需Key的公开版本）
  amap: {
    name: '高德地图',
    layers: [
      {
        url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        options: {
          subdomains: ['1', '2', '3', '4'],
          attribution: '&copy; 高德地图',
          maxZoom: 18
        }
      }
    ]
  },

  // 智图GeoQ彩色（更新URL）
  geoq: {
    name: '智图彩色',
    layers: [
      {
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '&copy; GeoQ',
          maxZoom: 18
        }
      }
    ]
  },

  // 智图灰色版（更新URL）
  geoq_gray: {
    name: '智图灰色',
    layers: [
      {
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '&copy; GeoQ',
          maxZoom: 18
        }
      }
    ]
  },

  // 智图暖色版
  geoq_warm: {
    name: '智图暖色',
    layers: [
      {
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '&copy; GeoQ',
          maxZoom: 18
        }
      }
    ]
  }
}

// 默认使用的地图配置
// 优先使用高德地图（稳定且符合规范）
export const DEFAULT_MAP = 'amap'

// 地图初始视图配置
export const mapViewConfig = {
  center: [35.0, 110.0], // 中国中心点
  zoom: 5,
  minZoom: 4,
  maxZoom: 18,
  maxBounds: [[15, 70], [55, 140]], // 限制范围在中国境内
  zoomControl: true
}
