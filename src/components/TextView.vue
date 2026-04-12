<template>
  <div class="text-container">
    <!-- 传记阅读页面（独立页面） -->
    <div v-if="currentPage === 'reading'" class="page-reading">
      <div class="page-header">
        <button class="back-btn" @click="goToHome">
          <span class="back-icon">←</span>
          <span class="back-text">主页</span>
        </button>
        <h2 v-if="currentContent">{{ currentContent.title }}</h2>
        
        <!-- 路线图按钮 -->
        <button class="route-btn" @click="toggleRoute" :class="{ active: showRoute }">
          <span>🗺️</span>
          <span>{{ showRoute ? '隐藏路线' : '显示路线' }}</span>
        </button>
      </div>
      
      <div class="reading-content" ref="contentRef">
        <div v-if="currentContent" class="biography">
          <div v-html="currentContent.text"></div>
        </div>
      </div>
    </div>
    
    <!-- 主页：选择器 + 搜索功能 -->
    <div v-if="currentPage === 'home'" class="page-home">
      <div class="header">
        <div class="title-container">
          <img src="/images/title.svg" alt="三國志地名志" class="title-image" />
          <!-- <div class="subtitle">Records of the Three Kingdoms Places</div> -->
        </div>
        
        <!-- 功能按钮组 -->
        <div class="header-buttons">
          <button class="menu-btn" @click="goToAbout" title="关于我们">
            <span>ℹ️</span>
            <span>关于</span>
          </button>
        </div>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-area">
        <div class="search-box-main">
          <input 
            type="text" 
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="搜索人物传记..."
            class="search-input-main"
            ref="searchInput"
          />
          <span class="search-icon-main">🔍</span>
          <button 
            v-if="searchQuery" 
            @click="clearSearch"
            class="clear-search-btn"
          >✕</button>
        </div>
        
        <!-- 搜索结果 -->
        <div v-if="searchResults.length > 0" class="search-results-main">
          <div class="results-count">找到 {{ searchResults.length }} 个结果</div>
          <div 
            v-for="result in searchResults" 
            :key="result.id"
            @click="selectSearchResult(result)"
            class="search-result-item"
          >
            <div class="result-name">{{ result.name }}</div>
            <div class="result-meta">
              <span class="result-book">{{ result.bookName }}</span>
              <span class="meta-sep">·</span>
              <span class="result-bio">{{ result.biographyTitle }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 选择器区域 -->
      <div class="selectors-area">
        <div class="section-title">或者通过分类选择：</div>
        
        <div class="selector-group">
          <label>选择书卷</label>
          <select v-model="selectedBook" @change="onBookChange">
            <option value="">请选择...</option>
            <option value="wei">魏书</option>
            <option value="shu">蜀书</option>
            <option value="wu">吴书</option>
          </select>
        </div>
        
        <div class="selector-group" v-if="selectedBook">
          <label>选择传记</label>
          <select v-model="selectedBiography" @change="onBiographyChange">
            <option value="">请选择...</option>
            <option v-for="bio in availableBiographies" :key="bio.id" :value="bio.id">
              {{ bio.title }}
            </option>
          </select>
        </div>
        
        <div class="selector-group" v-if="selectedBiography">
          <label>选择人物</label>
          <select v-model="selectedPerson" @change="onPersonChange">
            <option value="">请选择...</option>
            <option v-for="person in availablePersons" :key="person.id" :value="person.id">
              {{ person.name }}
            </option>
          </select>
        </div>
      </div>
      
    </div>
    
    <!-- 关于我们页面 -->
    <div v-if="currentPage === 'about'" class="page-about">
      <div class="page-header">
        <button class="back-btn" @click="goToHome">
          <span class="back-icon">←</span>
          <span class="back-text">主页</span>
        </button>
        <h2>关于</h2>
      </div>
      
      <div class="about-content-scroll">
        <!-- <h3>📖 项目介绍</h3> -->
        <p>我是史图记的第一位贡献者吴宏瑞，来自《三国志》作者陈寿的故乡——四川南充。希望史图记能够继承先辈遗志，发扬中华文化，提升所有人阅读中国历史经典原著的体验。</p>
        <p>这是史图记·三国志项目的<a href="https://github.com/Woomessi/Storiap" target="_blank" rel="noopener noreferrer">GitHub主页</a>，具体项目说明请访问该页面。</p>
        
        <!-- <h3>✨ 核心功能</h3>
        <ul>
          <li><strong>人物路线图</strong> - 根据时间顺序自动绘制历史人物的活动轨迹</li>
          <li><strong>智能搜索</strong> - 快速查找人物传记，支持模糊匹配</li>
          <li><strong>地名定位</strong> - 点击传记中的地名，地图自动跳转</li>
          <li><strong>可调整布局</strong> - 自由调整地图和文字区域的比例</li>
        </ul>
        
        <h3>🎯 项目目标</h3>
        <p>我们希望通过现代科技手段，让历史更加生动有趣。通过地图可视化、路线追踪等功能，帮助用户更好地理解三国时期的历史地理环境，增强对历史事件的空间感知。</p>
        
        <h3>📚 数据来源</h3>
        <p>传记内容基于《三国志》原文，地点坐标经过详细考证，力求准确反映历史地理位置。所有地图服务均符合国家地图审核标准。</p>
        
        <h3>🛠️ 技术栈</h3>
        <ul>
          <li><strong>前端框架</strong>：Vue 3 + Vite</li>
          <li><strong>地图引擎</strong>：Leaflet.js</li>
          <li><strong>地图服务</strong>：高德地图 / 天地图 / 智图GeoQ</li>
          <li><strong>样式</strong>：原生CSS，中国风设计</li>
        </ul>
        
        <h3>👥 开发团队</h3>
        <p>本项目由历史爱好者和技术开发者共同打造，持续更新中。我们欢迎更多志同道合的朋友加入，共同完善这个项目。</p>
        
        <h3>📮 联系我们</h3>
        <p>如有问题、建议或合作意向，欢迎通过以下方式联系：</p>
        <ul>
          <li><strong>问题反馈</strong>：使用页面右下角的反馈按钮</li>
          <li><strong>功能建议</strong>：提交到项目Issue页面</li>
          <li><strong>内容纠错</strong>：欢迎指出历史或地理错误</li>
        </ul>
        
        <h3>📄 版权声明</h3>
        <p>本项目仅供学习交流使用，传记内容来源于《三国志》等公开历史资料。地图数据来源于合法授权的地图服务提供商。</p>
        
        <h3>🙏 致谢</h3>
        <p>感谢所有历史学者的研究成果，感谢开源社区的技术支持，感谢每一位使用者的反馈和建议。</p> -->
        
        <!-- <div class="version-info">
          <p>当前版本：v1.7.0</p>
          <p>更新时间：2024年2月</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { places } from '../data/places.js'

const props = defineProps({
  biographyData: Object,
  textWidth: {
    type: Number,
    default: 40
  }
})

const emit = defineEmits(['place-click', 'person-selected', 'toggle-route', 'go-home'])

// 状态管理
const selectedBook = ref('')
const selectedBiography = ref('')
const selectedPerson = ref('')
const contentRef = ref(null)
const searchInput = ref(null)

// 页面状态：home=主页(选择+搜索), reading=阅读页, about=关于
const currentPage = ref('home')

// 搜索相关
const searchQuery = ref('')
const searchResults = ref([])

// 路线图开关
const showRoute = ref(false)

const factionNames = {
  wei: '魏',
  shu: '蜀',
  wu: '吴',
  neutral: '中立'
}

const bookNames = {
  wei: '魏书',
  shu: '蜀书',
  wu: '吴书'
}

// 页面导航
const goToHome = () => {
  currentPage.value = 'home'
  showRoute.value = false
  emit('toggle-route', false)
  emit('go-home')
}

const goToReading = () => {
  currentPage.value = 'reading'
}

const goToAbout = () => {
  currentPage.value = 'about'
}

// 路线图开关
const toggleRoute = () => {
  showRoute.value = !showRoute.value
  emit('toggle-route', showRoute.value)
}

// 计算属性
const availableBiographies = computed(() => {
  if (!selectedBook.value) return []
  return props.biographyData[selectedBook.value].biographies
})

const availablePersons = computed(() => {
  if (!selectedBiography.value) return []
  const bio = availableBiographies.value.find(b => b.id === selectedBiography.value)
  return bio ? bio.persons : []
})

const currentContent = computed(() => {
  if (!selectedPerson.value) return null
  const person = availablePersons.value.find(p => p.id === selectedPerson.value)
  return person ? person.content : null
})

// 搜索功能
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  
  searchResults.value = performSearch(searchQuery.value.trim())
}

