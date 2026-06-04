<template>
  <div class="views-contract-container bg-[#F4F6F5] pb-6 md:pb-10 font-sans">
    
    <!-- ==================== PREMIUM HEADER & PERFORMANCE HEADLINE ==================== -->
    <div class="bg-white border-b border-slate-100 py-3.5 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Instrument & Active Price Group -->
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          
          <!-- Coin Selection Trigger with Caret Dropdown -->
          <div class="relative cursor-pointer" @click="showCoinMenu = !showCoinMenu">
            <div class="flex items-center gap-1.5 hover:opacity-85 select-none py-1">
              <span class="text-xl font-black text-slate-900 tracking-tight">{{ selectedCoinCode }}/USDT</span>
              <span class="text-[9.5px] font-extrabold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono uppercase leading-none">永续</span>
              <svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <!-- Interactive Dropdown -->
            <div v-if="showCoinMenu" class="absolute left-0 mt-2.5 w-60 bg-white border border-slate-100 rounded-lg shadow-xl py-2 z-50 animate-fade-in text-xs font-bold text-slate-700">
              <div v-for="coin in store.coins" :key="coin.code" @click.stop="selectCoin(coin)" class="px-4 py-2.5 hover:bg-slate-50 flex justify-between items-center cursor-pointer border-b border-slate-50 last:border-b-0">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :class="coin.change >= 0 ? 'bg-[#0B9A47]' : 'bg-red-500'"></div>
                  <span class="text-slate-900 font-extrabold">{{ coin.code }}/USDT</span>
                </div>
                <div class="text-right">
                  <span class="font-mono block text-slate-800">${{ formatNumber(coin.price, coin.code === 'BTC' ? 1 : 2) }}</span>
                  <span class="text-[10px] block" :class="coin.change >= 0 ? 'text-[#0B9A47]' : 'text-red-500'">{{ coin.change >= 0 ? '+' : '' }}{{ coin.change }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Price & Performance Indicators -->
          <div class="flex items-baseline gap-2 font-mono">
            <span class="text-xl font-extrabold tracking-tight" :class="activeCoin.change >= 0 ? 'text-[#0B9A47]' : 'text-red-500'">
              {{ formatNumber(activeCoin.price, selectedCoinCode === 'BTC' ? 1 : 2) }}
            </span>
            <span class="text-xs font-bold" :class="activeCoin.change >= 0 ? 'text-[#0B9A47]' : 'text-red-500'">
              {{ activeCoin.change >= 0 ? '+' : '' }}{{ activeCoin.change }}%
            </span>
          </div>
        </div>

        <!-- Contract Funding Rate Details and Timeframe (Middle-Right) -->
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-400 text-xs font-medium">
          <div class="flex flex-col md:text-right pr-4 border-r border-slate-150 leading-none">
            <span class="text-[10px] text-slate-400 font-bold block mb-1 font-sans">资金费率 / 倒计时</span>
            <span class="text-slate-800 font-mono font-bold text-[11px]">-0.0059% / 04:45:38</span>
          </div>

          <!-- Timeframe Selectors Section -->
          <div class="flex items-center bg-slate-50 p-0.5 rounded-lg border border-slate-100 select-none">
            <button 
              v-for="tf in timeframes" 
              :key="tf"
              @click="activeTimeframe = tf"
              style="font-size: 11px; font-weight: 400 !important;"
              class="px-1.5 py-0.5 rounded-md transition-all focus:outline-none cursor-pointer"
              :class="activeTimeframe === tf ? 'bg-[#1A7A3E] text-white shadow-3xs' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'"
            >
              {{ tf }}
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- ==================== MAIN THREE-COLUMN WORKSPACE ==================== -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-5">
      <div class="grid grid-cols-12 gap-5">
        
        <!-- PANEL 1: LEFT SIDE (Trading form, span 3) -->
        <div class="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col justify-between bg-white border border-slate-100 rounded-lg p-4 shadow-xs">
          <div>
            
            <!-- Open / Close position tabs -->
            <div class="grid grid-cols-2 bg-slate-50/60 rounded p-0.5 mb-4 border border-slate-100">
              <button 
                class="text-center py-2 text-xs font-black rounded-xs cursor-pointer transition-all focus:outline-none" 
                :class="tradeType === 'OPEN' ? 'bg-[#1A7A3E] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 bg-transparent'"
                @click="tradeType = 'OPEN'"
              >
                开仓
              </button>
              <button 
                class="text-center py-2 text-xs font-black rounded-xs cursor-pointer transition-all focus:outline-none" 
                :class="tradeType === 'CLOSE' ? 'bg-slate-150 text-[#1e293b] font-black' : 'text-slate-400 hover:text-slate-600 bg-transparent'"
                @click="store.triggerToast('请在右方[仓位列表]一键平指定头寸。')"
              >
                平仓
              </button>
            </div>

            <!-- Margin Selection & Leverage selectors -->
            <div class="grid grid-cols-2 gap-2 mb-4 select-none font-sans">
              <!-- Margin mode select -->
              <div class="relative">
                <div @click="showMarginMenu = !showMarginMenu" class="bg-white border border-slate-200 rounded px-2.5 py-2 text-xs font-bold text-slate-800 flex justify-between items-center cursor-pointer">
                  <span>{{ marginMode === 'CROSS' ? '全仓' : '逐仓' }}</span>
                  <span class="text-[7px] text-slate-400">▼</span>
                </div>
                <div v-if="showMarginMenu" class="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-150 rounded shadow-lg py-1 z-50 text-xs font-bold text-slate-850 animate-fade-in">
                  <div @click="marginMode = 'CROSS'; showMarginMenu = false" class="px-3 py-2 hover:bg-slate-50 cursor-pointer">全仓</div>
                  <div @click="marginMode = 'ISOLATED'; showMarginMenu = false" class="px-3 py-2 hover:bg-slate-50 cursor-pointer">逐仓</div>
                </div>
              </div>

              <!-- Leverage selector -->
              <div class="relative">
                <div @click="showLeverageMenu = !showLeverageMenu" class="bg-white border border-slate-200 rounded px-2.5 py-2 text-xs font-black text-slate-800 flex justify-between items-center cursor-pointer">
                  <span>{{ leverage }}X</span>
                  <span class="text-[7.5px] text-slate-400">▼</span>
                </div>
                <div v-if="showLeverageMenu" class="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-150 rounded shadow-lg py-1 z-50 text-xs font-mono text-slate-850 animate-fade-in">
                  <div v-for="lev in [4, 10, 20, 50, 100]" :key="lev" @click="leverage = lev; showLeverageMenu = false" class="px-3 py-2 hover:bg-slate-50 cursor-pointer font-bold">{{ lev }}x</div>
                </div>
              </div>
            </div>

            <!-- Order pricing type dropdown -->
            <div class="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-bold text-slate-500 flex justify-between items-center mb-4 select-none">
              <span>限价单 <span class="text-[10px] text-slate-400 font-normal">ⓘ</span></span>
              <span class="text-[7.5px] text-slate-400">▼</span>
            </div>

            <!-- Price input field with BBO best price locker -->
            <div class="mb-4">
              <span class="text-[11px] text-slate-400 font-bold block mb-1">价格 (USDT)</span>
              <div class="bg-white border border-slate-200 rounded pl-2.5 pr-1.5 py-1 focus-within:border-[#1A7A3E] transition-all flex items-center justify-between">
                <input 
                  type="number" 
                  step="any" 
                  class="w-full bg-transparent border-none text-[15px] font-bold text-slate-800 outline-none font-mono py-0.5" 
                  v-model="tradePrice" 
                />
                <button @click="tradePrice = activeCoin.price" class="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0B9A47] font-black text-[10px] px-2.5 py-1 rounded shadow-xs shrink-0 select-none focus:outline-none">
                  BBO
                </button>
              </div>
            </div>

            <!-- Quantity unit margin input -->
            <div class="mb-4">
              <span class="text-[11px] text-slate-400 font-bold block mb-1">仓位本金 (USDT)</span>
              <div class="bg-white border border-slate-200 rounded px-2.5 py-1.5 focus-within:border-[#1A7A3E] transition-all flex items-center justify-between">
                <input 
                  type="number" 
                  step="any" 
                  class="w-full bg-transparent border-none text-[15px] font-bold text-slate-800 outline-none font-mono py-0.5" 
                  v-model="marginAmount" 
                  placeholder="0.00" 
                />
                <span class="text-xs font-bold text-slate-400 font-sans tracking-wide pr-1 select-none">USDT</span>
              </div>
            </div>

            <!-- Dot progress slider shortcut buttons (0% , 25%, 50%, 75%, 100%) -->
             <!-- Shortcuts selection (0%, 25%, 50%, 75%, 100%) arranged nicely -->
            <div class="grid grid-cols-5 gap-2 mb-4 select-none">
              <button 
                v-for="pct in [0, 25, 50, 75, 100]" 
                :key="pct"
                @click="applyRatio(pct)"
                style="font-size: 11px; font-weight: 400 !important;"
                class="py-1 rounded-md transition-all border text-center focus:outline-none cursor-pointer"
                :class="ratioPercent === pct 
                  ? 'border-emerald-200 text-emerald-600 bg-emerald-50 shadow-3xs' 
                  : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'"
              >
                {{ pct }}%
              </button>
            </div>

            <!-- Checkbox TP/SL -->
            <div class="mb-4">
              <div 
                @click="showTpSl = !showTpSl" 
                class="flex items-center justify-between text-xs font-bold text-slate-500 cursor-pointer select-none py-1 hover:text-slate-800"
              >
                <div class="flex items-center gap-1.5">
                  <input type="checkbox" :checked="showTpSl" @click.stop class="w-3.5 h-3.5 accent-[#1A7A3E]" />
                  <span>止盈 / 止损</span>
                </div>
                <svg :class="{'rotate-180': showTpSl}" class="w-3.5 h-3.5 text-slate-400 transition-all" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>

              <div v-show="showTpSl" class="mt-2.5 space-y-2 border-t border-slate-50 pt-2.5 animate-slide-down">
                <div class="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span class="text-slate-400 block mb-0.5">止盈触发价</span>
                    <input type="number" placeholder="价格" class="w-full bg-slate-50 border border-slate-150 rounded px-2 py-1 text-xs font-bold text-slate-800 outline-none" v-model="takeProfitVal" />
                  </div>
                  <div>
                    <span class="text-slate-400 block mb-0.5">止损触发价</span>
                    <input type="number" placeholder="价格" class="w-full bg-slate-50 border border-slate-150 rounded px-2 py-1 text-xs font-bold text-slate-800 outline-none" v-model="stopLossVal" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom execution details -->
          <div class="pt-2 border-t border-slate-50">
            <div class="text-[11px] text-slate-400 space-y-2 mb-3.5 font-bold leading-none">
              <!-- Available Balance group -->
              <div class="flex justify-between items-center bg-slate-50 p-2 rounded-sm border border-slate-100">
                <span>可用</span>
                <span class="text-slate-800 font-mono font-extrabold flex items-center gap-1">
                  ${{ formatNumber(store.balances.futures, 2) }} USDT
                  <span class="text-[#0B9A47] text-sm leading-none cursor-pointer px-0.5 select-none hover:opacity-80" @click="store.openDepositModal()">⊕</span>
                </span>
              </div>
              <div class="flex justify-between px-1">
                <span>最大可买</span>
                <span class="text-slate-700 font-mono font-bold">{{ formatNumber((store.balances.futures * leverage) / (parseFloat(tradePrice) || activeCoin.price), 5) }} {{ selectedCoinCode }}</span>
              </div>
            </div>

            <!-- Double stacked long/short contract buttons -->
            <div class="flex flex-col gap-2">
              <button @click="openPosition('LONG')" class="w-full bg-[#0B9A47] hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-md shadow-xs text-center cursor-pointer focus:outline-none transition-all tracking-wide">
                开多 (看涨)
              </button>
              
              <div class="text-[10px] font-bold text-slate-400 text-center leading-none my-0.5 select-none">可用 0 {{ selectedCoinCode }}</div>

              <button @click="openPosition('SHORT')" class="w-full bg-red-600 hover:bg-red-750 text-white font-extrabold text-xs py-3 rounded-md shadow-xs text-center cursor-pointer focus:outline-none transition-all tracking-wide">
                开空 (看跌)
              </button>
            </div>
          </div>
        </div>

        <!-- PANEL 2: CENTER WORKSPACE (Candlestick chart & Tabs, span 6) -->
        <div class="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col gap-5">
            
          <!-- Upper K line chart container -->
          <div class="bg-white border border-slate-100 rounded-lg p-4 shadow-xs relative overflow-hidden" id="chart-container">
            <div class="flex justify-between items-center mb-2.5">
              <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">K线走势图框架</span>
              
              <!-- Hover OHLC HUD indicators -->
              <div v-if="hoveredCandle" class="hidden md:flex gap-3 text-[10px] font-bold text-slate-500 font-mono border border-slate-100 bg-slate-50/70 p-1 px-2.5 rounded">
                <span>O: <span class="text-slate-700">{{ formatNumber(hoveredCandle.open, 1) }}</span></span>
                <span>H: <span class="text-slate-700">{{ formatNumber(hoveredCandle.high, 1) }}</span></span>
                <span>L: <span class="text-slate-700">{{ formatNumber(hoveredCandle.low, 1) }}</span></span>
                <span>C: <span class="text-slate-700">{{ formatNumber(hoveredCandle.close, 1) }}</span></span>
                <span>Vol: <span class="text-[#0B9A47]">{{ formatNumber(hoveredCandle.volume, 0) }}</span></span>
              </div>
              <div v-else class="text-[10px] font-bold text-slate-400 font-mono">
                <span>鼠标悬停K线获取详细OHLC指标</span>
              </div>
            </div>

            <!-- SVG Candlestick Graph -->
            <div 
              class="relative select-none" 
              style="height: 280px;"
              @mousemove="onChartMouseMove"
              @mouseleave="onChartMouseLeave"
              ref="chartSvgContainer"
            >
              <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <!-- GRID AXIS BACKDROP LINES (Horizontal) -->
                <line v-for="gridVal in horizontalGrids" :key="gridVal.y" x1="0" :y1="gridVal.y" x2="100%" :y2="gridVal.y" stroke="#F1F5F9" stroke-width="1.2" stroke-dasharray="2 3" />
                
                <!-- Coordinate Tick labels on the right side -->
                <text 
                  v-for="gridVal in horizontalGrids" 
                  :key="'lbl-'+gridVal.y" 
                  x="98%" 
                  :y="gridVal.y - 6" 
                  text-anchor="end" 
                  class="fill-slate-400 text-[10px] font-bold font-mono"
                >
                  {{ formatNumber(gridVal.price, 0) }}
                </text>

                <!-- CANDLESTICKS rendering -->
                <g v-for="(c, idx) in currentTimeframeData" :key="idx">
                  <!-- Wick Lines (High to Low) -->
                  <line 
                    :x1="getXPos(idx)" 
                    :y1="getYPos(c.high)" 
                    :x2="getXPos(idx)" 
                    :y2="getYPos(c.low)" 
                    :stroke="c.close >= c.open ? '#10B981' : '#EF4444'" 
                    stroke-width="1.5" 
                  />
                  <!-- Real body rect -->
                  <rect 
                    :x="getXPos(idx) - candleWidth/2" 
                    :y="getYPos(Math.max(c.open, c.close))" 
                    :width="candleWidth" 
                    :height="Math.max(2, Math.abs(getYPos(c.open) - getYPos(c.close)))" 
                    :fill="c.close >= c.open ? '#10B981' : '#EF4444'" 
                    :stroke="c.close >= c.open ? '#10B981' : '#EF4444'"
                    stroke-width="0.5"
                    class="transition-all hover:opacity-85"
                  />
                </g>

                <!-- Crosshair vertical/horizontal line on Hover tracking -->
                <g v-if="crosshairsVisible">
                  <!-- Vertical Cross Line -->
                  <line 
                    :x1="crosshairX" 
                    y1="0" 
                    :x2="crosshairX" 
                    y2="250" 
                    stroke="#CBD5E1" 
                    stroke-width="1" 
                    stroke-dasharray="3 3" 
                  />
                  <!-- Horizontal Cross Line -->
                  <line 
                    x1="0" 
                    :y1="crosshairY" 
                    x2="100%" 
                    :y2="crosshairY" 
                    stroke="#CBD5E1" 
                    stroke-width="1" 
                    stroke-dasharray="3 3" 
                  />
                  <circle 
                    :cx="crosshairX" 
                    :cy="crosshairY" 
                    r="4.5" 
                    fill="#1A7A3E" 
                    stroke="#FFFFFF" 
                    stroke-width="2" 
                    class="shadow-sm" 
                  />
                </g>

                <!-- X Axis label timestamps row on the bottom -->
                <g v-for="(lbl, i) in bottomAxisLabels" :key="'ax-'+i">
                  <text 
                    :x="lbl.x" 
                    y="272" 
                    text-anchor="middle" 
                    class="fill-slate-400 text-[10px] font-bold font-mono"
                  >
                    {{ lbl.text }}
                  </text>
                  <line :x1="lbl.x" y1="252" :x2="lbl.x" y2="257" stroke="#E2E8F0" stroke-width="1.2" />
                </g>

                <line x1="0" y1="252" x2="100%" y2="252" stroke="#E2E8F0" stroke-width="1.5" />
              </svg>
            </div>
          </div>

          <!-- Bottom positions and orders list -->
          <div class="bg-white border border-slate-100 rounded-lg p-4 shadow-xs">
            <div class="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-3.5">
              <div class="flex gap-4 select-none">
                <button 
                  @click="activeListTab = 'POSITIONS'"
                  style="font-size: 11.5px; font-weight: 400 !important;"
                  class="pb-1.5 border-b-2 transition-all focus:outline-none cursor-pointer"
                  :class="activeListTab === 'POSITIONS' ? 'border-[#1A7A3E] text-[#1A7A3E]' : 'border-transparent text-slate-400 hover:text-slate-700'"
                >
                  仓位 ({{ store.positions.length + 1 }})
                </button>
                <button 
                  @click="activeListTab = 'PENDINGS'"
                  style="font-size: 11.5px; font-weight: 400 !important;"
                  class="pb-1.5 border-b-2 transition-all focus:outline-none cursor-pointer"
                  :class="activeListTab === 'PENDINGS' ? 'border-[#1A7A3E] text-[#1A7A3E]' : 'border-transparent text-slate-400 hover:text-slate-700'"
                >
                  委托 (0)
                </button>
                <button 
                  @click="activeListTab = 'ROBOTS'"
                  style="font-size: 11.5px; font-weight: 400 !important;"
                  class="pb-1.5 border-b-2 transition-all focus:outline-none cursor-pointer"
                  :class="activeListTab === 'ROBOTS' ? 'border-[#1A7A3E] text-[#1A7A3E]' : 'border-transparent text-slate-400 hover:text-slate-700'"
                >
                  机器人 (0)
                </button>
              </div>
              <button @click="store.triggerToast('一键导出全部物理套保契合证明单...')" class="text-slate-400 hover:text-[#1A7A3E] transition-colors focus:outline-none" title="一键导出证明">
                <i class="fa-solid fa-file-export text-[14px]"></i>
              </button>
            </div>

            <!-- Position Cards tab content -->
            <div class="space-y-4">
              <div v-if="activeListTab === 'POSITIONS'" class="space-y-4">
                
                <!-- IMAGE 2 MOCKUP POSITION CARD (Exact match) -->
                <div class="bg-white border border-slate-150 rounded-lg p-4 shadow-none text-xs">
                  <!-- Header bar of card: "买 BTCUSDT 永续 全仓 4X" and share button -->
                  <div class="flex justify-between items-center mb-3 select-none">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="bg-[#10B981] text-white text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none shrink-0">买</span>
                      <span class="text-[14px] font-black text-slate-900 tracking-tight">BTCUSDT</span>
                      <span class="text-[9px] font-black text-slate-400 bg-slate-50 px-1 py-0.5 rounded uppercase font-mono">永续</span>
                      <span class="text-[9px] font-black bg-emerald-50 text-[#09803B] px-1.5 py-0.5 rounded font-mono">全仓 4X</span>
                    </div>
                    
                    <button @click="store.triggerToast('已建立结算套期盈亏确认单，支持物理对冲挂保。')" class="text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none scale-90" title="对冲证明关系">
                      <i class="fa-solid fa-share-nodes text-[14px]"></i>
                    </button>
                  </div>

                  <!-- Row 1: PNL & ROI bold RED as depicted -->
                  <div class="grid grid-cols-2 gap-4 mb-3 pb-3 border-b border-dashed border-slate-100">
                    <div>
                      <span class="text-[10px] text-slate-400 font-extrabold block uppercase tracking-wide">盈亏 (USDT)</span>
                      <span class="text-lg font-black text-red-500 font-mono tracking-tight block mt-0.5">-6.34</span>
                    </div>
                    <div class="text-right font-mono">
                      <span class="text-[10px] text-slate-400 font-extrabold block uppercase tracking-wide">回报率</span>
                      <span class="text-lg font-black text-red-500 tracking-tight block mt-0.5">-10.51%</span>
                    </div>
                  </div>

                  <!-- Stats grid 1: Size, Margin, Margin Percent row -->
                  <div class="grid grid-cols-3 gap-2 mb-2 pb-2 text-slate-500 font-semibold leading-none text-[10px]">
                    <div>
                      <span class="text-slate-400 block mb-1">持仓数量 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">241.17</span>
                    </div>
                    <div class="text-center">
                      <span class="text-slate-400 block mb-1">保证金 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">60.28</span>
                    </div>
                    <div class="text-right">
                      <span class="text-slate-400 block mb-1">保证金比率</span>
                      <span class="text-[#0B9A47] font-black font-mono text-xs">0.99%</span>
                    </div>
                  </div>

                  <!-- Stats grid 2: Entry Price, Mark Price, Liq Price row -->
                  <div class="grid grid-cols-3 gap-2 mb-3.5 pt-2 border-t border-slate-50 text-slate-500 font-semibold leading-none text-[10px]">
                    <div>
                      <span class="text-slate-400 block mb-1">开仓价格 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">2,190.29</span>
                    </div>
                    <div class="text-center">
                      <span class="text-slate-400 block mb-1">标记价格 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">{{ formatNumber(activeCoin.price, 1) }}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-slate-400 block mb-1">强平价格 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">1,280.40</span>
                    </div>
                  </div>

                  <!-- Realized PNL subcard -->
                  <div class="flex justify-between items-center bg-slate-50/75 border border-slate-100 p-2.5 rounded mb-3 text-[10px]">
                    <span class="text-slate-400 font-bold">实现盈亏 (USDT)</span>
                    <div class="flex items-center gap-1 font-mono font-black text-red-500 cursor-pointer" @click="store.triggerToast('拉取质押保证金托管交易手续费账单...')">
                      <span>-0.29</span>
                      <span class="text-[8.5px] text-slate-400 font-normal">&gt;</span>
                    </div>
                  </div>

                  <!-- Bottom action outline buttons of the card -->
                  <div class="grid grid-cols-3 gap-2 select-none">
                    <button @click="store.triggerToast('更改成交杠杆倍数')" class="text-center py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-[11px] rounded transition-all focus:outline-none">
                      杠杆
                    </button>
                    <button @click="store.triggerToast('配置独立止盈SL / 止损TP门限')" class="text-center py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-[11px] rounded transition-all focus:outline-none">
                      止盈/止损
                    </button>
                    <button @click="store.triggerToast('此模拟头寸不可平除。')" class="text-center py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-[11px] rounded transition-all focus:outline-none">
                      平仓
                    </button>
                  </div>
                </div>

                <!-- DYNAMIC REGISTERED USER POSITIONS -->
                <div v-for="pos in store.positions" :key="pos.id" class="bg-white border border-slate-200 rounded-lg p-4 shadow-none text-xs">
                  <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center gap-1.5 flex-wrap select-none">
                      <span class="text-[9.5px] font-black px-1.5 py-0.5 rounded leading-none shrink-0 text-white" :class="pos.side === 'LONG' ? 'bg-[#10B981]' : 'bg-red-500'">
                        {{ pos.side === 'LONG' ? '买' : '卖' }}
                      </span>
                      <span class="text-[14px] font-black text-slate-900 tracking-tight">{{ pos.coin }}USDT</span>
                      <span class="text-[9px] font-black text-slate-400 bg-slate-50 px-1 py-0.5 rounded uppercase font-mono">永续</span>
                      <span class="text-[9px] font-black px-1.5 py-0.5 rounded font-mono" :class="pos.side === 'LONG' ? 'bg-emerald-50 text-[#09803B]' : 'bg-red-50 text-red-500'">
                        {{ pos.marginType }} {{ pos.leverage }}X
                      </span>
                    </div>
                    <button @click="closePosition(pos.id)" class="text-[10px] text-red-500 font-bold hover:underline select-none focus:outline-none">一键平仓 &times;</button>
                  </div>

                  <div class="grid grid-cols-2 gap-4 mb-3 pb-3 border-b border-dashed border-slate-100 font-mono">
                    <div>
                      <span class="text-[10px] text-slate-400 font-bold block">盈亏 (USDT)</span>
                      <span class="text-lg font-black tracking-tight block mt-0.5" :class="calculatePNL(pos) >= 0 ? 'text-[#0B9A47]' : 'text-red-500'">
                        {{ calculatePNL(pos) >= 0 ? '+' : '' }}{{ formatNumber(calculatePNL(pos), 2) }}
                      </span>
                    </div>
                    <div class="text-right font-mono">
                      <span class="text-[10px] text-slate-400 font-bold block">回报率</span>
                      <span class="text-lg font-black tracking-tight block mt-0.5" :class="calculatePNL(pos) >= 0 ? 'text-[#0B9A47]' : 'text-red-500'">
                        {{ calculatePNL(pos) >= 0 ? '+' : '' }}{{ formatNumber((calculatePNL(pos)/pos.margin)*100, 2) }}%
                      </span>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-2 mb-2 pb-2 text-slate-500 font-semibold leading-none text-[10px]">
                    <div>
                      <span class="text-slate-400 block mb-1">持仓数量 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">{{ formatNumber(pos.margin * pos.leverage, 2) }}</span>
                    </div>
                    <div class="text-center">
                      <span class="text-slate-400 block mb-1">保证金 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">{{ formatNumber(pos.margin, 2) }}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-slate-400 block mb-1">保证金比率</span>
                      <span class="text-[#0B9A47] font-black font-mono text-xs">0.99%</span>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-2 mb-3.5 pt-2 border-t border-slate-50 text-slate-500 font-semibold leading-none text-[10px]">
                    <div>
                      <span class="text-slate-400 block mb-1">开仓价格 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">{{ formatNumber(pos.entryPrice, 2) }}</span>
                    </div>
                    <div class="text-center">
                      <span class="text-slate-400 block mb-1">标记最新价 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">{{ formatNumber(getCurrentCoinPrice(pos.coin), 2) }}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-slate-400 block mb-1">强平价格 (USDT)</span>
                      <span class="text-slate-800 font-black font-mono text-xs">{{ formatNumber(pos.liqPrice, 2) }}</span>
                    </div>
                  </div>
                  
                  <button @click="closePosition(pos.id)" class="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 font-extrabold text-xs text-slate-700 rounded transition-all focus:outline-none">
                    平仓退出保证金托管
                  </button>
                </div>

              </div>

              <!-- OTHER TABS -->
              <div v-else-if="activeListTab === 'PENDINGS'" class="flex flex-col items-center justify-center py-10 text-center select-none text-slate-400">
                <div class="text-xs font-bold text-slate-500">当前没有处于挂单状态当中的限价对口委托。</div>
              </div>

              <div v-else-if="activeListTab === 'ROBOTS'" class="flex flex-col items-center justify-center py-10 text-center select-none text-slate-400">
                <div class="text-xs font-bold text-slate-500">绿色后台永续对冲策略暂未加载自动化执行脚本。</div>
              </div>
            </div>

          </div>
        </div>

        <!-- PANEL 3: RIGHT PANEL (Order Book & Depth sentiment details, span 3) -->
        <div class="col-span-12 md:col-span-12 lg:col-span-3 flex flex-col justify-between bg-white border border-slate-100 rounded-lg p-3.5 shadow-xs">
          <div>
            
            <!-- Depth Headers -->
            <div class="flex justify-between text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2.5 select-none font-sans">
              <span>价格 (USDT)</span>
              <span class="text-right">数量 ({{ selectedCoinCode }})</span>
            </div>

            <!-- ASKS details (sells) - Prices in GREEN -->
            <div class="space-y-[3px]">
              <div 
                v-for="(row, idx) in asksBook" 
                :key="'ask-' + idx" 
                class="flex justify-between items-center text-[11px] font-bold font-mono h-[19px] relative overflow-hidden"
              >
                <div class="absolute right-0 top-0 bottom-0 bg-[#10B981]/[0.08] transition-all" :style="{ width: (row.amount * 35) + '%' }"></div>
                
                <span class="text-[#0B9A47] z-10">{{ formatNumber(row.price, selectedCoinCode === 'BTC' ? 1 : 2) }}</span>
                <span class="text-slate-500 z-10 text-right">{{ formatNumber(row.amount, selectedCoinCode === 'BTC' ? 6 : 4) }}</span>
              </div>
            </div>

            <!-- Index mid row -->
            <div class="my-4 py-3 bg-slate-50 border-t border-b border-slate-100 rounded flex flex-col items-center justify-center select-none text-center">
              <span class="text-lg font-black text-[#0B9A47] tracking-tight font-mono leading-none flex items-center gap-1">
                {{ formatNumber(activeCoin.price, selectedCoinCode === 'BTC' ? 1 : 2) }}
                <svg class="w-4 h-4 text-[#0B9A47]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span class="text-[10px] text-slate-400 font-extrabold font-mono mt-1 tracking-wider leading-none">
                ≈ ¥{{ formatNumber(activeCoin.price * 7.23, 1) }}
              </span>
            </div>

            <!-- BIDS details (buys) - Prices in RED -->
            <div class="space-y-[3px]">
              <div 
                v-for="(row, idx) in bidsBook" 
                :key="'bid-' + idx" 
                class="flex justify-between items-center text-[11px] font-bold font-mono h-[19px] relative overflow-hidden"
              >
                <div class="absolute right-0 top-0 bottom-0 bg-red-500/[0.08] transition-all" :style="{ width: (row.amount * 40) + '%' }"></div>
                
                <span class="text-red-500 z-10">{{ formatNumber(row.price, selectedCoinCode === 'BTC' ? 1 : 2) }}</span>
                <span class="text-slate-500 z-10 text-right">{{ formatNumber(row.amount, selectedCoinCode === 'BTC' ? 6 : 4) }}</span>
              </div>
            </div>

          </div>

          <!-- Bottom indicators -->
          <div class="pt-4 border-t border-slate-50 font-sans">
              
            <!-- Volume Sentiment proportions -->
            <div class="select-none">
              <div class="flex justify-between text-[10px] font-extrabold text-slate-500 tracking-wider mb-1.5 leading-none">
                <span class="text-[#0B9A47]">B 51%</span>
                <span class="text-red-500">49% S</span>
              </div>
              <div class="w-full h-1.5 rounded-full flex overflow-hidden bg-slate-100">
                <div class="bg-[#0B9A47] h-full transition-all" style="width: 51%"></div>
                <div class="bg-red-500 h-full transition-all" style="width: 49%"></div>
              </div>
            </div>

            <!-- Scale selectors -->
            <div class="flex justify-between items-center mt-3 select-none">
              <div 
                @click="store.triggerToast('更改合约指数成交精度')" 
                class="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded px-2.5 py-1 text-[10px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>0.1精度</span>
                <span class="text-[7.5px] text-slate-400">▼</span>
              </div>
              <button 
                @click="store.triggerToast('切换单/双侧深度簿展示')" 
                class="text-slate-450 hover:text-slate-800 bg-slate-50 p-1.5 rounded border border-slate-200/30 transition-all focus:outline-none"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { store } from '../store';

// Core State Variables
const selectedCoinCode = ref('BTC');
const tradeType = ref('OPEN');
const marginMode = ref('CROSS');
const leverage = ref(4);
const tradePrice = ref(77410.9);
const marginAmount = ref('');
const ratioPercent = ref(0);

// Menu states
const showCoinMenu = ref(false);
const showLeverageMenu = ref(false);
const showMarginMenu = ref(false);
const showTpSl = ref(false);
const activeListTab = ref('POSITIONS');
const activeTimeframe = ref('1h');

// TP/SL numeric triggering prices
const takeProfitVal = ref('');
const stopLossVal = ref('');

const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d', '1w'];

// SVG Chart Hover Tracking Setup
const chartSvgContainer = ref(null);
const crosshairsVisible = ref(false);
const crosshairX = ref(0);
const crosshairY = ref(0);
const hoveredCandle = ref(null);

const activeCoin = computed(() => {
  const coin = store.coins.find(c => c.code === selectedCoinCode.value);
  return coin || { code: 'BTC', price: 77502.2, change: 0.33, vol: '20.6亿' };
});

const getCurrentCoinPrice = (code) => {
  const c = store.coins.find(co => co.code === code);
  return c ? c.price : 77502.2;
};

// Sync inputs when active coin evolves
watch(selectedCoinCode, (newCode) => {
  const price = store.coins.find(c => c.code === newCode)?.price || 77410.9;
  tradePrice.value = Number(price.toFixed(newCode === 'BTC' ? 1 : 2));
  marginAmount.value = '';
  ratioPercent.value = 0;
});

const selectCoin = (coin) => {
  selectedCoinCode.value = coin.code;
  showCoinMenu.value = false;
};

const applyRatio = (pct) => {
  ratioPercent.value = pct;
  const availableBal = store.balances.futures;
  marginAmount.value = pct > 0 ? Number((availableBal * (pct / 100)).toFixed(2)) : '';
};

// SVG Candlestick layout options
const totalCandles = 32;
const candleWidth = 7.5;
const svgChartWidth = ref(540);

const getXPos = (idx) => {
  const gap = svgChartWidth.value / (totalCandles + 1);
  return gap * (idx + 1);
};

// Timeframe random seed data generators inside SVG Candlestick Chart
const timeframesSeeds = {
  '1m': [77410.2, 77420.4, 73, 77415.5],
  '5m': [77420.1, 77450.9, 142, 77433.2],
  '15m': [77435.9, 77470.3, 115, 77443.3],
  '1h': [77410.9, 77496.3, 95, 77410.9],
  '4h': [77320.5, 77520.9, 218, 77410.9],
  '1d': [76512.4, 78591.2, 1204, 77410.9],
  '1w': [72200.0, 81525.0, 5493, 77410.9]
};

// Reactive candlestick array computed per selected period
const currentTimeframeData = computed(() => {
  const seed = timeframesSeeds[activeTimeframe.value] || [77410.9, 77496.3, 95, 77410.9];
  const refPrice = activeCoin.value.price;
  
  // Create a beautiful sin wave style curve matching Image 1
  return Array.from({ length: totalCandles }, (_, idx) => {
    const xTerm = idx / (totalCandles - 1);
    const waveOffset = Math.sin(xTerm * Math.PI) * (refPrice * 0.015);
    const noise = Math.sin(idx * 2) * (refPrice * 0.005) + Math.cos(idx * 5) * (refPrice * 0.002);
    
    const basePrice = refPrice - waveOffset + noise;
    
    // Create logical Open, High, Low, Close
    const spread = refPrice * (0.001 + Math.random() * 0.0035);
    const o = Number((basePrice - spread * (Math.random() * 2 - 1)).toFixed(1));
    const c = Number((basePrice + (o - basePrice) * (Math.random() * 0.6 - 0.3)).toFixed(1));
    const h = Number((Math.max(o, c) + spread * Math.random()).toFixed(1));
    const l = Number((Math.min(o, c) - spread * Math.random()).toFixed(1));
    const vol = Math.floor(Math.random() * 320 + 35);

    return { open: o, high: h, low: l, close: c, volume: vol };
  });
});

// Dynamic Price Extremes for SVG alignment
const chartPriceRange = computed(() => {
  const candles = currentTimeframeData.value;
  if (!candles.length) return { max: 80000, min: 75000 };
  const hVals = candles.map(v => v.high);
  const lVals = candles.map(v => v.low);
  const maxVal = Math.max(...hVals);
  const minVal = Math.min(...lVals);
  const padding = (maxVal - minVal) * 0.15 || 100;
  return { max: maxVal + padding, min: minVal - padding };
});

const getYPos = (val) => {
  const { max, min } = chartPriceRange.value;
  const range = max - min;
  if (!range) return 125;
  return 15 + ((max - val) / range) * 220;
};

// Horizontal coordinates grids
const horizontalGrids = computed(() => {
  const { max, min } = chartPriceRange.value;
  const steps = 5;
  return Array.from({ length: steps }, (_, idx) => {
    const fraction = idx / (steps - 1);
    const p = max - fraction * (max - min);
    return { y: getYPos(p), price: Number(p.toFixed(0)) };
  });
});

// Bottom dates timestamps
const bottomAxisLabels = computed(() => {
  const labels = ['00:00', '02:00', '05:00', '07:00', '10:00', '12:00'];
  return labels.map((text, i) => {
    const idx = Math.min(Math.floor((i / (labels.length - 1)) * totalCandles), totalCandles - 1);
    return { x: getXPos(idx), text };
  });
});

// Chart Mouse Event Interactivity
const onChartMouseMove = (e) => {
  if (!chartSvgContainer.value) return;
  const rect = chartSvgContainer.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  svgChartWidth.value = rect.width;

  const gap = svgChartWidth.value / (totalCandles + 1);
  const idx = Math.max(0, Math.min(Math.floor((mouseX / gap) - 0.5), totalCandles - 1));
  
  if (idx >= 0 && idx < totalCandles) {
    const c = currentTimeframeData.value[idx];
    crosshairX.value = getXPos(idx);
    crosshairY.value = getYPos(c.close);
    hoveredCandle.value = c;
    crosshairsVisible.value = true;
  }
};

const onChartMouseLeave = () => {
  crosshairsVisible.value = false;
  hoveredCandle.value = null;
};

// Order book scaling mocks mirroring Image 1 exactly when coin is 'BTC'
const asksBook = computed(() => {
  const basePrice = activeCoin.value.price;
  if (selectedCoinCode.value === 'BTC') {
    return [
      { price: 77499.2, amount: 2.306573 },
      { price: 77498.8, amount: 0.545342 },
      { price: 77498.4, amount: 1.042393 },
      { price: 77498.0, amount: 1.918542 },
      { price: 77497.6, amount: 1.344169 },
      { price: 77497.2, amount: 1.814804 },
      { price: 77496.8, amount: 1.180912 },
      { price: 77496.4, amount: 1.165682 }
    ];
  }
  return Array.from({ length: 8 }, (_, i) => ({
    price: Number((basePrice * (1 + (8 - i) * 0.0002)).toFixed(2)),
    amount: (Math.random() * 5 + 0.1)
  }));
});

const bidsBook = computed(() => {
  const basePrice = activeCoin.value.price;
  if (selectedCoinCode.value === 'BTC') {
    return [
      { price: 77496.2, amount: 0.883423 },
      { price: 77495.8, amount: 1.011245 },
      { price: 77495.4, amount: 1.127092 },
      { price: 77495.0, amount: 0.900751 },
      { price: 77494.6, amount: 2.139320 },
      { price: 77494.2, amount: 1.635160 },
      { price: 77493.8, amount: 1.517904 },
      { price: 77493.4, amount: 0.128255 }
    ];
  }
  return Array.from({ length: 8 }, (_, i) => ({
    price: Number((basePrice * (1 - (i + 1) * 0.0002)).toFixed(2)),
    amount: (Math.random() * 5 + 0.1)
  }));
});

// Watch resize dynamically
let resizeObserver = null;
onMounted(() => {
  if (chartSvgContainer.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        svgChartWidth.value = entry.contentRect.width;
      }
    });
    resizeObserver.observe(chartSvgContainer.value);
  }
});

