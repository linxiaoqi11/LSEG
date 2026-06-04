<template>
  <div class="views-index-container">
    <!-- ==================== PC DESKTOP HOME PANEL ==================== -->
    <div class="pc-layout">
      <!-- Full-Width Promotional Floating Currency Header Banner -->
      <section class="pc-banner-section">
        <div class="pc-banner-container">
          <!-- Left Column Content: Brand & Value Propositions -->
          <div class="banner-left-content" style="max-width: 650px;">
            <div class="banner-badge-box">
              <svg class="banner-badge-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746A1 1 0 0118.5 5.79v4.962a10 10 0 01-5.184 8.718L10 21l-3.316-1.548A10 10 0 011.5 10.752V5.79a1 1 0 01.666-.89zM10 3.102L3.5 6.216v4.536a8.001 8.001 0 004.144 6.974L10 18.736l2.356-1.01a8.001 8.001 0 004.144-6.974V6.216L10 3.102zM10 6a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
              </svg>
              <span>伦敦交易所官方授权</span>
            </div>
            <h1 class="banner-primary-title">布局全球绿色经济新机遇</h1>
            <p class="banner-secondary-subtitle">国内唯一指定运营机构</p>
            <router-link to="/affiliate?tab=ABOUT" class="banner-btn">
              关于我们 &rarr;
            </router-link>
          </div>
        </div>
      </section>

      <!-- Center content box -->
      <main class="pc-content">
        <!-- 1. 我的资产 (Merged total estimation & ledger balances) -->
        <section class="pc-assets-unified-section animate-fade-in">
          <div class="card" style="display: grid; grid-template-columns: 1.2fr 2fr; gap: 40px; align-items: center; padding: 32px; background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(246,252,248,0.98) 100%), #FFFFFF;">
            <!-- Left Column: Total Estimation & Action -->
            <div style="border-right: 1px solid rgba(0,0,0,0.05); padding-right: 40px;">
              <span class="assets-title-row" style="font-size: 13px; letter-spacing: 0.5px; font-weight: 800; color: var(--text-muted); display: block;">我的总资产估值</span>
              <div class="assets-number-row" style="margin-top: 16px; margin-bottom: 12px; display: flex; align-items: baseline;">
                <span class="assets-amt" style="font-size: 42px; font-weight: 900; color: var(--text-primary); font-family: var(--font-display);">
                  {{ formatNumber(totalEstimation, 2) }}
                </span>
                <span class="assets-currency" style="font-size: 20px; font-weight: 800; color: var(--text-secondary); margin-left: 8px;">USD</span>
              </div>
              <div class="assets-pnl-row" style="margin-bottom: 24px; display: flex; align-items: center; gap: 6px;">
                <span style="color:#0B9A47; font-weight:800; font-size: 14px; display: inline-flex; align-items: center; gap: 4px;">
                  <i class="fa-solid fa-arrow-trend-up text-[#0B9A47] text-sm"></i>
                  +1,240.12 (0.28%)
                </span>
                <span style="color:var(--text-muted); font-size: 12px;">今日估损盈亏</span>
              </div>
              <button class="btn-recharge" @click="store.openDepositModal" style="width: 100%; justify-content: center; padding: 14px 24px; font-size: 14px; border-radius: 12px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                充值
              </button>
            </div>
            
            <!-- Right Column: 4 Accounts Grid -->
            <div style="padding-left: 10px;">
              <div class="sec-card-header" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                <h3 class="sec-card-title" style="font-size: 16px; font-weight:850; color: var(--text-primary); letter-spacing: 0.2px;">各托管账户资金分布</h3>
                <span style="font-size: 12px; color: var(--color-green-brand); font-weight: 700; display: flex; align-items: center; gap: 4px;">FCA 托管中 <span style="display:inline-block; width: 6px; height: 6px; background:#22C55E; border-radius:50%;"></span></span>
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <!-- Funding account -->
                <div class="wallet-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: var(--bg-input); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 12px;">
                  <div style="display: flex; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin-right: 12px;">
                      <div style="width: 26px; height: 26px; background: #21692A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10L12 2zm0 16.5L5.5 12 12 5.5 18.5 12 12 18.5z"/></svg>
                      </div>
                    </div>
                    <span class="wallet-item-name" style="font-weight: 800; font-size: 14.5px; color: var(--text-primary);">资金账户</span>
                  </div>
                  <span class="wallet-item-val" style="font-weight: 800; font-size: 15px; color: var(--text-primary); font-family: var(--font-mono);">{{ formatNumber(store.balances.funding, 2) }} USDT</span>
                </div>

                <!-- Spot account -->
                <div class="wallet-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: var(--bg-input); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 12px;">
                  <div style="display: flex; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin-right: 12px;">
                      <div style="width: 26px; height: 26px; background: #21692A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="7" width="18" height="13" rx="2" />
                          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                          <path d="M12 12v3" />
                        </svg>
                      </div>
                    </div>
                    <span class="wallet-item-name" style="font-weight: 800; font-size: 14.5px; color: var(--text-primary);">现货账户</span>
                  </div>
                  <span class="wallet-item-val" style="font-weight: 800; font-size: 15px; color: var(--text-primary); font-family: var(--font-mono);">{{ formatNumber(store.balances.trade, 2) }} USDT</span>
                </div>

                <!-- Insurance account -->
                <div class="wallet-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: var(--bg-input); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 12px;">
                  <div style="display: flex; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin-right: 12px;">
                      <div style="width: 26px; height: 26px; background: #21692A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                      </div>
                    </div>
                    <span class="wallet-item-name" style="font-weight: 800; font-size: 14.5px; color: var(--text-primary);">保险区账户</span>
                  </div>
                  <span class="wallet-item-val" style="font-weight: 800; font-size: 15px; color: var(--text-primary); font-family: var(--font-mono);">{{ formatNumber(store.balances.insurance, 2) }} USDT</span>
                </div>

                <!-- Futures account -->
                <div class="wallet-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: var(--bg-input); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 12px;">
                  <div style="display: flex; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin-right: 12px;">
                      <div style="width: 26px; height: 26px; background: #21692A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                      </div>
                    </div>
                    <span class="wallet-item-name" style="font-weight: 800; font-size: 14.5px; color: var(--text-primary);">合约账户</span>
                  </div>
                  <span class="wallet-item-val" style="font-weight: 800; font-size: 15px; color: var(--text-primary); font-family: var(--font-mono);">{{ formatNumber(store.balances.futures, 2) }} USDT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. 功能入口 -->
        <section class="pc-feature-portal-section">
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 22px; font-weight: 950; color: var(--text-primary); letter-spacing: -0.5px;">功能入口</h2>
          </div>
          <div class="quick-grid" style="grid-template-columns: repeat(8, 1fr); gap: 16px;">
            <router-link to="/copy" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-shield-halved text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">保险区</span>
            </router-link>

            <router-link to="/markets" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-building text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">RWA</span>
            </router-link>

            <router-link to="/spot" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-exchange-alt text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">现货交易</span>
            </router-link>

            <router-link to="/contract" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-chart-line text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">合约交易</span>
            </router-link>

            <router-link to="/spot" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-coins text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">赚币</span>
            </router-link>

            <router-link to="/copy" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-users text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">保险区</span>
            </router-link>

            <router-link to="/contract" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-microchip text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">机器交易</span>
            </router-link>

            <router-link to="/wallet" class="quick-card hover-scale">
              <div class="quick-card-icon-container">
                <i class="fas fa-wallet text-[19px]"></i>
              </div>
              <span class="quick-card-lbl">资产中心</span>
            </router-link>
          </div>
        </section>

        <!-- 3. 热门跟单员 -->
        <section class="pc-hot-traders-section">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;">
            <div>
              <h2 style="font-size: 22px; font-weight: 950; color: var(--text-primary); letter-spacing: -0.5px;">热门跟单员</h2>
            </div>
            <router-link to="/copy" style="font-weight: 800; font-size: 14.5px; color: var(--color-green-brand); display: flex; align-items: center; gap: 4px;">
              保险区大厅 &rarr;
            </router-link>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            <div v-for="trader in hotTraders" :key="trader.name" class="card hover-scale" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: auto; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); background: #FFFFFF; box-sizing: border-box; border: none;">
              <div>
                <!-- Top row: Avatar, Name, Verified checklist and Tags -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <!-- Colored circle with initials as avatar -->
                    <div class="relative shrink-0">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-[15px] select-none shadow-sm" :class="trader.color">
                        {{ trader.avatar }}
                      </div>
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-weight: 850; font-size: 15px; color: var(--text-primary); leading-none;">{{ trader.name }}</span>
                        <span class="w-3.5 h-3.5 bg-[#0B9A47] rounded-full flex items-center justify-center text-white text-[8px] font-black leading-none shrink-0" title="官方核审带单员">✓</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 4px; margin-top: 5px; color: var(--text-muted); font-size: 11px; font-weight: 700; leading-none;">
                        <span class="text-slate-400 font-bold leading-none">
                          跟单员 &nbsp;<span class="text-slate-600 font-extrabold font-mono text-[11.5px]">{{ trader.share }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Responsive high contrast tags in top right corner as in Copy.vue -->
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span class="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60 leading-none">
                      {{ trader.tag1 }}
                    </span>
                    <span class="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60 leading-none">
                      {{ trader.tag2 }}
                    </span>
                  </div>
                </div>

                <!-- 50D total yield description caption -->
                <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">{{ trader.pnlTitle }}</div>
                
                <!-- Large yield performance row with ROI -->
                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 12px; leading-none;">
                  <span style="font-size: 25px; font-weight: 900; color: #0B9A47; font-family: var(--font-mono); letter-spacing: -0.5px; leading-none;">{{ trader.pnl }}</span>
                  <span style="font-size: 12.5px; font-weight: 900; color: #0B9A47; font-family: var(--font-mono); leading-none;">{{ trader.roi }}</span>
                </div>

                <!-- Green glowing custom vector sparkline wave chart identical to Copy.vue -->
                <div style="margin: 12px 0 16px 0; opacity: 0.95;">
                  <svg style="width: 100%; height: 56px;" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient :id="'sparkGrad-' + trader.name" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#10B981" stop-opacity="0.22" />
                        <stop offset="100%" stop-color="#10B981" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                    <path :d="trader.svgPath" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path :d="trader.svgArea" :fill="'url(#sparkGrad-' + trader.name + ')'" />
                  </svg>
                </div>

                <!-- 3 Performance stats columns exactly identical to Copy.vue (图2) -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 12px; margin-bottom: 18px;">
                  <div style="text-align: left;">
                    <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">胜率</div>
                    <div style="font-size: 11.5px; font-weight: 850; color: #0B9A47; font-family: var(--font-mono);">{{ trader.winRate }}</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">带单总额</div>
                    <div style="font-size: 11.5px; font-weight: 850; color: var(--text-primary); font-family: var(--font-mono);">{{ trader.aum }}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">跟单者总额</div>
                    <div style="font-size: 11.5px; font-weight: 850; color: var(--text-primary); font-family: var(--font-mono);">{{ trader.copierPnl }}</div>
                  </div>
                </div>

                <!-- Full width bottom CTA action button to link into active copytrading setup -->
                <router-link to="/copy" style="display: block; width: 100%; text-align: center; background-color: #0B9A47; color: white; font-weight: 850; font-size: 12.5px; padding: 10px 0; border-radius: 8px; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 12px rgba(11, 154, 71, 0.15);" class="hover:bg-emerald-700">
                  跟单
                </router-link>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. 行情中心 -->
        <section class="pc-market-section">
          <div style="margin-bottom: 12px;">
            <h2 style="font-size: 22px; font-weight: 950; color: var(--text-primary); letter-spacing: -0.5px;">行情中心</h2>
          </div>
          <div class="card market-tabs-container" style="padding: 18px 24px 20px 24px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); gap: 12px !important;">
            <div class="market-tabs-row" style="margin-bottom: 0px !important; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; display: flex; gap: 10px;">
              <button class="market-tab" :class="{ active: currentTab === '自选' }" @click="currentTab = '自选'" style="padding: 8px 24px; border-radius: 8px; font-weight: 800;">自选</button>
              <button class="market-tab" :class="{ active: currentTab === '市场' }" @click="currentTab = '市场'" style="padding: 8px 24px; border-radius: 8px; font-weight: 800;">市场</button>
              <button class="market-tab" :class="{ active: currentTab === '保险区' }" @click="currentTab = '保险区'" style="padding: 8px 24px; border-radius: 8px; font-weight: 800;">保险区</button>
              <button class="market-tab" :class="{ active: currentTab === 'RWA' }" @click="currentTab = 'RWA'" style="padding: 8px 24px; border-radius: 8px; font-weight: 800;">RWA</button>
            </div>
            
            <div style="overflow-x: auto;">
              <table class="ticker-table" style="width: 100%;">
                <thead>
                  <tr>
                    <th style="padding: 12px 14px; font-weight: 800;">交易对/币种名称</th>
                    <th style="text-align: right; padding: 12px 14px; font-weight: 800;">指数价格</th>
                    <th style="text-align: right; padding: 12px 14px; font-weight: 800;">24H 浮动涨跌</th>
                    <th style="text-align: right; padding: 12px 14px; font-weight: 800;">24H 大宗换算结算量</th>
                    <th style="text-align: right; padding: 12px 14px; font-weight: 800;">即时风控承保操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="coin in filteredCoins" :key="coin.code">
                    <td class="ticker-coin-cell">
                      <div class="ticker-coin-logo" :class="'logo-' + coin.code.toLowerCase()">{{ coin.code[0] }}</div>
                      <div>
                        <span class="font-bold text-[#1E293B]">{{ coin.code }}</span>
                        <span class="text-slate-400 font-bold text-[10px] ml-1">/{{ coin.sfx }}</span>
                        <div class="text-[10px] text-slate-400 font-semibold mt-0.5">{{ coin.name }}</div>
                      </div>
                      <span v-if="coin.insurance" class="coin-badge-insurance ml-2">托管保本区</span>
                    </td>
                    <td style="text-align: right; font-family: var(--font-mono);" class="font-bold">
                      ${{ formatNumber(coin.price, coin.price > 100 ? 2 : 4) }}
                    </td>
                    <td style="text-align: right;">
                      <span class="ticker-change-badge" :class="coin.change >= 0 ? 'change-up' : 'change-down'">
                        {{ coin.change >= 0 ? '+' : '' }}{{ coin.change }}%
                      </span>
                    </td>
                    <td style="text-align: right; font-family: var(--font-mono); color: var(--text-secondary);" class="font-bold">
                      {{ coin.vol }}
                    </td>
                    <td style="text-align: right;">
                      <div class="table-actions">
                        <router-link to="/spot" class="table-btn-grey">现货兑付</router-link>
                        <router-link to="/contract" class="table-btn-green">合约风控</router-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredCoins.length === 0">
                    <td colspan="5" class="text-center py-8 text-slate-400 font-bold">没有查找到相符资产代币</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 5. 新闻公告 -->
        <section class="pc-news-section" style="display: flex; flex-direction: column; width: 100%; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;">
            <div>
              <h2 style="font-size: 22px; font-weight: 950; color: var(--text-primary); letter-spacing: -0.5px; margin: 0;">新闻公告</h2>
            </div>
            <router-link to="/news" style="font-weight: 800; font-size: 14px; color: var(--color-green-brand);">
              更多资讯 &rarr;
            </router-link>
          </div>
          <div class="news-list pc-news-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <router-link v-for="news in store.news.slice(0, 6)" :key="news.id" :to="`/news/${news.id}`" class="card news-card-item animate-fade-in" style="padding: 24px; border-radius: 8px; background: #FFFFFF; display: flex; align-items: center; justify-content: space-between; gap: 16px; border: none; cursor: pointer; text-decoration: none; transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;">
              <div class="news-item-body" style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                <span class="news-item-meta" style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block;">{{ news.meta }}</span>
                <p class="news-item-title font-bold leading-tight" style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.5; transition: color 0.1s;">{{ news.title }}</p>
              </div>
              <img :src="news.img" class="news-item-image" style="width: 100px; height: 64px; object-fit: cover; border-radius: 6px; flex-shrink: 0;" referrerPolicy="no-referrer" />
            </router-link>
          </div>
        </section>

        <!-- Download APP PC Module -->
        <section class="pc-download-section" style="width: 100%; display: flex; flex-direction: column; margin-bottom: 12px;">
          <div class="card" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: center; padding: 40px 60px; background: linear-gradient(135deg, rgba(236, 252, 243, 0.4) 0%, rgba(255,255,255,1) 100%); border-radius: 10px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02); overflow: hidden; position: relative; border: none;">
            
            <!-- Left Side Content -->
            <div style="z-index: 2;">
              <h2 style="font-size: 34px; font-weight: 950; color: var(--text-primary); margin-top: 0; margin-bottom: 28px; letter-spacing: -1px; font-family: var(--font-sans);">
                随时随地，便捷交易
              </h2>
              
              <!-- Download options container -->
              <div style="display: flex; align-items: center; gap: 32px;">
                <!-- QR Code Block -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                  <div style="padding: 10px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center; width: 120px; height: 120px; box-sizing: border-box;">
                    <img src="https://img-reg-ab.imagency.cn/e/6579de7425c1fd7699d8e93d30c8fb31.jpg" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;" alt="download-qr" referrerPolicy="no-referrer" />
                  </div>
                  <span style="font-size: 12px; font-weight: 800; color: var(--text-muted);">扫码下载官方App</span>
                </div>
                
                <!-- Buttons Block -->
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <!-- iOS Button -->
                  <a href="javascript:void(0)" @click="store.triggerToast('正在为您安全调配 iOS 安装证书并在分发信托通道中部署App下载服务...')" class="hover-scale" style="background: #111827; color: white; border-radius: 10px; padding: 12px 24px; display: flex; align-items: center; gap: 12px; text-decoration: none; width: 170px; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: all 0.2s;">
                    <i class="fa-brands fa-apple text-[22px] text-white"></i>
                    <div style="text-align: left;">
                      <div style="font-size: 15px; font-weight: 850; font-family: var(--font-sans); line-height: 1;">App Store</div>
                    </div>
                  </a>
                  
                  <!-- Android Button -->
                  <a href="javascript:void(0)" @click="store.triggerToast('正在为您调取官方通道进行极速 APK 包体下载，并穿透 FCA 安全信托机制隔离保护...')" class="hover-scale" style="background: #111827; color: white; border-radius: 10px; padding: 12px 24px; display: flex; align-items: center; gap: 12px; text-decoration: none; width: 170px; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: all 0.2s;">
                    <i class="fa-brands fa-google-play text-[18px] text-white"></i>
                    <div style="text-align: left;">
                      <div style="font-size: 15px; font-weight: 850; font-family: var(--font-sans); line-height: 1;">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Right Side Image (mock mockup screenshot/phone) -->
            <div style="position: relative; display: flex; align-items: center; justify-content: center; height: 100%; z-index: 1;">
              <!-- Decorative background flare -->
              <div style="position: absolute; width: 330px; height: 330px; background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none; z-index: -1;"></div>
              
              <img src="https://img-reg-ab.imagency.cn/e/072c4342e6ede753b3c6a049ee9d1612.png" style="max-height: 480px; width: auto; object-fit: contain; pointer-events: none; display: block;" alt="App Screenshot Mock" referrerPolicy="no-referrer" />
            </div>
            
          </div>
        </section>
      </main>

      <!-- ==================== 6. 邀请好友 STANDALONE REWARD BANNER (Optimized margins, screenwide layout) ==================== -->
      <section class="referral-banner-section px-0 w-full" style="background: #FFFFFF; border: none; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 280px; box-sizing: border-box; padding: 60px 0; margin-top: 24px; margin-bottom: 0;">
        <div style="position: absolute; inset: 0; background-image: url('https://img-reg-ab.imagency.cn/e/7c866137afb81521f59cc43aa45d543f.jpg'); background-repeat: no-repeat; background-position: center center; background-size: cover; opacity: 0.45; pointer-events: none; z-index: 1;"></div>
        <div style="position: relative; width: 100%; max-width: 1200px; min-height: 180px; display: flex; align-items: center; justify-content: center; padding: 0 40px; box-sizing: border-box; z-index: 2;">
          
          <!-- Left gold coin floats -->
          <img src="https://img-reg-ab.imagency.cn/e/af9a7d5d41038884a14e849baa532e4f.png" class="animate-float-1" style="position: absolute; left: 18%; top: calc(50% - 65px); width: 120px; height: auto; transform: rotate(-15deg); filter: drop-shadow(0 15px 15px rgba(0,0,0,0.08)); pointer-events: none; z-index: 1;" alt="coin-left" referrerPolicy="no-referrer" />
          
          <!-- Right gold coin floats -->
          <img src="https://img-reg-ab.imagency.cn/e/5f8db88b640367b61f9d86e48c07d458.png" class="animate-float-3" style="position: absolute; right: 18%; bottom: calc(50% - 60px); width: 110px; height: auto; transform: rotate(18deg); filter: drop-shadow(0 15px 15px rgba(0,0,0,0.08)); pointer-events: none; z-index: 1;" alt="coin-right" referrerPolicy="no-referrer" />
          
          <!-- Center text two rows flow as requested -->
          <div style="position: relative; z-index: 2; max-width: 750px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <h2 style="font-size: 32px; font-weight: 950; color: #111827; line-height: 1.4; letter-spacing: -0.5px; margin: 0; text-align: center; font-family: var(--font-sans);">
              邀请一个朋友加入 <span style="color: var(--color-green-brand);">LSEG</span>，
            </h2>
            <p style="font-size: 30px; font-weight: 950; color: #111827; line-height: 1.4; letter-spacing: -0.5px; margin: 8px 0 28px 0; text-align: center; font-family: var(--font-sans);">
              你们都会 <span style="color: var(--color-green-brand); font-weight: 950;">得到奖励</span>
            </p>
            
            <button @click="copyReferral" class="hover-scale" style="background-color: var(--color-green-brand); color: white; font-weight: 850; font-size: 15px; border-radius: 999px; padding: 12px 40px; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 6px 20px rgba(33, 105, 42, 0.25); line-height: 1.2;">
              <span>立即邀请</span>
              <i class="fa-solid fa-arrow-up-right text-[13px] ml-1"></i>
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- ==================== MOBILE PHONE APP DISPLAY ==================== -->
    <div class="mobile-only">
      <div class="mobile-content-box">
        <!-- Banner Carousel mock -->
        <div class="card p-4 rounded-[8px] bg-gradient-to-tr from-[#021f10] to-[#0c4a29] text-white flex justify-between items-center relative overflow-hidden" style="min-height: 140px;">
          <div class="z-10 max-w-[65%]">
            <span class="inline-block bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full mb-2">伦敦交易所授权</span>
            <h2 class="text-sm font-black leading-tight">英国保全大宗信托机制保障</h2>
            <p class="text-[10px] text-emerald-300 mt-1">资金穿透拨备 官方合规保护底仓</p>
          </div>
          <img src="https://img-reg-ab.imagency.cn/e/9f353bef50a3be559e53ea5a1c997f40.png" class="w-16 h-16 object-contain opacity-80" />
        </div>

        <!-- Wallet balances summary model -->
        <div class="card p-4 bg-white rounded-[8px] shadow-sm border-none">
          <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">我的资产估值汇总</span>
          <div class="flex items-baseline gap-2 mt-2">
            <span class="text-2xl font-extrabold text-slate-900 font-display">${{ formatNumber(totalEstimation, 2) }}</span>
            <span class="text-xs font-bold text-slate-500">USD</span>
          </div>
          <div class="text-[11px] text-[#0B9A47] font-bold mt-1">↗ +1,240.12 (0.28%) 今日估损盈亏</div>
          
          <div class="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-50">
            <div class="bg-slate-50/50 p-2.5 rounded-xl border-none">
              <div class="text-[9px] text-slate-400 font-bold uppercase">资金账户</div>
              <div class="text-xs font-bold text-slate-800 font-mono mt-0.5">${{ formatNumber(store.balances.funding, 2) }}</div>
            </div>
            <div class="bg-slate-50/50 p-2.5 rounded-xl border-none">
              <div class="text-[9px] text-slate-400 font-bold uppercase">现货账户</div>
              <div class="text-xs font-bold text-slate-800 font-mono mt-0.5">${{ formatNumber(store.balances.trade, 2) }}</div>
            </div>
          </div>
        </div>

        <!-- 4 Column quick app grid -->
        <div class="mobile-grid-col-4">
          <router-link to="/copy" class="mobile-quick-card border-none bg-slate-50/40">
            <div class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-sm">
              <i class="fas fa-shield-halved text-[16px]"></i>
            </div>
            <span class="mobile-quick-lbl font-extrabold text-[11px] mt-1 ml-0 bg-transparent">保险区</span>
          </router-link>
          
          <router-link to="/markets" class="mobile-quick-card border-none bg-slate-50/40">
            <div class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-sm">
              <i class="fas fa-building text-[16px]"></i>
            </div>
            <span class="mobile-quick-lbl font-extrabold text-[11px] mt-1 ml-0 bg-transparent">RWA</span>
          </router-link>

          <router-link to="/spot" class="mobile-quick-card border-none bg-slate-50/40">
            <div class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-sm">
              <i class="fas fa-exchange-alt text-[16px]"></i>
            </div>
            <span class="mobile-quick-lbl font-extrabold text-[11px] mt-1 ml-0 bg-transparent">现货兑现</span>
          </router-link>

          <router-link to="/contract" class="mobile-quick-card border-none bg-slate-50/40">
            <div class="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-sm">
              <i class="fas fa-chart-line text-[16px]"></i>
            </div>
            <span class="mobile-quick-lbl font-extrabold text-[11px] mt-1 ml-0 bg-transparent">合约对调</span>
          </router-link>
        </div>

        <!-- Hot traders row -->
        <div>
          <div class="mobile-section-heading">
            <h3 class="mobile-section-title font-extrabold">热门跟单员</h3>
            <router-link to="/copy" class="mobile-section-arrow">查看全部 &rarr;</router-link>
          </div>
          
          <div class="grid grid-cols-1 gap-3">
            <div v-for="trader in hotTraders.slice(0, 2)" :key="trader.name" class="card p-3 bg-white rounded-[8px] shadow-sm border-none flex items-center justify-between">
              <div class="flex items-center gap-3">
                <!-- Colored circle with initials as avatar on mobile -->
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-[12px] select-none shadow-xs shrink-0" :class="trader.color">
                  {{ trader.avatar }}
                </div>
                <div>
                  <div class="flex items-center gap-1">
                    <h4 class="text-xs font-black text-slate-800">{{ trader.name }}</h4>
                    <span class="w-2.5 h-2.5 bg-[#0B9A47] rounded-full flex items-center justify-center text-white text-[7px] font-black leading-none shrink-0">✓</span>
                  </div>
                  <p class="text-[10px] text-slate-400 mt-1 font-semibold">收益率: <span class="text-emerald-600 font-extrabold font-mono">{{ trader.roi }}</span></p>
                </div>
              </div>
              <router-link to="/copy" class="bg-[#0B9A47] text-white font-extrabold text-[11px] px-4 py-1.5 rounded-lg shadow-sm">跟单</router-link>
            </div>
          </div>
        </div>

        <!-- Ticker hot list -->
        <div>
          <div class="mobile-section-heading">
            <h3 class="mobile-section-title font-extrabold">币种指数行情</h3>
            <router-link to="/markets" class="mobile-section-arrow">更多市场 &rarr;</router-link>
          </div>

          <div class="bg-white rounded-[8px] shadow-sm border-none overflow-hidden divide-y divide-slate-100">
            <div v-for="coin in store.coins.slice(0, 4)" :key="'mob-' + coin.code" class="p-3 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="ticker-coin-logo w-8 h-8 font-extrabold" :class="'logo-' + coin.code.toLowerCase()">{{ coin.code[0] }}</div>
                <div>
                  <span class="text-xs font-black text-slate-800">{{ coin.code }}</span>
                  <div class="text-[9px] text-slate-400 font-semibold">{{ coin.name }}</div>
                </div>
              </div>
              
              <div class="text-right">
                <div class="text-xs font-extrabold font-mono">${{ formatNumber(coin.price, coin.price > 100 ? 2 : 4) }}</div>
                <div class="text-[10px] font-extrabold" :class="coin.change >= 0 ? 'text-[#0B9A47]' : 'text-red-500'">
                  {{ coin.change >= 0 ? '+' : '' }}{{ coin.change }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Standalone Download APP Module on Mobile -->
        <div class="card p-5 bg-gradient-to-br from-emerald-50/40 to-white rounded-[8px] border-none shadow-sm relative overflow-hidden mt-4 mb-2" style="position: relative;">
          <!-- Content wrap -->
          <div style="display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 2;">
            
            <!-- Top section containing illustration image (moved on top) -->
            <div style="display: flex; align-items: center; justify-content: center; position: relative;">
              <div style="position: absolute; width: 100px; height: 100px; background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
              <img src="https://img-reg-ab.imagency.cn/e/072c4342e6ede753b3c6a049ee9d1612.png" style="width: 80%; max-height: 160px; object-fit: contain; position: relative; z-index: 2;" referrerPolicy="no-referrer" />
            </div>

            <!-- Bottom section: Text, QR Code & Download triggers (moved below) -->
            <div>
              <h4 class="text-xs font-black text-slate-800 leading-tight mb-2 text-center">随时随地，便捷交易</h4>
              
              <!-- QR Code & Buttons layout stacked or side-by-side as most optimized -->
              <div class="flex items-center justify-center gap-3 mt-3">
                <!-- QR Code image -->
                <div style="padding: 4px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center; width: 68px; height: 68px; box-sizing: border-box; flex-shrink: 0;">
                  <img src="https://img-reg-ab.imagency.cn/e/6579de7425c1fd7699d8e93d30c8fb31.jpg" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;" alt="download-qr" referrerPolicy="no-referrer" />
                </div>
                
                <!-- OS buttons stacked small -->
                <div class="flex flex-col gap-1.5 flex-1 max-w-[170px]">
                  <!-- iOS Small -->
                  <a href="javascript:void(0)" @click="store.triggerToast('正在检测 iOS 设备 network 状态，为您为您安全调配托管分发证书并启动安装机制...')" class="flex items-center justify-center gap-1 bg-slate-900 text-white rounded-md px-2.5 py-1.5 text-[9px] font-extrabold" style="text-decoration: none;">
                    <i class="fa-brands fa-apple text-[11px] text-white"></i>
                    <span>App Store</span>
                  </a>
                  
                  <!-- Android Small -->
                  <a href="javascript:void(0)" @click="store.triggerToast('正在拉取官方包体并接入信托防护安全隔离沙箱运行极速 APK 安装...')" class="flex items-center justify-center gap-1 bg-slate-900 text-white rounded-md px-2.5 py-1.5 text-[9px] font-extrabold" style="text-decoration: none;">
                    <i class="fa-brands fa-google-play text-[10px] text-white"></i>
                    <span>Google Play</span>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <!-- Standalone Invite Module on Mobile (Matches new separate requirement) -->
        <div class="card p-5 bg-gradient-to-r from-emerald-50/70 to-teal-50/50 rounded-[8px] border-none shadow-sm text-center relative overflow-hidden mt-2">
          <img src="https://img-reg-ab.imagency.cn/e/af9a7d5d41038884a14e849baa532e4f.png" class="w-14 h-auto absolute -left-2 top-[15%] opacity-35 animate-float-1" />
          <img src="https://img-reg-ab.imagency.cn/e/5f8db88b640367b61f9d86e48c07d458.png" class="w-12 h-auto absolute -right-2 bottom-[15%] opacity-35 animate-float-3" />
          
          <div class="relative z-10">
            <h4 class="text-sm font-black text-slate-800">邀请一个朋友加入 <span class="text-[#21692A]">LSEG</span></h4>
            <p class="text-xs font-black text-slate-700 mt-1">你们都会 <span class="text-[#21692A]">得到奖励</span></p>
            <button @click="copyReferral" class="mt-3.5 bg-[#21692A] text-white font-extrabold text-[11.5px] px-6 py-2 rounded-full shadow-md">立即邀请 &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '../store';

const currentTab = ref('自选');
const searchQuery = ref('');

const hotTraders = [
  { 
    name: "风沐", 
    avatar: "FM", 
    color: "bg-[#0B9A47]", 
    tag1: "稳健型", 
    tag2: "长线", 
    share: "359/100", 
    pnlTitle: "50天带单总收益", 
    pnl: "+376,665.37", 
    roi: "+95.85%", 
    winRate: "95.65%", 
    aum: "471,816.39", 
    copierPnl: "181,450.98",
    svgPath: "M 0,45 Q 40,20 80,35 T 160,25 T 240,40 T 300,15",
    svgArea: "M 0,45 Q 40,20 80,35 T 160,25 T 240,40 T 300,15 L 300,60 L 0,60 Z"
  },
  { 
    name: "K线老船长", 
    avatar: "KX", 
    color: "bg-[#2563EB]", 
    tag1: "波段", 
    tag2: "技术派", 
    share: "459/200", 
    pnlTitle: "50天带单总收益", 
    pnl: "+376,665.37", 
    roi: "+95.85%", 
    winRate: "95.85%", 
    aum: "471,816.39", 
    copierPnl: "181,450.98",
    svgPath: "M 0,40 Q 30,12 70,30 T 150,15 T 230,35 T 300,20",
    svgArea: "M 0,40 Q 30,12 70,30 T 150,15 T 230,35 T 300,20 L 300,60 L 0,60 Z"
  },
  { 
    name: "武大郎合约", 
    avatar: "WD", 
    color: "bg-[#7C3AED]", 
    tag1: "合约", 
    tag2: "激进型", 
    share: "359/100", 
    pnlTitle: "50天带单总收益", 
    pnl: "+376,665.37", 
    roi: "+95.85%", 
    winRate: "95.65%", 
    aum: "471,816.39", 
    copierPnl: "181,450.98",
    svgPath: "M 0,35 Q 50,15 90,30 T 170,20 T 250,45 T 300,10",
    svgArea: "M 0,35 Q 50,15 90,30 T 170,20 T 250,45 T 300,10 L 300,60 L 0,60 Z"
  }
];

// newsList has been migrated globally to store.news in store.js

const totalEstimation = computed(() => {
  return store.balances.funding + store.balances.trade + store.balances.insurance + store.balances.futures;
});

const filteredCoins = computed(() => {
  let list = store.coins;
  
  // Tab filters
  if (currentTab.value === '自选') {
    list = store.coins.filter(c => c.type === 'main');
  } else if (currentTab.value === '保险区') {
    list = store.coins.filter(c => c.insurance === true);
  } else if (currentTab.value === 'RWA') {
    list = store.coins.filter(c => c.code === 'SOLAR' || c.code === 'WIND' || c.type === 'rwa');
  }
  
  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }
  
  return list;
});

const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const copyReferral = () => {
  const refLink = 'https://lseg-greeneconomy.fca-org.uk/ref=91007';
  navigator.clipboard.writeText(refLink);
  store.triggerToast('推荐链接已复制！快去发送给好友领取奖励吧：' + refLink);
};
</script>

<style scoped>
/* Glowing effects for prices on Index tables */
.ticker-table tr:hover {
  background-color: #F8FAF9;
}
.news-card-item {
  border: none !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02) !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.news-card-item:hover {
  transform: translateY(-2.5px);
  box-shadow: 0 10px 25px rgba(11, 154, 71, 0.05) !important;
}
.news-card-item:hover .news-item-title {
  color: #0B9A47 !important;
}
</style>
