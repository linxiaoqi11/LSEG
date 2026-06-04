<template>
  <div>
    <!-- ==================== PC DESKTOP TOP NAV ==================== -->
    <header class="pc-top-nav">
      <!-- Left: Logo Group & Navigation Menu -->
      <div style="display: flex; align-items: center; gap: 32px;">
        <router-link to="/" class="header-brand-group no-underline">
          <img src="https://img-reg-ab.imagency.cn/e/9f353bef50a3be559e53ea5a1c997f40.png" style="width: 44px; height: 44px; object-fit: contain; margin-bottom: 0;" alt="LSEG Logo" referrerPolicy="no-referrer" />
          <div class="header-brand-text">
            <h1 class="sidebar-title" style="font-size: 16px; font-weight: 850;">LSEG</h1>
            <div class="sidebar-subtitle" style="font-size: 9px; font-weight: 800;">官方授权机构</div>
          </div>
        </router-link>
        
        <!-- Navigation Menu -->
        <nav class="header-nav-links">
          <router-link to="/" class="header-nav-link" :class="{ active: currentPath === '/' || currentPath === '/index' }">
            首页
          </router-link>
          <router-link to="/markets" class="header-nav-link" :class="{ active: currentPath === '/markets' }">
            市场
          </router-link>
          <router-link to="/spot" class="header-nav-link" :class="{ active: currentPath === '/spot' }">
            交易
          </router-link>
          <router-link to="/contract" class="header-nav-link" :class="{ active: currentPath === '/contract' }">
            合约
          </router-link>
          <router-link to="/copy" class="header-nav-link" :class="{ active: currentPath === '/copy' }">
            保险区
          </router-link>
          <router-link to="/wallet" class="header-nav-link" :class="{ active: currentPath === '/wallet' }">
            总资产
          </router-link>
          <router-link to="/affiliate?tab=invite" class="header-nav-link" :class="{ active: currentPath === '/affiliate' && route.query.tab === 'invite' }">
            邀请
          </router-link>
        </nav>
      </div>

      <!-- Right: Search, Indicators & Actions -->
      <div class="nav-right">
        <!-- Download APP Badge (hidden on mobile, redirects to /download) -->
        <router-link 
          to="/download" 
          class="hidden md:flex items-center gap-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] px-3.5 py-1.5 rounded-lg no-underline transition-colors text-[#475569] hover:text-[#1B5831] cursor-pointer"
        >
          <i class="fa-solid fa-mobile-screen text-[#1B5831] text-[13.5px]"></i>
          <span class="font-bold text-[12.5px] text-slate-700">下载手机APP</span>
          <svg style="width: 12px; height: 12px; margin-left: 2px; color: #94A3B8;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>



        <button class="nav-icon-button" @click="store.triggerToast('英国金融行为特区监管核审中，链路畅通。')">
          <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <div class="nav-notification-badge">3</div>
        </button>

        <template v-if="store.isLoggedIn">
          <router-link to="/affiliate" class="nav-user-avatar no-underline" id="avatarTrigger" style="text-decoration: none; color: white;">
            {{ store.userInfo && store.userInfo.username ? store.userInfo.username.substring(0, 2).toUpperCase() : 'JD' }}
          </router-link>
        </template>
        <template v-else>
          <div style="display: flex; align-items: center; gap: 12px;">
            <router-link to="/login" class="text-xs md:text-sm font-black border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-600 px-3 py-1.5 rounded-lg no-underline transition-all">登录</router-link>
            <router-link to="/register" class="text-xs md:text-sm font-black text-white hover:opacity-90 px-3 py-1.5 rounded-lg no-underline transition-all" style="background-color: var(--color-green-brand);">注册</router-link>
          </div>
        </template>
      </div>
    </header>

    <!-- ==================== MOBILE HEADER BAR ==================== -->
    <div class="mobile-only" v-if="!['/login', '/register'].includes(currentPath)">
      <div class="mobile-header-bar">
        <div class="mobile-brand-group">
          <img src="https://img-reg-ab.imagency.cn/e/9f353bef50a3be559e53ea5a1c997f40.png" style="width: 30px; height: 30px; object-fit: contain;" alt="LSEG Logo" />
          <span class="mobile-brand-title" style="font-size: 15.5px;">LSEG 衍生品交易</span>
        </div>
        <div class="mobile-btn-group">
          <div class="nav-auth-indicator" style="font-size: 8px; padding: 2px 6px;">
            <div class="nav-auth-dot"></div>
            <span>FCA 监管中</span>
          </div>
          <!-- Hamburger menu button placed on the right side of header -->
          <button 
            type="button" 
            @click="toggleDrawer" 
            class="w-9 h-9 bg-transparent border-none text-[#1E293B] hover:opacity-80 active:opacity-60 flex items-center justify-center cursor-pointer focus:outline-none select-none"
            style="outline: none;"
          >
            <i class="fa-solid fa-bars text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== MOBILE DRAWER OVERLAY & PANEL ==================== -->
    <div v-if="!['/login', '/register'].includes(currentPath)" class="mobile-only">
      <!-- Overlay -->
      <div 
        v-if="isDrawerOpen" 
        class="fixed inset-0 bg-black/60 z-[2000] transition-opacity duration-300"
        @click="closeDrawer"
      ></div>
      
      <!-- Drawer Panel -->
      <div 
        class="fixed top-0 right-0 h-full w-[290px] bg-white z-[2001] shadow-2xl flex flex-col transition-all duration-300 ease-out border-l border-slate-100"
        :style="isDrawerOpen ? 'transform: translateX(0);' : 'transform: translateX(100%);'"
      >
        <!-- Drawer Header -->
        <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <template v-if="store.isLoggedIn">
              <div class="w-9 h-9 rounded-full bg-[#0B9A47] text-white flex items-center justify-center font-extrabold text-[13px] shadow-xs shrink-0 select-none">
                {{ store.userInfo && store.userInfo.username ? store.userInfo.username.substring(0, 2).toUpperCase() : 'JD' }}
              </div>
              <div class="min-w-0">
                <span class="block text-xs font-black text-slate-800 truncate leading-tight">{{ store.userInfo?.username || '用户' }}</span>
                <span class="block text-[9px] text-slate-400 font-bold mt-0.5 leading-none">FCA合规监管认证</span>
              </div>
            </template>
            <template v-else>
              <img src="https://img-reg-ab.imagency.cn/e/9f353bef50a3be559e53ea5a1c997f40.png" style="width: 28px; height: 28px; object-fit: contain;" alt="LSEG Logo" class="shrink-0" />
              <div>
                <span class="block text-xs font-black text-slate-800 leading-tight">欢迎来到 LSEG</span>
                <span class="block text-[9px] text-[#0B9A47] font-bold mt-0.5 leading-none">全球领航绿色经济</span>
              </div>
            </template>
          </div>
          <!-- Close button -->
          <button 
            type="button" 
            @click="closeDrawer"
            class="w-7 h-7 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer transition-colors focus:outline-none shadow-xs"
          >
            <i class="fa-solid fa-xmark text-sm font-bold"></i>
          </button>
        </div>

        <!-- Valuation Box for Logged In User -->
        <div v-if="store.isLoggedIn" class="mx-4 mt-4 p-3.5 bg-gradient-to-br from-[#1E3E26] to-[#0A2612] text-white rounded-xl shadow-sm">
          <span class="block text-[10px] text-slate-300 opacity-90 font-bold tracking-wider">总资产估值 (USDT)</span>
          <div class="flex items-baseline gap-1 mt-1.5">
            <span class="text-lg font-black tracking-tight leading-none">
              {{ formatNumber(totalAssetsValuation, 2) }}
            </span>
            <span class="text-[10px] font-bold opacity-75">USDT</span>
          </div>
          <div class="text-[9.5px] opacity-75 mt-1 font-mono tracking-wide font-bold">
            ≈ 元 {{ formatNumber(totalAssetsValuation * 7.24, 2) }}
          </div>
        </div>

        <!-- Non-logged in quick actions -->
        <div v-else class="p-4 grid grid-cols-2 gap-2.5">
          <router-link 
            to="/login" 
            @click="closeDrawer"
            class="flex items-center justify-center gap-1 py-2.5 px-3 border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-600 rounded-lg text-xs font-black text-center no-underline cursor-pointer bg-white transition-all shadow-xs"
          >
            <i class="fa-solid fa-right-to-bracket text-xs text-slate-400"></i>
            立即登录
          </router-link>
          <router-link 
            to="/register" 
            @click="closeDrawer"
            class="flex items-center justify-center gap-1 py-2.5 px-3 bg-[#0B9A47] text-white hover:bg-emerald-700 rounded-lg text-xs font-black text-center no-underline cursor-pointer transition-all shadow-xs"
          >
            <i class="fa-solid fa-user-plus text-xs"></i>
            免费注册
          </router-link>
        </div>

        <!-- Scrollable Navigation list -->
        <div class="flex-1 overflow-y-auto px-4 py-3 text-slate-700 font-bold text-xs select-none space-y-4">
          <!-- LOGGED-IN NAVIGATION -->
          <template v-if="store.isLoggedIn">
            <!-- SECTION 1: 我的订单 -->
            <div class="space-y-1">
              <span class="block text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-2 px-1">我的订单</span>
              <router-link 
                to="/affiliate?section=ORDER_FUNDING" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-file-invoice-dollar text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">资金订单</span>
              </router-link>
              <router-link 
                to="/affiliate?section=ORDER_SPOT" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-chart-line text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">现货订单</span>
              </router-link>
              <router-link 
                to="/affiliate?section=ORDER_INSURANCE" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-shield-halved text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">保险期订单</span>
              </router-link>
              <router-link 
                to="/affiliate?section=ORDER_CONTRACT" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-arrow-trend-up text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">合约订单</span>
              </router-link>
            </div>

            <!-- SECTION 2: 推广 -->
            <div class="space-y-1 pt-1">
              <span class="block text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-2 px-1">推广</span>
              
              <!-- 邀请好友: Custom-highlighted background as shown in PC menu -->
              <router-link 
                to="/affiliate?tab=invite" 
                @click="closeDrawer" 
                class="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#EAF5EF] text-[#0B9A47] hover:bg-[#DDF0E6] no-underline transition-all mb-1 font-bold"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fa-solid fa-user-plus text-[14px] text-[#0B9A47] w-5 text-center"></i>
                  <span class="text-xs">邀请好友</span>
                </div>
                <i class="fa-solid fa-chevron-right text-[11px] text-[#0B9A47]"></i>
              </router-link>

              <router-link 
                to="/affiliate?section=TEAM" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-users text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">我的团队</span>
              </router-link>
              <router-link 
                to="/affiliate?section=REWARDS" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-gift text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">我的奖励</span>
              </router-link>
            </div>

            <!-- SECTION 3: 其他 -->
            <div class="space-y-1 pt-1">
              <span class="block text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-2 px-1">其他</span>
              <router-link 
                to="/affiliate?section=SETTINGS" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-gear text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">设置</span>
              </router-link>
              <router-link 
                to="/affiliate?tab=ABOUT" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-circle-info text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">关于 LSEG</span>
              </router-link>
              <router-link 
                to="/affiliate?section=ABOUT_CHAT" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-headset text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">咨询合规客服</span>
              </router-link>

              <!-- Safety Logout Item perfectly aligned like PC's list -->
              <button 
                type="button"
                @click="triggerLogout" 
                class="w-full flex items-center gap-3 py-2.5 px-2 rounded-lg text-rose-500 hover:bg-rose-50 border-none bg-transparent hover:text-rose-700 transition-all group cursor-pointer text-left font-bold"
                style="outline: none;"
              >
                <i class="fa-solid fa-arrow-right-from-bracket text-[14px] text-rose-400 group-hover:text-rose-600 w-5 text-center"></i>
                <span class="text-xs">安全退出</span>
              </button>
            </div>
          </template>

          <!-- LOGGED-OUT GUEST NAVIGATION -->
          <template v-else>
            <!-- SECTION 1: 主流行情 -->
            <div class="space-y-1">
              <span class="block text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-2 px-1">主流行情</span>
              <router-link 
                to="/markets" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-chart-line text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">市场大厅</span>
              </router-link>
              <router-link 
                to="/download" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-mobile-screen text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">下载中心</span>
              </router-link>
            </div>

            <!-- SECTION 2: 其他 support contents -->
            <div class="space-y-1 pt-1">
              <span class="block text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-2 px-1">其他</span>
              <router-link 
                to="/affiliate?tab=ABOUT" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-circle-info text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">关于 LSEG</span>
              </router-link>
              <router-link 
                to="/affiliate?section=ABOUT_CHAT" 
                @click="closeDrawer" 
                class="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 hover:text-[#0B9A47] no-underline transition-all group"
              >
                <i class="fa-solid fa-headset text-[14px] text-slate-400 group-hover:text-[#0B9A47] w-5 text-center"></i>
                <span class="text-xs font-bold leading-none text-slate-700 group-hover:text-[#0B9A47]">咨询合规客服</span>
              </router-link>
            </div>
          </template>
        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-slate-100 bg-slate-50/50">
          <div class="text-center py-2 flex items-center justify-center gap-1.5 text-slate-400 font-bold text-[10px]">
            <i class="fa-solid fa-shield-halved text-emerald-600 text-[11px]"></i>
            FCA 全程合规托管监管保障中
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== TICKER SCROLL BAR (图1 STYLE) ==================== -->
    <div v-if="!['/login', '/register'].includes(currentPath)" class="ticker-scroll-bar">
      <div class="ticker-scroll-container">
        <div class="ticker-track">
          <!-- Group 1 -->
          <div class="ticker-group">
            <div v-for="coin in displayCoins" :key="coin.code" class="ticker-item">
              <span class="ticker-pair-name">{{ coin.code }}/USD</span>
              <span class="ticker-pair-price">${{ formatNumber(coin.price, coin.price > 100 ? 2 : 4) }}</span>
              <span class="ticker-pair-change" :class="coin.change >= 0 ? 'text-up' : 'text-down'">
                {{ coin.change >= 0 ? '+' : '' }}{{ coin.change }}%
              </span>
            </div>
          </div>
          <!-- Group 2 (Duplicate for seamless loop) -->
          <div class="ticker-group" aria-hidden="true">
            <div v-for="coin in displayCoins" :key="coin.code + '-dup'" class="ticker-item">
              <span class="ticker-pair-name">{{ coin.code }}/USD</span>
              <span class="ticker-pair-price">${{ formatNumber(coin.price, coin.price > 100 ? 2 : 4) }}</span>
              <span class="ticker-pair-change" :class="coin.change >= 0 ? 'text-up' : 'text-down'">
                {{ coin.change >= 0 ? '+' : '' }}{{ coin.change }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MOBILE STICKY BOTTOM NAV ==================== -->
    <div v-if="!['/login', '/register'].includes(currentPath)" class="mobile-only">
      <div class="mobile-bottom-nav-bar">
        <router-link to="/" class="mobile-nav-btn" :class="{ active: currentPath === '/' || currentPath === '/index' }">
          <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span class="mobile-nav-btn-lbl">首页</span>
        </router-link>

        <router-link to="/spot" class="mobile-nav-btn" :class="{ active: currentPath === '/spot' }">
          <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          <span class="mobile-nav-btn-lbl">交易</span>
        </router-link>

        <router-link to="/copy" class="mobile-nav-btn flex" style="align-items: center; justify-content: center;" :class="{ active: currentPath === '/copy' }">
          <div class="mobile-nav-crest-shield" :style="currentPath === '/copy' ? 'background-color: #10B981; border-color: #10B981; scale: 1.1;' : 'background-color: #21692A; border-color: white;'">
            <svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4.18 8.18l-5.18 5.18a1 1 0 0 1-1.42 0l-2.18-2.18a1 1 0 1 1 1.42-1.42l1.47 1.47 4.47-4.47a1 1 0 1 1 1.42 1.42z"/></svg>
          </div>
          <span class="mobile-nav-btn-lbl" style="margin-top: -6px; opacity: 0; height: 0; overflow: hidden;">保险区</span>
        </router-link>

        <router-link to="/contract" class="mobile-nav-btn" :class="{ active: currentPath === '/contract' }">
          <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          <span class="mobile-nav-btn-lbl">合约</span>
        </router-link>

        <router-link to="/wallet" class="mobile-nav-btn" :class="{ active: currentPath === '/wallet' }">
          <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          <span class="mobile-nav-btn-lbl">总资产</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();
const currentPath = computed(() => route.path);

const isDrawerOpen = ref(false);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
const closeDrawer = () => {
  isDrawerOpen.value = false;
};
const triggerLogout = () => {
  store.isLoggedIn = false;
  store.userInfo = null;
  localStorage.removeItem('is_logged_in');
  localStorage.removeItem('user_info');
  store.triggerToast('🔒 您已安全退出 LSEG 托管合规系统。');
  closeDrawer();
  router.push('/');
};

const totalAssetsValuation = computed(() => {
  const getCoinPrice = (code) => {
    if (code === 'USDT') return 1.0;
    const coin = store.coins.find(c => c.code === code);
    return coin ? coin.price : 1.0;
  };

  let total = 0;
  const coinsList = ['USDT', 'BTC', 'LC', 'ETH', 'LINK', 'MANA'];

  if (store.holdings) {
    coinsList.forEach(code => {
      const qty = (store.holdings.SPOT?.[code] || 0) + 
                  (store.holdings.FUTURES?.[code] || 0) + 
                  (store.holdings.INSURANCE?.[code] || 0);
      total += qty * getCoinPrice(code);
    });
  }

  return total;
});

const displayCoins = computed(() => {
  return store.coins.map(coin => {
    let formattedCode = coin.code.toUpperCase();
    if (formattedCode === '0X') {
      formattedCode = 'OXU';
    }
    return {
      ...coin,
      code: formattedCode
    };
  });
});

const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
</script>

<style scoped>
/* Specific clean scoped navigation fixes */
.pc-top-nav {
  user-select: none;
}
.no-underline {
  text-decoration: none;
}

/* ==================== TICKER MARQUEE STYLES ==================== */
.ticker-scroll-bar {
  background-color: #06160F; /* Dark emerald background matching Image 1 */
  border-bottom: 2px solid #142F1F;
  height: 38px;
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
  font-size: 12px;
  position: relative;
  z-index: 90;
}

/* Responsive sticky parameters to snap beneath header */
@media (min-width: 769px) {
  .ticker-scroll-bar {
    position: sticky;
    top: 72px; /* sits right under 72px PC top-nav */
  }
}

@media (max-width: 768px) {
  .ticker-scroll-bar {
    position: sticky;
    top: 52px;
  }
  .ticker-scroll-bar.mobile-offset-none {
    top: 0;
  }
}

.ticker-scroll-container {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
}

.ticker-track {
  display: flex;
  white-space: nowrap;
  width: max-content;
}

.ticker-group {
  display: flex;
  align-items: center;
  gap: 48px;
  padding-right: 48px;
  animation: marquee 40s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.ticker-scroll-container:hover .ticker-group {
  animation-play-state: paused;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ticker-pair-name {
  color: #7BB08E; /* Gorgeous sage green matching Image 1 */
  font-weight: 800;
  font-size: 11px;
}

.ticker-pair-price {
  color: #F3FAF6;
  font-weight: 700;
  font-family: var(--font-mono);
}

.ticker-pair-change {
  font-family: var(--font-mono);
  font-weight: 850;
  font-size: 11px;
}

.text-up {
  color: #10B981 !important; /* Premium positive green */
}

.text-down {
  color: #EF4444 !important; /* Premium negative red */
}
</style>
