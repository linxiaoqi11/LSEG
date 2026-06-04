<template>
  <div class="views-spot-container bg-[#F4F6F5] pb-6 md:pb-10 font-sans">
    
    <!-- ==================== PREMIUM HEADER & PERFORMANCE HEADLINE ==================== -->
    <div class="bg-white border-b border-slate-100 py-3.5 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Instrument & Active Price Group -->
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          
          <!-- Coin Selection Trigger with Caret Dropdown -->
          <div class="relative cursor-pointer" @click="showCoinMenu = !showCoinMenu">
            <div class="flex items-center gap-1.5 hover:opacity-85 select-none py-1">
              <span class="text-xl font-black text-slate-900 tracking-tight">{{ selectedCoinCode }}/USDT</span>
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

        <!-- 24H Stats Panel (Middle) -->
        <div class="flex flex-wrap items-center gap-x-8 gap-y-1 text-slate-400 text-xs font-medium">
          <div class="flex gap-1.5">
            <span>24H最高</span>
            <span class="text-slate-800 font-mono font-bold">{{ formatNumber(activeCoin.price * 1.018, selectedCoinCode === 'BTC' ? 1 : 2) }}</span>
          </div>
          <div class="flex gap-1.5 font-sans">
            <span>24H最低</span>
            <span class="text-slate-800 font-mono font-bold">{{ formatNumber(activeCoin.price * 0.982, selectedCoinCode === 'BTC' ? 1 : 2) }}</span>
          </div>
          <div class="flex gap-1.5">
            <span>24H量</span>
            <span class="text-slate-800 font-mono font-bold">{{ selectedCoinCode === 'BTC' ? '28,492 BTC' : formatNumber(activeCoin.price * 123, 0) + ' ' + selectedCoinCode }}</span>
          </div>
        </div>

        <div class="flex items-center bg-slate-50 p-0.5 rounded-lg border border-slate-100 select-none self-end md:self-auto">
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

    <!-- ==================== MAIN THREE-COLUMN WORKSPACE ==================== -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-5">
      <div class="grid grid-cols-12 gap-5">
        
        <!-- PANEL 1: LEFT SIDE (Trading form, span 3) -->
        <div class="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col justify-between bg-white border border-slate-100 rounded-lg p-4 shadow-xs">
          <div>
            
            <!-- Buy / Sell Segment Tabs -->
            <div class="grid grid-cols-2 bg-slate-50/60 rounded p-0.5 mb-4 border border-slate-100">
              <button 
                class="text-center py-2 text-xs font-black rounded-xs cursor-pointer transition-all focus:outline-none" 
                :class="tradeType === 'BUY' ? 'bg-[#1A7A3E] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 bg-transparent'"
                @click="tradeType = 'BUY'"
              >
                买入
              </button>
              <button 
                class="text-center py-2 text-xs font-black rounded-xs cursor-pointer transition-all focus:outline-none" 
                :class="tradeType === 'SELL' ? 'bg-red-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 bg-transparent'"
                @click="tradeType = 'SELL'"
              >
                卖出
              </button>
            </div>

            <!-- Transaction Method Selector (dropdown menu) -->
            <div class="relative mb-4">
              <div @click="showMethodMenu = !showMethodMenu" class="w-full bg-white border border-slate-200/80 rounded px-3 py-2 text-xs font-bold text-slate-800 flex justify-between items-center cursor-pointer select-none">
                <span>{{ orderMethod === 'LIMIT' ? '限价' : '市价' }}</span>
                <svg class="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div v-if="showMethodMenu" class="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-150 rounded shadow-lg py-1 z-50 text-xs font-bold text-slate-800 animate-fade-in">
                <div @click="orderMethod = 'LIMIT'; showMethodMenu = false" class="px-3 py-2 hover:bg-slate-50 cursor-pointer">限价</div>
                <div @click="orderMethod = 'MARKET'; showMethodMenu = false" class="px-3 py-2 hover:bg-slate-50 cursor-pointer">市价</div>
              </div>
            </div>

            <!-- Price field input -->
            <div class="mb-4">
              <span class="text-[11px] text-slate-400 font-bold block mb-1">价格 (USDT)</span>
              <div class="bg-white border border-slate-200 rounded px-2.5 py-1.5 focus-within:border-[#1A7A3E] transition-all">
                <input 
                  type="number" 
                  step="any" 
                  class="w-full bg-transparent border-none text-[15px] font-bold text-slate-800 outline-none font-mono py-0.5" 
                  v-model="tradePrice" 
                  :disabled="orderMethod === 'MARKET'"
                />
              </div>
            </div>

            <!-- Quantity unit field input -->
            <div class="mb-4">
              <span class="text-[11px] text-slate-400 font-bold block mb-1">数量 ({{ selectedCoinCode }})</span>
              <div class="bg-white border border-slate-200 rounded px-2.5 py-1.5 focus-within:border-[#1A7A3E] transition-all flex items-center justify-between">
                <input 
                  type="number" 
                  step="any" 
                  class="w-full bg-transparent border-none text-[15px] font-bold text-slate-800 outline-none font-mono py-0.5" 
                  v-model="tradeAmount" 
                  placeholder="0.00" 
                  @input="handleAmountInput"
                />
              </div>
            </div>

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

            <!-- Calculated cost input -->
            <div class="mb-4">
              <span class="text-[11px] text-slate-400 font-bold block mb-1">交易额 (USDT)</span>
              <div class="bg-white border border-slate-200 rounded px-2.5 py-1.5 focus-within:border-[#1A7A3E] transition-all">
                <input 
                  type="number" 
                  step="any" 
                  class="w-full bg-transparent border-none text-[15px] font-bold text-slate-800 outline-none font-mono py-0.5" 
                  v-model="totalCostInput" 
                  placeholder="0.00"
                  @input="handleCostInput"
                />
              </div>
            </div>

            <!-- Toggleable TP/SL Panel -->
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
                  ${{ formatNumber(store.balances.trade, 2) }} USDT
                  <span class="text-[#0B9A47] text-sm leading-none cursor-pointer px-0.5 select-none hover:opacity-80" @click="store.openDepositModal()">⊕</span>
                </span>
              </div>
              <div class="flex justify-between px-1">
                <span>最大可买</span>
                <span class="text-slate-700 font-mono font-bold">{{ formatNumber(store.balances.trade / (parseFloat(tradePrice) || activeCoin.price), 6) }} {{ selectedCoinCode }}</span>
              </div>
            </div>

            <!-- Big Submit Action button -->
            <button 
              class="w-full text-white font-extrabold text-sm py-3 rounded-md transition-all cursor-pointer focus:outline-none tracking-wide" 
              :class="tradeType === 'BUY' ? 'bg-[#1A7A3E] hover:bg-[#156031]' : 'bg-red-500 hover:bg-red-650'" 
              @click="submitSwapOrder"
            >
              {{ tradeType === 'BUY' ? '买入 ' + selectedCoinCode : '卖出 ' + selectedCoinCode }}
            </button>
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

            <!-- Highly Polished SVG Candlestick Graph -->
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
                  <!-- Hotspot point on the close value intersection -->
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
                  <!-- Tick mark -->
                  <line :x1="lbl.x" y1="252" :x2="lbl.x" y2="257" stroke="#E2E8F0" stroke-width="1.2" />
                </g>

                <!-- Bottom base boundary line -->
                <line x1="0" y1="252" x2="100%" y2="252" stroke="#E2E8F0" stroke-width="1.5" />
              </svg>
            </div>
          </div>

          <!-- Tabbed Orders List lower ledger panel -->
          <div class="bg-white border border-slate-100 rounded-lg p-4 shadow-xs">
            
            <div class="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-3">
              <div class="flex gap-4 select-none">
                <button 
                  @click="activeListTab = 'ORDERS'"
                  style="font-size: 11.5px; font-weight: 400 !important;"
                  class="pb-1.5 border-b-2 transition-all focus:outline-none cursor-pointer"
                  :class="activeListTab === 'ORDERS' ? 'border-[#1A7A3E] text-[#1A7A3E]' : 'border-transparent text-slate-400 hover:text-slate-700'"
                >
                  委托 ({{ store.orders.length || 2 }})
                </button>
                <button 
                  @click="activeListTab = 'ASSETS'"
                  style="font-size: 11.5px; font-weight: 400 !important;"
                  class="pb-1.5 border-b-2 transition-all focus:outline-none cursor-pointer"
                  :class="activeListTab === 'ASSETS' ? 'border-[#1A7A3E] text-[#1A7A3E]' : 'border-transparent text-slate-400 hover:text-slate-700'"
                >
                  资产
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
              <button 
                v-if="activeListTab === 'ORDERS'"
                @click="sweepOrders" 
                style="font-size: 11px; font-weight: 400 !important;"
                class="text-slate-400 hover:text-red-500 hover:bg-slate-50 px-2 py-0.5 rounded transition-all focus:outline-none cursor-pointer"
              >
                清空委托
              </button>
            </div>

            <!-- Tab Content rendering -->
            <div class="min-h-[140px] max-h-[240px] overflow-y-auto pr-1">
              
              <!-- TAB 1: ACTIVE LIMIT/MARKET ORDERS list -->
              <div v-if="activeListTab === 'ORDERS'" class="space-y-3.5">
                
                <!-- Real user transaction ledger list from store -->
                <div v-for="order in store.orders" :key="order.id" class="flex justify-between items-center py-2.5 px-3 border border-slate-50 hover:bg-slate-50/50 rounded-md transition-all">
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-7 h-7 rounded-sm flex items-center justify-center font-bold text-xs shrink-0 select-none text-white shadow-xs"
                      :class="order.side === 'BUY' ? 'bg-[#10B981]' : 'bg-red-500'"
                    >
                      {{ order.side === 'BUY' ? '买' : '卖' }}
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5 leading-none">
                        <span class="text-xs font-black text-slate-800">{{ order.coin }}/USDT</span>
                        <span class="text-[9px] font-black text-slate-400 bg-slate-100 px-1 py-0.5 rounded uppercase leading-none">{{ order.method === 'LIMIT' ? '限价' : '市价' }}</span>
                      </div>
                      <p class="text-[10px] text-slate-400 font-bold mt-1 leading-none font-mono">
                        数量: {{ formatNumber(order.amount, selectedCoinCode === 'BTC' ? 5 : 2) }} | {{ order.time }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-black font-mono text-slate-800 tracking-tight block">${{ formatNumber(order.price, 2) }}</span>
                    <div class="flex items-center justify-end gap-1.5 mt-1">
                      <span class="text-[9.5px] text-[#0B9A47] bg-emerald-50 px-1 py-0.5 rounded font-extrabold font-mono font-sans leading-none">+0.24% 今日对冲</span>
                      <button @click.stop="cancelOrder(order.id)" class="text-[10px] text-red-500 font-bold hover:underline select-none px-1">取消</button>
                    </div>
                  </div>
                </div>

                <!-- Fallback / Static Mock rows matching Image 1 exact ledger entries -->
                <div class="flex justify-between items-center py-2.5 px-3 border border-slate-50 hover:bg-slate-50/50 rounded-md transition-all">
                  <div class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-sm bg-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 select-none text-white shadow-xs">买</div>
                    <div>
                      <div class="flex items-center gap-1.5 leading-none">
                        <span class="text-xs font-black text-slate-800">BTC/USDT</span>
                        <span class="text-[9px] font-black text-slate-400 bg-slate-100 px-1 py-0.5 rounded uppercase leading-none">限价</span>
                      </div>
                      <p class="text-[10px] text-slate-400 font-bold mt-1 leading-none font-mono">数量: 1.182410 | 14:26:01</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-black font-mono text-slate-800 tracking-tight block">36,701.78</span>
                    <span class="text-[9.5px] text-[#0B9A47] bg-emerald-50 px-1.5 py-0.5 rounded font-bold font-mono mt-1 inline-block">成交额: $91,586.99</span>
                  </div>
                </div>

                <div class="flex justify-between items-center py-2.5 px-3 border border-slate-50 hover:bg-slate-50/50 rounded-md transition-all">
                  <div class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-sm bg-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 select-none text-white shadow-xs">买</div>
                    <div>
                      <div class="flex items-center gap-1.5 leading-none">
                        <span class="text-xs font-black text-slate-800">BTC/USDT</span>
                        <span class="text-[9px] font-black text-slate-400 bg-slate-100 px-1 py-0.5 rounded uppercase leading-none">限价</span>
                      </div>
                      <p class="text-[10px] text-slate-400 font-bold mt-1 leading-none font-mono">数量: 0.004170 | 11:15:38</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-black font-mono text-slate-800 tracking-tight block">36,648.78</span>
                    <span class="text-[9.5px] text-[#0B9A47] bg-emerald-50 px-1.5 py-0.5 rounded font-bold font-mono mt-1 inline-block font-sans">成交额: $153.08</span>
                  </div>
                </div>

                <div class="flex justify-between items-center py-2.5 px-3 border border-slate-50 hover:bg-slate-50/50 rounded-md transition-all">
                  <div class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-sm bg-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 select-none text-white shadow-xs">买</div>
                    <div>
                      <div class="flex items-center gap-1.5 leading-none">
                        <span class="text-xs font-black text-slate-800">ETH/USDT</span>
                        <span class="text-[9px] font-black text-slate-400 bg-slate-100 px-1 py-0.5 rounded uppercase leading-none">限价</span>
                      </div>
                      <p class="text-[10px] text-slate-400 font-bold mt-1 leading-none font-mono">数量: 15.660100 | 10:04:12</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-black font-mono text-slate-800 tracking-tight block">2,619.40</span>
                    <span class="text-[9.5px] text-[#0B9A47] bg-emerald-50 px-1.5 py-0.5 rounded font-bold font-mono mt-1 inline-block">成交额: $41,200.00</span>
                  </div>
                </div>
              </div>

              <!-- TAB 2: GENERAL BALANCES LISTS -->
              <div v-else-if="activeListTab === 'ASSETS'" class="grid grid-cols-2 gap-3.5 py-2.5">
                <div class="bg-slate-50/60 border border-slate-100 rounded p-3 h-20 flex flex-col justify-between">
                  <span class="text-[10px] text-slate-400 font-extrabold uppercase leading-none block">交易账户余额 (USDT)</span>
                  <div class="flex justify-between items-baseline mt-1.5">
                    <span class="text-lg font-black text-slate-800 font-mono tracking-tight">{{ formatNumber(store.balances.trade, 2) }}</span>
                    <span class="text-[10px] text-slate-500 font-extrabold">USDT</span>
                  </div>
                </div>
                <div class="bg-slate-50/60 border border-slate-100 rounded p-3 h-20 flex flex-col justify-between">
                  <span class="text-[10px] text-slate-400 font-extrabold uppercase leading-none block">合约账户余额 (USDT)</span>
                  <div class="flex justify-between items-baseline mt-1.5">
                    <span class="text-lg font-black text-slate-800 font-mono tracking-tight">{{ formatNumber(store.balances.futures, 2) }}</span>
                    <span class="text-[10px] text-slate-500 font-extrabold">USDT</span>
                  </div>
                </div>
                <div class="bg-slate-50/60 border border-slate-100 rounded p-3 h-20 flex flex-col justify-between">
                  <span class="text-[10px] text-slate-400 font-extrabold uppercase leading-none block">绿色托管准备金 (USDT)</span>
                  <div class="flex justify-between items-baseline mt-1.5">
                    <span class="text-lg font-black text-[#1A7A3E] font-mono tracking-tight">{{ formatNumber(store.balances.funding, 2) }}</span>
                    <span class="text-[10px] text-slate-500 font-extrabold">USDT</span>
                  </div>
                </div>
                <div class="bg-slate-50/60 border border-slate-100 rounded p-3 h-20 flex flex-col justify-between">
                  <span class="text-[10px] text-slate-400 font-extrabold uppercase leading-none block">物理资产担保金 (USDT)</span>
                  <div class="flex justify-between items-baseline mt-1.5">
                    <span class="text-lg font-black text-[#1A7A3E] font-mono tracking-tight">{{ formatNumber(store.balances.insurance, 2) }}</span>
                    <span class="text-[10px] text-slate-500 font-extrabold">USDT</span>
                  </div>
                </div>
              </div>

              <!-- TAB 3: SMART COPYS (NO ROBO TRIGGERED YET) -->
              <div v-else-if="activeListTab === 'ROBOTS'" class="flex flex-col items-center justify-center py-10 text-center select-none text-slate-400">
                <svg class="w-10 h-10 mb-2 text-slate-200" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <div class="text-xs font-bold text-slate-500">绿色后台守护脚本已开，当前尚未配置自动化挂单机器人。</div>
              </div>

            </div>
          </div>
        </div>

        <!-- PANEL 3: RIGHT PANEL (Order Book & Depth sentiment details, span 3) -->
        <div class="col-span-12 md:col-span-12 lg:col-span-3 flex flex-col justify-between bg-white border border-slate-100 rounded-lg p-3.5 shadow-xs">
          <div>
            
            <!-- Depth Headers -->
            <div class="flex justify-between text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2.5 select-none">
              <span>价格 (USDT)</span>
              <span class="text-right">数量 ({{ selectedCoinCode }})</span>
            </div>

            <!-- ASKS (selling prices - TOP PART colored Green with soft depth fill bg) -->
            <div class="space-y-[3px]">
              <div 
                v-for="(row, idx) in asksBook" 
                :key="'ask-' + idx" 
                class="flex justify-between items-center text-[11px] font-bold font-mono h-[19px] relative overflow-hidden"
              >
                <!-- Custom Horizontal depth proportion bar -->
                <div class="absolute right-0 top-0 bottom-0 bg-[#10B981]/[0.08] transition-all" :style="{ width: (row.amount * 35) + '%' }"></div>
                
                <span class="text-[#0B9A47] z-10">{{ formatNumber(row.price, selectedCoinCode === 'BTC' ? 1 : 2) }}</span>
                <span class="text-slate-500 z-10 text-right">{{ formatNumber(row.amount, selectedCoinCode === 'BTC' ? 6 : 4) }}</span>
              </div>
            </div>

            <!-- Dynamic Index Price Indicator row in the Middle -->
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

            <!-- BIDS (buying prices - BOTTOM PART colored Red with soft depth fill bg) -->
            <div class="space-y-[3px]">
              <div 
                v-for="(row, idx) in bidsBook" 
                :key="'bid-' + idx" 
                class="flex justify-between items-center text-[11px] font-bold font-mono h-[19px] relative overflow-hidden"
              >
                <!-- Custom Horizontal depth proportion bar -->
                <div class="absolute right-0 top-0 bottom-0 bg-red-500/[0.08] transition-all" :style="{ width: (row.amount * 40) + '%' }"></div>
                
                <span class="text-red-500 z-10">{{ formatNumber(row.price, selectedCoinCode === 'BTC' ? 1 : 2) }}</span>
                <span class="text-slate-500 z-10 text-right">{{ formatNumber(row.amount, selectedCoinCode === 'BTC' ? 6 : 4) }}</span>
              </div>
            </div>

          </div>

          <!-- Bottom scale selectors & sentiment metrics -->
          <div class="pt-4 border-t border-slate-50">
            
            <!-- Sentiment Volume Indicator bar (Buy / Sell volume distribution) -->
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

            <!-- Precise scale selector -->
            <div class="flex justify-between items-center mt-3 select-none">
              <div 
                @click="store.triggerToast('更改成交精度指数倍率')" 
                class="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded px-2.5 py-1 text-[10px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>0.1精度</span>
                <span class="text-[7.5px] text-slate-400">▼</span>
              </div>
              <button 
                @click="store.triggerToast('切换委托账深度单/双侧展示类型')" 
                class="text-slate-450 hover:text-slate-800 bg-slate-50 p-1.5 rounded border border-slate-200/30 transition-all focus:outline-none"
              >
                <!-- Four grid square icon -->
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
const tradeType = ref('BUY');
const orderMethod = ref('LIMIT');
const tradePrice = ref(77496.3);
const tradeAmount = ref('');
const totalCostInput = ref('');
const ratioPercent = ref(0);

// Menu & view options states
const showCoinMenu = ref(false);
const showMethodMenu = ref(false);
const showTpSl = ref(false);
const activeListTab = ref('ORDERS');
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

// Get currently active selected coin from parent data store
const activeCoin = computed(() => {
  const coin = store.coins.find(c => c.code === selectedCoinCode.value);
  return coin || { code: 'BTC', price: 77496.3, change: 0.33, vol: '28,492 BTC' };
});

// Sync input values when coin changes
watch(selectedCoinCode, (newCode) => {
  const price = store.coins.find(c => c.code === newCode)?.price || 77496.3;
  tradePrice.value = Number(price.toFixed(newCode === 'BTC' ? 1 : 2));
  tradeAmount.value = '';
  totalCostInput.value = '';
  ratioPercent.value = 0;
});

// Double link amount and totalCost inputs properly
const handleAmountInput = () => {
  const amt = parseFloat(tradeAmount.value) || 0;
  const prc = orderMethod.value === 'LIMIT' ? (parseFloat(tradePrice.value) || activeCoin.value.price) : activeCoin.value.price;
  totalCostInput.value = amt > 0 ? (amt * prc).toFixed(2) : '';
  updateRatioIndicator();
};

const handleCostInput = () => {
  const cost = parseFloat(totalCostInput.value) || 0;
  const prc = orderMethod.value === 'LIMIT' ? (parseFloat(tradePrice.value) || activeCoin.value.price) : activeCoin.value.price;
  tradeAmount.value = cost > 0 && prc > 0 ? (cost / prc).toFixed(selectedCoinCode.value === 'BTC' ? 5 : 2) : '';
  updateRatioIndicator();
};

// Compute closest slider value
const updateRatioIndicator = () => {
  const cost = parseFloat(totalCostInput.value) || 0;
  const bal = store.balances.trade;
  if (!bal || bal <= 0 || cost <= 0) {
    ratioPercent.value = 0;
    return;
  }
  const fraction = (cost / bal) * 100;
  // Match closest percentage shortcuts
  const step = [0, 25, 50, 75, 100];
  const closest = step.reduce((prev, curr) => Math.abs(curr - fraction) < Math.abs(prev - fraction) ? curr : prev);
  ratioPercent.value = Math.abs(closest - fraction) < 12 ? closest : 0;
};

// Handle selecting a coin from dropdown
const selectCoin = (coin) => {
  selectedCoinCode.value = coin.code;
  showCoinMenu.value = false;
};

// Apply Ratio shortcuts (0%, 25%, 50%, 75%, 100%)
const applyRatio = (pct) => {
  ratioPercent.value = pct;
  const currentPrice = orderMethod.value === 'LIMIT' ? (parseFloat(tradePrice.value) || activeCoin.value.price) : activeCoin.value.price;
  if (!currentPrice || currentPrice <= 0) return;
  const availableBal = store.balances.trade;
  
  if (tradeType.value === 'BUY') {
    const cost = availableBal * (pct / 100);
    totalCostInput.value = cost > 0 ? cost.toFixed(2) : '';
    tradeAmount.value = cost > 0 ? (cost / currentPrice).toFixed(selectedCoinCode.value === 'BTC' ? 5 : 2) : '';
  } else {
    // Sell allocates ratio based on simulated cryptocurrency holding
    const simulatedHolding = (availableBal / currentPrice) * 0.95;
    const qty = simulatedHolding * (pct / 100);
    tradeAmount.value = qty > 0 ? qty.toFixed(selectedCoinCode.value === 'BTC' ? 5 : 2) : '';
    totalCostInput.value = qty > 0 ? (qty * currentPrice).toFixed(2) : '';
  }
};

// SVG Candlestick layout options
const totalCandles = 32;
const candleWidth = 7.5;
const svgChartWidth = ref(540);

const getXPos = (idx) => {
  const gap = svgChartWidth.value / (totalCandles + 1);
  return gap * (idx + 1);
};

// Timeframe random seed data generators for premium look
const timeframesSeeds = {
  '1m': [77478.2, 77488.4, 73, 77491.5],
  '5m': [77480.1, 77502.9, 142, 77493.2],
  '15m': [77495.9, 77510.3, 115, 77496.3],
  '1h': [77496.3, 77530.0, 95, 77496.3], // Match Image 1 pattern
  '4h': [77420.5, 77610.9, 218, 77496.3],
  '1d': [76912.4, 78891.2, 1204, 77496.3],
  '1w': [74200.0, 82525.0, 5493, 77496.3]
};

// Reactive candlestick array computed per selected interval
const currentTimeframeData = computed(() => {
  const seed = timeframesSeeds[activeTimeframe.value] || [77496.3, 77530, 95, 77496.3];
  const refPrice = activeCoin.value.price;
  
  // Create a beautiful sin wave style curve matching Image 1
  return Array.from({ length: totalCandles }, (_, idx) => {
    // Wave center formula: climbs to peak, then slopes down
    const xTerm = idx / (totalCandles - 1);
    const waveOffset = Math.sin(xTerm * Math.PI) * (refPrice * 0.015);
    const noise = Math.sin(idx * 2) * (refPrice * 0.005) + Math.cos(idx * 5) * (refPrice * 0.002);
    
    // Smooth transition baseline price
    const basePrice = refPrice - waveOffset + noise;
    
    // Create logical Open, High, Low, Close
    const spread = refPrice * (0.001 + Math.random() * 0.0035);
    const o = Number((basePrice - spread * (Math.random() * 2 - 1)).toFixed(1));
    const c = Number((basePrice + (o - basePrice) * (Math.random() * 0.6 - 0.3)).toFixed(1));
    const h = Number((Math.max(o, c) + spread * Math.random()).toFixed(1));
    const l = Number((Math.min(o, c) - spread * Math.random()).toFixed(1));
    const vol = Math.floor(Math.random() * 350 + 20);

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
  // Chart space vertical bounds: 15px top padding, 230px height available inside 250px container
  return 15 + ((max - val) / range) * 220;
};

// Five horizontal coordinates labels
const horizontalGrids = computed(() => {
  const { max, min } = chartPriceRange.value;
  const steps = 5;
  return Array.from({ length: steps }, (_, idx) => {
    const fraction = idx / (steps - 1);
    const p = max - fraction * (max - min);
    return { y: getYPos(p), price: Number(p.toFixed(0)) };
  });
});

// Bottom dates ticks labels matching image: 00:00, 02:00, 05:00...
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

  // Track closest candlestick index
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
  // Alternate coins auto dynamic book
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

// Watch resize for chart drawing fluidly
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

// Operations Callbacks
const submitSwapOrder = () => {
  const amt = parseFloat(tradeAmount.value);
  const cost = parseFloat(totalCostInput.value);
  if (isNaN(amt) || amt <= 0 || isNaN(cost) || cost <= 0) {
    store.triggerToast('⚠️ 请输入正确的兑换或卖出委托数量额。');
    return;
  }
  
  if (tradeType.value === 'BUY') {
    if (store.balances.trade < cost) {
      store.triggerToast('⚠️ 可用交易资金账户余额不足！请点击 ⊕ 划转注入资金。');
      return;
    }
    store.balances.trade = Number((store.balances.trade - cost).toFixed(2));
  } else {
    store.balances.trade = Number((store.balances.trade + cost).toFixed(2));
  }
  
  const newItem = {
    id: Math.floor(Math.random() * 800000 + 200000).toString(),
    coin: selectedCoinCode.value,
    side: tradeType.value,
    method: orderMethod.value,
    price: orderMethod.value === 'LIMIT' ? parseFloat(tradePrice.value) : activeCoin.value.price,
    amount: amt,
    total: cost,
    time: new Date().toLocaleTimeString()
  };
  
  store.orders.unshift(newItem);
  
  // Insert register ledger transaction inside financial ledger
  const tx = {
    id: 'TX' + Math.floor(Math.random() * 900000 + 100000),
    time: new Date().toLocaleTimeString(),
    action: `现货闪兑 ${tradeType.value}`,
    path: `买入/卖出委托核算 [${selectedCoinCode.value}/USDT]`,
    amount: cost,
    type: 'CONFIRMED'
  };
  store.ledger.unshift(tx);
  
  // Clear inputs
  tradeAmount.value = '';
  totalCostInput.value = '';
  ratioPercent.value = 0;
  store.triggerToast(`🎉 现货订单申兑成功！已锁定 ${cost.toLocaleString()} USDT 并注入存仓系统。`);
};

const cancelOrder = (orderId) => {
  const item = store.orders.find(o => o.id === orderId);
  if (item) {
    // Safe refund calculation back
    if (item.side === 'BUY') {
      store.balances.trade = Number((store.balances.trade + item.total).toFixed(2));
    }
    store.orders = store.orders.filter(o => o.id !== orderId);
    store.triggerToast(`✨ 上挂委托 ${orderId} 撤单成功，保证金已足额退回。`);
  }
};

const sweepOrders = () => {
  store.orders = [];
  store.triggerToast('挂单中委托订单数据已全部清理。');
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
