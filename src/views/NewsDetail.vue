<template>
  <div class="min-h-screen bg-[#F4F6F5] py-8 md:py-12 px-4 md:px-8 font-sans antialiased animate-fade-in">
    <div class="max-w-7xl mx-auto" v-if="newsItem">
      
      <!-- Breadcrumbs -->
      <div class="flex items-center gap-2 text-xs md:text-sm text-slate-400 font-bold mb-6">
        <router-link to="/" class="hover:text-emerald-700 transition-colors">首页</router-link>
        <span class="text-slate-300">/</span>
        <router-link to="/news" class="hover:text-emerald-700 transition-colors">资讯中心</router-link>
        <span class="text-slate-300">/</span>
        <span class="text-slate-600 truncate max-w-[200px] md:max-w-xs block text-[13px]">{{ newsItem.title }}</span>
      </div>

      <!-- Detail Page Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- ==================== LEFT COLUMN: MAIN ARTICLE ==================== -->
        <article class="lg:col-span-8 bg-white rounded-[8px] p-6 md:p-10 shadow-sm border border-slate-100/80">
          
          <!-- Category & Metadata Header -->
          <div class="flex items-center gap-3 mb-4 flex-wrap">
            <span class="text-xs font-black px-2.5 py-1 rounded bg-[#E6F4EA] text-[#1B5831] uppercase leading-none border border-emerald-200/50">
              {{ newsItem.category }}
            </span>
            <span class="text-slate-300">|</span>
            <span class="text-xs md:text-sm text-slate-400 font-bold">由英国大宗托付机制保障披露</span>
          </div>

          <!-- Header Title -->
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            {{ newsItem.title }}
          </h1>

          <!-- Publisher Profiles / Secondary Metadata -->
          <div class="flex items-center justify-between border-y border-slate-100 py-4 mb-8 flex-wrap gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-sm uppercase select-none shadow-xs">
                {{ newsItem.author.substring(0, 1) }}
              </div>
              <div>
                <div class="text-sm font-extrabold text-slate-800 leading-none mb-1">{{ newsItem.author }}</div>
                <div class="text-[11px] text-slate-400 font-bold">LSEG OFFICIAL PUBLISHER</div>
              </div>
            </div>
            
            <div class="flex items-center gap-6 text-slate-400 text-xs font-bold font-mono">
              <span class="flex items-center gap-1.5">
                <i class="fa-regular fa-calendar-check text-slate-300 text-sm"></i>
                <span>{{ newsItem.time }}</span>
              </span>
              <span class="flex items-center gap-1.5">
                <i class="fa-regular fa-eye text-slate-300 text-sm"></i>
                <span>{{ newsItem.views }} 阅览</span>
              </span>
            </div>
          </div>

          <!-- Hero Banner Image -->
          <div class="w-full h-48 md:h-80 rounded-xl overflow-hidden mb-8 shadow-sm">
            <img 
              :src="newsItem.bannerImg" 
              class="w-full h-full object-cover" 
              :alt="newsItem.title" 
              referrerPolicy="no-referrer"
            />
          </div>

          <!-- Abstract Callout Box -->
          <div class="bg-gradient-to-r from-emerald-50/50 to-slate-50/20 border-l-4 border-[#0B9A47] rounded-r-xl p-5 mb-8 relative">
            <span class="absolute top-2 right-4 text-emerald-100 font-serif text-5xl select-none leading-none pointer-events-none">“</span>
            <div class="text-[#1B5831] text-[11px] font-black tracking-wider uppercase mb-1.5">披露纪要 / EXECUTIVE SUMMARY</div>
            <p class="text-slate-600 text-xs md:text-sm font-medium leading-relaxed relative z-10 m-0">
              {{ newsItem.summary }}
            </p>
          </div>

          <!-- Main Text Area (Rendered dynamically) -->
          <div class="article-content text-slate-700 font-medium text-sm md:text-base leading-relaxed mb-10" v-html="newsItem.content"></div>

          <!-- Official Disclamers Box -->
          <div class="bg-slate-50 rounded-xl p-5 border border-slate-100/80 mb-8">
            <div class="flex items-start gap-3">
              <i class="fa-solid fa-cloud-shield text-slate-400 text-xl mt-0.5"></i>
              <div>
                <h4 class="text-xs font-black text-slate-700 uppercase tracking-wide mb-1">官方信托披露免责说明书</h4>
                <p class="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed m-0">
                  本公告内容经伦敦证券交易所集团核保结算部（LSEG Insurance Auditing）及伦敦清算行（UK Clearing House）会签审计登记。发布的所有限额度、补偿结算系数、溢价资金发放政策具有在册备付保本刚性法律履约效力。投资者可通过“资产中心”查询智能合约账本哈希证明。
                </p>
              </div>
            </div>
          </div>

          <!-- Nav tools -->
          <div class="flex justify-between items-center border-t border-slate-100 pt-6">
            <router-link to="/news" class="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-[#0B9A47] hover:text-emerald-800 transition-colors">
              <i class="fa-solid fa-arrow-left"></i>
              <span>返回资讯中心</span>
            </router-link>
            
            <button 
              @click="shareArticle" 
              class="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 rounded-lg text-xs font-extrabold"
            >
              <i class="fa-regular fa-share-from-square"></i>
              <span>一键存卷分享</span>
            </button>
          </div>

        </article>

        <!-- ==================== RIGHT COLUMN: SIDEBAR ==================== -->
        <aside class="lg:col-span-4 space-y-8">
          


          <!-- Other/Recent News announcements -->
          <div class="bg-white rounded-[8px] p-6 shadow-sm border border-slate-100/80">
            <h3 style="font-size: 16px; font-weight: 900; color: var(--text-primary); border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin: 0 0 24px 0;">
              最新发布公告
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <router-link 
                v-for="item in recentNews" 
                :key="item.id" 
                :to="`/news/${item.id}`"
                class="flex gap-4 text-slate-600 hover:text-slate-950 no-underline group block"
                style="display: flex; text-decoration: none;"
              >
                <!-- Image mini -->
                <div class="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-50 relative">
                  <img :src="item.img" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
                </div>
                
                <!-- Text mini -->
                <div class="flex flex-col justify-between">
                  <div>
                    <h4 class="text-xs font-extrabold text-slate-800 group-hover:text-[#0B9A47] line-clamp-2 leading-snug tracking-tight m-0 transition-colors">
                      {{ item.title }}
                    </h4>
                  </div>
                  <span class="text-[10px] text-slate-400 font-bold font-mono block mt-1">
                    {{ item.time }}
                  </span>
                </div>
              </router-link>
            </div>
          </div>

        </aside>

      </div>
    </div>

    <!-- News item not found placeholder -->
    <div v-else class="max-w-md mx-auto bg-white rounded-xl py-12 px-6 text-center shadow-xs border border-slate-100 animate-fade-in mt-16">
      <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
        <i class="fa-solid fa-triangle-exclamation text-2xl"></i>
      </div>
      <h3 class="text-base font-bold text-slate-800 mb-1">公告资讯未找到</h3>
      <p class="text-xs text-slate-400 leading-relaxed font-semibold mb-6">您所访问的披露公告不存在、已下架、或已移入更安全的离岸冷归档账册。</p>
      <router-link to="/news" class="inline-block px-5 py-2.5 bg-[#0B9A47] text-white rounded-lg text-xs font-extrabold hover:bg-emerald-800 transition-colors no-underline">
        返回资讯中心
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '../store';

const route = useRoute();

const currentId = computed(() => {
  return route.params.id;
});

const newsItem = computed(() => {
  if (!store.news) return null;
  return store.news.find(item => item.id === String(currentId.value));
});

// Returns up to 3 other news articles
const recentNews = computed(() => {
  if (!store.news) return [];
  return store.news.filter(item => item.id !== String(currentId.value)).slice(0, 4);
});

const shareArticle = () => {
  if (!newsItem.value) return;
  navigator.clipboard.writeText(window.location.href);
  store.triggerToast(`凭证分享账册哈希成功！已复制公告链接至剪贴板，快分享给您的交易见证人吧！`);
};
</script>

<style scoped>
/* Article Content Custom Styling inside scoped compiled blocks */
.article-content :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}
.article-content :deep(strong) {
  color: #1e293b;
}
</style>
