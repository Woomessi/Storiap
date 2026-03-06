<template>
  <div class="map-container">
    <div id="map" ref="mapContainer"></div>
    <div class="info-panel" :class="{ hidden: !selectedPlace }">
      <h3>{{ selectedPlace?.name || '选择地点' }}</h3>
      <div class="info-item" v-if="selectedPlace?.routeIndex">
        <span class="info-label">路线：</span>
        <span class="route-badge">第 {{ selectedPlace.routeIndex }} 站 / 共 {{ selectedPlace.routeTotal }} 站</span>
      </div>
      <div class="info-item">
        <span class="info-label">时间：</span>
        <span class="info-value">{{ selectedPlace?.year || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">阵营：</span>
        <span class="faction-badge" :class="selectedPlace?.faction">
          {{ selectedPlace?.factionName || '-' }}
        </span>
      </div>
      <div class="info-item" v-if="selectedPlace?.modernName">
        <span class="info-label">今名：</span>
        <span class="info-value">{{ selectedPlace.modernName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { places } from '../data/places.js'
import { mapConfigs, DEFAULT_MAP, mapViewConfig } from '../data/map.config.js'

// 修复 Leaflet 默认图标路径问题
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const props = defineProps({
  selectedPlace: Object,
  mapWidth: {
    type: Number,
    default: 60
  },
  selectedPerson: String,
  biographyContent: Object,
  showRoute: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['place-selected'])

const mapContainer = ref(null)
let map = null
let markers = {}
let routeLine = null // 路线对象
let routeMarkers = [] // 路线上的标记点

const factionNames = {
  wei: '魏',
  shu: '蜀',
  wu: '吴',
  neutral: '中立'
}

// 解析传记文本中的地点信息
const parseLocationsFromText = (htmlText) => {
  if (!htmlText) return []
  
  // 创建临时DOM来解析HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlText
  
  // 查找所有带有place-name类的元素
  const placeElements = tempDiv.querySelectorAll('.place-name')
  const locations = []
  
  placeElements.forEach(el => {
    const placeName = el.dataset.place
    const year = el.dataset.year
    const faction = el.dataset.faction
    
    if (placeName && places[placeName]) {
      locations.push({
        name: placeName,
        year: year || '',
        faction: faction || 'neutral',
        lat: places[placeName].lat,
        lng: places[placeName].lng,
        modernName: places[placeName].modernName
      })
    }
  })
  
  // 按年份排序
  return locations.sort((a, b) => {
    const yearA = parseInt(a.year) || 0
    const yearB = parseInt(b.year) || 0
    return yearA - yearB
  })
}

// 绘制路线
const drawRoute = (locations) => {
  if (!map || locations.length === 0) return
  
  // 清除旧的路线和标记
  clearRoute()
  
  // 如果只有一个地点，不绘制路线
  if (locations.length === 1) {
    const loc = locations[0]
    createRouteMarker(loc, 1, locations.length)
    map.setView([loc.lat, loc.lng], 6)
    return
  }
  
  // 创建路线坐标数组
  const routeCoords = locations.map(loc => [loc.lat, loc.lng])
  
  // 绘制路线（使用折线）
  routeLine = L.polyline(routeCoords, {
    color: '#e63946',
    weight: 3,
    opacity: 0.7,
    smoothFactor: 1,
    dashArray: '10, 5'
  }).addTo(map)
  
  // 在每个地点添加编号标记
  locations.forEach((loc, index) => {
    createRouteMarker(loc, index + 1, locations.length)
  })
  
  // 调整地图视图以显示整条路线
  map.fitBounds(routeLine.getBounds(), {
    padding: [50, 50],
    maxZoom: 8
  })
}

// 创建路线标记
const createRouteMarker = (location, index, total) => {
  if (!map) return
  
  const factionClass = location.faction || 'neutral'
  
  // 创建带编号的标记
  const icon = L.divIcon({
    className: 'route-marker-wrapper',
    html: `
      <div class="route-marker ${factionClass}">
        <div class="route-marker-number">${index}</div>
      </div>
      <div class="route-marker-label">${location.name}</div>
    `,
    iconSize: [40, 60],
    iconAnchor: [20, 55]
  })
  
  const marker = L.marker([location.lat, location.lng], { icon }).addTo(map)
  
  // 添加点击事件
  marker.on('click', () => {
    showRoutePointInfo(location, index, total)
  })
  
  routeMarkers.push(marker)
}

// 显示路线点信息
const showRoutePointInfo = (location, index, total) => {
  emit('place-selected', {
    name: location.name,
    year: location.year,
    faction: location.faction,
    factionName: factionNames[location.faction] || '中立',
    modernName: location.modernName,
    routeIndex: index,
    routeTotal: total
  })
}

// 清除路线
const clearRoute = () => {
  if (routeLine) {
    map.removeLayer(routeLine)
    routeLine = null
  }
  
  routeMarkers.forEach(marker => {
    map.removeLayer(marker)
  })
  routeMarkers = []
}

// 初始化地图
onMounted(() => {
  nextTick(() => {
    if (!mapContainer.value) {
      console.error('地图容器未找到')
      return
    }

    try {
      // 创建地图实例（使用配置文件中的设置）
      map = L.map(mapContainer.value, mapViewConfig)

      console.log('地图对象创建成功')

      // 添加地图图层（使用配置文件中的设置）
      const selectedConfig = mapConfigs[DEFAULT_MAP]
      selectedConfig.layers.forEach(layerConfig => {
        L.tileLayer(layerConfig.url, layerConfig.options).addTo(map)
      })

      console.log('使用地图服务:', selectedConfig.name)

      // 确保地图正确渲染
      setTimeout(() => {
        if (map) {
          map.invalidateSize()
        }
      }, 100)

      console.log('地图初始化成功')
    } catch (error) {
      console.error('地图初始化失败:', error)
    }
  })
})

// 创建标记
const createMarker = (placeName, placeData, year, faction) => {
  if (!map) {
    console.error('地图未初始化')
    return null
  }

  const factionClass = faction || 'neutral'
  const icon = L.divIcon({
    className: 'custom-marker-wrapper',
    html: `<div class="custom-marker ${factionClass}"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })

  const marker = L.marker([placeData.lat, placeData.lng], { icon }).addTo(map)
  
  marker.on('click', () => {
    emit('place-selected', {
      name: placeName,
      year,
      faction: faction || 'neutral',
      factionName: factionNames[faction] || '中立',
      modernName: placeData.modernName
    })
  })

  return marker
}

// 监听选中地点的变化
watch(() => props.selectedPlace, (newPlace) => {
  if (newPlace && places[newPlace.name] && map) {
    // 如果有路线索引，说明是点击路线点
    if (newPlace.routeIndex !== undefined) {
      // 不清除路线，只高亮当前点
      return
    }
    
    // 清除旧标记和路线
    Object.values(markers).forEach(marker => {
      if (marker) marker.remove()
    })
    markers = {}
    clearRoute()

    // 创建新标记
    const newMarker = createMarker(
      newPlace.name,
      places[newPlace.name],
      newPlace.year,
      newPlace.faction
    )
    
    if (newMarker) {
      markers[newPlace.name] = newMarker
      
      // 地图平滑移动到该位置
      map.flyTo([places[newPlace.name].lat, places[newPlace.name].lng], 7, {
        duration: 1.5
      })
    }
  }
})

// 监听传记内容变化，绘制路线图
// 监听传记内容和路线开关变化
watch([() => props.biographyContent, () => props.showRoute], ([newContent, showRoute]) => {
  if (!newContent || !newContent.text || !map) {
    clearRoute()
    return
  }
  
  // 只有当showRoute为true时才绘制路线
  if (showRoute) {
    const locations = parseLocationsFromText(newContent.text)
    
    if (locations.length > 0) {
      drawRoute(locations)
    } else {
      clearRoute()
    }
  } else {
    // showRoute为false时清除路线
    clearRoute()
  }
}, { immediate: true })

// 监听地图宽度变化，调整地图尺寸
watch(() => props.mapWidth, () => {
  if (map) {
    // 延迟调整以确保DOM已更新
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }
})

defineExpose({
  map
})
</script>

<style scoped>
.map-container {
  width: v-bind(mapWidth + '%');
  position: relative;
  z-index: 1;
  box-shadow: 4px 0 20px var(--shadow);
  min-height: 100vh;
  height: 100%;
  flex-shrink: 0;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #e8dcc4;
}

.info-panel {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: rgba(255, 255, 255, 0.95);
  padding: 18px 22px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--border-color);
  min-width: 240px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transform: translateY(0);
  transition: all 0.3s ease;
}

.info-panel.hidden {
  transform: translateY(120%);
  opacity: 0;
}

.info-panel h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--bg-dark);
  letter-spacing: 1px;
}

.info-item {
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: 600;
  color: var(--text-secondary);
  margin-right: 8px;
  min-width: 60px;
}

.info-value {
  color: var(--text-primary);
}

.faction-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.faction-badge.wei {
  background: var(--color-wei);
  color: white;
}

.faction-badge.shu {
  background: var(--color-shu);
  color: white;
}

.faction-badge.wu {
  background: var(--color-wu);
  color: white;
}

.faction-badge.neutral {
  background: var(--color-neutral);
  color: white;
}

.route-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

/* 自定义标记样式 */
:deep(.custom-marker-wrapper) {
  background: transparent !important;
  border: none !important;
}

:deep(.custom-marker) {
  width: 32px;
  height: 32px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: white;
  border: 3px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.custom-marker:hover) {
  transform: rotate(-45deg) scale(1.2);
}

:deep(.custom-marker.wei) {
  background: var(--color-wei);
}

:deep(.custom-marker.shu) {
  background: var(--color-shu);
}

:deep(.custom-marker.wu) {
  background: var(--color-wu);
}

:deep(.custom-marker.neutral) {
  background: var(--color-neutral);
}

/* 确保Leaflet控件可见 */
:deep(.leaflet-control-zoom) {
  border: 2px solid var(--border-color) !important;
}

:deep(.leaflet-control-zoom a) {
  background-color: white !important;
  color: var(--text-primary) !important;
}

/* 路线标记样式 */
:deep(.route-marker-wrapper) {
  background: transparent !important;
  border: none !important;
}

:deep(.route-marker) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

:deep(.route-marker:hover) {
  transform: scale(1.2);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}

:deep(.route-marker.wei) {
  background: var(--color-wei);
}

:deep(.route-marker.shu) {
  background: var(--color-shu);
}

:deep(.route-marker.wu) {
  background: var(--color-wu);
}

:deep(.route-marker.neutral) {
  background: var(--color-neutral);
}

:deep(.route-marker-number) {
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

:deep(.route-marker-label) {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  pointer-events: none;
}

/* 路线样式通过Leaflet的polyline选项设置 */
</style>
