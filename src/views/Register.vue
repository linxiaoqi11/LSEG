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
      <div class="col-span-12 md:col-span-6 flex justify-center animate-fade-in">
        <div class="bg-white rounded-[8px] shadow-2xl w-full max-w-md p-6 md:p-8 flex flex-col justify-between" style="min-height: 600px;">
          <!-- Card Body -->
          <div>
            <!-- Header section -->
            <div class="mb-5">
              <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight" style="color: var(--text-primary);">
                欢迎注册 LSEG 会员
              </h2>
              <p class="text-xs text-slate-400 font-medium mt-1">
                完成核审，创建专享对冲工具保本储备账户即可尊享全天候托付保障
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleRegister" class="space-y-4">
              <!-- Username -->
              <div>
                <div class="flex items-center gap-2.5 px-3.5 py-3 rounded-[8px] border bg-[#F8FAFC] border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                  <i class="fa-solid fa-user text-slate-400 text-sm shrink-0 w-4 text-center"></i>
                  <span class="text-xs font-bold text-slate-500 select-none whitespace-nowrap">用户名</span>
                  <span class="text-slate-300 select-none">|</span>
                  <input 
                    type="text" 
                    v-model="username" 
                    required
                    placeholder="请输入用户名" 
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-800 font-bold text-sm p-0 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <!-- Phone/Email -->
              <div>
                <div class="flex items-center gap-2.5 px-3.5 py-3 rounded-[8px] border bg-[#F8FAFC] border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                  <i class="fa-solid fa-envelope text-slate-400 text-sm shrink-0 w-4 text-center"></i>
                  <span class="text-xs font-bold text-slate-500 select-none whitespace-nowrap">手机/邮箱</span>
                  <span class="text-slate-300 select-none">|</span>
                  <input 
                    type="text" 
                    v-model="emailOrPhone" 
                    required
                    placeholder="请输入手机号或邮箱" 
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-800 font-bold text-sm p-0 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <!-- Verification Code -->
              <div>
                <div class="flex items-center gap-2.5 px-3.5 py-3 rounded-[8px] border bg-[#F8FAFC] border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                  <i class="fa-solid fa-shield-halved text-slate-400 text-sm shrink-0 w-4 text-center"></i>
                  <span class="text-xs font-bold text-slate-500 select-none whitespace-nowrap">验证码</span>
                  <span class="text-slate-300 select-none">|</span>
                  <input 
                    type="text" 
                    v-model="smsCode" 
                    required
                    placeholder="请输入验证码" 
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-800 font-bold text-sm p-0 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    @click="sendVerificationCode"
                    class="border-none bg-transparent hover:opacity-80 text-xs md:text-sm font-black transition-all cursor-pointer select-none px-2 shrink-0 self-center flex items-center justify-center focus:outline-none whitespace-nowrap"
                    style="color: var(--color-green-brand); min-height: 24px; line-height: 1;"
                  >
                    {{ codeCooldown > 0 ? `${codeCooldown}秒后重新获取` : '获取验证码' }}
                  </button>
                </div>
              </div>

              <!-- Set Password -->
              <div>
                <div class="flex items-center gap-2.5 px-3.5 py-3 rounded-[8px] border bg-[#F8FAFC] border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                  <i class="fa-solid fa-lock text-slate-400 text-sm shrink-0 w-4 text-center"></i>
                  <span class="text-xs font-bold text-slate-500 select-none whitespace-nowrap">设置密码</span>
                  <span class="text-slate-300 select-none">|</span>
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    v-model="password" 
                    required
                    placeholder="设置您的密码" 
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-800 font-bold text-sm p-0 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword" 
                    class="border-none bg-transparent hover:text-slate-600 text-slate-400 cursor-pointer p-0 select-none focus:outline-none focus:ring-0 animate-none"
                  >
                    <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="text-sm"></i>
                  </button>
                </div>
              </div>

              <!-- Confirm Password -->
              <div>
                <div class="flex items-center gap-2.5 px-3.5 py-3 rounded-[8px] border bg-[#F8FAFC] border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                  <i class="fa-solid fa-arrows-rotate text-slate-400 text-sm shrink-0 w-4 text-center"></i>
                  <span class="text-xs font-bold text-slate-500 select-none whitespace-nowrap">确认密码</span>
                  <span class="text-slate-300 select-none">|</span>
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    v-model="confirmPassword" 
                    required
                    placeholder="再次输入密码" 
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-800 font-bold text-sm p-0 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <!-- Invite Code -->
              <div>
                <div class="flex items-center gap-2.5 px-3.5 py-3 rounded-[8px] border bg-[#F8FAFC] border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                  <i class="fa-solid fa-key text-slate-400 text-sm shrink-0 w-4 text-center"></i>
                  <span class="text-xs font-bold text-slate-500 select-none whitespace-nowrap">邀请码</span>
                  <span class="text-slate-300 select-none">|</span>
                  <input 
                    type="text" 
                    v-model="inviteCode" 
                    placeholder="输入邀请码 (选填)" 
                    class="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-800 font-bold text-sm p-0 placeholder-slate-400 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full text-white font-black text-sm py-3.5 rounded-[8px] tracking-wider cursor-pointer active:scale-[0.99] transition-all flex items-center justify-center shadow-md shadow-emerald-955/10 hover:shadow-lg mt-2 focus:outline-none"
                style="background-color: var(--color-green-brand);"
              >
                立即注册
              </button>
            </form>

            <!-- Navigation Redirect -->
            <div class="text-center mt-5">
              <span class="text-sm text-slate-400 font-bold">已有账号？ </span>
              <router-link 
                to="/login" 
                class="text-sm font-black no-underline hover:underline transition-all"
                style="color: var(--color-green-brand);"
              >
                去登录
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store';

