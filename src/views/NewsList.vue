<template>
  <div class="min-h-screen bg-[#F4F6F5] py-8 md:py-12 px-4 md:px-8 font-sans antialiased animate-fade-in">
    <div class="max-w-7xl mx-auto">
      
      <!-- Bredcrumbs -->
      <div class="flex items-center gap-2 text-xs md:text-sm text-slate-400 font-bold mb-6">
        <router-link to="/" class="hover:text-emerald-700 transition-colors">首页</router-link>
        <span class="text-slate-300">/</span>
        <span class="text-slate-600 text-[13px]">更多资讯</span>
      </div>

      <!-- Main Banner Heading / Introduction -->
      <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 py-10 px-6 md:px-10 rounded-2xl text-white mb-10 shadow-lg relative overflow-hidden">
        <!-- Subtle backlighting flare -->
        <div class="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="relative z-10 max-w-3xl">
          <span class="inline-flex items-center gap-1.5 bg-emerald-800/60 text-emerald-300 border border-emerald-700/50 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase mb-3">
            <i class="fa-solid fa-file-shield text-[10px]"></i>
            <span>LSEG INFORMATION MATRIX</span>
          </span>
          <h1 class="text-2xl md:text-4xl font-black mb-3 tracking-tight">大宗保险及对冲备免公告中心</h1>
          <p class="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
            实时汇编由伦敦证券交易所集团核保结算部、托管信托委员会、多链智能合约联合实验室及跨国绿色实体审计部门会签发布的最新大宗储备调增、财务合规审计、溢价清算发放及生态对冲资讯。由英国大宗托付机制刚性保障披露。
          </p>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-white rounded-xl p-4 md:p-6 shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border border-slate-100">
        <!-- Tab Categories -->
        <div class="flex items-center gap-1.5 overflow-x-auto scroller-hidden pb-1 lg:pb-0">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeCategory = cat"
            class="whitespace-nowrap px-4 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all duration-200 select-none"
            :class="activeCategory === cat 
              ? 'bg-[#0B9A47] text-white shadow-sm' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900'"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search input -->
        <div class="relative w-full lg:w-80">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <i class="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
          </span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="搜索公告标题或核心披露内容..."
            class="w-full text-xs md:text-sm pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0B9A47] transition-colors font-medium bg-slate-50/50"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <i class="fa-solid fa-circle-xmark text-xs"></i>
          </button>
        </div>
      </div>

      <!-- List Count Indicator -->
      <div class="text-slate-400 text-xs font-bold mb-5 flex items-center justify-between px-1">
        <span>核定匹配结果: {{ filteredNews.length }} 条公告</span>
        <span class="text-slate-300 font-normal">托管节点上链链上证明：UK-LSEG-SECURED</span>
      </div>

      <!-- Grid of News Cards -->
      <div v-if="filteredNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link 
          v-for="news in filteredNews" 
          :key="news.id" 
          :to="`/news/${news.id}`"
          class="card bg-white rounded-xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 ease-out flex flex-col md:flex-row justify-between gap-5 cursor-pointer text-decoration-none group hover:translate-y-[-3px]"
        >
          <!-- Text Core -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <!-- Group metadata line -->
              <div class="flex items-center gap-2 mb-2.5 flex-wrap">
                <span class="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100/50 uppercase leading-none">
                  {{ news.category }}
                </span>
                <span class="text-[11px] text-slate-400 font-bold font-mono">{{ news.time }}</span>
                <span class="text-[11px] text-slate-300">•</span>
                <span class="text-[11px] text-slate-400 font-semibold">{{ news.author }}</span>
              </div>
              
              <!-- Custom Interactive Title -->
              <h3 class="text-[15px] md:text-lg font-black text-slate-800 group-hover:text-[#0B9A47] transition-colors leading-snug tracking-tight mb-2">
                {{ news.title }}
              </h3>
              
              <!-- Abstract summary block -->
              <p class="text-slate-400 text-xs md:text-[13px] line-clamp-2 md:line-clamp-3 leading-relaxed mb-4 font-medium">
                {{ news.summary }}
              </p>
            </div>

            <!-- Stats detail indicators -->
            <div class="flex items-center gap-4 text-slate-400 text-xs font-bold font-mono">
              <span class="flex items-center gap-1">
                <i class="fa-regular fa-eye text-[11px] text-slate-300"></i>
                <span>{{ news.views }} 阅览</span>
              </span>
              <span class="flex items-center gap-1 text-emerald-600 font-extrabold">
                <span>阅读全文</span>
                <i class="fa-solid fa-arrow-right text-[10px] translate-x-0 group-hover:translate-x-1.5 transition-transform"></i>
              </span>
            </div>
          </div>

          <!-- Highlight Thumbnail -->
          <div class="w-full md:w-36 h-36 md:h-32 shrink-0 rounded-lg overflow-hidden relative shadow-inner bg-slate-100">
            <img 
              :src="news.img" 
              class="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105" 
              :alt="news.title" 
              referrerPolicy="no-referrer"
            />
          </div>
        </router-link>
      </div>

      <!-- No Match View -->
      <div v-else class="bg-white rounded-xl py-16 px-4 text-center border border-slate-100 card shadow-sm">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
          <i class="fa-regular fa-folder-open text-2xl"></i>
        </div>
        <h3 class="text-base font-bold text-slate-700 mb-1">未匹配到相关披露公告</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium mb-4">您可以尝试换个关键字或在上方筛选不同的公告分类进行多维度查询。</p>
        <button @click="resetFilters" class="px-5 py-2 bg-[#0B9A47] text-white rounded-lg text-xs font-extrabold hover:bg-emerald-800 transition-colors">
          重置查询
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '../store';

const activeCategory = ref('全部');
const searchQuery = ref('');

const categories = [
  '全部',
  '官方公告',
  '行业信托',
  '技术更新',
  '风险合规',
  '财务审计',
  '收益分配'
];

const filteredNews = computed(() => {
  let list = store.news || [];

  // Category filter
  if (activeCategory.value !== '全部') {
    list = list.filter(item => item.category === activeCategory.value);
  }

  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.summary.toLowerCase().includes(q) ||
      (item.content && item.content.toLowerCase().includes(q))
    );
  }

  return list;
});

const resetFilters = () => {
  activeCategory.value = '全部';
  searchQuery.value = '';
};
</script>

<style scoped>
.scroller-hidden::-webkit-scrollbar {
  display: none;
}
.scroller-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
