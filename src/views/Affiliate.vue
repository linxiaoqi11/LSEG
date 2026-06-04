<template>
  <div class="px-4 pt-6 pb-6 md:px-8 md:pt-10 md:pb-10 max-w-7xl mx-auto animate-fade-in font-sans text-slate-700">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
      
      <!-- ==================== LEFT SIDEBAR ==================== -->
      <aside class="hidden md:block col-span-12 md:col-span-4 lg:col-span-3">
        
        <!-- SINGLE UNIFIED CARD: User Profile + Navigation -->
        <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
          
          <!-- User Profile Details Section -->
          <div class="p-6 flex flex-col items-center border-b border-slate-100/60 bg-white">
          <!-- circular institutional emblem / avatar -->
          <div class="w-16 h-16 rounded-full bg-[#1B5831] flex items-center justify-center text-white mb-3 shadow-sm relative group">
            <i class="fas fa-circle-check text-emerald-100 text-[24px] select-none"></i>
            <!--
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            -->
            <div class="absolute bottom-0 right-0 bg-[#10B981] w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
              <i class="fas fa-check text-white text-[9px] font-black leading-none select-none"></i>
            </div>
          </div>
                   <h3 class="font-bold text-slate-800 text-[14px] tracking-wide mb-1">{{ userNickname }}</h3>
          <div class="flex items-center gap-1 text-xs text-slate-400 font-medium mb-3">
            <span>UID: 19483726</span>
            <button @click="copyText('19483726', 'UID')" class="text-slate-400 hover:text-[#1B5831] focus:outline-none cursor-pointer transition-colors p-0.5 flex items-center">
              <i class="fas fa-copy text-[11px]"></i>
            </button>
          </div>
          
          <!-- Not verified warning pill -->
          <div v-if="kycStatus === 'UNVERIFIED'" class="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-amber-100">
            <i class="fas fa-triangle-exclamation text-amber-600 text-[10px] select-none"></i>
            <span>未实名认证</span>
          </div>
          <div v-else-if="kycStatus === 'PENDING'" class="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-blue-100 animate-pulse">
            <i class="fas fa-hourglass-half text-blue-600 text-[10px] select-none"></i>
            <span>实名审核中</span>
          </div>
          <div v-else class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-[#EAF5EF]">
            <i class="fas fa-circle-check text-emerald-600 text-[10px] select-none"></i>
            <span>已实名认证</span>
          </div>
          
          <!-- Total valuation box with pointing trigger -->
          <router-link to="/wallet" class="mt-4 w-full bg-slate-50 border border-slate-100/80 hover:bg-slate-100/50 rounded-[8px] p-3 block transition-all no-underline text-left group">
            <div class="flex items-center justify-between">
              <div>
                <span class="block text-[10px] text-slate-400 font-medium tracking-wider mb-1">总资产估值</span>
                <span class="block text-[14px] font-bold text-[#0B9A47] font-mono leading-none">
                  {{ formatNumber(totalAssetsValuation, 2) }} <span class="text-[9.5px] font-normal text-slate-400">USDT</span>
                </span>
                <span class="block text-[10px] text-slate-400 font-medium mt-1 font-mono">
                  ≈ ¥ {{ formatNumber(totalAssetsValuation * 7.24, 2) }}
                </span>
              </div>
              <i class="fas fa-chevron-right text-slate-400 group-hover:text-[#0B9A47] text-[11px] transition-all transform group-hover:translate-x-1 select-none"></i>
            </div>
          </router-link>
          </div>
          
          <!-- Inner Navigations list           <!-- Group 1: 我的订单 -->
          <div class="p-4 border-b border-slate-100/60">
            <span class="block text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-1.5 px-2">我的订单</span>
            <div class="space-y-1.5">
              <button 
                v-for="order in orderMenus" 
                :key="order.id"
                @click="activeSection = order.section"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group"
                :class="activeSection === order.section ? 'bg-[#EAF5EF] text-[#0B9A47] font-semibold' : 'font-normal text-slate-500 hover:text-[#0B9A47] hover:bg-[#F4FAF6]'"
              >
                <div class="flex items-center gap-2.5">
                  <i class="text-[13px] shrink-0 opacity-80 select-none" :class="order.icon"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">{{ order.label }}</span>
                </div>
                <i v-if="activeSection === order.section" class="fas fa-chevron-right text-[#0B9A47] text-[11px] shrink-0 select-none"></i>
              </button>
            </div>
          </div>
          
          <!-- Group 2: 推广 -->
          <div class="p-4 border-b border-slate-100/60">
            <span class="block text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-1.5 px-2">推广</span>
            <div class="space-y-1.5">
              <button 
                @click="activeSection = 'INVITE'"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group"
                :class="activeSection === 'INVITE' ? 'bg-[#EAF5EF] text-[#0B9A47] font-semibold' : 'font-normal text-slate-500 hover:text-[#0B9A47] hover:bg-[#F4FAF6]'"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fas fa-user-plus text-[13px] shrink-0 opacity-80 select-none"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">邀请好友</span>
                </div>
                <i v-if="activeSection === 'INVITE'" class="fas fa-chevron-right text-[#0B9A47] text-[11px] select-none"></i>
              </button>

              <button 
                @click="activeSection = 'TEAM'"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group"
                :class="activeSection === 'TEAM' ? 'bg-[#EAF5EF] text-[#0B9A47] font-semibold' : 'font-normal text-slate-500 hover:text-[#0B9A47] hover:bg-[#F4FAF6]'"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fas fa-users text-[13px] shrink-0 opacity-80 select-none"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">我的团队</span>
                </div>
                <i v-if="activeSection === 'TEAM'" class="fas fa-chevron-right text-[#0B9A47] text-[11px] select-none"></i>
              </button>

              <button 
                @click="activeSection = 'REWARDS'"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group"
                :class="activeSection === 'REWARDS' ? 'bg-[#EAF5EF] text-[#0B9A47] font-semibold' : 'font-normal text-slate-500 hover:text-[#0B9A47] hover:bg-[#F4FAF6]'"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fas fa-gift text-[13px] shrink-0 opacity-80 select-none"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">我的奖励</span>
                </div>
                <i v-if="activeSection === 'REWARDS'" class="fas fa-chevron-right text-[#0B9A47] text-[11px] select-none"></i>
              </button>
            </div>
          </div>
          
          <!-- Group 3: 其他 -->
          <div class="p-4">
            <span class="block text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-1.5 px-2">其他</span>
            <div class="space-y-1.5">
              <button 
                @click="activeSection = 'SETTINGS'"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group"
                :class="activeSection === 'SETTINGS' ? 'bg-[#EAF5EF] text-[#0B9A47] font-semibold' : 'font-normal text-slate-500 hover:text-[#0B9A47] hover:bg-[#F4FAF6]'"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fas fa-gear text-[13px] shrink-0 opacity-80 select-none"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">设置</span>
                </div>
                <i v-if="activeSection === 'SETTINGS'" class="fas fa-chevron-right text-[#0B9A47] text-[11px] shrink-0 select-none"></i>
              </button>

              <button 
                @click="activeSection = 'ABOUT'"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group"
                :class="['ABOUT', 'ABOUT_SERVICE', 'ABOUT_PRIVACY', 'ABOUT_CHAT', 'ABOUT_HELP', 'ABOUT_RISK', 'ABOUT_REGULATORY'].includes(activeSection) ? 'bg-[#EAF5EF] text-[#0B9A47] font-semibold' : 'font-normal text-slate-500 hover:text-[#0B9A47] hover:bg-[#F4FAF6]'"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fas fa-circle-info text-[13px] shrink-0 opacity-80 select-none"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">关于 LSEG</span>
                </div>
                <i v-if="['ABOUT', 'ABOUT_SERVICE', 'ABOUT_PRIVACY', 'ABOUT_CHAT', 'ABOUT_HELP', 'ABOUT_RISK', 'ABOUT_REGULATORY'].includes(activeSection)" class="fas fa-chevron-right text-[#0B9A47] text-[11px] shrink-0 select-none"></i>
              </button>

              <!-- Safety Sign Out Button -->
              <button 
                v-if="store.isLoggedIn"
                @click="handleLogout"
                class="w-full flex items-center justify-between text-left text-[10.5px] px-2.5 py-2.5 rounded-lg transition-all cursor-pointer group font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50 border-none mt-2"
              >
                <div class="flex items-center gap-2.5">
                  <i class="fas fa-sign-out-alt text-[13px] shrink-0 opacity-80 select-none"></i>
                  <span class="text-sm font-medium tracking-wide inline-block select-none">安全退出</span>
                </div>
              </button>
            </div>
          </div>
          
        </div>
      </aside>

      <!-- ==================== RIGHT MAIN PANELS ==================== -->
      <main class="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
        
        <!-- ============== SUB-PAGE 1: 邀请好友 ============== -->
        <div v-if="activeSection === 'INVITE'" class="space-y-6 animate-fade-in">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">邀请好友</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">邀请好友赚取永久手续费返佣</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <!-- Left poster card -->
            <div class="md:col-span-5 bg-white rounded-[8px] border border-slate-100 flex flex-col items-center text-center shadow-xs overflow-hidden">
              <!-- Featured artwork illustration image displayed with its original aspect ratio -->
              <div class="w-full border-b border-emerald-50 bg-emerald-50/20 overflow-hidden">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/1bd468363a5a078f070577e881b5815b.jpg" 
                  alt="Green Economy Banner"
                  referrerpolicy="no-referrer"
                  class="w-full h-auto block transition-transform duration-500 hover:scale-105"
                />
              </div>

              <!-- Content wrapper with generous spacing -->
              <div class="p-6 flex flex-col items-center w-full">
                <span class="text-[11px] font-bold bg-[#F4FAF6] text-[#1B5831] px-3 py-1 rounded-full border border-emerald-50 mb-4 inline-block">
                  扫码绑定邀请关系
                </span>
              
              <!-- QR Code component SVG -->
              <div class="p-2 bg-white border border-slate-100 rounded-[8px] flex items-center justify-center shadow-xs">
                <svg class="w-32 h-32" viewBox="0 0 100 100" fill="none">
                  <!-- Background grid elements -->
                  <rect width="100" height="100" rx="6" fill="#F4FAF6" />
                  <!-- Bottom Left Anchor -->
                  <rect x="8" y="8" width="20" height="20" rx="3" fill="#1B5831" />
                  <rect x="12" y="12" width="12" height="12" rx="1.5" fill="#F4FAF6" />
                  <rect x="15" y="15" width="6" height="6" rx="0.5" fill="#1B5831" />
                  
                  <!-- Top Right Anchor -->
                  <rect x="72" y="8" width="20" height="20" rx="3" fill="#1B5831" />
                  <rect x="76" y="12" width="12" height="12" rx="1.5" fill="#F4FAF6" />
                  <rect x="79" y="15" width="6" height="6" rx="0.5" fill="#1B5831" />
                  
                  <!-- Bottom Left Anchor -->
                  <rect x="8" y="72" width="20" height="20" rx="3" fill="#1B5831" />
                  <rect x="12" y="76" width="12" height="12" rx="1.5" fill="#F4FAF6" />
                  <rect x="15" y="79" width="6" height="6" rx="0.5" fill="#1B5831" />

                  <!-- Alignment Pattern Bottom Right -->
                  <rect x="76" y="76" width="8" height="8" rx="1.5" fill="#1B5831" />
                  <rect x="78" y="78" width="4" height="4" rx="0.5" fill="#F4FAF6" />
                  <rect x="79" y="79" width="2" height="2" fill="#1B5831" />

                  <!-- Matrix simulated lanes -->
                  <path d="M 36 8 H 40 M 44 8 H 52 M 56 8 H 64 M 36 12 H 44 M 48 12 H 56 M 60 12 H 64 M 36 16 H 40 M 48 16 H 52 M 56 16 H 60 M 36 20 H 48 M 52 20 H 60" stroke="#1B5831" stroke-width="2" stroke-dasharray="1 2 3 1" />
                  <path d="M 8 36 H 16 M 20 36 H 28 M 32 36 H 44 M 48 36 H 56 M 60 36 H 68 M 72 36 H 80 M 84 36 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="2 1 3 2" />
                  <path d="M 8 40 H 24 M 28 40 H 40 M 44 40 H 52 M 56 40 H 68 M 72 40 H 84 M 88 40 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="3 2 1 1" />
                  <path d="M 8 44 H 12 M 16 44 H 28 M 32 44 H 36 M 48 44 H 60 M 64 44 H 76 M 80 44 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="1 1 2 3" />
                  <path d="M 8 48 H 20 M 24 48 H 32 M 36 48 H 44 M 48 48 H 52 M 56 48 H 64 M 68 48 H 80 M 84 48 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="2 2 1 2" />
                  <path d="M 8 52 H 16 M 20 52 H 28 M 32 52 H 40 M 44 52 H 48 M 52 52 H 60 M 64 52 H 72 M 76 52 H 88" stroke="#1B5831" stroke-width="2" stroke-dasharray="1 3 2 1" />
                  <path d="M 8 56 H 24 M 28 56 H 36 M 40 56 H 48 M 52 56 H 64 M 68 56 H 80 M 84 56 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="3 1 1 2" />
                  <path d="M 8 60 H 12 M 16 60 H 20 M 24 60 H 36 M 40 60 H 52 M 56 60 H 68 M 72 60 H 84 M 88 60 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="2 2 3 1" />
                  <path d="M 8 64 H 28 M 32 64 H 44 M 48 64 H 56 M 60 64 H 72 M 76 64 H 88" stroke="#1B5831" stroke-width="2" stroke-dasharray="1 1 1 3" stroke-linecap="round" />
                  <path d="M 8 68 H 16 M 20 68 H 32 M 36 68 H 40 M 44 68 H 60 M 64 68 H 68 M 72 68 H 84 H 92" stroke="#1B5831" stroke-width="2" stroke-dasharray="2 3 1 2" />
                  <!-- Bottom Right random matrix fill -->
                  <path d="M 36 72 H 48 M 52 72 H 60 M 64 72 H 68 M 36 76 H 40 M 44 76 H 52 M 56 76 H 64 M 36 80 H 44 M 48 80 H 56 M 60 80 H 68 M 36 84 H 40 M 44 84 H 52 M 56 84 H 60 M 36 88 H 48 M 52 88 H 60 M 64 88 H 68 M 36 92 H 44 M 48 92 H 56 M 60 92 H 68" stroke="#1B5831" stroke-width="2" stroke-dasharray="1 2 2 1" />

                  <!-- Center Logo Badge -->
                  <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
                  <circle cx="50" cy="50" r="6.2" fill="#1B5831" />
                  <text x="50" y="52.8" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">L</text>
                </svg>
              </div>
              
                <div class="mt-4 text-xs font-medium bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full border border-slate-100 font-mono">
                  邀请码: CPA_00P7TKG7JR
                </div>
              </div>
            </div>
            
            <!-- Right form container -->
            <div class="md:col-span-7 space-y-6">
              
              <!-- Setup link box -->
              <div class="bg-white rounded-[8px] border border-slate-100 p-6 shadow-xs">
                <h4 class="text-[11px] font-semibold text-slate-500 mb-5 tracking-wider uppercase">我的邀请码与链接</h4>
                
                <div class="space-y-4">
                  <!-- Inv Code field -->
                  <div>
                    <label class="block text-[10px] font-medium text-slate-400 mb-1.5">邀请码</label>
                    <div class="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-[8px] p-2 py-2 px-4 font-mono">
                      <span class="text-[12px] font-normal text-slate-700">CPA_00P7TKG7JR</span>
                      <button @click="copyText('CPA_00P7TKG7JR', '邀请码')" class="text-xs font-semibold text-[#0b9a47] hover:text-[#0b9a47]/80 focus:outline-none cursor-pointer transition-colors p-1 flex items-center justify-end">
                        <span class="inline-block transform scale-[0.8] origin-right select-none">复制</span>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Link field -->
                  <div>
                    <label class="block text-[10px] font-medium text-slate-400 mb-1.5">直邀链接</label>
                    <div class="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-[8px] p-2 py-2 px-4 font-mono">
                      <span class="text-[11px] font-normal text-slate-500 truncate mr-4">https://www.lseg-green.com/register?ref=G7JR</span>
                      <button @click="copyText('https://www.lseg-green.com/register?ref=G7JR', '邀请链接')" class="text-xs font-semibold text-[#0b9a47] hover:text-[#0b9a47]/80 focus:outline-none cursor-pointer transition-colors p-1 flex items-center justify-end">
                        <span class="inline-block transform scale-[0.8] origin-right select-none">复制</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Share social outlines -->
                <div class="grid grid-cols-3 gap-1.5 mt-6">
                  <button @click="shareChannel('WhatsApp')" class="flex items-center justify-center gap-1 py-2 px-0.5 border border-slate-200 rounded-lg text-slate-600 hover:border-[#0B9A47]/30 hover:bg-[#F4FAF6] hover:text-[#0B9A47] cursor-pointer transition-all select-none overflow-hidden h-[38px]">
                    <svg class="w-3.5 h-3.5 fill-[#25D366] shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.012 2c-5.506 0-9.97 4.463-9.97 9.97 0 1.914.541 3.7 1.48 5.223L2.24 22l5.006-1.312a9.92 9.92 0 0 0 4.766 1.258c5.506 0 9.97-4.463 9.97-9.97 0-5.506-4.464-9.97-9.97-9.97zm5.862 14.25c-.244.686-1.22 1.263-1.683 1.348-.44.085-.928.146-2.92-.66a10.655 10.655 0 0 1-4.708-4.14c-.6-.786-1.047-1.748-1.047-2.73 0-1.208.623-1.802.846-2.03.176-.175.465-.262.747-.262.09 0 .174.004.25.01.222.012.333.023.48.373.184.444.632 1.542.686 1.656.054.113.09.245.016.394-.074.15-.15.244-.244.354-.094.113-.197.237-.282.33-.098.11-.202.23-.087.427.115.197.512.844 1.097 1.365.753.67 1.385.877 1.58.975.197.1.313.084.43-.05.116-.135.503-.584.636-.785.134-.203.268-.17.452-.102.184.068 1.173.553 1.373.653s.334.15.384.237c.05.086.05.502-.194 1.188z"/>
                    </svg>
                    <span class="text-[11px] font-semibold text-slate-700 whitespace-nowrap select-none leading-none shrink-0">分享 WhatsApp</span>
                  </button>
                  <button @click="shareChannel('微信')" class="flex items-center justify-center gap-1 py-2 px-0.5 border border-slate-200 rounded-lg text-slate-600 hover:border-[#0B9A47]/30 hover:bg-[#F4FAF6] hover:text-[#0B9A47] cursor-pointer transition-all select-none overflow-hidden h-[38px]">
                    <i class="fas fa-comment-dots text-[#07C160] text-xs shrink-0"></i>
                    <span class="text-[11px] font-semibold text-slate-700 whitespace-nowrap select-none leading-none shrink-0 font-sans">分享 微信</span>
                  </button>
                  <button @click="downloadPoster" class="flex items-center justify-center gap-1 py-2 px-0.5 border border-slate-200 rounded-lg text-slate-600 hover:border-[#0B9A47]/30 hover:bg-[#F4FAF6] hover:text-[#0B9A47] cursor-pointer transition-all select-none overflow-hidden h-[38px]">
                    <svg class="w-3.5 h-3.5 fill-slate-400 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    <span class="text-[11px] font-semibold text-slate-700 whitespace-nowrap select-none leading-none shrink-0">下载海报</span>
                  </button>
                </div>
              </div>
              
              <!-- Stat micro grids card -->
              <div class="bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs">
                <div class="grid grid-cols-2 gap-y-5 gap-x-4">
                  <!-- 1. 团队总人数 -->
                  <div class="flex items-center gap-2.5 p-1">
                    <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0">
                      <i class="fas fa-users text-slate-500 text-[18px]"></i>
                      <!--<svg class="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      -->
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] text-slate-400 font-semibold truncate leading-none">团队总人数</span>
                      <strong class="text-base font-bold text-slate-800 leading-none mt-1.5 block font-mono">1,280 <span class="text-[9.5px] font-normal text-slate-400 font-sans">人</span></strong>
                    </div>
                  </div>
                  
                  <!-- 2. 累计佣金 -->
                  <div class="flex items-center gap-2.5 p-1">
                    <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0">
                      <i class="fas fa-coins text-slate-500 text-[18px]"></i>
                      <!--<svg class="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.214.172a3.393 3.393 0 004.572 0l.214-.172a3.393 3.393 0 000-4.786l-.214-.172a3.393 3.393 0 00-4.572 0l-.214.172a3.393 3.393 0 000 4.786zM3.75 5.25h16.5m-16.5 4.5h16.5M3.75 14.25h16.5M3.75 18.75h16.5" />
                      -->
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] text-slate-400 font-semibold truncate leading-none">累计佣金</span>
                      <strong class="text-base font-bold text-slate-800 leading-none mt-1.5 block font-mono">12,580.00 <span class="text-[9.2px] font-normal text-slate-400 font-sans">USDT</span></strong>
                    </div>
                  </div>

                  <!-- 3. 今日佣金 -->
                  <div class="flex items-center gap-2.5 p-1 border-t border-slate-100/60 pt-4.5">
                    <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0">
                      <i class="fas fa-arrow-trend-up text-slate-500 text-[18px]"></i>
                      <!--<svg class="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      -->
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] text-slate-400 font-semibold truncate leading-none">今日佣金</span>
                      <strong class="text-base font-bold text-slate-800 leading-none mt-1.5 block font-mono">+125.50 <span class="text-[9.2px] font-normal text-slate-400 font-sans">USDT</span></strong>
                    </div>
                  </div>

                  <!-- 4. 本月预估 -->
                  <div class="flex items-center gap-2.5 p-1 border-t border-slate-100/60 pt-4.5">
                    <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0">
                      <i class="fas fa-calendar-days text-slate-500 text-[18px]"></i>
                      <!--<svg class="w-4.5 h-4.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      -->
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] text-slate-400 font-semibold truncate leading-none">本月预估</span>
                      <strong class="text-base font-bold text-slate-800 leading-none mt-1.5 block font-mono">3,800.00 <span class="text-[9.2px] font-normal text-slate-400 font-sans">USDT</span></strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Campaign Rules -->
              <div class="bg-white rounded-[8px] border border-slate-100 p-6 text-xs shadow-xs">
                <h4 class="text-xs font-bold text-slate-800 mb-3.5">活动规则</h4>
                <div class="space-y-3 text-slate-500 leading-relaxed font-normal">
                  <div class="flex items-start">
                    <span class="mr-1.5 shrink-0 text-slate-400 font-medium">1.</span>
                    <span>佣金比例：一级 50%、二级 10%，永久有效。</span>
                  </div>
                  <div class="flex items-start">
                    <span class="mr-1.5 shrink-0 text-slate-400 font-medium">2.</span>
                    <span>实时结算，可随时提现，无门槛限制。</span>
                  </div>
                  <div class="flex items-start">
                    <span class="mr-1.5 shrink-0 text-slate-400 font-medium">3.</span>
                    <span>受邀好友需完成实名认证并完成首笔交易。</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        <!-- ============== SUB-PAGE 2: 我的团队 ============== -->
        <div v-if="activeSection === 'TEAM'" class="space-y-6 animate-fade-in">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">我的团队</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">永久躺赚 · 邀请好友加入，享受终身佣金分成</p>
          </div>
          
          <!-- Top row stats, 4 cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3.5 h-[76px] hover:border-[#0B9A47]/20 transition-all">
              <div class="w-10 h-10 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-users text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-base font-bold text-slate-800 font-sans block leading-none">1,280 <span class="text-[10px] font-normal text-slate-400 font-sans ml-0.5">人</span></strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-1.5">团队总人数</span>
              </div>
            </div>
            
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3.5 h-[76px] hover:border-[#0B9A47]/20 transition-all">
              <div class="w-10 h-10 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-user-plus text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-base font-bold text-slate-800 font-sans block leading-none">450 <span class="text-[10px] font-normal text-slate-400 font-sans ml-0.5">人</span></strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-1.5">直推人数</span>
              </div>
            </div>
            
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3.5 h-[76px] hover:border-[#0B9A47]/20 transition-all">
              <div class="w-10 h-10 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-coins text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-base font-semibold text-slate-800 font-sans block leading-none">12,580.00 <span class="text-[9.5px] font-normal text-slate-400 font-sans">USDT</span></strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-1.5">累计佣金</span>
              </div>
            </div>
            
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3.5 h-[76px] hover:border-[#0B9A47]/20 transition-all">
              <div class="w-10 h-10 rounded-[8px] bg-slate-50 border border-slate-100/10 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-calendar-days text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-base font-semibold text-slate-800 font-sans block leading-none">3,800.00 <span class="text-[9.5px] font-normal text-slate-400 font-sans">USDT</span></strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-1.5">本月预估</span>
              </div>
            </div>
            
          </div>
          
          <!-- Invite Logs Card Table -->
          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <div class="p-4 border-b border-slate-50">
              <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider">邀请记录</h4>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-medium uppercase tracking-wider">
                    <th class="p-4 pl-6 font-medium text-[11.5px]">用户</th>
                    <th class="p-4 font-medium text-[11.5px]">等级</th>
                    <th class="p-4 font-medium text-[11.5px]">邀请日期</th>
                    <th class="p-4 text-right pr-6 font-medium text-[11.5px]">获得奖励</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-600 font-medium font-mono text-[12.5px]">
                  <tr v-for="member in teamMembers" :key="member.uid" class="hover:bg-slate-50/20 transition-colors">
                    <!-- User info -->
                    <td class="p-4 pl-6 flex items-center gap-2.5">
                      <span 
                        class="w-6.5 h-6.5 rounded-full text-white text-[10.5px] font-bold flex items-center justify-center shrink-0 shadow-xs" 
                        :class="member.avatarBg"
                      >
                        {{ member.shortUid }}
                      </span>
                      <span class="text-slate-700 font-normal font-sans text-[12.5px]">UID {{ member.uid }}</span>
                    </td>
                    <!-- Level Badge -->
                    <td class="p-4">
                      <span class="bg-[#EAF5EF] text-[#10B981] text-[10.5px] px-2 py-0.5 rounded-full font-medium border border-emerald-100/50">
                        {{ member.level }}
                      </span>
                    </td>
                    <!-- Regular invite date -->
                    <td class="p-4 text-slate-400 font-normal font-sans text-[12.5px]">{{ member.date }}</td>
                    <!-- Payout Reward -->
                    <td class="p-4 text-right text-emerald-600 font-medium pr-6 font-mono text-[12.5px]">+{{ formatNumber(member.reward, 2) }} USDT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- ============== SUB-PAGE 3: 我的奖励 ============== -->
        <div v-if="activeSection === 'REWARDS'" class="space-y-6 animate-fade-in">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg md:text-xl font-bold text-slate-800">我的奖励</h2>
              <p class="text-xs text-slate-400 font-medium mt-1 font-sans">查看所有奖励明细与领取记录</p>
            </div>
            
            <!-- Quick withdrawal CTA for payouts -->
            <button 
              @click="claimRewards" 
              class="bg-[#0B9A47] hover:bg-[#0B9A47]/90 text-white text-[11px] font-medium px-4 py-2 rounded-lg transition-all shadow-xs flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <i class="fas fa-credit-card text-xs"></i>
              <span>提现</span>
            </button>
          </div>
          
          <!-- Top row stats, 3 cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div class="bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:border-slate-200 transition-colors">
              <div class="w-11 h-11 rounded-[8px] bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50 shadow-2xs">
                <i class="fas fa-wallet text-slate-500 text-[20px]"></i>
              </div>
              <div>
                <strong class="text-lg font-semibold text-slate-800 leading-none block font-mono">0.00 <span class="text-xs font-normal text-slate-400 font-sans">USDT</span></strong>
                <span class="block text-[11px] text-slate-400 font-medium mt-1.5">可提现金额</span>
              </div>
            </div>

            <div class="bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:border-slate-200 transition-colors">
              <div class="w-11 h-11 rounded-[8px] bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50 shadow-2xs">
                <i class="fas fa-award text-slate-500 text-[20px]"></i>
              </div>
              <div>
                <strong class="text-lg font-semibold text-slate-800 leading-none block font-mono">239.80 <span class="text-xs font-normal text-slate-400 font-sans">USDT</span></strong>
                <span class="block text-[11px] text-slate-400 font-medium mt-1.5">累计奖励</span>
              </div>
            </div>
            
            <div class="bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:border-slate-200 transition-colors">
              <div class="w-11 h-11 rounded-[8px] bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50 shadow-2xs">
                <i class="fas fa-gift text-slate-500 text-[20px]"></i>
              </div>
              <div>
                <strong class="text-lg font-semibold text-slate-800 leading-none block font-mono">85.30 <span class="text-xs font-normal text-slate-400 font-sans">USDT</span></strong>
                <span class="block text-[11px] text-slate-400 font-medium mt-1.5">本月奖励</span>
              </div>
            </div>
            
          </div>
          
          <!-- Reward ledger list Table -->
          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <div class="p-4 border-b border-slate-50">
              <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider">奖励明细</h4>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-medium uppercase tracking-wider">
                    <th class="p-4 pl-6 font-medium text-[11.5px]">奖励类型</th>
                    <th class="p-4 font-medium text-[11.5px]">说明</th>
                    <th class="p-4 font-medium text-[11.5px]">金额</th>
                    <th class="p-4 font-medium text-[11.5px]">日期</th>
                    <th class="p-4 text-right pr-6 font-medium text-[11.5px]">状态</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-650 font-medium font-mono text-[12.5px]">
                  <tr v-for="record in rewardsList" :key="record.id" class="hover:bg-slate-50/20 transition-colors">
                    <!-- Reward type badge -->
                    <td class="p-4 pl-6">
                      <span class="text-[10.5px] px-2 py-0.5 rounded font-medium border" :class="record.badgeStyle">
                        {{ record.type }}
                      </span>
                    </td>
                    <!-- Detail explanation descriptive label -->
                    <td class="p-4 font-sans font-normal text-slate-700 text-[12.5px]">{{ record.desc }}</td>
                    <!-- Payout reward amount -->
                    <td class="p-4 text-emerald-600 font-medium font-mono text-[12.5px]">+{{ formatNumber(record.amount, 2) }} USDT</td>
                    <!-- Date -->
                    <td class="p-4 text-slate-400 font-normal font-sans text-[12.5px]">{{ record.date }}</td>
                    <!-- Status indicating arrival -->
                    <td class="p-4 text-right text-emerald-600 font-medium pr-6 font-sans text-[12.5px]">已到账</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 4: 资金订单 (ORDER_FUNDING) ============== -->
        <div v-if="activeSection === 'ORDER_FUNDING'" class="space-y-6 animate-fade-in text-[12px]">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">资金订单</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">流水明细、充值与提币划转记录</p>
          </div>
          
          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <!-- Table Tabs -->
            <div class="flex border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50/40">
              <button 
                v-for="subTab in ['ALL', 'DEPOSIT', 'WITHDRAW', 'TRANSFER']" 
                :key="subTab"
                @click="fundingTab = subTab"
                class="px-5 py-3.5 text-[11px] font-bold transition-all relative border-b-2 cursor-pointer"
                :class="fundingTab === subTab ? 'border-[#0B9A47] text-[#0B9A47]' : 'border-transparent text-slate-400 hover:text-slate-600'"
              >
                {{ subTab === 'ALL' ? '全部明细' : (subTab === 'DEPOSIT' ? '数字充值' : (subTab === 'WITHDRAW' ? '安全提款' : '划转明细')) }}
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-medium text-[11.5px] uppercase tracking-wider bg-slate-50/10">
                    <th class="p-3.5 pl-6 font-semibold">类型</th>
                    <th class="p-3.5 font-semibold">币种</th>
                    <th class="p-3.5 font-semibold">数额</th>
                    <th class="p-3.5 font-semibold">备注</th>
                    <th class="p-3.5 font-semibold">发生时间</th>
                    <th class="p-3.5 text-right pr-6 font-semibold">清算状态</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-600 font-mono text-[12.5px]">
                  <tr v-for="order in filteredFundingOrders" :key="order.id" class="hover:bg-slate-50/20 transition-colors">
                    <td class="p-3.5 pl-6 font-sans">
                      <span class="text-[10px] px-1.5 py-0.5 rounded font-black border"
                        :class="order.typeVal === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : (order.typeVal === 'WITHDRAW' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-200')">
                        {{ order.type }}
                      </span>
                    </td>
                    <td class="p-3.5 text-slate-800 font-bold font-sans text-[12.5px]">{{ order.coin }}</td>
                    <td class="p-3.5 font-bold text-[12.5px]" :class="order.amount > 0 ? 'text-emerald-600' : 'text-slate-705'">
                      {{ order.amount > 0 ? '+' : '' }}{{ formatNumber(order.amount, order.coin === 'BTC' ? 5 : 2) }}
                    </td>
                    <td class="p-3.5 text-slate-400 font-sans font-normal text-[11.5px] max-w-xs truncate">{{ order.remark }}</td>
                    <td class="p-3.5 text-slate-405 font-sans font-normal text-[12.5px]">{{ order.time }}</td>
                    <td class="p-3.5 text-right pr-6 font-sans font-medium text-[12.5px]" :class="order.statusStyle">{{ order.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 5: 现货订单 (ORDER_SPOT) ============== -->
        <div v-if="activeSection === 'ORDER_SPOT'" class="space-y-6 animate-fade-in text-[12px]">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">现货订单</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">现货交易委托和历史成交记录</p>
          </div>
          
          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <div class="flex border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50/40">
              <button 
                v-for="subTab in ['CURRENT', 'HISTORY', 'EXECUTED']" 
                :key="subTab"
                @click="spotTab = subTab"
                class="px-5 py-3.5 text-[11px] font-bold transition-all relative border-b-2 cursor-pointer"
                :class="spotTab === subTab ? 'border-[#0B9A47] text-[#0B9A47]' : 'border-transparent text-slate-400 hover:text-slate-600'"
              >
                {{ subTab === 'CURRENT' ? '当前委托' : (subTab === 'HISTORY' ? '历史委托' : '成交记录') }}
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-medium text-[11.5px] uppercase bg-slate-50/10">
                    <th class="p-3.5 pl-6 font-semibold">交易对</th>
                    <th class="p-3.5 font-semibold">方向</th>
                    <th class="p-3.5 font-semibold">类别</th>
                    <th class="p-3.5 font-semibold">委托价</th>
                    <th class="p-3.5 font-semibold">委托量</th>
                    <th class="p-3.5 font-semibold">已成交</th>
                    <th class="p-3.5 font-semibold">总金额</th>
                    <th class="p-3.5 font-semibold">时间</th>
                    <th class="p-3.5 text-right pr-6 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-600 font-mono text-[12.5px]">
                  <tr v-if="filteredSpotOrders.length === 0">
                    <td colspan="9" class="p-8 text-center text-slate-450 font-sans text-xs">暂无相应的委托项目或成交单据</td>
                  </tr>
                  <tr v-for="order in filteredSpotOrders" :key="order.id" v-else class="hover:bg-slate-50/20 transition-colors">
                    <td class="p-3.5 pl-6 text-slate-800 font-bold font-sans text-[12.5px]">{{ order.symbol }}</td>
                    <td class="p-3.5 font-sans font-bold text-[12.5px]" :class="order.sideStyle">{{ order.side }}</td>
                    <td class="p-3.5 text-slate-400 font-sans font-normal text-[12.5px]">{{ order.type }}</td>
                    <td class="p-3.5 font-bold text-slate-700 text-[12.5px]">{{ formatNumber(order.price, 2) }}</td>
                    <td class="p-3.5 font-normal text-slate-500 text-[12.5px]">{{ formatNumber(order.quantity, 3) }}</td>
                    <td class="p-3.5 font-bold text-[12.5px]" :class="order.filled > 0 ? 'text-emerald-600' : 'text-slate-400'">{{ formatNumber(order.filled, 3) }}</td>
                    <td class="p-3.5 text-slate-800 font-bold text-[12.5px]">{{ formatNumber(order.amount, 2) }} USDT</td>
                    <td class="p-3.5 text-slate-400 font-sans font-normal text-[11.5px]">{{ order.time }}</td>
                    <td class="p-3.5 text-right pr-6 font-sans">
                      <button v-if="order.category === 'CURRENT'" @click="cancelSpotOrder(order)" class="text-[11.5px] bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 px-2.5 py-1 rounded-md cursor-pointer transition-all">
                        撤销
                      </button>
                      <span v-else class="text-slate-300 font-normal text-[11.5px]">—</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 6: 保险期订单 (ORDER_INSURANCE) ============== -->
        <div v-if="activeSection === 'ORDER_INSURANCE'" class="space-y-6 animate-fade-in text-[12px]">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">保险期订单</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">专属保本对冲带单计划跟单资产报表</p>
          </div>

          <!-- Quick stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-shield-halved text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">{{ formatNumber(insuranceStats.totalCopy, 2) }} <span class="text-[10px] font-normal text-slate-400 font-sans">USDT</span></strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">跟单总额</span>
              </div>
            </div>
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-arrow-trend-up text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">
                  +{{ formatNumber(insuranceStats.cumulativeProfit, 2) }} <span class="text-[10px] font-normal text-slate-400 font-sans">USDT</span>
                </strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">累计收益</span>
              </div>
            </div>
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-chart-simple text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">
                  +{{ insuranceStats.rateOfReturn }}%
                </strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">综合收益率</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <div class="flex border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50/40">
              <button 
                v-for="subTab in ['ACTIVE', 'COMPLETED', 'STOPPED']" 
                :key="subTab"
                @click="insuranceTab = subTab"
                class="px-5 py-3.5 text-[11px] font-bold transition-all relative border-b-2 cursor-pointer"
                :class="insuranceTab === subTab ? 'border-[#0B9A47] text-[#0B9A47]' : 'border-transparent text-slate-400 hover:text-slate-600'"
              >
                {{ subTab === 'ACTIVE' ? '跟单中' : (subTab === 'COMPLETED' ? '已完成' : '已停止') }}
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-medium text-[11.5px] uppercase bg-slate-50/10">
                    <th class="p-3.5 pl-6 font-semibold">带单员</th>
                    <th class="p-3.5 font-semibold">跟单金额</th>
                    <th class="p-3.5 font-semibold">累计收益</th>
                    <th class="p-3.5 font-semibold">收益率</th>
                    <th class="p-3.5 font-semibold">开始时间</th>
                    <th class="p-3.5 font-semibold">天数</th>
                    <th class="p-3.5 text-right pr-6 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-600 font-mono text-[12.5px]">
                  <tr v-if="filteredInsuranceOrders.length === 0">
                    <td colspan="7" class="p-8 text-center text-slate-450 font-sans text-xs">暂无相应的保险期跟单单据</td>
                  </tr>
                  <tr v-for="order in filteredInsuranceOrders" :key="order.id" v-else class="hover:bg-slate-50/20 transition-colors">
                    <td class="p-3.5 pl-6 flex items-center gap-2">
                      <span class="w-5.5 h-5.5 rounded-full text-white text-[9.5px] font-black flex items-center justify-center shrink-0 shadow-xs" :class="order.avatarBg">
                        {{ order.trader[0] }}
                      </span>
                      <span class="text-slate-805 font-bold font-sans text-sm">{{ order.trader }}</span>
                    </td>
                    <td class="p-3.5 text-slate-800 font-bold font-sans text-[12.5px]">{{ formatNumber(order.amount, 2) }} USDT</td>
                    <td class="p-3.5 text-emerald-600 font-black font-sans text-[12.5px]">+{{ formatNumber(order.profit, 2) }} USDT</td>
                    <td class="p-3.5 text-emerald-600 font-bold text-[12.5px]">{{ order.rate }}</td>
                    <td class="p-3.5 text-slate-400 font-sans font-normal text-[11.5px]">{{ order.startTime }}</td>
                    <td class="p-3.5 text-slate-400 font-sans font-normal text-[12.5px]">{{ order.days }}</td>
                    <td class="p-3.5 text-right pr-6 font-sans">
                      <button v-if="order.category === 'ACTIVE'" @click="stopCopyTrading(order)" class="text-[11.5px] bg-slate-50 border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-[#FFF5F5] hover:border-rose-100 px-2.5 py-1 rounded-md cursor-pointer transition-all">
                        停止跟单
                      </button>
                      <span v-else class="text-slate-300 font-normal text-[11.5px]">—</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 7: 合约订单 (ORDER_CONTRACT) ============== -->
        <div v-if="activeSection === 'ORDER_CONTRACT'" class="space-y-6 animate-fade-in text-[12px]">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">合约订单</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">当前合约持仓、止损点设置与对冲报表</p>
          </div>

          <!-- Table Header States -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-cubes text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">{{ contractStats.positionsCount }} <span class="text-[10px] font-normal text-slate-400 font-sans">个</span></strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">持仓数量</span>
              </div>
            </div>

            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-chart-line text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">
                  +{{ formatNumber(contractStats.unrealizedPnl, 2) }} <span class="text-[10px] font-normal text-slate-400 font-sans">USDT</span>
                </strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">未实现盈亏</span>
              </div>
            </div>

            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-coins text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">
                  +{{ formatNumber(contractStats.realizedPnl, 2) }} <span class="text-[10px] font-normal text-slate-400 font-sans">USDT</span>
                </strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">本月已实现盈亏</span>
              </div>
            </div>

            <div class="bg-white rounded-[8px] border border-slate-100 p-4 shadow-xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-[8px] bg-slate-50 border border-slate-100/30 flex items-center justify-center shrink-0 shadow-2xs">
                <i class="fas fa-lock text-slate-500 text-[18px]"></i>
              </div>
              <div>
                <strong class="text-sm font-bold text-slate-800 block font-mono">
                  {{ formatNumber(contractStats.marginHeld, 2) }} <span class="text-[10px] font-normal text-slate-400 font-sans">USDT</span>
                </strong>
                <span class="block text-[10px] text-slate-400 font-medium mt-0.5">占用保证金</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <div class="flex border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50/40">
              <button 
                v-for="subTab in ['POSITIONS', 'CURRENT_PLAN', 'HISTORY_PLAN']" 
                :key="subTab"
                @click="contractTab = subTab"
                class="px-5 py-3.5 text-[11px] font-bold transition-all relative border-b-2 cursor-pointer"
                :class="contractTab === subTab ? 'border-[#0B9A47] text-[#0B9A47]' : 'border-transparent text-slate-400 hover:text-slate-600'"
              >
                {{ subTab === 'POSITIONS' ? '当前持仓' : (subTab === 'CURRENT_PLAN' ? '当前委托' : '合约对盘历史') }}
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-medium text-[11.5px] uppercase bg-slate-50/10">
                    <th class="p-3.5 pl-6 font-semibold">合约</th>
                    <th class="p-3.5 font-semibold">方向/杠杆</th>
                    <th class="p-3.5 font-semibold">持仓量</th>
                    <th class="p-3.5 font-semibold">开仓价</th>
                    <th class="p-3.5 font-semibold">标记价</th>
                    <th class="p-3.5 font-semibold font-sans text-rose-500">强评价</th>
                    <th class="p-3.5 font-semibold">未实现盈亏</th>
                    <th class="p-3.5 text-right pr-6 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-600 font-mono text-[12.5px]">
                  <tr v-if="filteredContractPositions.length === 0">
                    <td colspan="8" class="p-8 text-center text-slate-450 font-sans text-xs">当前没有合约持仓头寸或待决委托记录</td>
                  </tr>
                  <tr v-for="pos in filteredContractPositions" :key="pos.id" v-else class="hover:bg-slate-50/20 transition-colors">
                    <td class="p-3.5 pl-6 text-slate-800 font-bold font-sans text-[12.5px]">{{ pos.symbol }}</td>
                    <td class="p-3.5 font-sans text-[12.5px]">
                      <span class="text-[10px] px-2 py-0.5 rounded font-black border" :class="pos.sideStyle">
                        {{ pos.side }} {{ pos.mode }}
                      </span>
                    </td>
                    <td class="p-3.5 text-slate-805 font-bold font-sans text-[12.5px]">{{ pos.size }}</td>
                    <td class="p-3.5 font-bold text-[12.5px]">{{ formatNumber(pos.entryPrice, 2) }}</td>
                    <td class="p-3.5 font-bold text-slate-500 text-[12.5px]">{{ formatNumber(pos.markPrice, 2) }}</td>
                    <td class="p-3.5 text-rose-500 font-bold text-[12.5px]">{{ formatNumber(pos.liqPrice, 2) }}</td>
                    <td class="p-3.5 text-emerald-600 font-black text-[12.5px]">
                      +{{ formatNumber(pos.pnl, 2) }} USDT
                      <span class="text-[10.5px] font-normal block text-emerald-500">+{{ pos.pnlPct }}%</span>
                    </td>
                    <td class="p-3.5 font-sans pr-6 whitespace-nowrap">
                      <div class="flex items-center justify-end gap-2">
                        <button @click="triggerTpSlModal(pos)" class="text-[11px] border border-slate-200 text-slate-600 hover:text-[#0B9A47] hover:border-[#0B9A47]/30 hover:bg-[#F4FAF6] px-2.5 py-1 rounded-md cursor-pointer transition-all">
                          止盈止损
                        </button>
                        <button @click="closeContractPosition(pos)" class="text-[11px] bg-[#0B9A47] hover:bg-[#0B9A47]/90 text-white font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all border border-[#0B9A47]">
                          平仓
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 8: 关于 LSEG (ABOUT_LSEG) ============== -->
        <div v-if="activeSection === 'ABOUT'" class="space-y-6 animate-fade-in text-[12px]">
          <div class="bg-white rounded-[8px] border border-slate-100 p-6 shadow-xs flex flex-col items-center text-center">
            <div class="w-14 h-14 bg-[#F4FAF6] text-[#0B9A47] border-2 border-emerald-500/10 rounded-full flex items-center justify-center mb-3.5">
              <i class="fas fa-award text-[28px]"></i>
            </div>
            <h2 class="text-base font-bold text-slate-800 tracking-wide font-sans leading-none">伦敦证券绿色保理生态</h2>
            <p class="text-[8.5px] uppercase font-black text-slate-400 tracking-widest mt-1.5 font-mono">London Stock Exchange Group</p>
            <span class="bg-[#EAF5EF] text-[#0B9A47] text-[9.5px] font-black px-2.5 py-0.5 rounded-full border border-[#0B9A47]/10 mt-2.5">v1.1.0 Institutional</span>
            
            <p class="text-xs text-slate-500 font-normal leading-relaxed max-w-md mt-4">
              作为具有悠久历史的世界金融底盘机构之一，大宗保底套期保值交易在合规框架内运作，由英国 FCA、新加坡 MAS 全局授权对盘。
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-6 border-t border-slate-50 pt-5 text-left">
              <div class="bg-slate-50/50 p-2.5 rounded-[8px] border border-slate-100">
                <span class="block text-xs font-bold text-slate-800">FCA 全局持牌</span>
                <span class="block text-[9px] text-slate-400 font-medium mt-0.5">持牌号: LSEG-732810</span>
              </div>
              <div class="bg-slate-50/50 p-2.5 rounded-[8px] border border-slate-100">
                <span class="block text-xs font-bold text-slate-800">100% 储备金</span>
                <span class="block text-[9px] text-slate-400 font-medium mt-0.5">多重冷存储对账单公开</span>
              </div>
              <div class="bg-slate-50/50 p-2.5 rounded-[8px] border border-slate-100">
                <span class="block text-xs font-bold text-slate-800">双多因素防护</span>
                <span class="block text-[9px] text-slate-400 font-medium mt-0.5">谷歌MFA二次拨转防护</span>
              </div>
              <div class="bg-slate-50/50 p-2.5 rounded-[8px] border border-slate-100">
                <span class="block text-xs font-bold text-slate-800">保险期兜底</span>
                <span class="block text-[9px] text-slate-400 font-medium mt-0.5">专设绿色理赔共保池</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
            <button @click="activeSection = 'ABOUT_SERVICE'" class="bg-white hover:bg-[#F4FAF6] border border-slate-100 rounded-[8px] p-4 text-left transition-all group cursor-pointer shadow-xs">
              <i class="fas fa-file-lines text-[14px] mb-1.5 text-slate-500 group-hover:text-[#0B9A47] transition-all block"></i>
              <h3 class="text-xs font-bold text-slate-800 group-hover:text-[#0B9A47] transition-all">服务协议</h3>
              <p class="text-[10px] text-slate-400 font-normal mt-1 leading-normal">LSEG 绿色代币衍生及充提清核双重服务协议条件条款</p>
            </button>
            <button @click="activeSection = 'ABOUT_PRIVACY'" class="bg-white hover:bg-[#F4FAF6] border border-slate-100 rounded-[8px] p-4 text-left transition-all group cursor-pointer shadow-xs">
              <i class="fas fa-lock text-[14px] mb-1.5 text-slate-500 group-hover:text-[#0B9A47] transition-all block"></i>
              <h3 class="text-xs font-bold text-slate-800 group-hover:text-[#0B9A47] transition-all">隐私政策</h3>
              <p class="text-[10px] text-slate-400 font-normal mt-1 leading-normal">高能脱敏冷钱包物理隔离哈希特征比对与传输加密规章</p>
            </button>
            <button @click="activeSection = 'ABOUT_CHAT'" class="bg-white hover:bg-[#F4FAF6] border border-slate-100 rounded-[8px] p-4 text-left transition-all group cursor-pointer shadow-xs">
              <i class="fas fa-comments text-[14px] mb-1.5 text-slate-500 group-hover:text-[#0B9A47] transition-all block"></i>
              <h3 class="text-xs font-bold text-slate-800 group-hover:text-[#0B9A47] transition-all">联系客服</h3>
              <p class="text-[10px] text-slate-400 font-normal mt-1 leading-normal">由伦敦仲裁法务小队组成的 24/7 在线全自动递单中心</p>
            </button>
            <button @click="activeSection = 'ABOUT_HELP'" class="bg-white hover:bg-[#F4FAF6] border border-slate-100 rounded-[8px] p-4 text-left transition-all group cursor-pointer shadow-xs">
              <i class="fas fa-lightbulb text-[14px] mb-1.5 text-slate-500 group-hover:text-[#0B9A47] transition-all block"></i>
              <h3 class="text-xs font-bold text-slate-800 group-hover:text-[#0B9A47] transition-all">帮助中心</h3>
              <p class="text-[10px] text-slate-400 font-normal mt-1 leading-normal">关于多倍率强平估算、跟单保重比例、安全OTP绑定指引</p>
            </button>
            <button @click="activeSection = 'ABOUT_RISK'" class="bg-white hover:bg-[#F4FAF6] border border-slate-100 rounded-[8px] p-4 text-left transition-all group cursor-pointer shadow-xs">
              <i class="fas fa-triangle-exclamation text-[14px] mb-1.5 text-slate-500 group-hover:text-[#0B9A47] transition-all block"></i>
              <h3 class="text-xs font-bold text-slate-800 group-hover:text-[#0B9A47] transition-all">风险提示</h3>
              <p class="text-[10px] text-slate-400 font-normal mt-1 leading-normal">加密衍生合约多空、杠杆维持线临危平仓之不可逆警告</p>
            </button>
            <button @click="activeSection = 'ABOUT_REGULATORY'" class="bg-white hover:bg-[#F4FAF6] border border-slate-100 rounded-[8px] p-4 text-left transition-all group cursor-pointer shadow-xs">
              <i class="fas fa-building-columns text-[14px] mb-1.5 text-slate-500 group-hover:text-[#0B9A47] transition-all block"></i>
              <h3 class="text-xs font-bold text-slate-800 group-hover:text-[#0B9A47] transition-all">监管信息</h3>
              <p class="text-[10px] text-slate-400 font-normal mt-1 leading-normal">持有英国FCA伦敦托管处特许账簿备案等多条司法合规</p>
            </button>
          </div>
        </div>

        <!-- ============== SUB-PAGE 9: 服务协议 (ABOUT_SERVICE) ============== -->
        <div v-if="activeSection === 'ABOUT_SERVICE'" class="space-y-6 animate-fade-in text-[12px] font-sans">
          <div class="flex items-center gap-2">
            <button @click="activeSection = 'ABOUT'" class="text-slate-450 hover:text-[#0B9A47] focus:outline-none cursor-pointer flex items-center gap-1.5 py-1">
              <i class="fas fa-arrow-left text-[15px] select-none"></i>
              <span class="text-xs font-semibold">返回</span>
            </button>
          </div>
          <div class="bg-white rounded-[8px] border border-slate-100 p-6 shadow-xs">
            <h2 class="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">服务协议 Terms of Service</h2>
            <div class="text-slate-500 font-normal leading-relaxed mt-4 space-y-4 text-[11px]">
              <p>伦敦证券绿色能源数字保理有限责任公司在大宗配资、冷熔资产隔离对盘中遵循合规。使用本平台前，请您务必深读《服务协议》。如您在系统中点击或申批登记，即被认定为同意并接受本契约规条。</p>
              <h4 class="font-bold text-slate-850">1. 用户条件及基本规纪</h4>
              <p>提交KYC的成员承诺资金并非通过毒品、洗钱、走私等违法敞口所得，您需完全具备所在法域的最高法定交易行为能力。系统不为恐怖主义流向钱包提供支付接入。</p>
              <h4 class="font-bold text-slate-850">2. 对冲保险包规则</h4>
              <p>保本兜底对开机制仅为“完成购买专属保单包”的跟双边交易保理提供物理理赔。在协议约定周期（默认十分钟）结算产生逆向穿包亏缺时，保险准备金池将予以直接划拨弥补损失。自行杠杆交易自担波段强平责任。</p>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 10: 隐私政策 (ABOUT_PRIVACY) ============== -->
        <div v-if="activeSection === 'ABOUT_PRIVACY'" class="space-y-6 animate-fade-in text-[12px] font-sans">
          <div class="flex items-center gap-2">
            <button @click="activeSection = 'ABOUT'" class="text-slate-450 hover:text-[#0B9A47] focus:outline-none cursor-pointer flex items-center gap-1.5 py-1">
              <i class="fas fa-arrow-left text-[15px] select-none"></i>
              <span class="text-xs font-semibold">返回</span>
            </button>
          </div>
          <div class="bg-white rounded-[8px] border border-slate-100 p-6 shadow-xs">
            <h2 class="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">隐私政策 Privacy Policy</h2>
            <div class="text-slate-500 font-normal leading-relaxed mt-4 space-y-4 text-[11px]">
              <p>我们实施业内严格高能防篡改存储规条。全体证照、昵称及手机参数经物理双核脱敏技术哈希化，永不私自对外提供商业披露，确保您的资产穿透记录具有底层最高防护。</p>
              <h4 class="font-bold text-slate-850">1. 什么是信息的脱敏哈希</h4>
              <p>您上传的所有身份或证件图片都不保存原始图像于公链热链。在物理硬件接收层读入后，我们将图像打包压缩，并在离线脱敏高能冷仓内通过英国 FCA 认可的哈希算法转化为不可逆的字符串。热链仅能检索比对校验成功状态，无法破析原貌。</p>
              <h4 class="font-bold text-slate-850">2. 我们如何保护个人秘钥</h4>
              <p>提微信、账单审计一律由服务器双因子（MFA）校验阻断外部提权侵犯，请您高度重视登录密码，发生遗失因不可逆机制将无法单边追回。</p>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 11: 联系客服 (ABOUT_CHAT) ============== -->
        <div v-if="activeSection === 'ABOUT_CHAT'" class="space-y-6 animate-fade-in text-[12px] font-sans">
          <div class="flex items-center gap-2">
            <button @click="activeSection = 'ABOUT'" class="text-slate-450 hover:text-[#0B9A47] focus:outline-none cursor-pointer flex items-center gap-1.5 py-1">
              <i class="fas fa-arrow-left text-[15px] select-none"></i>
              <span class="text-xs font-semibold">返回</span>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div class="md:col-span-4 bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs space-y-4">
              <h3 class="text-xs font-bold text-slate-800 uppercase">官方联系与课诉受理</h3>
              <div class="space-y-3 font-normal text-slate-500 text-[11px]">
                <div>
                  <span class="block text-[10px] text-slate-400 font-semibold">伦敦中心官方邮</span>
                  <span class="block text-slate-700 font-medium font-mono select-all">legal-support@lseg-green.com</span>
                </div>
                <div>
                  <span class="block text-[10px] text-slate-400 font-semibold">伦敦官方核验线</span>
                  <span class="block text-slate-700 font-medium font-mono">+44 (0) 20 7797 1000</span>
                </div>
                <div>
                  <span class="block text-[10px] text-slate-400 font-semibold">物理信托存管处</span>
                  <span class="block text-slate-705 mt-0.5 leading-normal text-[10px]">10 Paternoster Square, London, EC4M 7LS</span>
                </div>
              </div>
            </div>

            <div class="md:col-span-8 bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs">
              <h3 class="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">极速客诉递单 / 实名特设特批</h3>
              <form @submit.prevent="store.triggerToast('📨 您的在线账本核实申单已成功打包！将通过伦敦金融行为局特许对盘节点快速匹配客服，预计30秒内有专属小组成员主动对盘！')" class="space-y-4">
                <div>
                  <label class="block text-[10px] font-medium text-slate-400 mb-1">联系邮箱</label>
                  <input type="email" placeholder="example@gmail.com" required class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-2 text-xs text-slate-705 outline-none focus:bg-white focus:ring-1 focus:ring-[#0B9A47] transition-all" />
                </div>
                <div>
                  <label class="block text-[10px] font-medium text-slate-400 mb-1">申诉咨询分类</label>
                  <select class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-2 text-xs text-slate-600 outline-none">
                    <option>充值账目清对 (Deposit Verification)</option>
                    <option>保险期理赔划拨 (Insurance Disbursals)</option>
                    <option>KYC 特设极速审查 (KYC Manual Audit)</option>
                    <option>合约被强平故障核减 (Liquidation Appeals)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-medium text-slate-400 mb-1">必要订单哈希 / 详细概述</label>
                  <textarea placeholder="请填写您要咨询核减的订单号、网络哈希、收款钱包地址。伦敦稽查代表将恪守保密契约..." rows="3" required class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-2 text-xs text-slate-705 outline-none focus:bg-white focus:ring-1 focus:ring-[#0B9A47] transition-all"></textarea>
                </div>
                <button type="submit" class="w-full bg-[#0B9A47] hover:bg-[#0B9A47]/95 text-white font-bold py-2.5 text-xs rounded-[8px] shadow-xs transition-colors cursor-pointer select-none text-center">
                  递交是在线清对
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 12: 帮助中心 (ABOUT_HELP) ============== -->
        <div v-if="activeSection === 'ABOUT_HELP'" class="space-y-6 animate-fade-in text-[12px] font-sans">
          <div class="flex items-center gap-2">
            <button @click="activeSection = 'ABOUT'" class="text-slate-450 hover:text-[#0B9A47] focus:outline-none cursor-pointer flex items-center gap-1.5 py-1">
              <i class="fas fa-arrow-left text-[15px] select-none"></i>
              <span class="text-xs font-semibold">返回</span>
            </button>
          </div>
          
          <div class="bg-white rounded-[8px] border border-slate-100 p-5 shadow-xs">
            <h2 class="text-xs font-bold text-slate-800">有问必答 (FAQ List)</h2>
            <div class="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-[8px] px-3.5 py-1.5 w-full max-w-sm mt-4 mb-4">
              <span>🔍</span>
              <input v-model="qaSearch" placeholder="输入关键字搜索答疑问题..." class="bg-transparent border-0 outline-none text-xs flex-1 text-slate-700" />
            </div>

            <div class="space-y-3">
              <div v-for="(item, idx) in filteredQAs" :key="idx" class="border border-slate-100 rounded-[8px] overflow-hidden">
                <button @click="openedQaNode = openedQaNode === idx ? null : idx" class="w-full text-left bg-white hover:bg-slate-50/50 p-3 flex.5 items-center justify-between outline-none cursor-pointer">
                  <span class="text-xs font-bold text-slate-700">❓ {{ item.q }}</span>
                  <span class="text-slate-400 text-[10px] transition-transform transform" :class="openedQaNode === idx ? 'rotate-180 text-[#0B9A47]' : ''">▼</span>
                </button>
                <div v-if="openedQaNode === idx" class="bg-slate-50/30 border-t border-slate-50 p-3 text-[11px] font-normal text-slate-500 leading-relaxed animate-fade-in">
                  {{ item.a }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 13: 风险提示 (ABOUT_RISK) ============== -->
        <div v-if="activeSection === 'ABOUT_RISK'" class="space-y-6 animate-fade-in text-[12px] font-sans">
          <div class="flex items-center gap-2">
            <button @click="activeSection = 'ABOUT'" class="text-slate-450 hover:text-[#0B9A47] focus:outline-none cursor-pointer flex items-center gap-1.5 py-1">
              <i class="fas fa-arrow-left text-[15px] select-none"></i>
              <span class="text-xs font-semibold">返回</span>
            </button>
          </div>
          <div class="bg-white rounded-[8px] border border-slate-100 p-6 shadow-xs">
            <h2 class="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">风险披露声明书 (Risk Disclosures)</h2>
            <div class="text-slate-500 font-normal leading-relaxed mt-4 space-y-4 text-[11px]">
              <p class="font-bold text-rose-500 p-3 bg-rose-50/60 rounded-[8px] border border-rose-100">
                ⚠️ 重要警告：高倍率合约衍生交易具备负向价格敞口，面临极速斩仓清零损失，请在个人风险耐受度内理智运作！
              </p>
              <h4 class="font-bold text-slate-850">1. 资产剧烈波动</h4>
              <p>加密代币与绿色电力对套杠杆交易价格受全球大机构庄控、政策风向、成交阻泥、矿工链矿等多要素冲击大。其行情瞬息变动24小时不中断，仓位极易达到强制清退线价格。</p>
              <h4 class="font-bold text-slate-850">2. 自营与跟单区分</h4>
              <p>保本补偿理赔仅在您严格遵循保险期规则并在跟单中开启了专属对冲协议时生效。自发手动调节设置超高倍合约爆破自当全额赔。当保证金率过低，撮合引擎实施自动清仓对减。</p>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 14: 监管信息 (ABOUT_REGULATORY) ============== -->
        <div v-if="activeSection === 'ABOUT_REGULATORY'" class="space-y-6 animate-fade-in text-[12px] font-sans">
          <div class="flex items-center gap-2">
            <button @click="activeSection = 'ABOUT'" class="text-slate-450 hover:text-[#0B9A47] focus:outline-none cursor-pointer flex items-center gap-1.5 py-1">
              <i class="fas fa-arrow-left text-[15px] select-none"></i>
              <span class="text-xs font-semibold">返回</span>
            </button>
          </div>
          <div class="bg-white rounded-[8px] border border-slate-100 p-6 shadow-xs">
            <h2 class="text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">监管信息 & 合规资产托管公示</h2>
            <div class="text-slate-500 font-normal leading-relaxed mt-4 space-y-4 text-[11px]">
              <p>伦敦证券绿色保理是在多重金融资质持牌备案架构下履行的绿色代建账本。我们时刻接受英国金融局行为核算：</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="p-3 bg-slate-50/60 rounded-[8px] border border-slate-100">
                  <span class="block text-xs font-bold text-slate-805">英国 FCA (License No. 732810)</span>
                  <p class="text-[10px] text-slate-400 mt-1">准许开展保理、数字资产绿色平保共建等多项合规托管核验。</p>
                </div>
                <div class="p-3 bg-slate-50/60 rounded-[8px] border border-slate-100">
                  <span class="block text-xs font-bold text-slate-805">新加坡 MAS (PSA-003816)</span>
                  <p class="text-[10px] text-slate-400 mt-1">享受豁免安全免检绿色申报通道、符合分布式托管清验规范。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============== SUB-PAGE 15: 系统设置 (SETTINGS) ============== -->
        <div v-if="activeSection === 'SETTINGS'" class="space-y-6 animate-fade-in">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800">系统设置</h2>
            <p class="text-xs text-slate-400 font-medium mt-1 font-sans">管理和维护您的个人核心密盾凭据信息</p>
          </div>

          <div class="bg-white rounded-[8px] border border-slate-100 shadow-xs overflow-hidden">
            <!-- Selector Tabs -->
            <div class="flex border-b border-slate-100 bg-slate-50/40">
              <button 
                @click="settingsSubTab = 'PROFILE'"
                class="px-5 py-3.5 text-[11px] font-bold transition-all relative border-b-2 cursor-pointer"
                :class="settingsSubTab === 'PROFILE' ? 'border-[#0B9A47] text-[#0B9A47]' : 'border-transparent text-slate-400 hover:text-slate-600'"
              >
                个人信息
              </button>
              <button 
                @click="settingsSubTab = 'KYC'"
                class="px-5 py-3.5 text-[11px] font-bold transition-all relative border-b-2 cursor-pointer flex items-center gap-1.5"
                :class="settingsSubTab === 'KYC' ? 'border-[#0B9A47] text-[#0B9A47]' : 'border-transparent text-slate-400 hover:text-slate-600'"
              >
                <span>实名认证</span>
                <span v-if="kycStatus === 'UNVERIFIED'" class="bg-amber-100 text-amber-700 text-[8px] px-1 rounded-sm font-black uppercase font-sans">未实名</span>
                <span v-else-if="kycStatus === 'PENDING'" class="bg-blue-100 text-blue-700 text-[8px] px-1 rounded-sm font-black uppercase font-sans animate-pulse">审核中</span>
                <span v-else class="bg-emerald-100 text-emerald-800 text-[8px] px-1 rounded-sm font-black uppercase font-sans">已核发</span>
              </button>
            </div>

            <!-- Tab PANEL 1: Personal Details -->
            <div v-if="settingsSubTab === 'PROFILE'" class="p-5 md:p-6 space-y-5 w-full font-sans text-xs">
              <!-- Inline edit of nickname -->
              <div class="flex items-center justify-between border-b border-slate-50 pb-3">
                <div>
                  <span class="block text-[10px] text-slate-400 font-semibold uppercase">账户昵称</span>
                  <div v-if="!isEditingNickname" class="flex items-center gap-2 mt-1">
                    <strong class="text-xs font-bold text-slate-800">{{ userNickname }}</strong>
                    <button @click="isEditingNickname = true, editNicknameValue = userNickname" class="text-[9.5px] text-emerald-600 hover:text-emerald-700 font-bold bg-slate-100 hover:bg-slate-200/50 rounded px-1.5 py-0.5 pointer-events-auto">修改</button>
                  </div>
                  <div v-else class="flex items-center gap-1.5 mt-1">
                    <input v-model="editNicknameValue" class="border border-slate-200 bg-slate-50 focus:bg-white rounded-lg px-2 py-0.5 text-xs text-slate-700 outline-none w-28 font-semibold" />
                    <button @click="saveNickname" class="text-[10px] bg-[#0B9A47] text-white px-2 py-0.5 rounded font-black cursor-pointer">保存</button>
                    <button @click="isEditingNickname = false" class="text-[10px] bg-slate-150 text-slate-500 px-2 py-0.5 rounded font-medium cursor-pointer">取消</button>
                  </div>
                </div>
              </div>

              <!-- Readonly details -->
              <div class="grid grid-cols-2 gap-4 border-b border-slate-50 pb-3 font-mono">
                <div>
                  <span class="block text-[10px] text-slate-400 font-semibold uppercase font-sans">会员标识号 (UID)</span>
                  <strong class="text-slate-800 mt-1 block select-all font-bold">19483726</strong>
                </div>
                <div>
                  <span class="block text-[10px] text-slate-400 font-semibold uppercase font-sans">联合安全注册日</span>
                  <strong class="text-slate-500 mt-1 block">2026-05-10 14:32</strong>
                </div>
              </div>

              <!-- Advanced Shield Security lists -->
              <div class="space-y-3 pt-1">
                <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">安全中心卫士</h4>
                
                <!-- Password reset triggers -->
                <div class="p-3 bg-slate-50/50 border border-slate-100 rounded-[8px] flex items-center justify-between hover:border-slate-200 transition-colors">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/20 flex items-center justify-center shrink-0">
                      <i class="fas fa-lock text-slate-500 text-xs"></i>
                    </div>
                    <div>
                      <span class="block text-[11px] font-bold text-slate-700">会员登录密码</span>
                      <p class="text-[9px] text-slate-400 mt-0.5 font-sans">上次于 5天 前通过物理哈希对账重叠授权修改</p>
                    </div>
                  </div>
                  <button @click="showPwModal = true" class="text-[10px] bg-white border border-slate-200 text-slate-600 hover:text-[#0B9A47] hover:bg-[#F4FAF6] hover:border-[#0B9A47]/30 px-2.5 py-1 rounded-md font-bold cursor-pointer transition-all">
                    重设密码
                  </button>
                </div>

                <!-- Phone Change Trigger -->
                <div class="p-3 bg-slate-50/50 border border-slate-100 rounded-[8px] flex items-center justify-between hover:border-slate-200 transition-colors">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/20 flex items-center justify-center shrink-0">
                      <i class="fas fa-mobile-screen-button text-slate-500 text-xs"></i>
                    </div>
                    <div>
                      <span class="block text-[11px] font-bold text-slate-700">更换手机号码</span>
                      <p class="text-[9px] text-slate-400 mt-0.5 font-sans">当前绑定：{{ formattedUserPhone }}</p>
                    </div>
                  </div>
                  <button @click="showPhoneModal = true" class="text-[10px] bg-white border border-slate-200 text-slate-600 hover:text-[#0B9A47] hover:bg-[#F4FAF6] hover:border-[#0B9A47]/30 px-2.5 py-1 rounded-md font-bold cursor-pointer transition-all">
                    更换
                  </button>
                </div>
              </div>
            </div>

            <!-- Tab PANEL 2: KYC Identity Verifier -->
            <div v-if="settingsSubTab === 'KYC'" class="p-5 md:p-6 space-y-5">
              <!-- Unverified form step -->
              <div v-if="kycStatus === 'UNVERIFIED'" class="space-y-4 w-full font-sans text-xs">
                <div class="p-3 bg-amber-50/55 text-amber-700 border border-amber-250/20 rounded-[8px] text-[10.5px] leading-relaxed font-normal flex items-start gap-2">
                  <i class="fas fa-circle-exclamation text-amber-600 mt-0.5 shrink-0 text-sm"></i>
                  <p>依照伦敦金融局行为监管条例下设 AML 法案，大宗资产多币种划拨、清提、充值，均需要通过法域 KYC 凭据特征对盘。本服务器实施冷层脱敏哈希锁。</p>
                </div>

                <!-- Inputs grids -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 border border-slate-100 p-4 rounded-[8px]">
                  <div>
                    <label class="block text-[10px] font-medium text-slate-450 mb-1">国籍地区</label>
                    <select v-model="kycForm.country" class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-1.5 text-xs text-slate-707 outline-none">
                      <option value="CN">中国大陆 (Mainland China)</option>
                      <option value="HK">中国香港 (Hong Kong)</option>
                      <option value="SG">新加坡 (Singapore)</option>
                      <option value="UK">英国 (United Kingdom)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] font-medium text-slate-450 mb-1">真实真实法定姓名</label>
                    <input v-model="kycForm.name" placeholder="与证照完全相同的名字" required class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-1.5 text-xs text-slate-700 outline-none focus:bg-white" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-medium text-slate-455 mb-1">证件类别</label>
                    <select v-model="kycForm.docType" class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-1.5 text-xs text-slate-700 outline-none">
                      <option value="身份证">中华人民共和国居民身份证</option>
                      <option value="护照">中国/海外电子通用护照</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] font-medium text-slate-450 mb-1">唯一证件登记号</label>
                    <input v-model="kycForm.docId" placeholder="请输入对应的证件卡号" required class="w-full bg-slate-50 border border-slate-100 rounded-[8px] px-3 py-1.5 text-xs text-slate-700 outline-none focus:bg-white" />
                  </div>
                </div>

                <!-- KYC File Upload slots -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <!-- Image upload 1 -->
                  <div @click="simulateFileUpload('front')" class="border border-dashed border-slate-200 hover:border-[#0B9A47]/30 bg-slate-50/55 hover:bg-slate-100/10 p-4 rounded-[8px] text-center cursor-pointer flex flex-col items-center justify-center min-h-28">
                    <div v-if="!kycForm.frontPhoto" class="space-y-1.5 flex flex-col items-center">
                      <i class="fas fa-id-card text-[22px] text-slate-400 mb-1 block"></i>
                      <span class="block text-[10px] font-bold text-slate-700">证照正面 (人像面)</span>
                      <p class="text-[9px] text-slate-400">文字清晰、四角无反光</p>
                      <div v-if="uploadProgress.front > 0 && uploadProgress.front < 100" class="w-16 bg-slate-200 h-1 rounded-full mx-auto overflow-hidden">
                        <div class="bg-[#0B9A47] h-full" :style="{ width: uploadProgress.front + '%' }"></div>
                      </div>
                    </div>
                    <div v-else class="space-y-1 text-emerald-600 flex flex-col items-center">
                      <i class="fas fa-circle-check text-[18px] text-[#0B9A47] mb-1"></i>
                      <span class="block text-[9.5px] font-bold">证照人像面已安全离线哈希</span>
                    </div>
                  </div>

                  <!-- Image upload 2 -->
                  <div @click="simulateFileUpload('back')" class="border border-dashed border-slate-200 hover:border-[#0B9A47]/30 bg-slate-50/55 hover:bg-slate-100/10 p-4 rounded-[8px] text-center cursor-pointer flex flex-col items-center justify-center min-h-28">
                    <div v-if="!kycForm.backPhoto" class="space-y-1.5 flex flex-col items-center">
                      <i class="fas fa-building-columns text-[21px] text-slate-400 mb-1 block"></i>
                      <span class="block text-[10px] font-bold text-slate-700">证照反面 (国徽面)</span>
                      <p class="text-[9px] text-slate-400">请端正拍摄上传发证行政封条面</p>
                      <div v-if="uploadProgress.back > 0 && uploadProgress.back < 100" class="w-16 bg-slate-200 h-1 rounded-full mx-auto overflow-hidden">
                        <div class="bg-[#0B9A47] h-full" :style="{ width: uploadProgress.back + '%' }"></div>
                      </div>
                    </div>
                    <div v-else class="space-y-1 text-emerald-600 flex flex-col items-center">
                      <i class="fas fa-circle-check text-[18px] text-[#0B9A47] mb-1"></i>
                      <span class="block text-[9.5px] font-bold">证照国徽面已安全离线哈希</span>
                    </div>
                  </div>

                  <!-- Image upload 3 -->
                  <div @click="simulateFileUpload('hand')" class="border border-dashed border-slate-200 hover:border-[#0B9A47]/30 bg-slate-50/55 hover:bg-slate-100/10 p-4 rounded-[8px] text-center cursor-pointer flex flex-col items-center justify-center min-h-28">
                    <div v-if="!kycForm.handPhoto" class="space-y-1.5 flex flex-col items-center">
                      <i class="fas fa-portrait text-[23px] text-slate-400 mb-1 block"></i>
                      <span class="block text-[10px] font-bold text-slate-700">手持证件半身正面照</span>
                      <p class="text-[9px] text-slate-400">面部正面与证件正面同框核比</p>
                      <div v-if="uploadProgress.hand > 0 && uploadProgress.hand < 100" class="w-16 bg-slate-200 h-1 rounded-full mx-auto overflow-hidden">
                        <div class="bg-[#0B9A47] h-full" :style="{ width: uploadProgress.hand + '%' }"></div>
                      </div>
                    </div>
                    <div v-else class="space-y-1 text-emerald-600 flex flex-col items-center">
                      <i class="fas fa-circle-check text-[18px] text-[#0B9A47] mb-1"></i>
                      <span class="block text-[9.5px] font-bold">手持同框照已安全离线哈希</span>
                    </div>
                  </div>
                </div>

                <button @click="submitKycForm" class="w-full bg-[#135E2D] hover:bg-emerald-800 text-white font-bold py-2.5 text-xs rounded-[8px] shadow-xs cursor-pointer select-none text-center">
                  递交金融反洗钱 (AML) 对盘核
                </button>
              </div>

              <!-- State 2: PENDING auditing bypass helper -->
              <div v-if="kycStatus === 'PENDING'" class="text-center py-6 space-y-5 max-w-md mx-auto font-sans text-xs">
                <div class="w-12 h-12 bg-blue-50 text-blue-600 border border-blue-200 rounded-full flex items-center justify-center mx-auto text-base animate-spin">
                  <i class="fas fa-spinner"></i>
                </div>
                <div>
                  <h3 class="text-xs font-bold text-slate-800">离线证件特征清盘清账审核中...</h3>
                  <p class="text-[10px] text-slate-400 mt-1 lines-normal leading-relaxed">
                    您的个人证件哈希与面部特质正递交给英国 FCA 信托委员会、交叉清核 AML 底盘节点。预计在下一个对账时钟周期内 (5 - 10 分钟) 全自动审批核准！
                  </p>
                </div>

                <!-- Admin Bypass Helper panel -->
                <div class="border border-slate-100 p-4 rounded-[8px] bg-slate-50 space-y-3">
                  <span class="block text-[9px] text-slate-405 font-bold uppercase">🛠️ 模拟器研发辅助快速清检</span>
                  <div class="flex gap-2">
                    <button @click="approveKycSimulated" class="flex-1 bg-[#0b9a47] text-white hover:bg-[#0b9a47]/90 text-[10px] font-black py-1.5 rounded cursor-pointer">
                      一键快捷审核通过
                    </button>
                    <button @click="resetKycSimulated" class="flex-1 border bg-white border-slate-200 text-slate-600 text-[10px] py-1.5 rounded cursor-pointer">
                      重置归零
                    </button>
                  </div>
                </div>
              </div>

              <!-- State 3: CERTIFIED verified badge -->
              <div v-if="kycStatus === 'VERIFIED'" class="max-w-md mx-auto border border-[#EAF5EF] p-6 rounded-[8px] bg-[#F4FAF6]/40 text-center space-y-5 font-sans text-xs">
                <div class="w-12 h-12 bg-[#EAF5EF] text-[#0B9A47] border border-[#0B9A47]/10 rounded-full flex items-center justify-center mx-auto text-base">
                  <i class="fas fa-check"></i>
                </div>
                <div>
                  <h3 class="text-xs font-black text-[#135E2D]">证照核发核对合格 (Certified)</h3>
                  <p class="text-[10px] text-[#0b9a47]/80 mt-0.5">该账户已经通过双多因素防假证AML对对，具备大金额提取与完全平仓保障！</p>
                </div>

                <div class="border-t border-emerald-500/10 pt-3 text-[10.5px] font-normal text-slate-500 space-y-2 text-left max-w-xs mx-auto font-mono">
                  <div class="flex justify-between">
                    <span class="text-slate-400 font-sans">清清合格国家</span>
                    <strong class="text-slate-700">CN (中华人民共和国人代身份证)</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400 font-sans">关联法定人名</span>
                    <strong class="text-slate-700 font-sans">张*三 (特许安全脱敏保护)</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400 font-sans">联合清查合格包</span>
                    <strong class="text-slate-705 text-[9.5px]">FCA-LSEG-MFA-PASS</strong>
                  </div>
                </div>

                <button @click="resetKycSimulated" class="text-[9px] text-slate-400 bg-white border border-slate-100 hover:text-slate-600 px-2 py-1 rounded transition-all select-none">
                  还原空状态（未认领）
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>
      
    </div>

    <!-- ==================== INTERACTIVE SYSTEM MODALS ==================== -->
    <!-- Modal 1: Password RESET block -->
    <div v-if="showPwModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs font-sans">
      <div class="bg-white rounded-[8px] border border-slate-100 w-full max-w-sm p-5 space-y-4 shadow-xl animate-scale-in text-xs">
        <div class="flex items-center justify-between border-b border-slate-50 pb-2">
          <h3 class="text-xs font-bold text-slate-800">重设安全登录密码</h3>
          <button @click="showPwModal = false" class="text-slate-400 hover:text-slate-600 focus:outline-none text-base cursor-pointer">×</button>
        </div>
        <form @submit.prevent="changePassword" class="space-y-3">
          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">原始重扣核对密码</label>
            <input v-model="pwForm.oldPw" type="password" required placeholder="请输入您的原密码" class="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:bg-white" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">新密码 (高强度防护)</label>
            <input v-model="pwForm.newPw" type="password" required placeholder="请输入安全新密码 (>=6位)" class="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:bg-white" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">再次确认重核新密码</label>
            <input v-model="pwForm.confirmPw" type="password" required placeholder="重新输入一遍新密码" class="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:bg-white" />
          </div>
          <div class="flex gap-2 pt-2">
            <button type="button" @click="showPwModal = false" class="flex-1 bg-slate-100 text-slate-500 py-2 rounded-lg font-bold cursor-pointer">取消</button>
            <button type="submit" class="flex-1 bg-[#0B9A47] hover:bg-[#0B9A47]/95 text-white py-2 rounded-lg font-bold cursor-pointer">立即绑定更新</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 2: Google OTP MFA-Authenticator -->
    <div v-if="showOtpModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs font-sans">
      <div class="bg-white rounded-[8px] border border-slate-100 w-full max-w-sm p-5 space-y-4 shadow-xl animate-scale-in text-xs">
        <div class="flex items-center justify-between border-b border-slate-50 pb-2">
          <h3 class="text-xs font-bold text-slate-800">绑定 Google MFA 两步验证</h3>
          <button @click="showOtpModal = false" class="text-slate-400 hover:text-slate-600 focus:outline-none text-base cursor-pointer">×</button>
        </div>
        
        <div class="space-y-3">
          <div class="p-2 bg-slate-50 border border-slate-100 rounded-[8px] text-center space-y-2">
            <span class="block text-[9.5px] text-slate-450 font-bold uppercase">Google Authenticator 对核私钥槽</span>
            <!-- Seed string QR code placeholder -->
            <div class="p-1 px-3 bg-[#EAF5EF] text-[#0b9a47] font-bold font-mono text-[10.5px] rounded-lg inline-block text-center border mr-2">
              LSEG GREEN SECRET: G7JR OTP KEY
            </div>
            <p class="text-[9px] text-[#0b9a47]">请打开谷歌、微软双重核对验证器扫描或手动置入此安全私钥</p>
          </div>

          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">谷歌二层阻核 OTP 动态核算码</label>
            <input v-model="otpCodeInput" type="text" maxlength="6" placeholder="请输入谷歌App生成的6位验证码..." required class="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none font-mono font-bold tracking-widest text-center focus:bg-white" />
          </div>

          <div class="flex gap-2 pt-2">
            <button type="button" @click="showOtpModal = false" class="flex-1 bg-slate-100 text-slate-500 py-2 rounded-lg font-bold cursor-pointer">取消</button>
            <button type="button" @click="submitOtpSetting" class="flex-1 bg-[#0B9A47] hover:bg-[#0B9A47]/95 text-white py-2 rounded-lg font-bold cursor-pointer">确定绑定验证</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 3: Change phone number -->
    <div v-if="showPhoneModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs font-sans">
      <div class="bg-white rounded-[8px] border border-slate-100 w-full max-w-sm p-5 space-y-4 shadow-xl animate-scale-in text-xs">
        <div class="flex items-center justify-between border-b border-slate-50 pb-2">
          <h3 class="text-xs font-bold text-slate-800">更换绑定手机号</h3>
          <button @click="showPhoneModal = false" class="text-slate-400 hover:text-slate-600 focus:outline-none text-base cursor-pointer">×</button>
        </div>
        <form @submit.prevent="changePhoneNumber" class="space-y-3">
          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">原手机号码</label>
            <input v-model="phoneForm.currentPhone" type="text" required placeholder="请输入原本绑定的手机号码" class="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:bg-white" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">新手机号</label>
            <div class="flex gap-1">
              <span class="inline-flex items-center bg-slate-50 border border-slate-100 rounded-lg px-2 text-slate-500 font-semibold text-[11px]">+86</span>
              <input v-model="phoneForm.newPhone" type="text" required placeholder="请输入新的手机号" class="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:bg-white z-10 pointer-events-auto" />
            </div>
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 font-semibold mb-1">短信验证码</label>
            <div class="flex gap-2">
              <input v-model="phoneForm.smsCode" type="text" required maxlength="6" placeholder="输入短信验证码" class="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:bg-white font-mono font-bold text-center" />
              <button type="button" @click="sendSmsCode" :disabled="smsCountdown > 0" class="text-[10px] border px-3 rounded-lg font-bold min-w-[90px] cursor-pointer transition-all border-slate-200 text-slate-600 hover:bg-[#F4FAF6] hover:text-[#0B9A47] hover:border-[#0B9A47]/30" :class="smsCountdown > 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100' : 'bg-white'">
                {{ smsCountdown > 0 ? `${smsCountdown}s` : '获取验证码' }}
              </button>
            </div>
          </div>
          <div class="flex gap-2 pt-2">
            <button type="button" @click="showPhoneModal = false" class="flex-1 bg-slate-100 text-slate-500 py-2 rounded-lg font-bold cursor-pointer">取消</button>
            <button type="submit" class="flex-1 bg-[#0B9A47] hover:bg-[#0B9A47]/95 text-white py-2 rounded-lg font-bold cursor-pointer">确定更换</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();

// Core active navigation state: default to 'ORDER_FUNDING' (资金订单) since user wants it by default for the Personal Center/profile.
const activeSection = ref(route.query?.tab === 'invite' ? 'INVITE' : 'ORDER_FUNDING');

onMounted(() => {
  if (route.query?.tab === 'invite') {
    activeSection.value = 'INVITE';
  } else if (route.query?.tab === 'funding') {
    activeSection.value = 'ORDER_FUNDING';
  } else if (route.query?.tab) {
    activeSection.value = route.query.tab;
  } else if (route.query?.section) {
    activeSection.value = route.query.section;
  }
});

watch(() => route.query, (query) => {
  if (query?.tab === 'invite') {
    activeSection.value = 'INVITE';
  } else if (query?.tab === 'funding') {
    activeSection.value = 'ORDER_FUNDING';
  } else if (query?.tab) {
    activeSection.value = query.tab;
  } else if (query?.section) {
    activeSection.value = query.section;
  } else {
    activeSection.value = 'ORDER_FUNDING';
  }
}, { deep: true });

// Sidebar custom orders menu list
const orderMenus = [
  { id: 'funding', label: '资金订单', icon: 'fas fa-file-invoice-dollar', section: 'ORDER_FUNDING' },
  { id: 'spot', label: '现货订单', icon: 'fas fa-chart-line', section: 'ORDER_SPOT' },
  { id: 'insurance', label: '保险期订单', icon: 'fas fa-shield-halved', section: 'ORDER_INSURANCE' },
  { id: 'contract', label: '合约订单', icon: 'fas fa-arrow-trend-up', section: 'ORDER_CONTRACT' }
];

// Inner navigation tabs
const fundingTab = ref('ALL');
const spotTab = ref('CURRENT');
const insuranceTab = ref('ACTIVE');
const contractTab = ref('POSITIONS');
const settingsSubTab = ref('PROFILE');

// Real-name verification status ('UNVERIFIED', 'PENDING', 'VERIFIED')
const kycStatus = ref(localStorage.getItem('lseg_kyc_status') || 'UNVERIFIED');
const userNickname = ref(
  store.isLoggedIn && store.userInfo && store.userInfo.username 
    ? store.userInfo.username 
    : (localStorage.getItem('lseg_nickname') || 'LSEG-8f3b4c')
);
const isEditingNickname = ref(false);
const editNicknameValue = ref(userNickname.value);

// KYC Form Variables
const kycForm = reactive({
  country: 'CN',
  name: '',
  docType: '身份证',
  docId: '',
  frontPhoto: null,
  backPhoto: null,
  handPhoto: null
});

// Image Upload Simulation variables
const uploadProgress = reactive({
  front: 0,
  back: 0,
  hand: 0
});

// Password change simulator
const showPwModal = ref(false);
const pwForm = reactive({ oldPw: '', newPw: '', confirmPw: '' });

// Google OTP Verification Simulator
const showOtpModal = ref(false);
const otpAuthEnabled = ref(localStorage.getItem('lseg_otp_enabled') === 'true');
const otpCodeInput = ref('');

// Change phone number logic states
const showPhoneModal = ref(false);
const userPhone = ref(localStorage.getItem('lseg_user_phone') || '138****9281');
const phoneForm = reactive({
  currentPhone: '',
  newPhone: '',
  smsCode: ''
});
const formattedUserPhone = computed(() => {
  return userPhone.value;
});
const smsCountdown = ref(0);
let timerId = null;
const sendSmsCode = () => {
  if (!phoneForm.newPhone) {
    store.triggerToast('请输入新的手机号码');
    return;
  }
  if (smsCountdown.value > 0) return;
  smsCountdown.value = 60;
  timerId = setInterval(() => {
    if (smsCountdown.value > 0) {
      smsCountdown.value--;
    } else {
      clearInterval(timerId);
    }
  }, 1000);
  store.triggerToast('📲 短信验证码已发送至新手机号，请注意查收');
};

const changePhoneNumber = () => {
  if (!phoneForm.currentPhone) {
    store.triggerToast('请输入原手机号码进行验证');
    return;
  }
  if (!phoneForm.newPhone) {
    store.triggerToast('请输入要更换的新手机号码');
    return;
  }
  if (!phoneForm.smsCode) {
    store.triggerToast('请输入短信验证码');
    return;
  }
  
  const ph = phoneForm.newPhone;
  const maskedPhone = ph.slice(0, 3) + '****' + ph.slice(-4);
  userPhone.value = maskedPhone;
  localStorage.setItem('lseg_user_phone', maskedPhone);
  
  store.triggerToast('✅ 手机号码更换成功！');
  showPhoneModal.value = false;
  phoneForm.currentPhone = '';
  phoneForm.newPhone = '';
  phoneForm.smsCode = '';
  if (timerId) {
    clearInterval(timerId);
    smsCountdown.value = 0;
  }
};

// --- DATA LIST GENERATIONS ---

// 1. Funding Orders list (Screenshot 1)
const fundingOrders = ref([
  { id: 'f1', type: '充值', typeVal: 'DEPOSIT', coin: 'USDT', amount: 5000.00, status: '已到账', statusStyle: 'text-emerald-600', time: '2026-06-01 09:48', remark: '链上充值 0x3a7f...d82b' },
  { id: 'f2', type: '提现', typeVal: 'WITHDRAW', coin: 'USDT', amount: -1200.00, status: '已完成', statusStyle: 'text-emerald-600', time: '2026-05-31 16:20', remark: '提现至外部钱包 0xb19c...4e3f' },
  { id: 'f3', type: '充值', typeVal: 'DEPOSIT', coin: 'BTC', amount: 0.05000, status: '已到账', statusStyle: 'text-emerald-600', time: '2026-05-30 11:03', remark: '链上充值 bc1q...9z7m' },
  { id: 'f4', type: '划转', typeVal: 'TRANSFER', coin: 'USDT', amount: -500.00, status: '已完成', statusStyle: 'text-emerald-600', time: '2026-05-29 14:15', remark: '划转至合约账户' },
  { id: 'f5', type: '划转', typeVal: 'TRANSFER', coin: 'USDT', amount: 500.00, status: '已完成', statusStyle: 'text-emerald-600', time: '2026-05-29 14:15', remark: '来自现货账户' },
  { id: 'f6', type: '提现', typeVal: 'WITHDRAW', coin: 'ETH', amount: -0.80000, status: '审核中', statusStyle: 'text-amber-500', time: '2026-05-28 08:50', remark: '提现申请处理中' },
  { id: 'f7', type: '充值', typeVal: 'DEPOSIT', coin: 'USDT', amount: 2000.00, status: '已到账', statusStyle: 'text-emerald-600', time: '2026-05-25 17:32', remark: 'C2C 充值' }
]);

// 2. Spot Orders list (Screenshot 2)
const spotOrders = ref([
  { id: 's1', symbol: 'BTC/USDT', side: '买入', sideStyle: 'text-[#0B9A47]', type: '限价', price: 63200.00, quantity: 0.050, filled: 0.000, amount: 3160.00, time: '06-02 10:15', category: 'CURRENT' },
  { id: 's2', symbol: 'ETH/USDT', side: '卖出', sideStyle: 'text-rose-500', type: '限价', price: 3850.00, quantity: 1.000, filled: 0.000, amount: 3850.00, time: '06-02 09:40', category: 'CURRENT' },
  { id: 's3', symbol: 'BTC/USDT', side: '买入', sideStyle: 'text-[#0B9A47]', type: '限价', price: 61500.00, quantity: 0.100, filled: 0.100, amount: 6150.00, time: '05-28 14:22', category: 'HISTORY' },
  { id: 's4', symbol: 'LINK/USDT', side: '卖出', sideStyle: 'text-rose-500', type: '市价', price: 27.50, quantity: 15.0, filled: 15.0, amount: 412.50, time: '05-27 11:05', category: 'EXECUTED' }
]);

// 3. Insurance Orders (Screenshot 3)
const insuranceStats = reactive({
  totalCopy: 5800.00,
  cumulativeProfit: 467.60,
  rateOfReturn: 8.06
});

const insuranceOrders = ref([
  { id: 'i1', trader: 'Alex_Pro', avatarBg: 'bg-rose-500', amount: 2000.00, profit: 186.40, rate: '9.32%', startTime: '2026-05-15', days: '18 天', category: 'ACTIVE' },
  { id: 'i2', trader: 'GreenMaster', avatarBg: 'bg-emerald-500', amount: 1500.00, profit: 52.80, rate: '3.52%', startTime: '2026-05-28', days: '5 天', category: 'ACTIVE' },
  { id: 'i3', trader: 'CryptoWiz', avatarBg: 'bg-blue-500', amount: 1300.00, profit: 120.40, rate: '9.26%', startTime: '2026-05-10', days: '23 天', category: 'COMPLETED' },
  { id: 'i4', trader: 'AlphaBull', avatarBg: 'bg-indigo-500', amount: 1000.00, profit: 108.00, rate: '10.80%', startTime: '2026-04-20', days: '43 天', category: 'STOPPED' }
]);

// 4. Contract Positions and stats (Screenshot 4)
const contractStats = reactive({
  positionsCount: 2,
  unrealizedPnl: 76.50,
  realizedPnl: 175.50,
  marginHeld: 1240.00
});

const contractPositions = ref([
  { id: 'c1', symbol: 'BTC/USDT', mode: '逐仓 10x', side: '做多', sideStyle: 'bg-[#F4FAF6] text-[#0B9A47] border-[#0B9A47]/10', size: '0.050 BTC', entryPrice: 62450.00, markPrice: 63180.00, liqPrice: 56200.00, pnl: 36.50, pnlPct: 1.17, category: 'POSITIONS' },
  { id: 'c2', symbol: 'ETH/USDT', mode: '全仓 5x', side: '做空', sideStyle: 'bg-rose-50 text-rose-500 border-rose-250/20', size: '1.000 ETH', entryPrice: 3820.00, markPrice: 3780.00, liqPrice: 4200.00, pnl: 40.00, pnlPct: 1.05, category: 'POSITIONS' }
]);

// Filter functions
const filteredFundingOrders = computed(() => {
  if (fundingTab.value === 'ALL') return fundingOrders.value;
  return fundingOrders.value.filter(o => o.typeVal === fundingTab.value);
});

const filteredSpotOrders = computed(() => {
  if (spotTab.value === 'CURRENT') return spotOrders.value.filter(o => o.category === 'CURRENT');
  if (spotTab.value === 'HISTORY') return spotOrders.value.filter(o => o.category === 'HISTORY');
  return spotOrders.value.filter(o => o.category === 'EXECUTED');
});

const filteredInsuranceOrders = computed(() => {
  if (insuranceTab.value === 'ACTIVE') return insuranceOrders.value.filter(o => o.category === 'ACTIVE');
  if (insuranceTab.value === 'COMPLETED') return insuranceOrders.value.filter(o => o.category === 'COMPLETED');
  return insuranceOrders.value.filter(o => o.category === 'STOPPED');
});

const filteredContractPositions = computed(() => {
  if (contractTab.value === 'POSITIONS') return contractPositions.value.filter(o => o.category === 'POSITIONS');
  return []; // Mock empty for Current/History order tabs
});

// Original Content structures (Rewards and Team)
const rewardsList = [
  { id: '1', type: '注册', desc: '注册奖励', amount: 100.00, date: '2026-05-10', badgeStyle: 'bg-emerald-50 text-[#10B981] border-emerald-100' },
  { id: '2', type: '充值', desc: '首充奖励', amount: 50.00, date: '2026-05-11', badgeStyle: 'bg-amber-55 text-amber-600 border-amber-100' },
  { id: '3', type: '邀请', desc: '邀请好友 #1', amount: 15.50, date: '2026-05-20', badgeStyle: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: '4', type: '邀请', desc: '邀请好友 #2', amount: 8.20, date: '2026-05-19', badgeStyle: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: '5', type: '返佣', desc: '手续费返佣', amount: 43.60, date: '2026-05-31', badgeStyle: 'bg-purple-50 text-purple-600 border-purple-100' }
];

const teamMembers = [
  { uid: '82****', shortUid: '82', date: '26-05-20', level: '一级', reward: 15.50, avatarBg: 'bg-pink-500' },
  { uid: '31****', shortUid: '31', date: '26-05-19', level: '一级', reward: 8.20, avatarBg: 'bg-amber-500' },
  { uid: '95****', shortUid: '95', date: '26-05-19', level: '二级', reward: 22.10, avatarBg: 'bg-emerald-500' },
  { uid: '77****', shortUid: '77', date: '26-05-18', level: '一级', reward: 18.80, avatarBg: 'bg-blue-500' },
  { uid: '44****', shortUid: '44', date: '26-05-17', level: '二级', reward: 6.40, avatarBg: 'bg-purple-500' }
];

// Unified reactive dynamic asset calculation matching wallet/navbar
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

// Interactive Operations & Simulators
const copyText = (txt, label) => {
  navigator.clipboard.writeText(txt);
  store.triggerToast(`${label}已复制成功: ${txt}`);
};

const shareChannel = (channel) => {
  store.triggerToast(`已生成分享卡片！即将调起 ${channel} 客户端分享推荐路径。`);
};

const downloadPoster = () => {
  store.triggerToast("分享海报已经完成渲染！正在打包下载高清推广海报(4K分辨率)...");
};

const claimRewards = () => {
  store.triggerToast("🎉 今日核算推荐及手续返佣佣金已全额自动归集至您的总资产账户，无需手动提取！");
};

// Interactive Actions for Orders
const cancelSpotOrder = (order) => {
  spotOrders.value = spotOrders.value.filter(o => o.id !== order.id);
  store.triggerToast(`✅ 成功的撤销了对交易对 ${order.symbol} 的限价委托指令`);
};

const stopCopyTrading = (order) => {
  order.category = 'STOPPED';
  store.triggerToast(`ℹ️ 已成功向节点下达撤标指令，停止对优秀带单员 ${order.trader} 的保险期跟单对冲`);
};

const closeContractPosition = (pos) => {
  contractPositions.value = contractPositions.value.filter(p => p.id !== pos.id);
  contractStats.positionsCount = contractPositions.value.length;
  // Reduce PNL to simulate outcome
  contractStats.unrealizedPnl -= pos.pnl;
  contractStats.realizedPnl += pos.pnl;
  store.triggerToast(`🔥 对 ${pos.symbol} ${pos.mode} 持仓平仓对冲已执行，结算释放准备金: ${(pos.pnl + 500).toFixed(2)} USDT`);
};

const triggerTpSlModal = (pos) => {
  store.triggerToast(`🎯 针对 ${pos.symbol} 的条件止盈 [Take Profit] 与防爆止损 [Stop Loss] 参数同步设置成功`);
};

// Nickname modification
const saveNickname = () => {
  if (!editNicknameValue.value.trim()) return;
  userNickname.value = editNicknameValue.value.trim();
  localStorage.setItem('lseg_nickname', userNickname.value);
  isEditingNickname.value = false;
  store.triggerToast(`个人昵称修改成功，已由联合数字保理节点核定为: ${userNickname.value}`);
};

// KYC Simulation Actions
const simulateFileUpload = (field) => {
  uploadProgress[field] = 5;
  const interval = setInterval(() => {
    if (uploadProgress[field] >= 100) {
      clearInterval(interval);
      kycForm[field + 'Photo'] = `https://img-reg-ab.imagency.cn/mock_kyc_${field}.png`;
      store.triggerToast(`文件已临时安全读入并由LSEG端对端网络加密哈希上传。`);
    } else {
      uploadProgress[field] += 25;
    }
  }, 120);
};

const submitKycForm = () => {
  if (!kycForm.name || !kycForm.docId) {
    store.triggerToast("⚠️ 请完整填写您的真实姓名及证件号，以便完成英国FCA与联合AML节点核算。");
    return;
  }
  kycStatus.value = 'PENDING';
  localStorage.setItem('lseg_kyc_status', 'PENDING');
  store.triggerToast("📥 您的身份信息与审核要件已全额封包并递交至伦敦联合合规中心核算，预计在 5-10 分钟内完成终核！");
};

const approveKycSimulated = () => {
  kycStatus.value = 'VERIFIED';
  localStorage.setItem('lseg_kyc_status', 'VERIFIED');
  store.triggerToast("👑 [模拟成功] 恭喜您，已获得英国 FCA 联合审计核对通过，当前账号状态已升级为：已实名认证！");
};

const resetKycSimulated = () => {
  kycStatus.value = 'UNVERIFIED';
  localStorage.setItem('lseg_kyc_status', 'UNVERIFIED');
  kycForm.name = '';
  kycForm.docId = '';
  kycForm.frontPhoto = null;
  kycForm.backPhoto = null;
  kycForm.handPhoto = null;
  store.triggerToast("🔄 模拟状态重置：已返回至“未认证”初始状态。");
};

// Password management simulator
const changePassword = () => {
  if (!pwForm.oldPw || !pwForm.newPw || !pwForm.confirmPw) {
    store.triggerToast("⚠️ 请输入完整的三项密码校验数值");
    return;
  }
  if (pwForm.newPw !== pwForm.confirmPw) {
    store.triggerToast("⚠️ 两次输入的新密码必须保持一致！");
    return;
  }
  showPwModal.value = false;
  pwForm.oldPw = '';
  pwForm.newPw = '';
  pwForm.confirmPw = '';
  store.triggerToast("🔒 会员账户重叠授权密码重设成功！已通过加密防破解哈希同步到安全账本。");
};

// Google Auth MFA Simulator
const submitOtpSetting = () => {
  if (!otpCodeInput.value || otpCodeInput.value.length < 6) {
    store.triggerToast("⚠️ 请填入双重身份验证器显示屏中的 6 位核对特征码");
    return;
  }
  otpAuthEnabled.value = !otpAuthEnabled.value;
  localStorage.setItem('lseg_otp_enabled', otpAuthEnabled.value ? 'true' : 'false');
  showOtpModal.value = false;
  otpCodeInput.value = '';
  store.triggerToast(otpAuthEnabled.value ? "✅ 谷歌双重核准器绑定成功！后续敏感操作将进行实时动态提权" : "ℹ️ 谷歌多因素动态二次特权审核已关闭");
};

// Help Center QA State
const qaSearch = ref('');
const openedQaNode = ref(null);
const allQAList = [
  { q: '如何进行快捷提现？', a: '您可以进入“我的奖励”或直接点击系统右上角的“钱包”。选择您要提取的资产种类并填入正确的收款地址即可。所有的提纯流程均经由审计，速度在 1-10 分钟内。' },
  { q: '实名认证需要多久通过审核？', a: '提交完个人信息和必要证件后，符合金融行为监管局（FCA）合规核准流程的认证将在 5 至 10 分钟内由联合节点完成全自动加密交叉印证并核发，核验后即可开启全部权益。' },
  { q: '什么是保险期跟单规则？', a: '这是LSEG独家提供的对冲对开保本交易结构。当您选择相应的带单老师跟单并购买相应的保险包后，若在期限内发生亏损，系统特约的补偿对冲保险池将全额理赔，确保您的本金安全。' },
  { q: '充值为什么没有即刻到账？', a: '数字币链上交易需受到底层分布式网络的矿工节点爆块确认阻尼限制。标准确认数通常为 1-2 个，平均 2-3 分钟。若超出半小时还未到账，可以在“联系客服”区块递交电子凭单查询。' },
  { q: '合约仓位的强平机制是什么？', a: '在合约多倍杠杆买入/卖出中，当资产负向拨动触发强平红线价（Liquidation Price）时，为保护整体清退账户，系统将会接管资产并从撮合节点强平，请务必关注您的保证金维持比例。' }
];
const filteredQAs = computed(() => {
  if (!qaSearch.value.trim()) return allQAList;
  return allQAList.filter(item => item.q.includes(qaSearch.value) || item.a.includes(qaSearch.value));
});

// Unified standard number format
const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number') return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const handleLogout = () => {
  store.isLoggedIn = false;
  store.userInfo = null;
  localStorage.removeItem('is_logged_in');
  localStorage.removeItem('user_info');
  store.triggerToast('🔒 您已安全退出 LSEG 托管合规系统。');
  router.push('/');
};
</script>
