<template>
  <div class="app-container">
    <MapView 
      :selected-place="selectedPlace"
      :map-width="mapWidth"
      :selected-person="selectedPerson"
      :biography-content="biographyContent"
      :show-route="showRoute"
      @place-selected="handlePlaceSelected"
    />
    <div 
      class="resizer" 
      @mousedown="startResize"
      @touchstart="startResize"
    >
      <div class="resizer-line"></div>
    </div>
    <TextView
      :biography-data="biographyData"
      :text-width="textWidth"
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

// 宽度控制
const mapWidth = ref(60) // 百分比
const textWidth = ref(40) // 百分比
const isResizing = ref(false)

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
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

// 拖动中
const handleResize = (e) => {
  if (!isResizing.value) return
  
  const clientX = e.clientX || (e.touches && e.touches[0].clientX)
  if (!clientX) return
  
  const containerWidth = window.innerWidth
  const newMapWidth = (clientX / containerWidth) * 100
  
  // 计算文字框最小宽度（400px或20%，取较大值）
  const minTextWidthPx = 400
  const minTextWidthPercent = (minTextWidthPx / containerWidth) * 100
  const minTextWidth = Math.max(20, minTextWidthPercent)
  
  // 限制范围：地图最小30%，文字框最少400px
  const maxMapWidth = 100 - minTextWidth
  
  if (newMapWidth >= 30 && newMapWidth <= maxMapWidth) {
    mapWidth.value = newMapWidth
    textWidth.value = 100 - newMapWidth
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
})

onUnmounted(() => {
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

.resizer {
  width: 6px;
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

.resizer:hover {
  background: #a0826d;
  box-shadow: 0 0 10px rgba(160, 130, 109, 0.3);
}

.resizer:active {
  background: #8b7355;
  box-shadow: 0 0 15px rgba(139, 115, 85, 0.5);
}

.resizer-line {
  width: 2px;
  height: 60px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  pointer-events: none;
  transition: height 0.2s ease, background 0.2s ease;
}

.resizer:hover .resizer-line {
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
}

.resizer:active .resizer-line {
  height: 100px;
  background: rgba(255, 255, 255, 1);
}

/* 扩大点击区域 */
.resizer::before,
.resizer::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 100%;
  top: 0;
  pointer-events: all;
}

.resizer::before {
  left: -10px;
}

.resizer::after {
  right: -10px;
}

/* 拖动时的全局样式 */
body.resizing {
  cursor: col-resize !important;
  user-select: none !important;
}

/* 响应式：移动端 */
@media (max-width: 768px) {
  .resizer {
    width: 10px;
  }
  
  .resizer::before,
  .resizer::after {
    width: 30px;
  }
  
  .resizer::before {
    left: -15px;
  }
  
  .resizer::after {
    right: -15px;
  }
}
</style>
