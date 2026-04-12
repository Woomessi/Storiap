<template>
  <div class="visitor-stats" :class="{ expanded: isExpanded, collapsed: !isExpanded }">
    <!-- 折叠/展开按钮 -->
    <button class="toggle-btn" @click="isExpanded = !isExpanded" :title="isExpanded ? '收起' : '展开统计'">
      <span class="toggle-icon">{{ isExpanded ? '▼' : '▲' }}</span>
    </button>

    <div class="stats-content" v-show="isExpanded">
      <div class="stats-header">
        <span class="header-ornament">◆</span>
        <span class="header-title">来访记录</span>
        <span class="header-ornament">◆</span>
      </div>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-icon">👁</span>
          <div class="stat-text">
            <span class="stat-label">浏览次数</span>
            <span class="stat-value" id="busuanzi_value_site_pv">
              <span class="loading-dots">···</span>
            </span>
          </div>
        </div>
        <div class="stat-divider">|</div>
        <div class="stat-item">
          <span class="stat-icon">🧑</span>
          <div class="stat-text">
            <span class="stat-label">访客人数</span>
            <span class="stat-value" id="busuanzi_value_site_uv">
              <span class="loading-dots">···</span>
            </span>
          </div>
        </div>
        <div class="stat-divider">|</div>
        <div class="stat-item">
          <span class="stat-icon">📍</span>
          <div class="stat-text">
            <span class="stat-label">当前来自</span>
            <span class="stat-value location-value">{{ locationDisplay }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 折叠态：仅显示小图标 -->
    <div class="collapsed-hint" v-show="!isExpanded">
      <span>📊</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isExpanded = ref(true)
const locationDisplay = ref('获取中…')

const loadBusuanzi = () => {
  return new Promise((resolve) => {
    if (document.getElementById('busuanzi-script')) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = 'busuanzi-script'
    script.async = true
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    script.onload = resolve
    script.onerror = resolve
    document.head.appendChild(script)
  })
}

const fetchLocation = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    const country = data.country_name || ''
    const region = data.region || ''
    const city = data.city || ''
    // 中国显示省市，其他国家显示国家
    if (data.country_code === 'CN') {
      locationDisplay.value = city ? `${region} ${city}`.trim() : region || country || '未知'
    } else {
      locationDisplay.value = country || '未知'
    }
  } catch {
    locationDisplay.value = '未知地区'
  }
}

onMounted(() => {
  loadBusuanzi()
  fetchLocation()
})
</script>

<style scoped>
.visitor-stats {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(247, 243, 233, 0.92);
  border: 1px solid var(--border-color, #d4c5a9);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
  font-family: 'Noto Serif SC', serif;
  transition: all 0.3s ease;
  min-width: 80px;
}

.visitor-stats.expanded {
  min-width: 360px;
}

/* 折叠/展开按钮 */
.toggle-btn {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(247, 243, 233, 0.95);
  border: 1px solid var(--border-color, #d4c5a9);
  border-radius: 6px 6px 0 0;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 10px;
  color: #8b7355;
  line-height: 1.4;
  transition: background 0.2s;
  white-space: nowrap;
}

.toggle-btn:hover {
  background: #ede8db;
  color: #6b5530;
}

.toggle-icon {
  display: inline-block;
}

/* 展开内容 */
.stats-content {
  padding: 6px 14px 8px;
}

.stats-header {
  text-align: center;
  font-size: 11px;
  color: #a08060;
  letter-spacing: 3px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.header-ornament {
  font-size: 7px;
  opacity: 0.6;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
  justify-content: center;
}

.stat-icon {
  font-size: 13px;
  opacity: 0.75;
}

.stat-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.3;
}

.stat-label {
  font-size: 10px;
  color: #a08060;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 13px;
  color: #5a3e28;
  font-weight: 600;
  letter-spacing: 0.5px;
  min-width: 30px;
}

.location-value {
  font-size: 12px;
  font-weight: 500;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat-divider {
  color: var(--border-color, #d4c5a9);
  font-size: 18px;
  opacity: 0.5;
  flex-shrink: 0;
}

/* 折叠态 */
.collapsed-hint {
  padding: 4px 10px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

/* 加载动画 */
.loading-dots {
  font-size: 12px;
  color: #bbb;
  letter-spacing: 2px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .visitor-stats.expanded {
    min-width: 300px;
  }

  .stat-label {
    font-size: 9px;
  }

  .stat-value {
    font-size: 12px;
  }
}
</style>