const performSearch = (query) => {
  const results = []
  const lowerQuery = query.toLowerCase()
  
  Object.keys(props.biographyData).forEach(bookKey => {
    const book = props.biographyData[bookKey]
    
    book.biographies.forEach(biography => {
      biography.persons.forEach(person => {
        if (person.name.toLowerCase().includes(lowerQuery)) {
          results.push({
            id: `${bookKey}-${biography.id}-${person.id}`,
            name: person.name,
            bookKey: bookKey,
            bookName: bookNames[bookKey],
            biographyId: biography.id,
            biographyTitle: biography.title,
            personId: person.id,
            content: person.content
          })
        }
      })
    })
  })
  
  return results
}

const selectSearchResult = (result) => {
  selectedBook.value = result.bookKey
  
  nextTick(() => {
    selectedBiography.value = result.biographyId
    
    nextTick(() => {
      selectedPerson.value = result.personId
      
      // 跳转到阅读页面
      goToReading()
      
      // 发送人物选择事件
      emit('person-selected', {
        name: result.name,
        content: result.content
      })
      
      // 添加地名点击监听
      nextTick(() => {
        if (contentRef.value) {
          contentRef.value.addEventListener('click', handlePlaceClick)
        }
      })
    })
  })
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}

// 处理地名点击
const handlePlaceClick = (event) => {
  const target = event.target
  if (target.classList.contains('place-name')) {
    event.preventDefault()
    const placeName = target.dataset.place
    const year = target.dataset.year
    const faction = target.dataset.faction

    if (places[placeName]) {
      emit('place-click', {
        name: placeName,
        year,
        faction: faction || 'neutral',
        factionName: factionNames[faction] || '中立',
        modernName: places[placeName].modernName
      })
    }
  }
}

