<template>
  <div class="px-4 py-6 md:px-8 md:py-10 max-w-7xl mx-auto animate-fade-in text-slate-700">
    
    <!-- Hero Green Board Section -->
    <section class="mb-6 bg-[#135E2D] p-6 md:p-8 rounded-[8px] text-white shadow-md relative overflow-hidden">
      <!-- Glow background decoration -->
      <div class="absolute -right-10 -top-10 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute left-1/3 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <!-- Balance Info -->
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-emerald-100/80 tracking-wider">总资产估值 (USDT)</span>
            <button @click="showBalance = !showBalance" class="text-emerald-100 hover:text-white transition-all focus:outline-none cursor-pointer" title="隐藏/显示余额">
              <!-- Eye open / closed icon -->
              <svg v-if="showBalance" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
          
          <h2 class="text-3xl md:text-5xl font-extrabold mt-2 font-mono tracking-tight flex items-baseline gap-2">
            <template v-if="showBalance">
              <span>{{ formatNumber(activeHoldingsValuations.total, 2) }}</span>
              <span class="text-lg font-medium text-emerald-200">USDT</span>
            </template>
            <template v-else>
              <span>******</span>
              <span class="text-lg font-medium text-emerald-200">USDT</span>
            </template>
          </h2>

          <div class="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span class="flex items-center text-emerald-100 font-medium">
              <i class="fa-solid fa-arrow-trend-up text-emerald-300 mr-1.5 text-sm"></i>
              +1,240.12 USDT (+0.28%) 今日盈亏
            </span>
            <span class="text-emerald-200/80">
              ≈ ¥ <template v-if="showBalance">{{ formatNumber(activeHoldingsValuations.total * 7.24, 2) }}</template><template v-else>******</template> CNY
            </span>
          </div>
        </div>

        <!-- Action Buttons Grid (Vertical rectangular like in Image) -->
        <div class="flex gap-3 self-stretch md:self-auto justify-end">
          <!-- Recharge -->
          <button @click="openDeposit()" class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/20 transition-all cursor-pointer h-20 w-16 md:w-20 shadow-sm focus:outline-none group">
            <div class="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform mb-1">
              <i class="fas fa-wallet text-[13px]"></i>
            </div>
            <span class="text-[11px] font-medium text-emerald-100">充值</span>
          </button>

          <!-- Withdraw -->
          <button @click="openWithdraw()" class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/20 transition-all cursor-pointer h-20 w-16 md:w-20 shadow-sm focus:outline-none group">
            <div class="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform mb-1">
              <i class="fas fa-credit-card text-[13px]"></i>
            </div>
            <span class="text-[11px] font-medium text-emerald-100">提现</span>
          </button>

          <!-- Transfer -->
          <button @click="openTransfer()" class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/20 transition-all cursor-pointer h-20 w-16 md:w-20 shadow-sm focus:outline-none group">
            <div class="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform mb-1">
              <i class="fas fa-right-left text-[14px]"></i>
            </div>
            <span class="text-[11px] font-medium text-emerald-100">划转</span>
          </button>
        </div>
      </div>

      <!-- Hero bottom outline separator -->
      <div class="h-px bg-white/10 my-5"></div>

      <!-- Bottom Account Navigation Tabs -->
      <div class="flex items-center gap-x-6 gap-y-2 overflow-x-auto select-none no-scrollbar relative z-10 text-sm">
        <button 
          v-for="tab in accountTabs" 
          :key="tab.id"
          @click="activeAccountTab = tab.id"
          class="pb-1.5 font-bold transition-all focus:outline-none border-b-2 cursor-pointer relative uppercase whitespace-nowrap text-xs md:text-sm"
          :class="activeAccountTab === tab.id 
            ? 'border-white text-white font-extrabold' 
            : 'border-transparent text-emerald-200/70 hover:text-white'"
        >
          {{ tab.label }}
        </button>
      </div>
    </section>

    <!-- Main Grid Content: Asset list & History (Left), Distribution (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Left Area (Asset List & History) -->
      <div class="lg:col-span-8 flex flex-col gap-6">
        
        <!-- Asset List Card -->
        <div class="bg-white border border-slate-100 rounded-[8px] shadow-xs p-6">
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-base font-bold text-slate-800">资产列表</h3>
            <label class="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
              <input type="checkbox" v-model="hideSmallAssets" class="rounded border-slate-200 text-[#1A7A3E] focus:ring-[#1A7A3E] w-3.5 h-3.5" />
              <span>隐藏小额资产</span>
            </label>
          </div>

          <!-- Assets Table -->
          <div class="overflow-x-auto -mx-6">
            <div class="inline-block min-w-full align-middle px-6">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 text-[10.5px] uppercase font-semibold">
                    <th class="py-3 font-normal">币种</th>
                    <th class="py-3 font-normal text-right">持仓数量</th>
                    <th class="py-3 font-normal text-right">可用数量</th>
                    <th class="py-3 font-normal text-right">冻结数量</th>
                    <th class="py-3 font-normal text-right">估值 (USDT)</th>
                    <th class="py-3 font-normal text-center">涨跌幅</th>
                    <th class="py-3 font-normal text-right pr-1">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs">
                  <tr v-for="coin in filteredCoins" :key="coin.code" class="hover:bg-slate-50/40 transition-colors">
                    <!-- Coin Details -->
                    <td class="py-4">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-3xs" :class="coin.iconBg">
                          {{ coin.code === 'USDT' ? 'USD' : coin.code }}
                        </div>
                        <div class="flex flex-col">
                          <span class="font-bold text-slate-800 text-xs leading-none">{{ coin.code }}</span>
                          <span class="text-[9.5px] text-slate-400 mt-1 leading-none">{{ coin.name }}</span>
                        </div>
                      </div>
                    </td>
                    <!-- Holding Amount -->
                    <td class="py-4 text-right font-mono text-slate-800 font-medium">
                      {{ formatNumber(coin.qty, 8) }}
                    </td>
                    <!-- Available Amount -->
                    <td class="py-4 text-right font-mono text-slate-500">
                      {{ formatNumber(coin.qty, 8) }}
                    </td>
                    <!-- Frozen Amount -->
                    <td class="py-4 text-right font-mono text-slate-400">
                      0.00000000
                    </td>
                    <!-- Estimated Value (USDT) -->
                    <td class="py-4 text-right font-mono font-bold text-slate-800">
                      {{ formatNumber(coin.valuation, 2) }}
                    </td>
                    <!-- Spark change badge -->
                    <td class="py-4 text-center">
                      <span class="inline-block font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded border"
                            :class="coin.change >= 0 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60' 
                              : 'bg-rose-50 text-rose-500 border-rose-100/60'">
                        {{ coin.change >= 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%
                      </span>
                    </td>
                    <!-- Inline actions micro grid -->
                    <td class="py-4 text-right">
                      <div class="flex gap-1 justify-end">
                        <button @click="openCoinAction('deposit', coin.code)" class="py-1 px-1.5 text-[10px] font-medium border border-emerald-100 text-emerald-700 bg-emerald-50 rounded ml-1 hover:bg-[#1A7A3E] hover:text-white transition-all cursor-pointer">
                          充值
                        </button>
                        <button @click="openCoinAction('withdraw', coin.code)" class="py-1 px-1.5 text-[10px] font-medium border border-emerald-100 text-emerald-700 bg-emerald-50 rounded ml-1 hover:bg-[#1A7A3E] hover:text-white transition-all cursor-pointer">
                          提现
                        </button>
                        <button @click="goToTrade(coin.code)" class="py-1 px-1.5 text-[10px] font-medium border border-emerald-100 text-emerald-700 bg-emerald-50 rounded ml-1 hover:bg-[#1A7A3E] hover:text-white transition-all cursor-pointer">
                          交易
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Transaction History Card -->
        <div class="bg-white border border-slate-100 rounded-[8px] shadow-xs p-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
            <h3 class="text-base font-bold text-slate-800">交易记录</h3>
            
            <!-- Filters Group Row -->
            <div class="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100 select-none text-[11px]">
              <button 
                v-for="filter in ledgerFilters" 
                :key="filter.id"
                @click="activeLedgerFilter = filter.id"
                class="px-2.5 py-1 rounded-md transition-all focus:outline-none cursor-pointer font-medium"
                :class="activeLedgerFilter === filter.id 
                  ? 'bg-[#1A7A3E] text-white shadow-3xs' 
                  : 'text-slate-500 hover:text-slate-800'"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>

          <!-- Transaction Ledger Table -->
          <div class="overflow-x-auto -mx-6">
            <div class="inline-block min-w-full align-middle px-6">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 text-[10.5px] uppercase font-semibold">
                    <th class="py-3 font-normal">类型</th>
                    <th class="py-3 font-normal">币种</th>
                    <th class="py-3 font-normal">数量</th>
                    <th class="py-3 font-normal">成交价</th>
                    <th class="py-3 font-normal">手续费</th>
                    <th class="py-3 font-normal">时间</th>
                    <th class="py-3 font-normal text-right pr-2">状态</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs">
                  <tr v-for="log in filteredLedger" :key="log.id" class="hover:bg-slate-50/40 transition-colors">
                    <!-- Type Badge -->
                    <td class="py-3.5">
                      <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold"
                            :class="getTypeBadgeClass(log.type)">
                        {{ log.typeLabel || log.action }}
                      </span>
                    </td>
                    <!-- Coin code with icon symbol -->
                    <td class="py-3.5 font-bold text-slate-800 text-xs">
                      {{ log.coin || 'BTC' }}
                    </td>
                    <!-- Quantity with sign -->
                    <td class="py-3.5 font-mono font-bold"
                        :class="getAmountColorClass(log.type)">
                      {{ log.amountSign }}{{ formatNumber(Math.abs(log.amount), 8) }}
                    </td>
                    <!-- Executed price -->
                    <td class="py-3.5 font-mono text-slate-600">
                      {{ formatNumber(log.price, 2) }}
                    </td>
                    <!-- Executed fee -->
                    <td class="py-3.5 font-mono text-slate-500">
                      {{ log.fee || '0.00 USDT' }}
                    </td>
                    <!-- Localized logged date/time -->
                    <td class="py-3.5 text-slate-400 font-mono">
                      {{ log.time }}
                    </td>
                    <!-- Audited state progress -->
                    <td class="py-3.5 text-right font-semibold text-emerald-600 pr-2">
                      {{ log.statusLabel || '已完成' }}
                    </td>
                  </tr>
                  
                  <!-- Fallback message if list empty -->
                  <tr v-if="filteredLedger.length === 0">
                    <td colspan="7" class="text-center py-10 text-slate-450 font-medium">
                      没有找到对应的流水交易记录
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Area (Asset Distribution Donut Chart) -->
      <div class="lg:col-span-4 bg-white border border-slate-100 rounded-[8px] shadow-xs p-6 flex flex-col">
        <h3 class="text-base font-bold text-slate-800 mb-6">资产分布</h3>
        
        <!-- Interactive Donut Chart Representation -->
        <div class="flex justify-center items-center relative py-6 select-none bg-slate-50/50 rounded-[8px] border border-slate-100/50 mb-6">
          <svg viewBox="0 0 120 120" class="w-40 h-40 transform -rotate-90 filter drop-shadow-sm">
            <!-- Background base circle layer -->
            <circle cx="60" cy="60" r="40" fill="none" stroke="#F1F5F9" stroke-width="11" />
            
            <!-- Dynamically iterated segment circles -->
            <circle 
              v-for="seg in donutSegments" 
              :key="seg.code"
              cx="60" 
              cy="60" 
              r="40" 
              fill="none" 
              :stroke="seg.color" 
              stroke-width="11"
              :stroke-dasharray="251.327" 
              :stroke-dashoffset="seg.offset"
              class="transition-all duration-500 ease-out"
            />
          </svg>
          
          <!-- Middle centered descriptive balance text block -->
          <div class="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-center">
            <span class="text-[10px] text-slate-400 leading-none">总资产</span>
            <span class="text-lg font-extrabold text-slate-850 mt-1.5 leading-none font-mono">
              {{ (activeHoldingsValuations.total / 1000).toFixed(1) }}K
            </span>
            <span class="text-[9.5px] text-slate-400 mt-1 leading-none font-medium">USDT</span>
          </div>
        </div>

        <!-- Legends Grid list -->
        <div class="flex flex-col gap-4">
          <div 
            v-for="item in activeHoldingsPercentages" 
            :key="item.code"
            class="flex items-center justify-between pb-3 border-b border-slate-100/80 last:border-0 last:pb-0"
          >
            <!-- Coin bullet color icon block -->
            <div class="flex items-center gap-2.5">
              <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: item.color }"></div>
              <span class="text-sm font-bold text-slate-800">{{ item.code }}</span>
            </div>
            
            <!-- Valuation and percentage status align right -->
            <div class="flex flex-col items-end">
              <span class="text-xs font-mono font-bold text-slate-850">
                {{ formatNumber(item.pct, 1) }}%
              </span>
              <span class="text-[10px] text-slate-400 mt-1 font-mono leading-none">
                {{ formatNumber(item.valuation, 2) }} USDT
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modals Section -->

    <!-- 1. DEPOSIT (充值) MODAL -->
    <div class="modal-overlay" :class="{ show: depositModalOpen }">
      <div class="modal-window rounded-[8px] max-w-md w-full p-6 text-slate-700 bg-white shadow-xl relative">
        <div class="modal-header-row mb-4">
          <h3 class="modal-header-title text-base font-bold text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-emerald-600 mr-1.5">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
            </svg>
            加密货币安全充值
          </h3>
          <button class="modal-header-close cursor-pointer p-1 text-slate-400 hover:text-slate-600 focus:outline-none" @click="depositModalOpen = false">✕</button>
        </div>

        <!-- Coin Selection -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">选择充值币种</label>
          <select v-model="depositCoin" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none">
            <option value="USDT">USDT (泰达币)</option>
            <option value="BTC">BTC (比特币)</option>
            <option value="ETH">ETH (以太坊)</option>
          </select>
        </div>

        <!-- Network Selection -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">选择充电链网络</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              v-for="net in availableNetworks[depositCoin]" 
              :key="net"
              @click="depositNetwork = net"
              class="btn-net-opt py-2 px-3 border rounded-lg text-xs font-mono font-bold text-center cursor-pointer transition-all focus:outline-none"
              :class="depositNetwork === net ? 'bg-emerald-50 text-emerald-700 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'"
            >
              {{ net }}
            </button>
          </div>
        </div>

        <!-- Address view & Copy -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">接收充提专属安全钱包地址</label>
          <div class="modal-address-block flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <span class="modal-address-str font-mono text-xs text-slate-600 truncate mr-2">{{ currentDepositAddress }}</span>
            <button @click="copyAddress()" class="btn-copy-address flex-shrink-0 text-xs font-bold text-emerald-600 hover:text-emerald-700 focus:outline-none cursor-pointer">
              复制
            </button>
          </div>
        </div>

        <!-- Set Amount -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">模拟充值充金数量</label>
          <div class="modal-amt-box flex items-center bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <input type="number" step="any" v-model="depositAmount" placeholder="0.00" class="modal-amt-input flex-1 bg-transparent border-0 outline-none font-mono text-sm" />
            <span class="modal-amt-suffix font-bold text-slate-400 text-xs text-right">{{ depositCoin }}</span>
          </div>
        </div>

        <p class="modal-disclosure text-[10px] leading-relaxed text-slate-400 p-2.5 bg-amber-50/50 text-amber-700 border border-amber-200/20 rounded-lg mb-5">
          * 根据LSEG绿能特约安全法条，向他人泄露或充往未列名网络将造成资产在审计中被退包封锁，请核定后提交。
        </p>

        <button @click="executeLocalDeposit()" class="btn-submit-deposit w-full bg-[#135E2D] hover:bg-emerald-800 text-white font-bold py-3 text-sm rounded-lg shadow-sm transition-all text-center cursor-pointer">
          物理申报，完成充值
        </button>
      </div>
    </div>


    <!-- 2. WITHDRAW (提现) MODAL -->
    <div class="modal-overlay" :class="{ show: withdrawModalOpen }">
      <div class="modal-window rounded-[8px] max-w-md w-full p-6 text-slate-700 bg-white shadow-xl relative">
        <div class="modal-header-row mb-4">
          <h3 class="modal-header-title text-base font-bold text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-emerald-600 mr-1.5">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
            </svg>
            保本出金退还提现
          </h3>
          <button class="modal-header-close cursor-pointer p-1 text-slate-400 hover:text-slate-600 focus:outline-none" @click="withdrawModalOpen = false">✕</button>
        </div>

        <!-- Coin Selection -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">选择提现币种</label>
          <select v-model="withdrawCoin" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none">
            <option value="USDT">USDT (泰达币)</option>
            <option value="BTC">BTC (比特币)</option>
            <option value="ETH">ETH (以太坊)</option>
          </select>
        </div>

        <!-- Network -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">选择提金接收网络</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              v-for="net in availableNetworks[withdrawCoin]" 
              :key="net"
              @click="withdrawNetwork = net"
              class="btn-net-opt py-2 px-3 border rounded-lg text-xs font-mono font-bold text-center cursor-pointer transition-all focus:outline-none"
              :class="withdrawNetwork === net ? 'bg-emerald-50 text-emerald-700 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'"
            >
              {{ net }}
            </button>
          </div>
        </div>

        <!-- Address string -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">提金目标物理账单接收地址 (Address)</label>
          <input type="text" v-model="withdrawAddress" placeholder="请填入安全理财接收地址" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 font-mono text-xs text-slate-700 outline-none" />
        </div>

        <!-- Amount -->
        <div class="ctrl-grp mb-4">
          <div class="flex justify-between items-baseline mb-1">
            <label class="ctrl-lbl font-bold text-slate-400">核退提取额度</label>
            <span class="text-[10px] text-slate-400 font-mono">
              可核提: {{ formatNumber(currentWithdrawLimit, 6) }} {{ withdrawCoin }}
            </span>
          </div>
          <div class="modal-amt-box flex items-center bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <input type="number" step="any" v-model="withdrawAmount" placeholder="0.00" class="modal-amt-input flex-1 bg-transparent border-0 outline-none font-mono text-sm animate-none" />
            <button @click="withdrawAmount = currentWithdrawLimit" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 ml-2 focus:outline-none cursor-pointer flex-shrink-0">
              全部
            </button>
          </div>
        </div>

        <p class="modal-disclosure text-[10px] leading-relaxed text-slate-400 p-2.5 bg-amber-50/50 text-amber-700 border border-amber-200/20 rounded-lg mb-5">
          * 依照FCA中央托管条限，提出现货或USDT将即刻递交审计。每日额度清核周期为 1-10 分钟。
        </p>

        <button @click="executeLocalWithdraw()" class="btn-submit-deposit w-full bg-[#135E2D] hover:bg-emerald-800 text-white font-bold py-3 text-sm rounded-lg shadow-sm transition-all text-center cursor-pointer">
          提交保提，快速提现
        </button>
      </div>
    </div>


    <!-- 3. TRANSFER (划转) MODAL -->
    <div class="modal-overlay" :class="{ show: transferModalOpen }">
      <div class="modal-window rounded-[8px] max-w-md w-full p-6 text-slate-700 bg-white shadow-xl relative">
        <div class="modal-header-row mb-4">
          <h3 class="modal-header-title text-base font-bold text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-emerald-600 mr-1.5">
              <path fill-rule="evenodd" d="M15.97 10.22a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l.97-.97H12a3 3 0 00-3 3v1.5a.75.75 0 01-1.5 0v-1.5A4.5 4.5 0 0112 12.75h4.19l-.97-.97a.75.75 0 010-1.06zM8.03 13.78a.75.75 0 01-1.06 0L4.72 11.53a.75.75 0 010-1.06l2.25-2.25a.75.75 0 011.06 1.06l-.97.97H12a3 3 0 003-3v-1.5a.75.75 0 011.5 0v1.5A4.5 4.5 0 0112 11.25H7.81l.97.97a.75.75 0 010 1.06z" clip-rule="evenodd" />
            </svg>
            跨子账户资金平移划转
          </h3>
          <button class="modal-header-close cursor-pointer p-1 text-slate-400 hover:text-slate-600 focus:outline-none" @click="transferModalOpen = false">✕</button>
        </div>

        <!-- Coin Selector -->
        <div class="ctrl-grp mb-4">
          <label class="ctrl-lbl block mb-1 font-bold text-slate-400">划转币种</label>
          <select v-model="transferCoin" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 outline-none">
            <option v-for="coin in coinsList" :key="coin.code" :value="coin.code">
              {{ coin.code }} ({{ coin.name }})
            </option>
          </select>
        </div>

        <!-- Transfer Accounts Selection -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="ctrl-grp">
            <label class="ctrl-lbl block mb-1 font-bold text-slate-400">自源头账户 (From)</label>
            <select v-model="transferFrom" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 outline-none">
              <option value="SPOT">现货账户</option>
              <option value="FUTURES">合约账户</option>
              <option value="INSURANCE">保险区账户</option>
            </select>
          </div>
          <div class="ctrl-grp">
            <label class="ctrl-lbl block mb-1 font-bold text-slate-400">到去向账户 (To)</label>
            <select v-model="transferTo" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 outline-none">
              <option value="SPOT">现货账户</option>
              <option value="FUTURES">合约账户</option>
              <option value="INSURANCE">保险区账户</option>
            </select>
          </div>
        </div>

        <!-- Transfer Amount input -->
        <div class="ctrl-grp mb-4">
          <div class="flex justify-between items-baseline mb-1">
            <label class="ctrl-lbl font-bold text-slate-400">划转数量 ({{ transferCoin }})</label>
            <span class="text-[10px] text-slate-400 font-mono">
              最大可划: {{ formatNumber(currentTransferMax, 6) }} {{ transferCoin }}
            </span>
          </div>
          <div class="modal-amt-box flex items-center bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <input type="number" step="any" v-model="transferAmount" placeholder="0.00" class="modal-amt-input flex-1 bg-transparent border-0 outline-none font-mono text-sm animate-none" />
            <button @click="transferAmount = currentTransferMax" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 ml-2 focus:outline-none cursor-pointer flex-shrink-0">
              最大
            </button>
          </div>
        </div>

        <p class="modal-disclosure text-[10px] leading-relaxed text-slate-400 p-2.5 bg-amber-50/50 text-amber-700 border border-amber-200/20 rounded-lg mb-5">
          * 跨钱包资金平移在 0.5秒 内瞬时核实划拨到位，多子账户划拨均不产生任何手续费。
        </p>

        <button @click="executeLocalTransfer()" class="btn-submit-deposit w-full bg-[#135E2D] hover:bg-emerald-800 text-white font-bold py-3 text-sm rounded-lg shadow-sm transition-all text-center cursor-pointer">
          立即划拨，分配完成
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';

const router = useRouter();

// Display Eye Boolean
const showBalance = ref(true);

// Hide small assets
const hideSmallAssets = ref(false);

// Active Sections (Sub-Accounts) mapping to standard tabs
const activeAccountTab = ref('OVERVIEW');
const accountTabs = [
  { id: 'OVERVIEW', label: '资产总览' },
  { id: 'SPOT', label: '现货账户' },
  { id: 'FUTURES', label: '合约账户' },
  { id: 'INSURANCE', label: '保险区账户' }
];

// Coins Details Base Structure
const coinsList = [
  { code: 'USDT', name: '泰达币', color: '#10B981', iconBg: 'bg-emerald-500' },
  { code: 'BTC', name: '比特币', color: '#F7931A', iconBg: 'bg-amber-500' },
  { code: 'LC', name: 'LC代币', color: '#16A34A', iconBg: 'bg-green-600' },
  { code: 'ETH', name: '以太坊', color: '#6366F1', iconBg: 'bg-indigo-500' },
  { code: 'LINK', name: 'Chainlink', color: '#3B82F6', iconBg: 'bg-blue-500' },
  { code: 'MANA', name: 'Decentraland', color: '#EC4899', iconBg: 'bg-pink-500' }
];

// Accounts Holding reference from the main unified reactive store
const holdings = store.holdings;

// Dynamic Price resolution from standard store
const getCoinPrice = (code) => {
  if (code === 'USDT') return 1.0;
  const coin = store.coins.find(c => c.code === code);
  return coin ? coin.price : 1.0;
};

// Return change percentage
const getCoinChange = (code) => {
  if (code === 'USDT') return 0.01;
  const coin = store.coins.find(c => c.code === code);
  return coin ? coin.change : 0.0;
};

// Computed holdings based on active Tab selection
const activeHoldingsValuations = computed(() => {
  const tab = activeAccountTab.value;
  const result = {};
  let total = 0;

  if (tab === 'OVERVIEW') {
    // Overviews sum up all accounts dynamically
    coinsList.forEach(coin => {
      const qty = (holdings.SPOT[coin.code] || 0) + 
                  (holdings.FUTURES[coin.code] || 0) + 
                  (holdings.INSURANCE[coin.code] || 0);
      const val = qty * getCoinPrice(coin.code);
      result[coin.code] = { qty, val };
      total += val;
    });
  } else {
    // Fetch specific accounts holding properties
    const targetAccount = holdings[tab] || {};
    coinsList.forEach(coin => {
      const qty = targetAccount[coin.code] || 0;
      const val = qty * getCoinPrice(coin.code);
      result[coin.code] = { qty, val };
      total += val;
    });
  }

  return {
    items: result,
    total: total
  };
});

// Map percentages status dynamically for legends view & donut chart calculations
const activeHoldingsPercentages = computed(() => {
  const valuations = activeHoldingsValuations.value;
  const total = valuations.total;
  
  return coinsList.map(coin => {
    const assetObj = valuations.items[coin.code] || { qty: 0, val: 0 };
    const pct = total > 0 ? (assetObj.val / total) * 100 : 0;
    return {
      code: coin.code,
      name: coin.name,
      color: coin.color,
      pct: pct,
      valuation: assetObj.val
    };
  }).sort((a, b) => b.valuation - a.valuation); // Sort by highest holding
});

// Dynamic circular paths/dashes computation
const donutSegments = computed(() => {
  const list = activeHoldingsPercentages.value;
  const total = activeHoldingsValuations.value.total;
  if (!total) return [];

  let cumulativeOffset = 0;
  const circumference = 2 * Math.PI * 40; // ~251.327

  return list.map(item => {
    const strokeDash = circumference * (item.pct / 100);
    const offset = cumulativeOffset;
    cumulativeOffset += strokeDash;

    return {
      code: item.code,
      color: item.color,
      strokeDash,
      offset: -offset // Counter clockwise / Clockwise positioning correction map
    };
  });
});

// Filtered listed coins list rendering, honors "隐藏小额资产" setting
const filteredCoins = computed(() => {
  const valuations = activeHoldingsValuations.value.items;
  
  return coinsList.map(coin => {
    const item = valuations[coin.code] || { qty: 0, val: 0 };
    return {
      code: coin.code,
      name: coin.name,
      iconBg: coin.iconBg,
      qty: item.qty,
      valuation: item.val,
      change: getCoinChange(coin.code)
    };
  }).filter(c => {
    if (hideSmallAssets.value) {
      return c.valuation >= 300; // Filter threshold around 300 USDT
    }
    return true;
  });
});

// Transactions History Logic & Initializations from Screenshot
const defaultLedgerLogs = [
  { id: 'LOG101', type: 'BUY', action: '买入', coin: 'BTC', amount: 0.00520000, amountSign: '+', price: 77500.00, fee: '3.01 USDT', time: '2026-06-01 14:32', typeLabel: '买入', statusLabel: '已完成' },
  { id: 'LOG102', type: 'SELL', action: '卖出', coin: 'ETH', amount: -0.50000000, amountSign: '-', price: 2628.50, fee: '0.66 USDT', time: '2026-06-01 11:15', typeLabel: '卖出', statusLabel: '已完成' },
  { id: 'LOG103', type: 'DEPOSIT', action: '充值', coin: 'USDT', amount: 5000.000000, amountSign: '+', price: 1.00, fee: '0.00 USDT', time: '2526-05-31 09:48', typeLabel: '充值', statusLabel: '已到账' },
  { id: 'LOG104', type: 'BUY', action: '买入', coin: 'LC', amount: 12.000000, amountSign: '+', price: 175.80, fee: '0.11 USDT', time: '2026-05-30 16:22', typeLabel: '买入', statusLabel: '已完成' },
  { id: 'LOG105', type: 'WITHDRAW', action: '提现', coin: 'BTC', amount: -0.01000000, amountSign: '-', price: 76200.00, fee: '0.0001 BTC', time: '2026-05-29 20:05', typeLabel: '提现', statusLabel: '已完成' }
];

const ledgerLogs = reactive(store.ledger.length > 0 ? store.ledger : defaultLedgerLogs);

// Save back to general store whenever ledgerLogs update to keep views consistent
watch(() => ledgerLogs, (val) => {
  store.ledger = val;
  localStorage.setItem('lseg_ledger', JSON.stringify(val));
}, { deep: true });

// Filters definition
const ledgerFilters = [
  { id: 'ALL', label: '全部' },
  { id: 'BUY', label: '买入' },
  { id: 'SELL', label: '卖出' },
  { id: 'DEPOSIT', label: '充值' },
  { id: 'WITHDRAW', label: '提现' }
];
const activeLedgerFilter = ref('ALL');

const filteredLedger = computed(() => {
  const f = activeLedgerFilter.value;
  if (f === 'ALL') return ledgerLogs;
  return ledgerLogs.filter(log => log.type === f);
});

// Badge color mappings matching standard design systems
const getTypeBadgeClass = (type) => {
  switch (type) {
    case 'BUY':
      return 'bg-emerald-50 text-emerald-600 border border-emerald-100/30';
    case 'SELL':
      return 'bg-rose-50 text-rose-600 border border-rose-100/30';
    case 'DEPOSIT':
      return 'bg-blue-50 text-blue-600 border border-blue-100/30';
    case 'WITHDRAW':
      return 'bg-amber-50 text-amber-600 border border-amber-100/30';
    default:
      return 'bg-slate-50 text-slate-600 border border-slate-100/30';
  }
};

const getAmountColorClass = (type) => {
  return (type === 'BUY' || type === 'DEPOSIT') ? 'text-emerald-600' : 'text-slate-800';
};



// MODALS DYNAMIC STATE & METHODS
const depositModalOpen = ref(false);
const withdrawModalOpen = ref(false);
const transferModalOpen = ref(false);

const depositCoin = ref('USDT');
const depositNetwork = ref('TRC20');
const depositAmount = ref('');

const withdrawCoin = ref('USDT');
const withdrawNetwork = ref('TRC20');
const withdrawAddress = ref('');
const withdrawAmount = ref('');

const transferCoin = ref('USDT');
const transferFrom = ref('SPOT');
const transferTo = ref('FUTURES');
const transferAmount = ref('');

// Dynamic addresses based on coin choices
const selectAddressMap = {
  USDT: {
    TRC20: 'TYvWTvXW98P9a7B8B9v2dY6VvXWsA75TRc',
    ERC20: '0x7a659Bce34Ac4E36965be23A2Cd655762dC6B66b'
  },
  BTC: {
    Bitcoin: 'bc1qp6v5397vwsad6f8asf8cwwadfaec72vws'
  },
  ETH: {
    ERC20: '0xf8c9Bce34Ac4E3696577bef23A2Cd65aa42dC675a'
  }
};

const availableNetworks = {
  USDT: ['TRC20', 'ERC20'],
  BTC: ['Bitcoin'],
  ETH: ['ERC20']
};

const currentDepositAddress = computed(() => {
  return selectAddressMap[depositCoin.value]?.[depositNetwork.value] || '0xG925828vwaS365825vwa762dC';
});

// Watch coin select in Deposit to auto set first network
watch(depositCoin, (newCoin) => {
  const nets = availableNetworks[newCoin];
  if (nets && nets.length > 0) {
    depositNetwork.value = nets[0];
  }
});

// Watch coin select in Withdraw to auto set first network
watch(withdrawCoin, (newCoin) => {
  const nets = availableNetworks[newCoin];
  if (nets && nets.length > 0) {
    withdrawNetwork.value = nets[0];
  }
});

const currentWithdrawLimit = computed(() => {
  // Withdrawals deduct directly from our SPOT account in this simulation model
  return holdings.SPOT[withdrawCoin.value] || 0;
});

const currentTransferMax = computed(() => {
  const fromAcc = transferFrom.value;
  return holdings[fromAcc]?.[transferCoin.value] || 0;
});

// Open helper gates
const openDeposit = () => {
  depositCoin.value = 'USDT';
  depositNetwork.value = 'TRC20';
  depositAmount.value = '';
  depositModalOpen.value = true;
};

const openWithdraw = () => {
  withdrawCoin.value = 'USDT';
  withdrawNetwork.value = 'TRC20';
  withdrawAddress.value = '';
  withdrawAmount.value = '';
  withdrawModalOpen.value = true;
};

const openTransfer = () => {
  transferCoin.value = 'USDT';
  transferFrom.value = 'SPOT';
  transferTo.value = 'FUTURES';
  transferAmount.value = '';
  transferModalOpen.value = true;
};

const openCoinAction = (action, coinCode) => {
  if (action === 'deposit') {
    depositCoin.value = coinCode;
    const nets = availableNetworks[coinCode] || ['Network'];
    depositNetwork.value = nets[0];
    depositAmount.value = '';
    depositModalOpen.value = true;
  } else if (action === 'withdraw') {
    withdrawCoin.value = coinCode;
    const nets = availableNetworks[coinCode] || ['Network'];
    withdrawNetwork.value = nets[0];
    withdrawAddress.value = '';
    withdrawAmount.value = '';
    withdrawModalOpen.value = true;
  }
};

// Copy clipboard feature
const copyAddress = () => {
  navigator.clipboard.writeText(currentDepositAddress.value).then(() => {
    store.triggerToast('🚀 地址成功复制到剪贴板！');
  }).catch(() => {
    store.triggerToast('⚠️ 备用提示: 请手动长按选择复制。');
  });
};

// Executions!
const executeLocalDeposit = () => {
  const amt = parseFloat(depositAmount.value);
  if (isNaN(amt) || amt <= 0) {
    store.triggerToast('⚠️ 请填写正确的充金申报数额。');
    return;
  }

  // Increase SPOT holdings for designated coin
  holdings.SPOT[depositCoin.value] = Number(((holdings.SPOT[depositCoin.value] || 0) + amt).toFixed(8));
  
  // Log inside historical audit list
  const tx = {
    id: 'TXD' + Math.floor(Math.random() * 90000 + 10000),
    type: 'DEPOSIT',
    action: '充值',
    coin: depositCoin.value,
    amount: amt,
    amountSign: '+',
    price: 1.00,
    fee: '0.00 USDT',
    time: getCurrentDateTimeString(),
    typeLabel: '充值',
    statusLabel: '已到账'
  };
  ledgerLogs.unshift(tx);

  depositModalOpen.value = false;
  store.triggerToast(`🎉 成功物理申报充金 $${amt.toLocaleString()} ${depositCoin.value}，资产账户已实时调平记录！`);
};

const executeLocalWithdraw = () => {
  const amt = parseFloat(withdrawAmount.value);
  const addr = withdrawAddress.value.trim();

  if (!addr) {
    store.triggerToast('⚠️ 提金目标保本渠道地址不可为空。');
    return;
  }

  if (addr.length < 24) {
    store.triggerToast('⚠️ 请输入合规合法的专核提金理财目标地址。');
    return;
  }

  if (isNaN(amt) || amt <= 0) {
    store.triggerToast('⚠️ 请输入合规的提款面额数量。');
    return;
  }

  const currentAvailable = holdings.SPOT[withdrawCoin.value] || 0;
  if (amt > currentAvailable) {
    store.triggerToast('⚠️ 对应币种理财现货子账户可用额度限制不足。');
    return;
  }

  // Subtract from Spot holdings
  holdings.SPOT[withdrawCoin.value] = Number((currentAvailable - amt).toFixed(8));

  // Log to history ledger list
  const tx = {
    id: 'TXW' + Math.floor(Math.random() * 90000 + 10000),
    type: 'WITHDRAW',
    action: '提现',
    coin: withdrawCoin.value,
    amount: amt,
    amountSign: '-',
    price: getCoinPrice(withdrawCoin.value),
    fee: withdrawCoin.value === 'BTC' ? '0.0001 BTC' : '0.50 USDT',
    time: getCurrentDateTimeString(),
    typeLabel: '提现',
    statusLabel: '已完成'
  };
  ledgerLogs.unshift(tx);

  withdrawModalOpen.value = false;
  store.triggerToast(`🔒 保本快速提款申请递呈伦敦结算，面额 $${amt.toLocaleString()} ${withdrawCoin.value} 已平移打出！`);
};

const executeLocalTransfer = () => {
  const fromAcc = transferFrom.value;
  const toAcc = transferTo.value;
  const amt = parseFloat(transferAmount.value);

  if (fromAcc === toAcc) {
    store.triggerToast('⚠️ 自源账户与至账向不可指向同一个子存储账户，请重置选择。');
    return;
  }

  if (isNaN(amt) || amt <= 0) {
    store.triggerToast('⚠️ 请填写合规的划转划拨数额。');
    return;
  }

  const availableInFrom = holdings[fromAcc]?.[transferCoin.value] || 0;
  if (amt > availableInFrom) {
    store.triggerToast('⚠️ 原目标源头子钱包内可用余额度限制不足，未能调配划转。');
    return;
  }

  // Deduct from-acc, credit to-acc
  holdings[fromAcc][transferCoin.value] = Number((availableInFrom - amt).toFixed(8));
  holdings[toAcc][transferCoin.value] = Number(((holdings[toAcc][transferCoin.value] || 0) + amt).toFixed(8));

  // Ledger log Internal shifting record
  const fromLabel = accountTabs.find(t => t.id === fromAcc)?.label || fromAcc;
  const toLabel = accountTabs.find(t => t.id === toAcc)?.label || toAcc;
  const tx = {
    id: 'TXT' + Math.floor(Math.random() * 90000 + 10000),
    type: 'TRANSFER',
    action: '划转',
    coin: transferCoin.value,
    amount: amt,
    amountSign: ' ',
    price: getCoinPrice(transferCoin.value),
    fee: '0.00 USDT',
    time: getCurrentDateTimeString(),
    typeLabel: '物理划转',
    statusLabel: `${fromLabel} ➡️ ${toLabel}`
  };
  ledgerLogs.unshift(tx);

  transferModalOpen.value = false;
  store.triggerToast(`🔄 已成功零手续费安全平移 $${amt.toLocaleString()} ${transferCoin.value} 至 🚀 [${toLabel}]。`);
};

// Router shift helpers
const goToTrade = (coinCode) => {
  if (coinCode === 'LC' || coinCode === 'USDT' || coinCode === 'MANA') {
    router.push('/spot');
  } else {
    router.push('/spot');
  }
};

// Utilities Helpers
const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const getCurrentDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${date} ${h}:${m}`;
};

onMounted(() => {
  // Sync core ledger reference
  store.ledger = ledgerLogs;
});
</script>

<style scoped>
/* Hidden scrollbar utilities */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Modal and layout generic helpers */
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
