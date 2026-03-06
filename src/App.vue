<template>
  <div class="app-container" :class="{ portrait: isPortrait }">
    <MapView 
      :selected-place="selectedPlace"
      :map-width="isPortrait ? 100 : mapWidth"
      :map-height="isPortrait ? mapHeight : null"
      :selected-person="selectedPerson"
      :biography-content="biographyContent"
      :show-route="showRoute"
      @place-selected="handlePlaceSelected"
    />
    <div 
      class="resizer" 
      @mousedown="startResize"
      @touchstart.prevent="startResize"
    >
      <div class="resizer-line"></div>
    </div>
    <TextView
      :biography-data="biographyData"
      :text-width="isPortrait ? 100 : textWidth"
      :text-height="isPortrait ? textHeight : null"
      @place-click="handlePlaceClick"
      @person-selected="handlePersonSelected"
      @toggle-route="handleToggleRoute"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MapView from './components/MapView.vue'
import TextView from './components/TextView.vue'
import { biographyData } from './data/biographies.js'

const selectedPlace = ref(null)
const selectedPerson = ref('')
const biographyContent = ref(null)
const showRoute = ref(false)

// 横屏：左右分栏（百分比宽度）
const mapWidth = ref(60)
const textWidth = ref(40)

// 竖屏：上下分栏（百分比高度）
const mapHeight = ref(45)
const textHeight = ref(55)

// 是否竖屏
const isPortrait = ref(false)
const isResizing = ref(false)

// 检测竖屏
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
  selectedPerson.value = personInfo.name
  biographyContent.value = personInfo.content
}

const handleToggleRoute = (show) => {
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
    // 竖屏：按高度计算
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)
    if (!clientY) return
    const containerHeight = window.innerHeight
    const newMapHeight = (clientY / containerHeight) * 100
    // 地图最小20%，文字区最小25%
    if (newMapHeight >= 20 && newMapHeight <= 75) {
      mapHeight.value = newMapHeight
      textHeight.value = 100 - newMapHeight
    }
  } else {
    // 横屏：按宽度计算
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    if (!clientX) return
    const containerWidth = window.innerWidth
    const newMapWidth = (clientX / containerWidth) * 100
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
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize, { passive: false })
  document.addEventListener('touchend', stopResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
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

/* ── 拖动条：横屏（竖线） ── */
.resizer {
  width: 6px;
  height: 100%;
  background: var(--border-color);
  cursor: col-resize;
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resizer-line {
  width: 2px;
  height: 60px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  pointer-events: none;
  transition: all 0.2s ease;
}

.resizer:hover {
  background: #a0826d;
  box-shadow: 0 0 10px rgba(160, 130, 109, 0.3);
}

.resizer:active {
  background: #8b7355;
  box-shadow: 0 0 15px rgba(139, 115, 85, 0.5);
}

.resizer:hover .resizer-line {
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
}

.resizer:active .resizer-line {
  height: 100px;
  background: rgba(255, 255, 255, 1);
}

/* 扩大横屏拖动区域 */
.resizer::before,
.resizer::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 100%;
  top: 0;
  pointer-events: all;
}
.resizer::before { left: -10px; }
.resizer::after  { right: -10px; }

/* ── 拖动条：竖屏（横线） ── */
.portrait .resizer {
  width: 100%;
  height: 6px;
  cursor: row-resize;
  flex-direction: row;
  box-shadow: none;
}

.portrait .resizer-line {
  width: 60px;
  height: 2px;
}

.portrait .resizer:hover .resizer-line {
  width: 80px;
  height: 2px;
}

.portrait .resizer:active .resizer-line {
  width: 100px;
  height: 2px;
}

/* 扩大竖屏拖动区域 */
.portrait .resizer::before,
.portrait .resizer::after {
  width: 100%;
  height: 20px;
  left: 0;
}
.portrait .resizer::before { top: -10px; }
.portrait .resizer::after  { bottom: -10px; top: auto; }

/* 移动端加宽拖动条 */
@media (max-width: 768px) {
  .resizer {
    width: 10px;
  }
  .portrait .resizer {
    width: 100%;
    height: 10px;
  }
}
</style>