const router = useRouter();

const username = ref('');
const emailOrPhone = ref('');
const smsCode = ref('');
const password = ref('');
const confirmPassword = ref('');
const inviteCode = ref(store.referralUsed || 'LSEG_992W');
const showPassword = ref(false);

const codeCooldown = ref(0);
let timerId = null;

const sendVerificationCode = () => {
  if (codeCooldown.value > 0) return;
  
  if (!emailOrPhone.value.trim()) {
    store.triggerToast('⚠️ 请先填写您的手机号或邮箱！');
    return;
  }
  
  // Generate random 4-char OTP for simulation completeness
  const generatedCode = Math.floor(Math.random() * 9000 + 1000).toString();
  codeCooldown.value = 60;
  
  timerId = setInterval(() => {
    codeCooldown.value--;
    if (codeCooldown.value <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
  
  store.triggerToast(`🔒 [验证码发送成功] 动态主链校验码：${generatedCode}，请注意查收。`);
  // Prefill for convenience in sandboxes
  smsCode.value = generatedCode;
};

const handleRegister = () => {
  if (!username.value.trim() || !emailOrPhone.value.trim() || !password.value.trim() || !smsCode.value.trim()) {
    store.triggerToast('⚠️ 请完整输入所有必需的核审注册项。');
    return;
  }

  if (password.value !== confirmPassword.value) {
    store.triggerToast('⚠️ 两次填写的登陆密码不一致，请仔细核对。');
    return;
  }

  // Set logged in state to facilitate immediate access!
  store.isLoggedIn = true;
  store.userInfo = {
    userId: 'LSEG_' + Math.floor(Math.random() * 900000 + 100000),
    username: username.value.trim(),
    email: emailOrPhone.value.trim().includes('@') ? emailOrPhone.value.trim() : `${username.value.trim()}@lseg-user.co.uk`
  };

  // Sync to physical storage
  localStorage.setItem('is_logged_in', 'true');
  localStorage.setItem('user_info', JSON.stringify(store.userInfo));

  store.triggerToast(`🎉 注册成功！由于智能匹配法则，我们已自动为您配发专用用户ID：${store.userInfo.userId}，且为您实现全线登录保护。`);
  
  // Route to index
  router.push('/');
};

onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<style scoped>
/* Scoped overrides matching original aesthetic design definitions */
input::placeholder {
  font-weight: 500;
}
</style>
