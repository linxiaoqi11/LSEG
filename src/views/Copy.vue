<template>
  <div class="views-copy-container bg-[#F4F6F5] pb-6 md:pb-10 font-sans antialiased text-slate-700">
    
    <!-- ==================== GREEN HEADER HERO SECTION (图1 STYLE) ==================== -->
    <div class="bg-[#124D26] text-white pt-8 pb-0 relative overflow-hidden shadow-inner">
      <!-- Glow effects -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#13592B] to-[#0D381B] opacity-90 pointer-events-none z-0"></div>
      <div class="absolute -right-20 -top-20 w-[300px] h-[300px] bg-gradient-to-tr from-[#22C55E]/10 to-transparent rounded-full pointer-events-none blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <!-- Asset & Profit status -->
        <div class="flex flex-col gap-1">
          <span class="text-[11px] font-bold text-slate-300 tracking-wider">保险区总资产</span>
          <div class="flex items-baseline gap-1.5 mt-0.5">
            <span class="text-3xl md:text-4xl font-black font-mono tracking-tight text-white">980.52</span>
            <span class="text-sm font-black text-slate-200">USDT</span>
          </div>
          <div class="flex items-center gap-1.5 mt-2.5 bg-[#0C3219]/50 border border-[#1A5C2F] px-3 py-1 rounded-full text-[11px] font-extrabold text-[#5BE395] w-fit shadow-sm">
            <i class="fa-solid fa-chart-line text-[#5BE395] mr-0.5 text-xs"></i>
            <span>+1,240.12 (0.28%) 今日盈亏</span>
          </div>
        </div>

        <!-- Premium Insurance Promo Card on RHS -->
        <div class="bg-white/[0.06] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-4 flex items-center justify-between gap-6 w-fit transition-all shadow-md">
          <div class="flex flex-col gap-1">
            <h4 class="text-sm font-black text-[#5BE395] tracking-tight">保本稳健，尽在享受</h4>
            <p class="text-[10px] text-slate-200 leading-normal font-semibold font-sans mt-0.5">
              机构专属 RWA + 保险区双重保障，让您的资产稳健增值。
            </p>
          </div>
        </div>
      </div>

      <!-- Overlapping Floating Menu: Follow tabs selector identical to Markets page -->
      <div class="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div class="flex items-center gap-6 border-t border-white/15 pt-2 pb-0 select-none relative z-10">
          <button 
            @click="currentMainTab = 'ALL_TRADERS'" 
            class="pt-1.5 pb-3.5 text-[14px] md:text-[15px] font-bold tracking-wide transition-all relative cursor-pointer focus:outline-none"
            :class="currentMainTab === 'ALL_TRADERS' ? 'text-white font-extrabold' : 'text-[#A8D3B9]/80 hover:text-white'"
          >
            全部带单员
            <span v-if="currentMainTab === 'ALL_TRADERS'" class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5BE395] rounded-full"></span>
          </button>
          
          <button 
            @click="currentMainTab = 'MY_FOLLOWS'" 
            class="pt-1.5 pb-3.5 text-[14px] md:text-[15px] font-bold tracking-wide transition-all relative cursor-pointer focus:outline-none"
            :class="currentMainTab === 'MY_FOLLOWS' ? 'text-white font-extrabold' : 'text-[#A8D3B9]/80 hover:text-white'"
          >
            我的跟单
            <span v-if="currentMainTab === 'MY_FOLLOWS'" class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5BE395] rounded-full"></span>
          </button>
          
          <button 
            @click="currentMainTab = 'PNL_RECORDS'" 
            class="pt-1.5 pb-3.5 text-[14px] md:text-[15px] font-bold tracking-wide transition-all relative cursor-pointer focus:outline-none"
            :class="currentMainTab === 'PNL_RECORDS' ? 'text-white font-extrabold' : 'text-[#A8D3B9]/80 hover:text-white'"
          >
            收益记录
            <span v-if="currentMainTab === 'PNL_RECORDS'" class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5BE395] rounded-full"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN WORKSPACE -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-6">
      
      <!-- ==================== TAB 1: ALL TRADERS (全部带单员) ==================== -->
      <div v-if="currentMainTab === 'ALL_TRADERS'" class="space-y-5 animate-fade-in">
        
        <!-- Filter and Sort Header Alignment (图1 Subheader) -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm text-xs">
          <!-- Left tags filters -->
          <div class="flex flex-wrap items-center gap-1.5">
            <button 
              @click="subTab = 'ALL'"
              class="px-3 py-1.5 rounded-md font-bold transition-all border-none cursor-pointer"
              :class="subTab === 'ALL' ? 'bg-[#124D26] text-white' : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'"
            >
              全部
            </button>
            <button 
              @click="subTab = 'PREMIUM'"
              class="px-3 py-1.5 rounded-md font-bold transition-all border-none cursor-pointer"
              :class="subTab === 'PREMIUM' ? 'bg-[#124D26] text-white' : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'"
            >
              精选
            </button>
            <button 
              @click="subTab = 'FOLLOWING'"
              class="px-3 py-1.5 rounded-md font-bold transition-all border-none cursor-pointer"
              :class="subTab === 'FOLLOWING' ? 'bg-[#124D26] text-white' : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'"
            >
              跟单中
            </button>
            <button 
              @click="subTab = 'NEW'"
              class="px-3 py-1.5 rounded-md font-bold transition-all border-none cursor-pointer"
              :class="subTab === 'NEW' ? 'bg-[#124D26] text-white' : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'"
            >
              新带单
            </button>
            <button 
              @click="toggleProfitDirection"
              class="px-3 py-1.5 rounded-md font-bold transition-all border-none cursor-pointer bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center gap-1"
            >
              带单员盈亏 {{ profitDirection === 'desc' ? '↓' : '↑' }}
            </button>
          </div>

          <!-- Right Sorting criteria -->
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-slate-400 font-bold shrink-0">排序：</span>
            <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-md p-0.5">
              <button 
                @click="sortBy = 'ROI'" 
                class="px-2.5 py-1 rounded bg-transparent text-[11px] font-black cursor-pointer transition-all border-none"
                :class="sortBy === 'ROI' ? 'bg-white border border-slate-200 text-[#0B9A47] shadow-sm' : 'text-slate-500 hover:text-slate-800'"
              >
                收益率
              </button>
              <button 
                @click="sortBy = 'WINRATE'" 
                class="px-2.5 py-1 rounded bg-transparent text-[11px] font-black cursor-pointer transition-all border-none"
                :class="sortBy === 'WINRATE' ? 'bg-white border border-slate-200 text-[#0B9A47] shadow-sm' : 'text-slate-500 hover:text-slate-800'"
              >
                胜率
              </button>
              <button 
                @click="sortBy = 'FOLLOWERS'" 
                class="px-2.5 py-1 rounded bg-transparent text-[11px] font-black cursor-pointer transition-all border-none"
                :class="sortBy === 'FOLLOWERS' ? 'bg-white border border-slate-200 text-[#0B9A47] shadow-sm' : 'text-slate-500 hover:text-slate-800'"
              >
                跟单人数
              </button>
              <button 
                @click="sortBy = 'AUM'" 
                class="px-2.5 py-1 rounded bg-transparent text-[11px] font-black cursor-pointer transition-all border-none"
                :class="sortBy === 'AUM' ? 'bg-white border border-slate-200 text-[#0B9A47] shadow-sm' : 'text-slate-500 hover:text-slate-800'"
              >
                带单总额
              </button>
            </div>
          </div>
        </div>

        <!-- Master Trader Grid (3 Columns PC, Responsive Grid) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div 
            v-for="(trader, idx) in processedTraders" 
            :key="trader.id" 
            class="bg-white border border-slate-200 rounded-[8px] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-xs flex flex-col justify-between"
          >
            <!-- Card Section 1: Top Profile Row -->
            <div>
              <div class="flex justify-between items-start gap-2 mb-4">
                <div class="flex items-center gap-3">
                  <!-- Custom Colored initials avatar container -->
                  <div class="relative">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-[15px] select-none shadow-sm" :class="trader.color">
                      {{ trader.avatar }}
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="flex flex-col">
                    <div class="flex items-center gap-1.5">
                      <span class="text-[14px] font-black text-slate-800 tracking-tight leading-none">{{ trader.name }}</span>
                      
                      <!-- Verification circle Checkmark with nice border -->
                      <span class="w-3.5 h-3.5 bg-[#0B9A47] rounded-full flex items-center justify-center text-white text-[8px] font-black leading-none shrink-0" title="官方核审带单员">✓</span>
                    </div>
                    <!-- Followers capacity ratio representation -->
                    <span class="text-[10px] text-slate-400 font-bold mt-1.5 leading-none">
                      跟单员 &nbsp;<span class="text-slate-600 font-extrabold font-mono">{{ trader.count }}</span>
                    </span>
                  </div>
                </div>

                <!-- Customized Green labels in top corner matching exact screenshot pattern -->
                <div class="flex items-center gap-1">
                  <span class="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60 leading-none">
                    {{ trader.tag1 }}
                  </span>
                  <span class="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60 leading-none">
                    {{ trader.tag2 }}
                  </span>
                </div>
              </div>

              <!-- Card Section 2: Returns (30-50-60D gain with sparklines) -->
              <div class="mb-1">
                <span class="text-[10px] text-slate-400 font-bold tracking-wide block uppercase">{{ trader.pnlTitle }}</span>
                <div class="flex items-baseline gap-1.5 mt-1 font-sans leading-none">
                  <span class="text-[25px] font-black text-[#0B9A47] tracking-tight font-mono">{{ trader.gain }}</span>
                  <span class="text-[12px] font-black text-[#0B9A47] font-mono leading-none">{{ trader.gainPct }}</span>
                </div>
              </div>

              <!-- Interactive Custom Wavy SVG Vector Sparkline in Vibrant Green with bottom shadow fade -->
              <div class="my-3 opacity-95">
                <svg class="w-full h-14" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient :id="'sparkGrad-' + trader.id" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#10B981" stop-opacity="0.22" />
                      <stop offset="100%" stop-color="#10B981" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <!-- Base smooth spline -->
                  <path 
                    :d="trader.svgPath" 
                    fill="none" 
                    stroke="#10B981" 
                    stroke-width="2.5" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  />
                  <!-- Underlay fading gradient area -->
                  <path 
                    :d="trader.svgArea" 
                    :fill="'url(#sparkGrad-' + trader.id + ')'"
                  />
                </svg>
              </div>

              <!-- Card Section 3: Performance Columns -->
              <div class="grid grid-cols-3 gap-1 py-3 text-slate-500 font-semibold leading-none text-[10px] border-b border-slate-50 mb-3.5">
                <div class="text-left font-sans">
                  <span class="text-slate-400 font-semibold block mb-1">胜率</span>
                  <span class="text-[#0B9A47] font-black text-[11px] font-mono">{{ trader.winRate }}</span>
                </div>
                <div class="text-right sm:text-center">
                  <span class="text-slate-400 font-semibold block mb-1">带单总额</span>
                  <span class="text-slate-800 font-black text-[11px] font-mono">{{ trader.aum }}</span>
                </div>
                <div class="text-right">
                  <span class="text-slate-400 font-semibold block mb-1">跟单者总额</span>
                  <span class="text-slate-800 font-black text-[11px] font-mono">{{ trader.copierPnl }}</span>
                </div>
              </div>
            </div>

            <!-- Card Section 4: Follow CTA Action block with checking states -->
            <div>
              <button 
                v-if="isFollowed(trader.id)"
                @click="openFollowSettings(trader)"
                class="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-black py-2.5 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-98"
              >
                <span>⭐ 跟单中 (参数设置)</span>
              </button>
              <button 
                v-else
                @click="openFollowSettings(trader)"
                class="w-full bg-[#0B9A47] hover:bg-emerald-700 text-white font-black py-2.5 rounded-lg border-none shadow-sm flex items-center justify-center gap-1.5 transition-all text-xs tracking-wider cursor-pointer active:scale-98"
              >
                <span>跟单</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination Section matching exact style 1 -->
        <div class="flex items-center justify-center gap-1.5 mt-8">
          <button 
            @click="store.triggerToast('已处于当前首页面第一页')" 
            class="w-7 h-7 rounded-md border-none bg-[#0B9A47] text-white font-normal flex items-center justify-center text-[11px] cursor-pointer"
          >
            1
          </button>
          <button 
            @click="store.triggerToast('正在调度分页数据... 已获取第 2 页记录')" 
            class="w-7 h-7 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-55 font-normal flex items-center justify-center text-[11px] cursor-pointer"
          >
            2
          </button>
          <button 
            @click="store.triggerToast('正在调度分页数据... 已获取第 3 页记录')" 
            class="w-7 h-7 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-55 font-normal flex items-center justify-center text-[11px] cursor-pointer"
          >
            3
          </button>
          <span class="text-slate-400 text-xs px-1 select-none font-normal">...</span>
          <button 
            @click="store.triggerToast('正在调度分页数据... 已获取第 8 页尾页记录')" 
            class="w-7 h-7 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-55 font-normal flex items-center justify-center text-[11px] cursor-pointer"
          >
            8
          </button>
        </div>

      </div>

      <!-- ==================== TAB 2: MY FOLLOWS (我的跟单) ==================== -->
      <div v-else-if="currentMainTab === 'MY_FOLLOWS'" class="space-y-5 animate-fade-in">
        
        <!-- Interactive overall Follow summaries counters card -->
        <div class="bg-white border border-slate-200 rounded-[8px] p-5 shadow-sm">
          <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0C9847]"></span>
            跟单总控台 (Followers Admin panel)
          </h3>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
            <div class="bg-slate-50/65 p-3.5 rounded-lg border border-slate-100">
              <span class="text-slate-400 block mb-1">当前正在跟单人数</span>
              <span class="text-xl font-black font-mono text-slate-800">{{ store.follows.length }} / 8 人</span>
            </div>
            <div class="bg-slate-50/65 p-3.5 rounded-lg border border-slate-100">
              <span class="text-slate-400 block mb-1">跟单锁定本金</span>
              <span class="text-xl font-black font-mono text-slate-800">${{ currentFollowCapital.toLocaleString() }} USDT</span>
            </div>
            <div class="bg-slate-50/65 p-3.5 rounded-lg border border-slate-100">
              <span class="text-slate-400 block mb-1">今日结算累计回报</span>
              <span class="text-xl font-black font-mono text-[#0B9A47]">+${{ (currentFollowCapital * 0.0125).toFixed(2) }} USDT</span>
            </div>
            <div class="bg-[#ECFDF5]/50 p-3.5 rounded-lg border border-emerald-100">
              <span class="text-emerald-700 block mb-1 flex items-center gap-1 text-[11px] font-bold">可用杠杆合约钱包额</span>
              <span class="text-xl font-black font-mono text-[#0B9A47]">
                ${{ formatNumber(store.balances.futures, 2) }} USDT
              </span>
            </div>
          </div>
        </div>

        <!-- Follow list rendering -->
        <div v-if="followedTradersList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div 
            v-for="item in followedTradersList" 
            :key="item.id" 
            class="bg-white border border-slate-200 rounded-[8px] p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm" :class="item.color">
                    {{ item.avatar }}
                  </div>
                  <div>
                    <h4 class="text-sm font-black text-slate-800 flex items-center gap-1">
                      {{ item.name }}
                      <span class="w-3.5 h-3.5 bg-[#0B9A47] rounded-full flex items-center justify-center text-white text-[8px] leading-none shrink-0" title="官方核审带单员">✓</span>
                    </h4>
                    <span class="text-[10px] text-slate-400 font-bold mt-1 block">带单策略: {{ item.tag1 }} &middot; {{ item.tag2 }}</span>
                  </div>
                </div>

                <div class="text-right">
                  <span class="text-[9px] font-black bg-emerald-50 text-[#0B9A47] px-2 py-0.5 rounded leading-none border border-emerald-100">
                    跟单跟单执行中
                  </span>
                </div>
              </div>

              <!-- settings and lock capital display -->
              <div class="bg-slate-50 rounded-lg p-3 border border-slate-100/80 mb-4 grid grid-cols-3 gap-2 text-[10px] font-semibold">
                <div>
                  <span class="text-slate-400 block mb-1">跟固投入 (USDT)</span>
                  <span class="text-slate-850 font-black font-mono text-xs">${{ item.followConfig.amount }}</span>
                </div>
                <div>
                  <span class="text-slate-400 block mb-1">止盈利比例</span>
                  <span class="text-slate-850 font-black font-mono text-xs">{{ item.followConfig.tp }}%</span>
                </div>
                <div>
                  <span class="text-slate-400 block mb-1">止损比例</span>
                  <span class="text-red-500 font-black font-mono text-xs">{{ item.followConfig.sl }}%</span>
                </div>
              </div>

              <!-- PnL Dynamic chart simulation inline block -->
              <div class="flex justify-between items-center bg-[#ECFDF5]/30 rounded px-3 py-2 border border-[#A7F3D0]/30 mb-3 text-[11px] font-semibold text-slate-650">
                <span class="flex items-center gap-1">实时浮盈累计:</span>
                <span class="text-[#0B9A47] font-black font-mono text-xs">
                  +${{ (item.followConfig.amount * 0.062).toFixed(2) }} USDT (+6.20%)
                </span>
              </div>
            </div>

            <!-- actions -->
            <div class="flex items-center gap-2 mt-2">
              <button 
                @click="openFollowSettings(item)" 
                class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-2 rounded-lg border-none text-[11px] cursor-pointer"
              >
                参数编辑
              </button>
              <button 
                @click="unfollowTrader(item.id)" 
                class="bg-red-500 hover:bg-red-600 text-white font-black py-2 px-4 rounded-lg border-none text-[11px] cursor-pointer"
              >
                撤销跟单
              </button>
            </div>
          </div>
        </div>

        <!-- Empty status -->
        <div v-else class="py-16 flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-[8px] p-6 space-y-4">
          <div class="text-4xl text-center">📡</div>
          <h4 class="text-sm font-black text-slate-800 text-center">暂无活跃的正在跟单仓位</h4>
          <p class="text-xs text-slate-400 font-bold max-w-sm mx-auto leading-relaxed text-center">
            您可以前往 “全部带单员” 列表，选择业绩稳健、胜率惊艳的优质机构带单大师一键跟单。
          </p>
          <button 
            @click="currentMainTab = 'ALL_TRADERS'" 
            class="bg-[#0B9A47] hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-lg border-none shadow-sm cursor-pointer text-center"
          >
            探索热门带单员 →
          </button>
        </div>

        <!-- Retroactive insurance record integrations so old purchases are still fully visual and functional -->
        <div class="mt-8 border-t border-slate-200 pt-6">
          <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            🛡️ 绿色经济保险区认购存档
          </h4>
          <div v-if="store.insurancePurchases && store.insurancePurchases.length > 0" class="space-y-4">
            <div 
              v-for="policy in store.insurancePurchases" 
              :key="policy.id" 
              class="bg-white border border-slate-200 rounded p-4 shadow-sm text-xs relative"
            >
              <div class="flex justify-between items-center mb-3">
                <div class="flex items-center gap-1.5">
                  <span class="bg-emerald-50 text-[#0B9A47] text-[10px] font-black px-1.5 py-0.5 rounded leading-none shrink-0 border border-emerald-100">保</span>
                  <span class="text-[13px] font-black text-slate-900">{{ policy.coin }}</span>
                  <span class="text-[9px] font-black text-slate-400 bg-slate-50 px-1 py-0.5 rounded font-mono">{{ policy.cycle }}</span>
                  <span class="text-[9px] font-black bg-emerald-50 text-[#0B9A47] px-1.5 py-0.5 rounded font-mono">核保质押中</span>
                </div>
                <button @click="redeemPolicy(policy.id)" class="text-[10px] text-red-500 font-extrabold hover:underline bg-transparent border-none cursor-pointer">
                  平仓退保 &times;
                </button>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 gap-2 py-2 text-slate-500 font-semibold leading-none text-[10px] border-t border-slate-50">
                <div>
                  <span class="text-slate-400 block mb-1">投保本金</span>
                  <span class="text-slate-800 font-black font-mono text-xs">${{ formatNumber(policy.amount, 2) }} USDT</span>
                </div>
                <div>
                  <span class="text-slate-400 block mb-1">赔付保护额</span>
                  <span class="text-[#0B9A47] font-black font-mono text-xs">${{ formatNumber(policy.amount, 2) }} USDT</span>
                </div>
                <div class="col-span-2 md:col-span-1 text-left md:text-right">
                  <span class="text-slate-400 block mb-1">投保开始时间</span>
                  <span class="text-slate-800 font-black font-mono text-xs">{{ policy.time }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-6 bg-white border border-slate-200 rounded-lg text-slate-400 font-bold text-[11px]">
            暂无承保募集记录
          </div>
        </div>

      </div>

      <!-- ==================== TAB 3: REVENUE RECORDS (收益记录) ==================== -->
      <div v-else-if="currentMainTab === 'PNL_RECORDS'" class="space-y-5 animate-fade-in">
        
        <!-- Statistics banner block -->
        <div class="bg-white border border-slate-200 rounded-[8px] p-5 shadow-sm text-xs relative">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-400 font-bold">
            <div class="text-center mb-4 md:mb-0 md:border-r border-slate-100">
              <span class="block text-[11px] mb-1">累计跟单充注单数</span>
              <span class="text-2xl font-black font-mono text-slate-800">{{ store.ledger.filter(l => l.action.includes('跟单')).length || 1 }} 单</span>
            </div>
            <div class="text-center mb-4 md:mb-0 md:border-r border-slate-100">
              <span class="block text-[11px] mb-1">累计跟单赚取利润</span>
              <span class="text-2xl font-black font-mono text-[#0B9A47]">+$194.22 USDT</span>
            </div>
            <div class="text-center">
              <span class="block text-[11px] mb-1">对冲策略防御胜率</span>
              <span class="text-2xl font-black font-mono text-[#0B9A47]">96.80% 🏆</span>
            </div>
          </div>
        </div>

        <!-- Ledger logging display -->
        <div class="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-sm">
          <div class="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h4 class="text-xs font-black text-slate-800 uppercase tracking-wide">交易清算总账流 (Transaction Ledger)</h4>
            <span class="text-[10px] text-slate-400 font-bold font-mono">账期: 伦敦时间UTC</span>
          </div>

          <!-- Dynamic logs list -->
          <div v-if="allLedgerLogs.length > 0" class="divide-y divide-slate-100 font-semibold text-xs text-slate-650">
            <div 
              v-for="log in allLedgerLogs" 
              :key="log.id" 
              class="px-4 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-all"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <i :class="log.icon" class="text-[13px]"></i>
                </div>
                <div>
                  <h5 class="text-xs font-black text-slate-800">{{ log.action }}</h5>
                  <span class="text-[10px] text-slate-400 font-bold font-mono flex items-center mt-1 gap-1">
                    <span>{{ log.time }}</span>
                    <span>&middot;</span>
                    <span>单号: #{{ log.id }}</span>
                  </span>
                </div>
              </div>

              <div class="text-right">
                <span class="font-bold text-[10px] text-slate-400 block mb-0.5">{{ log.path }}</span>
                <span class="font-black font-mono text-sm text-[#0B9A47]">
                  +${{ log.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }} USDT
                </span>
              </div>
            </div>
          </div>

          <div v-else class="divide-y divide-slate-100">
            <!-- Simulated preset premium logs for visual completeness with 100% genuine values -->
            <div class="px-4 py-3.5 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-coins text-[13px]"></i>
                </div>
                <div>
                  <h5 class="text-xs font-black text-slate-800">对冲跟单收益派发 (风沐跟投)</h5>
                  <span class="text-[10px] text-slate-400 font-bold font-mono mt-1 block">本日 11:30 &middot; 单号: #319205</span>
                </div>
              </div>
              <div class="text-right">
                <span class="font-bold text-[10px] text-slate-400 block mb-0.5">自选合约 4X 杠杆</span>
                <span class="font-black font-mono text-sm text-[#0B9A47]">+$112.50 USDT</span>
              </div>
            </div>

            <div class="px-4 py-3.5 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-chart-line text-[13px]"></i>
                </div>
                <div>
                  <h5 class="text-xs font-black text-slate-800">K线老船长 波动策略分账分配</h5>
                  <span class="text-[10px] text-slate-400 font-bold font-mono mt-1 block">昨日 18:45 &middot; 单号: #308412</span>
                </div>
              </div>
              <div class="text-right">
                <span class="font-bold text-[10px] text-slate-400 block mb-0.5">波动波段高收益自动派红</span>
                <span class="font-black font-mono text-sm text-[#0B9A47]">+$81.72 USDT</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- ==================== DIALOG: FOLLOW SETTINGS MODAL ==================== -->
    <div 
      v-if="followModalOpen" 
      class="fixed inset-0 bg-[#06160F]/65 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-fade-in"
    >
      <div class="bg-white rounded-[8px] shadow-xl border border-slate-100 w-full max-w-md overflow-hidden text-xs">
        
        <!-- Header -->
        <div class="bg-[#124D26] text-white px-5 py-4 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚙️</span>
            <div>
              <h4 class="font-black text-sm tracking-tight">跟单参数设定 (Follower Config)</h4>
              <p class="text-[10px] text-[#A7F3D0] mt-0.5">正在建立与 master 专属对冲信道</p>
            </div>
          </div>
          <button 
            @click="closeFollowSettings" 
            class="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center border-none text-[15px] cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div class="p-5 space-y-4">
          
          <!-- Trader Info Card header -->
          <div v-if="selectedTrader" class="bg-slate-50 rounded-lg p-3 border border-slate-150 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs select-none" :class="selectedTrader.color">
                {{ selectedTrader.avatar }}
              </div>
              <div>
                <span class="font-black text-slate-850 block text-[13px]">{{ selectedTrader.name }}</span>
                <span class="text-[10px] text-slate-400 font-bold mt-0.5 block">收益胜率: {{ selectedTrader.winRate }}</span>
              </div>
            </div>

            <div class="text-right">
              <span class="text-[10px] text-[#0B9A47] font-black border border-emerald-100 rounded bg-[#ECFDF5] px-1.5 py-0.5 leading-none shadow-sm block">
                {{ selectedTrader.tag1 }}
              </span>
            </div>
          </div>

          <!-- Input 跟单金额 -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-[11px] font-bold text-slate-500">
              <span>跟单本金储备额 (USDT)</span>
              <span class="text-slate-400">
                可投资产: 
                <span class="text-slate-800 font-mono font-black">${{ formatNumber(store.balances.futures, 2) }} USDT</span>
              </span>
            </div>
            
            <div class="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex items-center gap-2">
              <span class="text-slate-400 font-mono font-bold">$</span>
              <input 
                type="number" 
                v-model="followAmount" 
                class="w-full bg-transparent border-none text-[13px] font-black text-slate-800 outline-none font-mono py-0.5" 
                placeholder="请输入质押合约跟单金额 (USDT)..."
                min="50"
              />
              <span class="text-slate-400 font-bold select-none">USDT</span>
            </div>

            <!-- Quick pick suggestions buttons grid -->
            <div class="grid grid-cols-4 gap-1.5 pt-1">
              <button 
                v-for="val in [100, 500, 1000, 2000]" 
                :key="val" 
                @click="followAmount = val"
                class="bg-slate-100 hover:bg-slate-200 text-slate-650 font-black py-1.5 rounded-md border-none text-[10px] select-none cursor-pointer text-center"
              >
                ${{ val }}
              </button>
            </div>
          </div>

          <!-- Input TP / SL settings options -->
          <div class="grid grid-cols-2 gap-3.5">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 block">对冲止盈比率 (Take Profit)</label>
              <div class="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex items-center">
                <input 
                  type="number" 
                  v-model="takeProfitRatio" 
                  class="w-full bg-transparent border-none text-[13px] font-black text-slate-800 outline-none font-mono py-0.5" 
                />
                <span class="text-slate-400 font-bold">%</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 block">自动止损安全线 (Stop Loss)</label>
              <div class="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex items-center">
                <input 
                  type="number" 
                  v-model="stopLossRatio" 
                  class="w-full bg-transparent border-none text-[11px] font-black text-slate-800 outline-none font-mono py-0.5" 
                />
                <span class="text-slate-400 font-bold">%</span>
              </div>
            </div>
          </div>

          <!-- Notice disclaimer about green trust fund physical secure -->
          <div class="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-1">
            <h5 class="text-[10px] font-black text-emerald-800">🛡️ LSEG 物理资金首脑隔离管护</h5>
            <p class="text-[9.5px] text-slate-400 font-semibold leading-relaxed">
              本次跟跟单仓位将自动由伦敦绿色对冲结算保障系统进行 100% 赔付监控。由于杠杆波动触发止损时，最大风险将被隔离，避免出现负穿仓亏空。
            </p>
          </div>

        </div>

        <!-- Confirm and Actions bottom pane -->
        <div class="bg-slate-50 border-t border-slate-150 px-5 py-4 flex items-center justify-end gap-2.5">
          <button 
            @click="closeFollowSettings" 
            class="bg-white hover:bg-slate-100 text-slate-600 font-black px-4 py-2 rounded-lg border border-slate-200 cursor-pointer text-[11px]"
          >
            取消关闭
          </button>
          <button 
            @click="confirmFollow" 
            class="bg-[#0B9A47] hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-lg border-none cursor-pointer text-[11px]"
          >
            建立跟投通道
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { store } from '../store';

const currentMainTab = ref('ALL_TRADERS');
const subTab = ref('ALL');
const sortBy = ref('ROI');
const profitDirection = ref('desc');

// Selected items to handle settings
const followModalOpen = ref(false);
const selectedTrader = ref(null);
const followAmount = ref('');
const takeProfitRatio = ref(100);
const stopLossRatio = ref(20);

// Preset list of master traders to match Screenshot with clean vector sparklines
const traders = reactive([
  { 
    id: 't-1', 
    name: "风沐", 
    avatar: "FM", 
    color: "bg-[#0B9A47]", 
    rank: "1", 
    tag1: "稳健型", 
    tag2: "长线", 
    count: "359/100", 
    pnlTitle: "50天带单总收益", 
    gain: "+376,665.37", 
    gainPct: "+95.85%", 
    winRate: "95.65%", 
    aum: "471,816.39", 
    copierPnl: "181,450.98", 
    bio: "专注趋势交易，以风险管控为核心策略", 
    score: 95.65, 
    followers: 359, 
    totalAum: 471816.39,
    // Custom SVG sparklines representing image
    svgPath: "M 0,45 Q 40,20 80,35 T 160,25 T 240,40 T 300,15",
    svgArea: "M 0,45 Q 40,20 80,35 T 160,25 T 240,40 T 300,15 L 300,60 L 0,60 Z"
  },
  { 
    id: 't-2', 
    name: "K线老船长", 
    avatar: "KX", 
    color: "bg-[#2563EB]", 
    rank: "2", 
    tag1: "波段", 
    tag2: "技术派", 
    count: "459/200", 
    pnlTitle: "50天带单总收益", 
    gain: "+376,665.37", 
    gainPct: "+95.85%", 
    winRate: "95.85%", 
    aum: "471,816.39", 
    copierPnl: "181,450.98", 
    bio: "10年K线研究，精通形态与技术指标分析", 
    score: 95.85, 
    followers: 459, 
    totalAum: 471816.39,
    svgPath: "M 0,40 Q 30,12 70,30 T 150,15 T 230,35 T 300,20",
    svgArea: "M 0,40 Q 30,12 70,30 T 150,15 T 230,35 T 300,20 L 300,60 L 0,60 Z"
  },
  { 
    id: 't-3', 
    name: "武大郎合约", 
    avatar: "WD", 
    color: "bg-[#7C3AED]", 
    rank: "3", 
    tag1: "合约", 
    tag2: "激进型", 
    count: "359/100", 
    pnlTitle: "50天带单总收益", 
    gain: "+376,665.37", 
    gainPct: "+95.85%", 
    winRate: "95.65%", 
    aum: "471,816.39", 
    copierPnl: "181,450.98", 
    bio: "专注合约高收益策略，严格止损纪律", 
    score: 95.65, 
    followers: 359, 
    totalAum: 471816.39,
    svgPath: "M 0,35 Q 50,15 90,30 T 170,20 T 250,45 T 300,10",
    svgArea: "M 0,35 Q 50,15 90,30 T 170,20 T 250,45 T 300,10 L 300,60 L 0,60 Z"
  },
  { 
    id: 't-4', 
    name: "绿野仙踪", 
    avatar: "LY", 
    color: "bg-[#0D9488]", 
    rank: "4", 
    tag1: "量化", 
    tag2: "稳健", 
    count: "280/150", 
    pnlTitle: "45天带单总收益", 
    gain: "+248,321.90", 
    gainPct: "+82.40%", 
    winRate: "89.20%", 
    aum: "318,540.00", 
    copierPnl: "142,380.55", 
    bio: "AI 量化模型辅助决策，追求稳定正收益", 
    score: 89.20, 
    followers: 280, 
    totalAum: 318540.0,
    svgPath: "M 0,45 Q 35,25 75,40 T 155,20 T 235,35 T 300,15",
    svgArea: "M 0,45 Q 35,25 75,40 T 155,20 T 235,35 T 300,15 L 300,60 L 0,60 Z"
  },
  { 
    id: 't-5', 
    name: "数字黄金", 
    avatar: "SZ", 
    color: "bg-[#F59E0B]", 
    rank: "5", 
    tag1: "BTC", 
    tag2: "长线", 
    count: "192/100", 
    pnlTitle: "30天带单总收益", 
    gain: "+142,880.25", 
    gainPct: "+71.80%", 
    winRate: "84.50%", 
    aum: "198,120.00", 
    copierPnl: "98,650.30", 
    bio: "聚焦比特长线价值投资，低频高质操作", 
    score: 84.50, 
    followers: 192, 
    totalAum: 198120.0,
    svgPath: "M 0,50 Q 40,30 80,45 T 160,25 T 240,35 T 300,20",
    svgArea: "M 0,50 Q 40,30 80,45 T 160,25 T 240,35 T 300,20 L 300,60 L 0,60 Z"
  },
  { 
    id: 't-6', 
    name: "超级量化王", 
    avatar: "CJ", 
    color: "bg-[#DC2626]", 
    rank: "6", 
    tag1: "量化", 
    tag2: "高频", 
    count: "520/300", 
    pnlTitle: "60天带单总收益", 
    gain: "+512,440.60", 
    gainPct: "+105.22%", 
    winRate: "91.30%", 
    aum: "680,000.00", 
    copierPnl: "256,000.00", 
    bio: "高频量化策略，日均交易频次超百次", 
    score: 91.30, 
    followers: 520, 
    totalAum: 680000.0,
    svgPath: "M 0,30 Q 30,5 70,25 T 150,10 T 230,30 T 300,5",
    svgArea: "M 0,30 Q 30,5 70,25 T 150,10 T 230,30 T 300,5 L 300,60 L 0,60 Z"
  }
]);

// Compute followed status
const isFollowed = (id) => {
  return store.follows.some(item => item.id === id);
};

// Calculate total followed capital locked
const currentFollowCapital = computed(() => {
  return store.follows.reduce((acc, item) => acc + (parseFloat(item.followConfig?.amount) || 0), 0);
});

// Followed traders list with nested parameters
const followedTradersList = computed(() => {
  return traders.filter(t => isFollowed(t.id)).map(t => {
    const config = store.follows.find(p => p.id === t.id);
    return {
      ...t,
      followConfig: config?.followConfig || { amount: 200, tp: 100, sl: 20 }
    };
  });
});

// Reconstructed transactions & payouts logs combined from store ledger
const allLedgerLogs = computed(() => {
  let logs = store.ledger.filter(item => item.action.includes('跟') || item.action.includes('退保') || item.action.includes('投保'));
  
  // Custom visual enhancement
  return logs.map((log, offset) => {
    let icon = 'fa-solid fa-coins';
    if (log.action.includes('主动平退')) {
      icon = 'fa-solid fa-arrow-right-from-bracket';
    } else if (log.action.includes('跟单')) {
      icon = 'fa-solid fa-link';
    } else if (log.action.includes('投保') || log.action.includes('承保')) {
      icon = 'fa-solid fa-shield-halved';
    }
    return {
      ...log,
      icon
    };
  });
});

// Sorting and Filtering algorithm matches screen
const toggleProfitDirection = () => {
  profitDirection.value = profitDirection.value === 'desc' ? 'asc' : 'desc';
  subTab.value = 'PROFIT';
};

const processedTraders = computed(() => {
  let list = [...traders];
  
  // 1. Filter tabs logic
  if (subTab.value === 'PREMIUM') {
    list = list.filter(t => parseInt(t.rank) <= 3);
  } else if (subTab.value === 'FOLLOWING') {
    list = list.filter(t => isFollowed(t.id));
  } else if (subTab.value === 'NEW') {
    list = list.filter(t => t.id === 't-5' || t.id === 't-6');
  } else if (subTab.value === 'PROFIT') {
    // Sorted by profit amount direction toggle
    list.sort((a,b) => {
      const p1 = parseFloat(a.gain.replace(/[^0-9.]/g, ''));
      const p2 = parseFloat(b.gain.replace(/[^0-9.]/g, ''));
      return profitDirection.value === 'desc' ? p2 - p1 : p1 - p2;
    });
    return list;
  }

  // 2. Sort Logic
  if (sortBy.value === 'ROI') {
    list.sort((a, b) => b.score - a.score);
  } else if (sortBy.value === 'WINRATE') {
    list.sort((a, b) => b.score - a.score);
  } else if (sortBy.value === 'FOLLOWERS') {
    list.sort((a, b) => b.followers - a.followers);
  } else if (sortBy.value === 'AUM') {
    list.sort((a, b) => b.totalAum - a.totalAum);
  }

  return list;
});

// Handle Follow settings
const openFollowSettings = (trader) => {
  selectedTrader.value = trader;
  const config = store.follows.find(p => p.id === trader.id);
  if (config) {
    followAmount.value = config.followConfig.amount;
    takeProfitRatio.value = config.followConfig.tp;
    stopLossRatio.value = config.followConfig.sl;
  } else {
    followAmount.value = '100';
    takeProfitRatio.value = 100;
    stopLossRatio.value = 20;
  }
  followModalOpen.value = true;
};

const closeFollowSettings = () => {
  followModalOpen.value = false;
  selectedTrader.value = null;
};

const confirmFollow = () => {
  const amt = parseFloat(followAmount.value);
  if (isNaN(amt) || amt < 50) {
    store.triggerToast('⚠️ 跟单起投本金不可低于 50 USDT！');
    return;
  }

  // Check limits
  if (store.balances.futures < amt && !isFollowed(selectedTrader.value.id)) {
    store.triggerToast('⚠️ 杠杆永续子钱包余额不足，请在导航栏“充值质押”或者“资产/钱包”中划调。');
    return;
  }

  // Deduct/refund difference if editing, or subtract new
  const index = store.follows.findIndex(p => p.id === selectedTrader.value.id);
  if (index !== -1) {
    // Editing existing configuration status
    const previousAmount = store.follows[index].followConfig.amount;
    const diff = amt - previousAmount;
    if (diff > 0 && store.balances.futures < diff) {
      store.triggerToast('⚠️ 调整增额导致杠杆对冲钱包可用差额余额不足。');
      return;
    }
    store.balances.futures = Number((store.balances.futures - diff).toFixed(2));
    store.follows[index].followConfig = {
      amount: amt,
      tp: takeProfitRatio.value || 100,
      sl: stopLossRatio.value || 20
    };
    store.triggerToast(`✨ 已成功更新带单员「${selectedTrader.value.name}」的跟单合约运行指标！`);
  } else {
    // Brand new follow setup
    store.balances.futures = Number((store.balances.futures - amt).toFixed(2));
    store.follows.unshift({
      id: selectedTrader.value.id,
      name: selectedTrader.value.name,
      followConfig: {
        amount: amt,
        tp: takeProfitRatio.value || 100,
        sl: stopLossRatio.value || 20
      }
    });

    // Write audit log
    const logId = 'FL' + Math.floor(Math.random() * 800000 + 200000);
    store.ledger.unshift({
      id: logId,
      time: '今日 ' + new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'}),
      action: `激活合规跟单对冲通道`,
      path: `带单导师: ${selectedTrader.value.name}`,
      amount: amt,
      type: 'CONFIRMED'
    });
    
    store.triggerToast(`🎉 一键开启策略跟单成功！${amt} USDT 已注入隔离质押保护托管池。`);
  }

  closeFollowSettings();
  currentMainTab.value = 'MY_FOLLOWS';
};

const unfollowTrader = (id) => {
  const index = store.follows.findIndex(p => p.id === id);
  if (index !== -1) {
    const item = store.follows[index];
    const refundedCapital = item.followConfig.amount;
    
    // Refund
    store.balances.futures = Number((store.balances.futures + refundedCapital).toFixed(2));
    
    // Log
    const logId = 'FL' + Math.floor(Math.random() * 800000 + 100000);
    store.ledger.unshift({
      id: logId,
      time: '今日 ' + new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'}),
      action: `主动平退跟单托管单`,
      path: `平仓退仓: ${item.name}`,
      amount: refundedCapital,
      type: 'CONFIRMED'
    });

    store.follows.splice(index, 1);
    store.triggerToast(`✨ 已妥善平仓退回跟投仓位，折算归集资金 $${refundedCapital} USDT 拨入永续子钱包。`);
  }
};

// Carry over old rules
const redeemPolicy = (id) => {
  if (!store.insurancePurchases) return;
  const idx = store.insurancePurchases.findIndex(p => p.id === id);
  if (idx !== -1) {
    const policy = store.insurancePurchases[idx];
    const refundAmount = policy.amount;
    store.balances.insurance = Number((store.balances.insurance + refundAmount).toFixed(2));

    store.ledger.unshift({
      id: 'TX' + Math.floor(Math.random() * 900000 + 100000),
      time: '今日 ' + new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'}),
      action: `投保主动平退`,
      path: `平仓退保返还 [托管单: #${policy.id}]`,
      amount: refundAmount,
      type: 'CONFIRMED'
    });

    store.insurancePurchases.splice(idx, 1);
    store.triggerToast(`✨ 退保赎回成功！已划拨保本储蓄本金 $${refundAmount} USDT 至保险账户。`);
  }
};

const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
