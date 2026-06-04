<template>
  <div class="views-markets-container bg-[#F4F6F5] pb-6 md:pb-10 font-sans antialiased text-slate-700">
    
    <!-- ==================== HERO GREEN BOARD HEADER ==================== -->
    <header class="bg-[#1B5831] pt-6 pb-0 relative overflow-hidden shadow-md">
      <!-- Ambient light decorations inside the cards -->
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/4 -bottom-20 w-96 h-96 bg-[#5BE395]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <!-- Title and Stats indicators -->
        <div>
          <h1 class="text-2xl md:text-[32px] font-extrabold text-white tracking-tight leading-tight">市场行情</h1>
          <p class="text-[12.5px] text-emerald-100/70 font-medium mt-1 tracking-wide">
            全球数字资产实时行情 · 18 个交易对
          </p>
        </div>

        <!-- Highlighting Stats boxes -->
        <div class="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs">
          <!-- 24h Gainer -->
          <div class="flex flex-col">
            <span class="text-[10px] text-emerald-200/55 uppercase font-semibold tracking-wider">24h 涨幅最大</span>
            <span class="text-[13px] md:text-sm font-bold text-[#5BE395] font-mono mt-1 flex items-center gap-1">
              {{ maxGainer.code }} <span class="bg-[#5BE395]/15 px-1 py-0.5 rounded text-[10px] font-extrabold">+{{ maxGainer.change.toFixed(2) }}%</span>
            </span>
          </div>

          <!-- 24h Loser -->
          <div class="flex flex-col border-l border-white/10 pl-6 md:pl-8">
            <span class="text-[10px] text-emerald-200/55 uppercase font-semibold tracking-wider">24h 跌幅最大</span>
            <span class="text-[13px] md:text-sm font-bold text-rose-300 font-mono mt-1 flex items-center gap-1">
              {{ maxLoser.code }} <span class="bg-rose-500/15 px-1 py-0.5 rounded text-[10px] font-extrabold">{{ maxLoser.change.toFixed(2) }}%</span>
            </span>
          </div>

          <!-- Total Valuation -->
          <div class="flex flex-col border-l border-white/10 pl-6 md:pl-8">
            <span class="text-[10px] text-emerald-200/55 uppercase font-semibold tracking-wider">总市值</span>
            <span class="text-[13px] md:text-sm font-extrabold text-white font-mono mt-1">
              $1.92T
            </span>
          </div>
        </div>
      </div>

      <!-- Overlapping Floating Menu: Self selection / Market selector -->
      <div class="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div class="flex items-center gap-6 border-t border-white/15 pt-2 pb-0 select-none">
          <button 
            @click="activeMainTab = 'FAVORITE'" 
            class="pt-1.5 pb-3.5 text-[14px] md:text-[15px] font-bold tracking-wide transition-all relative cursor-pointer focus:outline-none"
            :class="activeMainTab === 'FAVORITE' ? 'text-white font-extrabold' : 'text-[#A8D3B9]/80 hover:text-white'"
          >
            自选
            <span v-if="activeMainTab === 'FAVORITE'" class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5BE395] rounded-full"></span>
          </button>

          <button 
            @click="activeMainTab = 'MARKET'" 
            class="pt-1.5 pb-3.5 text-[14px] md:text-[15px] font-bold tracking-wide transition-all relative cursor-pointer focus:outline-none"
            :class="activeMainTab === 'MARKET' ? 'text-white font-extrabold' : 'text-[#A8D3B9]/80 hover:text-white'"
          >
            市场
            <span v-if="activeMainTab === 'MARKET'" class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5BE395] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>

    <!-- ==================== SEARCH & FILTERS CONTROLS ==================== -->
    <main class="max-w-7xl mx-auto px-4 md:px-8 mt-4 relative z-20">
      
      <div class="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-5">
        <!-- Elegant Rounded Search Bar -->
        <div class="flex-1 max-w-md relative">
          <div class="flex items-center bg-white border border-slate-200 rounded-lg px-3.5 py-1.5 hover:border-slate-350 focus-within:ring-2 focus-within:ring-[#1B5831]/10 focus-within:border-[#1B5831] transition-all bg-white shadow-3xs text-[13.5px]">
            <svg class="w-4 h-4 text-slate-400 mr-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              class="w-full bg-transparent border-0 !text-[13.5px] text-slate-700 outline-none placeholder-slate-400 font-medium" 
              v-model="searchQuery" 
              placeholder="搜索代币交易对和趋势..." 
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''" 
              class="!text-[12px] text-slate-400 hover:text-slate-600 font-bold focus:outline-none pl-2"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Stable Zone selectors like 'USDC', 'USDT', 'U' ... -->
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 select-none text-[12px]">
          <button 
            v-for="zone in tradingZones" 
            :key="zone"
            @click="selectedZone = zone"
            class="px-3 py-1 rounded !text-[12px] font-bold transition-all uppercase cursor-pointer focus:outline-none shrink-0"
            :class="selectedZone === zone 
              ? 'bg-[#1B5831] text-[#5BE395] shadow-xs font-black' 
              : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800'"
          >
            {{ zone }}
          </button>
        </div>
      </div>

      <!-- ==================== MARKET ASSETS LEDGER BOARD ==================== -->
      <div class="bg-white border border-slate-100 rounded-[8px] overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse table-auto">
            <thead>
              <tr class="bg-slate-50/60 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th class="py-4 pl-6 w-12 text-center"></th>
                <th class="py-4 pl-1 font-semibold cursor-pointer hover:bg-slate-100/50 transition-colors" @click="toggleSort('code')">
                  <div class="flex items-center gap-1">
                    名称 / 成交额
                    <span class="text-[9px]">⇅</span>
                  </div>
                </th>
                <th class="py-4 text-right font-semibold cursor-pointer hover:bg-slate-100/50 transition-colors" @click="toggleSort('price')">
                  <div class="flex items-center justify-end gap-1">
                    当前价格
                    <span class="text-[9px]">⇅</span>
                  </div>
                </th>
                <th class="py-4 text-center font-semibold cursor-pointer hover:bg-slate-100/50 transition-colors w-32" @click="toggleSort('change')">
                  <div class="flex items-center justify-center gap-1">
                    涨跌幅
                    <span class="text-[9px]">⇅</span>
                  </div>
                </th>
                <th class="py-4 text-right font-semibold cursor-pointer w-44">
                  <div class="flex items-center justify-end gap-0.5">
                    24H成交量
                    <span class="text-[#1B5831] text-[9.5px] ml-0.5">▽</span>
                  </div>
                </th>
                <th class="py-4 pr-6 text-right font-semibold w-24">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="coin in sortedCoins" 
                :key="coin.code" 
                @click="selectCoinAndNavigate(coin)"
                class="hover:bg-slate-50/40 transition-colors duration-150 cursor-pointer group"
              >
                <!-- Star bookmark checkpoint -->
                <td class="py-4.5 pl-6 text-center" @click.stop="toggleFavorite(coin.code)">
                  <button class="text-slate-200 hover:text-amber-400 focus:outline-none transition-all scale-100 hover:scale-110 cursor-pointer">
                    <svg 
                      class="w-4 h-4" 
                      :fill="isFavorite(coin.code) ? '#F59E0B' : 'none'" 
                      :stroke="isFavorite(coin.code) ? '#F59E0B' : 'currentColor'" 
                      stroke-width="2.2" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.176 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.772-.56-.372-1.81.587-1.81h4.907a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </button>
                </td>

                <!-- Coin identity block with aesthetic circle -->
                <td class="py-4.5 pl-1">
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-8.5 h-8.5 rounded-full flex items-center justify-center text-white font-black text-[10.5px] shadow-3xs" 
                      :class="getCoinBgClass(coin.code)"
                    >
                      {{ coin.code }}
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-[13px] font-bold text-slate-800 tracking-tight group-hover:text-[#1B5831] transition-colors uppercase">
                          {{ coin.code }}/{{ selectedZone || 'USD' }}
                        </span>
                        
                        <!-- Premium insurance marker badge -->
                        <span 
                          v-if="coin.insurance" 
                          class="bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-1 py-0.5 rounded border border-emerald-100"
                        >
                          保
                        </span>
                      </div>
                      <div class="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
                        {{ coin.name }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Live Price Column -->
                <td class="py-4.5 text-right font-mono">
                  <div class="text-[13.5px] font-bold text-slate-800 tracking-tight">
                    ${{ formatNumber(coin.price, coin.price > 100 ? (coin.price > 10000 ? 2 : 2) : 4) }}
                  </div>
                </td>

                <!-- Fluctuations dynamic pill column -->
                <td class="py-4.5 text-center">
                  <div class="inline-flex justify-center w-full">
                    <span 
                      class="text-xs font-bold px-2.5 py-1 rounded-md text-center inline-block w-20 leading-none shadow-3xs text-white"
                      :class="coin.change >= 0 ? 'bg-[#10B981]' : 'bg-[#EF4444]'"
                    >
                      {{ coin.change >= 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%
                    </span>
                  </div>
                </td>

                <!-- Volume and Total Traded Amount -->
                <td class="py-4.5 text-right">
                  <div class="font-mono text-slate-700 text-xs font-bold">
                    {{ coin.vol }}
                  </div>
                  <div class="text-[9px] text-slate-400 font-medium mt-0.5 uppercase tracking-wide">
                    成交额
                  </div>
                </td>

                <!-- Trade Button Column -->
                <td class="py-4.5 pr-6 text-right" @click.stop="selectCoinAndNavigate(coin)">
                  <button class="bg-[#1A7A3E] hover:bg-emerald-800 text-white font-bold text-[11.5px] px-3.5 py-1.5 rounded transition-all shadow-3xs hover:shadow-2xs cursor-pointer focus:outline-none">
                    交易
                  </button>
                </td>
              </tr>

              <!-- Fallback Empty State -->
              <tr v-if="sortedCoins.length === 0">
                <td colspan="6" class="text-center py-16 text-slate-400 font-medium text-xs bg-slate-50/30">
                  暂无匹配行情筛选的资产交易对
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store';

const router = useRouter();

// Active tab selector (Market vs Favorite)
const activeMainTab = ref('MARKET');

// Zone selector (USDC, USDT, U, USD1, USD, BNB)
const selectedZone = ref('USDT');
const tradingZones = ['USDC', 'USDT', 'U', 'USD1', 'USD', 'BNB'];

// Localized query strings
const searchQuery = ref('');

// Sort tracking metadata
const sortKey = ref(''); // code, price, change
const sortAsc = ref(true);

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
};

// Local storage bookmarks for favorites
const favoriteCoins = ref(JSON.parse(localStorage.getItem('lseg_favorite_coins')) || ['BTC', 'ETH', 'LC']);

const isFavorite = (code) => {
  return favoriteCoins.value.includes(code);
};

const toggleFavorite = (code) => {
  if (isFavorite(code)) {
    favoriteCoins.value = favoriteCoins.value.filter(c => c !== code);
  } else {
    favoriteCoins.value.push(code);
  }
  localStorage.setItem('lseg_favorite_coins', JSON.stringify(favoriteCoins.value));
  store.triggerToast(`已更新您的自选关注列表！`);
};

// Computed stats: Top gainer
const maxGainer = computed(() => {
  const list = store.coins.filter(c => c.type !== 'rwa');
  if (list.length === 0) return { code: 'BAT', change: 10.35 };
  return list.reduce((max, coin) => coin.change > max.change ? coin : max, list[0]);
});

// Computed stats: Largest loser
const maxLoser = computed(() => {
  const list = store.coins.filter(c => c.type !== 'rwa');
  if (list.length === 0) return { code: 'KNC', change: -13.81 };
  return list.reduce((min, coin) => coin.change < min.change ? coin : min, list[0]);
});

// Distinct Coin Badges Color Theme Configurations
const getCoinBgClass = (code) => {
  switch (code) {
    case 'BTC': return 'bg-[#F7931A]';
    case 'ETH': return 'bg-[#627EEA]';
    case 'DOGE': return 'bg-[#C2A633]';
    case 'SOL': return 'bg-[#14F195] text-slate-900';
    case 'XRP': return 'bg-[#23292F]';
    case 'LC': return 'bg-[#16A34A]';
    case 'ADA': return 'bg-[#0033AD]';
    case '0x': return 'bg-[#302C2C]';
    case 'DOT': return 'bg-[#E6007A]';
    case 'BAT': return 'bg-[#FF5000]';
    case 'UNI': return 'bg-[#FF007A]';
    case 'AVAX': return 'bg-[#E84142]';
    case 'MANA': return 'bg-[#FF2D55]';
    case 'KNC': return 'bg-[#31CB9E] text-slate-900';
    case 'LINK': return 'bg-[#2A5ADA]';
    case 'MATIC': return 'bg-[#8247E5]';
    case 'OXU': return 'bg-[#00B276]';
    case 'FIL': return 'bg-[#0090FF]';
    default: return 'bg-slate-500';
  }
};

// Selection router triggers
const selectCoinAndNavigate = (coin) => {
  localStorage.setItem('lseg_selected_coin', coin.code);
  store.triggerToast(`已定位并开启 ${coin.code}/${selectedZone.value} 极速交易席位！`);
  router.push('/spot');
};

// Filtering & sorting coins block
const sortedCoins = computed(() => {
  // Exclude raw indices (they belong to index cards, not the crypto matrix board)
  let list = store.coins.filter(c => c.type !== 'rwa');

  // Filter 1: Main tab
  if (activeMainTab.value === 'FAVORITE') {
    list = list.filter(c => isFavorite(c.code));
  }

  // Filter 2: Search String
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }

  // Apply column sorting if sortKey is set
  if (sortKey.value) {
    const key = sortKey.value;
    const direction = sortAsc.value ? 1 : -1;
    list = [...list].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      // Handle strings
      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal) * direction;
      }
      return (aVal - bVal) * direction;
    });
  }

  return list;
});

const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
</script>

<style scoped>
/* Hidden scrollbar helper variables */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