onUnmounted(() => {
  if (resizeObserver && chartSvgContainer.value) {
    resizeObserver.unobserve(chartSvgContainer.value);
  }
});

// Operations callbacks
const calculatePNL = (pos) => {
  const currentPrice = getCurrentCoinPrice(pos.coin);
  const diff = currentPrice - pos.entryPrice;
  const contractsSize = (pos.margin * pos.leverage) / pos.entryPrice;
  return pos.side === 'LONG' ? diff * contractsSize : -diff * contractsSize;
};

const openPosition = (side) => {
  const mAmount = parseFloat(marginAmount.value);
  if (isNaN(mAmount) || mAmount <= 0) {
    store.triggerToast('⚠️ 请输入正确的开仓对冲保证金份额。');
    return;
  }
  
  if (store.balances.futures < mAmount) {
    store.triggerToast('⚠️ 合约等值保障账户余额不足！请点击 ⊕ 对冲充值。');
    return;
  }
  
  store.balances.futures = Number((store.balances.futures - mAmount).toFixed(2));
  
  const currentPrice = parseFloat(tradePrice.value) || activeCoin.value.price;
  const liqMultiplier = side === 'LONG' ? (1 - 0.9 / leverage.value) : (1 + 0.9 / leverage.value);
  const calculatedLiqPrice = Number((currentPrice * liqMultiplier).toFixed(2));
  
  const newItem = {
    id: Math.floor(Math.random() * 900000 + 100000).toString(),
    coin: selectedCoinCode.value,
    side,
    leverage: leverage.value,
    marginType: marginMode.value === 'CROSS' ? '全仓' : '逐仓',
    entryPrice: currentPrice,
    margin: mAmount,
    liqPrice: calculatedLiqPrice
  };
  
  store.positions.push(newItem);
  marginAmount.value = '';
  ratioPercent.value = 0;
  store.triggerToast(`🎉 合约开立成功！看${side === 'LONG' ? '涨多' : '跌空'}保证金 $${mAmount} USDT，结算守护通道已锁定。`);
};

const closePosition = (id) => {
  const index = store.positions.findIndex(p => p.id === id);
  if (index !== -1) {
    const pos = store.positions[index];
    const pnl = calculatePNL(pos);
    const refund = Number((pos.margin + pnl).toFixed(2));
    
    store.balances.futures = Number((store.balances.futures + refund).toFixed(2));
    
    const log = {
      id: 'TX' + Math.floor(Math.random() * 900000 + 100000),
      time: new Date().toLocaleTimeString(),
      action: `合约平仓扣解`,
      path: `${pos.coin}对冲平开 [确认结算利益: ${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} USDT]`,
      amount: refund,
      type: 'CONFIRMED'
    };
    store.ledger.unshift(log);
    
    store.positions.splice(index, 1);
    store.triggerToast(`✨ 仓位已平，扣回保证金套现 PNL 实现 $${refund.toLocaleString()} USDT。`);
  }
};

const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 120px; }
}
.animate-slide-down {
  animation: slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