// 事件处理
const onBookChange = () => {
  selectedBiography.value = ''
  selectedPerson.value = ''
}

const onBiographyChange = () => {
  selectedPerson.value = ''
}

const onPersonChange = () => {
  if (!selectedPerson.value) return
  
  // 跳转到阅读页面
  goToReading()
  
  nextTick(() => {
    if (contentRef.value) {
      contentRef.value.addEventListener('click', handlePlaceClick)
    }
  })
  
  const person = availablePersons.value.find(p => p.id === selectedPerson.value)
  if (person) {
    emit('person-selected', {
      name: person.name,
      content: person.content
    })
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

:root {
  --color-wei: #4a5568;
  --color-shu: #c53030;
  --color-wu: #2c5282;
  --color-neutral: #a0aec0;
  --bg-paper: #f7f3e9;
  --bg-dark: #2d3748;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --border-color: #d4c5a9;
  --shadow: rgba(0, 0, 0, 0.1);
}

.text-container {
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-paper);
  position: relative;
  overflow: hidden;
}

/* 主页面 */
.page-home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 标题栏 */
.header {
  width: 100%;
  padding: 20px 28px;
  background: linear-gradient(135deg, var(--bg-dark) 0%, #1a202c 100%);
  color: white;
  border-bottom: 2px solid #d4af37;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-container {
  flex: 1;
  padding-right: 180px; /* 给右侧按钮留出空间 */
  min-width: 0; /* 允许收缩 */
}

.title-image {
  max-width: 100%;
  max-height: 80px;
  min-height: 80px;
  /* height: auto; */
  width: auto;
  display: block;
  margin-bottom: 1px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  object-fit: contain;
}

.header .subtitle {
  font-size: 13px;
  opacity: 0.85;
  letter-spacing: 1px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 功能按钮组 */
.header-buttons {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
}

.menu-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Noto Serif SC', serif;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.menu-btn.active {
  background: rgba(212, 175, 55, 0.3);
  border-color: #d4af37;
}

/* 主页搜索区域 */
.search-area {
  width: 100%;
  padding: 20px 28px;
  background: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.search-box-main {
  position: relative;
  margin-bottom: 16px;
}

.search-input-main {
  width: 100%;
  padding: 10px 50px 10px 14px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  background: white;
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.search-input-main:focus {
  outline: none;
  border-color: #8b7355;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
}

.search-icon-main {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  opacity: 0.5;
  pointer-events: none;
}

.clear-search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--text-secondary);
}

.clear-search-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.search-results-main {
  margin-top: 12px;
}

.results-count {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 10px;
  font-weight: 600;
}

.search-result-item {
  background: white;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-result-item:hover {
  border-color: #8b7355;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.result-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--bg-dark);
  margin-bottom: 4px;
}

.result-meta {
  font-size: 13px;
  color: var(--text-secondary);
}

.meta-sep {
  margin: 0 6px;
  opacity: 0.5;
}

/* 选择器区域 */
/* 选择器区域 */
.selectors-area {
  width: 100%;
  padding: 20px 28px;
  flex: 1;
  overflow-y: auto;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.selector-group {
  margin-bottom: 14px;
}

.selector-group:last-child {
  margin-bottom: 0;
}

.selector-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

/* 主页提示 */
.home-tips {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
}

.tip-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.tip-text {
  font-size: 14px;
  margin-bottom: 8px;
}

select {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  background: white;
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

select:hover {
  border-color: #a0826d;
}

select:focus {
  outline: none;
  border-color: #8b7355;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
}

/* 内容区域 */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
}

.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: rgba(212, 197, 169, 0.2);
}

.content::-webkit-scrollbar-thumb {
  background: rgba(139, 115, 85, 0.4);
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 115, 85, 0.6);
}

/* 传记内容 */
.biography {
  width: 100%;
}

.biography-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--bg-dark);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color);
  letter-spacing: 2px;
}

