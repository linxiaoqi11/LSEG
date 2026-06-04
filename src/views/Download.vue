<template>
  <div class="views-download-container bg-white font-sans antialiased text-slate-700 min-h-[calc(100vh-120px)] py-10 md:py-16 px-6 md:px-12 flex items-center justify-center relative overflow-hidden animate-fade-in">
    
    <!-- Subtle background brand accent flare -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-120 h-120 bg-gradient-to-tl from-[#E2F0E7]/60 to-transparent rounded-full pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl w-full mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- ==================== LEFT SIDE: COPY, QR CODE & BUTTONS ==================== -->
        <div class="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#1B5831] px-3.5 py-1.5 rounded-full text-xs font-extrabold w-fit mb-6 shadow-sm">
            <i class="fa-solid fa-mobile-screen"></i>
            <span>LSEG MOBILE TERMINAL</span>
          </div>
          
          <!-- Heading -->
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            随时随地，便捷交易
          </h1>
          
          <!-- Subtitle / Intro -->
          <p class="text-sm md:text-base text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
            提供比肩桌面端的全球高速交易 network 和多资产隔离理赔保障。配备极速行情、自适应套期图表及物理套保契合审计跟踪，帮助您在任何时间、任何地点锁定风险并获取成长收益。
          </p>
          
          <!-- Download Options Area -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-10">
            
            <!-- QR Code Section -->
            <div class="flex flex-col items-center sm:items-start flex-shrink-0">
              <div class="p-3 bg-white border border-slate-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-36 h-36 flex items-center justify-center">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/6579de7425c1fd7699d8e93d30c8fb31.jpg" 
                  class="w-full h-full object-contain rounded-lg" 
                  alt="Download QR" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span class="text-xs font-bold text-slate-400 mt-2.5 tracking-wider">扫一扫，下载官方手机APP</span>
            </div>
            
            <!-- Divider on desktop/tablet, spacing on mobile -->
            <div class="hidden sm:block h-28 w-[1px] bg-slate-100"></div>
            
            <!-- OS Downloads Buttons Stack -->
            <div class="flex flex-col gap-4 w-full sm:w-[220px]">
              
              <!-- App Store Trigger Button -->
              <a 
                href="javascript:void(0)" 
                @click="store.triggerToast('正在检测 iOS 设备 network 状态，为您为您安全调配托管分发证书并启动安装机制...')" 
                class="flex items-center gap-3.5 bg-slate-900 hover:bg-emerald-950 text-white rounded-xl px-5 py-3.5 transition-all duration-250 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-emerald-900/10 no-underline cursor-pointer group"
              >
                <i class="fa-brands fa-apple text-[28px] text-white group-hover:text-emerald-400 transition-colors"></i>
                <div class="text-left select-none">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Download on the</div>
                  <div class="text-[16px] font-extrabold leading-none font-sans">App Store</div>
                </div>
              </a>
              
              <!-- Google Play Trigger Button -->
              <a 
                href="javascript:void(0)" 
                @click="store.triggerToast('正在为您的 Android 设备请求私有化信托传输，下载 LSEG 极速专线 APK 安装包...')" 
                class="flex items-center gap-3.5 bg-slate-900 hover:bg-emerald-950 text-white rounded-xl px-5 py-3.5 transition-all duration-250 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-emerald-900/10 no-underline cursor-pointer group"
              >
                <i class="fa-brands fa-google-play text-[24px] text-white group-hover:text-emerald-400 transition-colors"></i>
                <div class="text-left select-none">
                  <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Get it on</div>
                  <div class="text-[16px] font-extrabold leading-none font-sans">Google Play</div>
                </div>
              </a>
              
            </div>
          </div>
          
        </div>
        
        <!-- ==================== RIGHT SIDE: LAPTOP & PHONE IMAGE ==================== -->
        <div class="lg:col-span-5 flex items-center justify-center relative order-1 lg:order-2">
          <!-- Backing soft glow effect -->
          <div class="absolute w-[360px] h-[360px] bg-gradient-to-tr from-emerald-500/10 to-[#5BE395]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          
          <!-- Image matching the visual in Index.vue (laptop + phone mockup) but scaled up 1.5x on desktop and optimized for mobile -->
          <img 
            src="https://img-reg-ab.imagency.cn/e/072c4342e6ede753b3c6a049ee9d1612.png" 
            class="w-full max-w-[320px] md:max-w-[420px] lg:max-w-full h-auto object-contain relative z-10 transition-all duration-700 scale-100 lg:scale-[1.5] lg:translate-x-8 hover:scale-[1.03] lg:hover:scale-[1.55] drop-shadow-2xl origin-center" 
            alt="LSEG App Mockups" 
            referrerPolicy="no-referrer"
          />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store';
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
