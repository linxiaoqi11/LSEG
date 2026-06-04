<template>
  <div 
    class="min-h-screen flex items-center justify-center py-8 px-4 md:py-16 relative bg-cover bg-center bg-no-repeat"
    style="background-image: url('https://img-reg-ab.imagency.cn/e/580e8f2ed0c60db692b78b0a3e04e7e0.png');"
  >
    <!-- Floating Back Button on topmost layer -->
    <router-link 
      to="/" 
      class="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors no-underline shadow-lg backdrop-blur-sm"
      title="返回首页"
    >
      <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </router-link>

    <!-- Content Layout Grid -->
    <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
      
      <!-- LEFT COLUMN: Image display as requested -->
      <div class="col-span-12 md:col-span-6 flex justify-center items-center">
        <div class="w-full max-w-md rounded-[8px] overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <img 
            src="https://img-reg-ab.imagency.cn/e/c84013bdf99c920e084ce3ccad1c4b22.png" 
            alt="LSEG Brand Seal Image" 
            class="w-full h-auto object-contain select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <!-- RIGHT COLUMN: Card Component with user inputs -->
      <div class="col-span-12 md:col-span-6 flex justify-center">
        <div class="bg-white rounded-[8px] shadow-2xl w-full max-w-md p-6 md:p-10 flex flex-col justify-between" style="min-height: 520px;">
          <!-- Card Body -->
          <div>
            <!-- Header section -->
            <div class="mb-6">
              <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight" style="color: var(--text-primary);">
                账户登录
              </h2>
              <p class="text-xs text-slate-400 font-medium mt-1">
                通过大宗双多签节点密钥链路，全天候保障金融承兑套保安全
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              <!-- User ID Input Field -->
              <div 
                class="border transition-all duration-150 p-3.5 rounded-[8px] bg-[#F8FAFC] focus-within:bg-white group focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-50"
                style="border-color: #E2E8F0;"
              >
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 select-none">
                  用户 ID
                </label>
                <input 
                  type="text" 
                  v-model="userId"
                  required
                  placeholder="请输入您的 LSEG 官方用户 ID" 
                  class="w-full border-none outline-none text-slate-800 font-extrabold text-[14px] p-0 placeholder-slate-400 bg-transparent focus:ring-0 focus:outline-none"
                />
              </div>

              <!-- Password Input Field -->
              <div class="space-y-1.5">
                <div 
                  class="border transition-all duration-150 p-3.5 rounded-[8px] bg-[#F8FAFC] focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-50"
                  style="border-color: #E2E8F0;"
                >
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 select-none">
                    密码
                  </label>
                  <div class="flex items-center justify-between">
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      v-model="password"
                      required
                      placeholder="请输入您的安全访问密码" 
                      class="w-full border-none outline-none text-slate-800 font-extrabold text-[14px] p-0 placeholder-slate-400 bg-transparent focus:ring-0 focus:outline-none"
                    />
                    <button 
                      type="button" 
                      @click="showPassword = !showPassword" 
                      class="border-none bg-transparent hover:text-slate-600 focus:outline-none text-slate-400 cursor-pointer px-1 flex items-center justify-center transition-colors animate-none"
                    >
                      <i 
                        :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" 
                        class="text-sm"
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="flex justify-end pr-1">
                  <router-link 
                    to="/affiliate" 
                    class="text-xs font-black no-underline hover:underline transition-colors"
                    style="color: var(--color-green-brand);"
                  >
                    忘记密码？
                  </router-link>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full text-white font-black text-base py-3.5 rounded-[8px] tracking-wider cursor-pointer active:scale-[0.99] transition-all flex items-center justify-center shadow-md shadow-emerald-990/10 hover:shadow-lg focus:outline-none"
                style="background-color: var(--color-green-brand);"
              >
                登 录
              </button>
            </form>

            <!-- Navigation Redirect -->
            <div class="text-center mt-6">
              <span class="text-sm text-slate-400 font-bold">没有账号？ </span>
              <router-link 
                to="/register" 
                class="text-sm font-black no-underline hover:underline transition-all"
                style="color: var(--color-green-brand);"
              >
                去注册
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store';

const router = useRouter();

const userId = ref('LSEG-ADMIN-92');
const password = ref('******');
const showPassword = ref(false);

const handleLogin = () => {
  if (!userId.value.trim() || !password.value.trim()) {
    store.triggerToast('⚠️ 请填写完整的安全账户登录凭证。');
    return;
  }

  // Set logged in detail in reactive state to represent realistic authentication flows
  store.isLoggedIn = true;
  store.userInfo = {
    userId: userId.value.trim(),
    username: userId.value.includes('ADMIN') ? '大宗审计合规代表' : '受托托管节点客户',
    email: userId.value.toLowerCase().includes('@') ? userId.value.trim() : `${userId.value.trim()}@lseg-audit.co.uk`
  };

  // Sync with localForage/localStorage
  localStorage.setItem('is_logged_in', 'true');
  localStorage.setItem('user_info', JSON.stringify(store.userInfo));

  store.triggerToast(`🎉 欢迎回来，[${store.userInfo.username}]！登录主链托管系统成功，双因多签保护已全面启用。`);
  
  // Transition safely back to dashboard/home page
  router.push('/');
};
</script>

<style scoped>
/* Scoped custom styling overrides to match original application aesthetic */
.group:focus-within {
  border-color: var(--color-green-brand) !important;
}
</style>