.biography :deep(p) {
  line-height: 2;
  margin-bottom: 16px;
  text-indent: 2em;
  font-size: 16px;
  color: var(--text-primary);
}

/* 地名样式 - 统一下划线 */
.biography :deep(.place-name) {
  color: var(--text-primary);
  text-decoration: underline;
  text-decoration-color: #8b7355;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.biography :deep(.place-name:hover) {
  color: #8b7355;
  text-decoration-color: #d4af37;
  text-decoration-thickness: 3px;
  background: rgba(212, 175, 55, 0.1);
}


/* 搜索页面 */
/* 搜索和关于页面 */
.page-search,
.page-about,
.page-reading {
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-paper);
}

/* 页面头部 */
.page-header {
  width: 100%;
  padding: 20px 28px;
  background: linear-gradient(135deg, var(--bg-dark) 0%, #1a202c 100%);
  color: white;
  border-bottom: 2px solid #d4af37;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.back-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.back-icon {
  font-size: 18px;
}

.page-header h2 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 阅读页路线按钮 */
.route-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: auto;
}

.route-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.route-btn.active {
  background: rgba(212, 175, 55, 0.3);
  border-color: #d4af37;
}

/* 搜索内容 */
/* 阅读页内容 */
.reading-content {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 30px 40px;
}

