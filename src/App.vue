<template>
  <div class="app-container" :class="{ portrait: isPortrait }">
    <div
      class="map-panel"
      :style="isPortrait ? { height: mapHeight + '%' } : { width: mapWidth + '%' }"
    >
      <MapView
        :selected-place="selectedPlace"
        :map-width="mapWidth"
        :selected-person="selectedPerson"
        :biography-content="biographyContent"
        :show-route="showRoute"
        @place-selected="handlePlaceSelected"
      />
    </div>
    <div
      class="resizer"
      @mousedown="startResize"
      @touchstart="startResize"
    >
      <div class="resizer-line"></div>
    </div>
    <div
      class="text-panel"
      :style="isPortrait ? { height: textHeight + '%' } : { width: textWidth + '%' }"
    >
      <TextView
        :biography-data="biographyData"
        :text-width="textWidth"
        @place-click="handlePlaceClick"
        @person-selected="handlePersonSelected"
        @toggle-route="handleToggleRoute"
        @go-home="selectedPlace = null"
      />
    </div>
  </div>
  <VisitorStats />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MapView from './components/MapView.vue'
import TextView from './components/TextView.vue'
import VisitorStats from './components/VisitorStats.vue'
import { biographyData } from './data/biographies.js'

const selectedPlace = ref(null)
const selectedPerson = ref('')
const biographyContent = ref(null)
const showRoute = ref(false)

// 横屏宽度控制（百分比）
const mapWidth = ref(60)
const textWidth = ref(40)

// 竖屏高度控制（百分比）
const mapHeight = ref(55)
const textHeight = ref(45)

const isResizing = ref(false)
const isPortrait = ref(window.innerHeight > window.innerWidth)

const checkOrientation = () => {
  isPortrait.value = window.innerHeight > window.innerWidth
}

const handlePlaceClick = (placeInfo) => {
  selectedPlace.value = placeInfo
}

const handlePlaceSelected = (placeInfo) => {
  selectedPlace.value = placeInfo
}

const handlePersonSelected = (personInfo) => {
  selectedPlace.value = null
  selectedPerson.value = personInfo.name
  biographyContent.value = personInfo.content
}

const handleToggleRoute = (show) => {
  selectedPlace.value = null
  showRoute.value = show
}

// 开始拖动
const startResize = (e) => {
  isResizing.value = true
  e.preventDefault()
  document.body.style.cursor = isPortrait.value ? 'row-resize' : 'col-resize'
  document.body.style.userSelect = 'none'
}

// 拖动中
const handleResize = (e) => {
  if (!isResizing.value) return

  if (isPortrait.value) {
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)
    if (!clientY) return

    const containerHeight = window.innerHeight
    // 地图在上方，拖动条 Y 坐标即地图底边
    const newMapHeight = (clientY / containerHeight) * 100

    // 地图最小 30%，文字框最小 25%
    if (newMapHeight >= 30 && newMapHeight <= 75) {
      mapHeight.value = newMapHeight
      textHeight.value = 100 - newMapHeight
    }
  } else {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    if (!clientX) return

    const containerWidth = window.innerWidth
    const newMapWidth = (clientX / containerWidth) * 100

    // 文字框最小宽度 400px 或 20%，取较大值
    const minTextWidthPx = 400
    const minTextWidthPercent = (minTextWidthPx / containerWidth) * 100
    const minTextWidth = Math.max(20, minTextWidthPercent)
    const maxMapWidth = 100 - minTextWidth

    if (newMapWidth >= 30 && newMapWidth <= maxMapWidth) {
      mapWidth.value = newMapWidth
      textWidth.value = 100 - newMapWidth
    }
  }
}

// 结束拖动
const stopResize = () => {
  if (isResizing.value) {
    isResizing.value = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize)
  document.addEventListener('touchend', stopResize)
  window.addEventListener('resize', checkOrientation)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
  window.removeEventListener('resize', checkOrientation)
})
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
}

/* 竖屏：上下布局 */
.app-container.portrait {
  flex-direction: column;
}

/* 面板通用 */
.map-panel,
.text-panel {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

/* 横屏：面板高度撑满 */
.app-container:not(.portrait) .map-panel,
.app-container:not(.portrait) .text-panel {
  height: 100%;
}

/* 竖屏：面板宽度撑满 */
.app-container.portrait .map-panel,
.app-container.portrait .text-panel {
  width: 100%;
}

/* 竖屏：文字框在上，地图在下 */
.app-container.portrait .text-panel {
  order: 1;
}
.app-container.portrait .resizer {
  order: 2;
}
.app-container.portrait .map-panel {
  order: 3;
}

/* 拖动条 */
.resizer {
  background: var(--border-color);
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-container:not(.portrait) .resizer {
  width: 6px;
  height: 100%;
  cursor: col-resize;
}

.app-container.portrait .resizer {
  width: 100%;
  height: 8px;
  cursor: row-resize;
}

.resizer:hover {
  background: #a0826d;
  box-shadow: 0 0 10px rgba(160, 130, 109, 0.3);
}

.resizer:active {
  background: #8b7355;
  box-shadow: 0 0 15px rgba(139, 115, 85, 0.5);
}

/* 拖动条指示线 */
.resizer-line {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  pointer-events: none;
  transition: all 0.2s ease;
}

.app-container:not(.portrait) .resizer-line {
  width: 2px;
  height: 60px;
}

.app-container.portrait .resizer-line {
  width: 60px;
  height: 2px;
}

.resizer:hover .resizer-line {
  background: rgba(255, 255, 255, 0.8);
}

.app-container:not(.portrait) .resizer:hover .resizer-line {
  height: 80px;
}

.app-container.portrait .resizer:hover .resizer-line {
  width: 80px;
}

.resizer:active .resizer-line {
  background: rgba(255, 255, 255, 1);
}

.app-container:not(.portrait) .resizer:active .resizer-line {
  height: 100px;
}

.app-container.portrait .resizer:active .resizer-line {
  width: 100px;
}

/* 扩大点击区域 */
.resizer::before,
.resizer::after {
  content: '';
  position: absolute;
  pointer-events: all;
}

.app-container:not(.portrait) .resizer::before,
.app-container:not(.portrait) .resizer::after {
  width: 20px;
  height: 100%;
  top: 0;
}

.app-container:not(.portrait) .resizer::before {
  left: -10px;
}

.app-container:not(.portrait) .resizer::after {
  right: -10px;
}

.app-container.portrait .resizer::before,
.app-container.portrait .resizer::after {
  width: 100%;
  height: 20px;
  left: 0;
}

.app-container.portrait .resizer::before {
  top: -10px;
}

.app-container.portrait .resizer::after {
  bottom: -10px;
}

/* 拖动时的全局样式 */
body.resizing {
  cursor: col-resize !important;
  user-select: none !important;
}

/* 移动端：加宽拖动条 */
@media (max-width: 768px) {
  .app-container:not(.portrait) .resizer {
    width: 10px;
  }
}
</style>