.reading-content::-webkit-scrollbar {
  width: 8px;
}

.reading-content::-webkit-scrollbar-track {
  background: rgba(212, 197, 169, 0.2);
}

.reading-content::-webkit-scrollbar-thumb {
  background: rgba(139, 115, 85, 0.4);
  border-radius: 4px;
}

/* 搜索页内容 */
.search-content {
  width: 100%;
  flex: 1;
  padding: 40px 28px;
  overflow-y: auto;
}

.search-box-large {
  position: relative;
  width: 100%;
  margin-bottom: 40px;
}

.search-input-large {
  width: 100%;
  padding: 16px 50px 16px 20px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Noto Serif SC', serif;
  font-size: 16px;
  color: var(--text-primary);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.search-input-large:focus {
  outline: none;
  border-color: #8b7355;
  box-shadow: 0 4px 16px rgba(139, 115, 85, 0.15);
}

.search-icon-large {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  opacity: 0.5;
}

.search-results-page {
  width: 100%;
}

.results-header {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.search-result-card {
  background: white;
  padding: 20px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-result-card:hover {
  border-color: #8b7355;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.result-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--bg-dark);
  margin-bottom: 8px;
}

.result-info {
  font-size: 14px;
  color: var(--text-secondary);
}

.result-separator {
  margin: 0 8px;
  opacity: 0.5;
}

.no-results {
  width: 100%;
  text-align: center;
  padding: 60px 20px;
}

.no-results-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.3;
}

.no-results-text {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.no-results-hint {
  font-size: 14px;
  color: var(--text-secondary);
}

.search-tips {
  width: 100%;
  margin: 40px 0;
  padding: 30px;
  background: white;
  border-radius: 10px;
  border: 2px solid var(--border-color);
}

.search-tips h3 {
  font-size: 18px;
  color: var(--bg-dark);
  margin-bottom: 16px;
}

.search-tips ul {
  list-style: none;
  padding: 0;
}

.search-tips li {
  padding: 10px 0;
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.6;
}

.search-tips li:before {
  content: "•";
  color: #d4af37;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

/* 关于页面 */
.about-content-scroll {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 40px 60px;
}

.about-content-scroll h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--bg-dark);
  margin-top: 32px;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.about-content-scroll h3:first-child {
  margin-top: 0;
}

.about-content-scroll p {
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 16px;
  line-height: 1.8;
  text-indent: 2em;
}

.about-content-scroll ul {
  margin-bottom: 20px;
  padding-left: 2em;
}

.about-content-scroll li {
  margin-bottom: 12px;
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.8;
}

.about-content-scroll li strong {
  color: var(--bg-dark);
  font-weight: 600;
}

.version-info {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px dashed var(--border-color);
  text-align: center;
}

.version-info p {
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  text-indent: 0;
}

/* 响应式：适配不同屏幕尺寸 */
@media (max-width: 768px) {
  .header {
    padding: 16px 20px;
  }
  
  .title-container {
    padding-right: 100px;
  }
  
  .title-image {
    max-height: 40px;
  }
  
  .header .subtitle {
    font-size: 11px;
  }
  
  .header-buttons {
    right: 15px;
  }
  
  .menu-btn {
    padding: 6px 10px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 12px 16px;
  }
  
  .title-container {
    padding-right: 80px;
  }
  
  .title-image {
    max-height: 32px;
  }
  
  .header .subtitle {
    font-size: 10px;
  }
}

/* 响应式：大屏幕优化 */
@media (min-width: 1600px) {
  .title-image {
    max-height: 60px;
  }
  
  .header .subtitle {
    font-size: 14px;
  }
}
</style>
