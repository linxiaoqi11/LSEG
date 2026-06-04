<template>
  <div class="min-h-screen bg-[#F4F6F5] flex flex-col font-sans text-[#1E293B]">
    <!-- Navbar (PC and Mobile) -->
    <Navbar />

    <!-- Main Container -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Global Footer -->
    <Footer 
      v-if="$route.path !== '/login' && $route.path !== '/register'" 
      :class="{ 'no-margin-footer': $route.path && ($route.path.startsWith('/download') || $route.path === '/') }" 
    />

    <!-- ==================== DEPOSIT MODAL CO-ORDINATOR ==================== -->
    <div class="modal-overlay" :class="{ show: store.depositModalOpen }">
      <div class="modal-window">
        <div class="modal-header-row">
          <h3 class="modal-header-title">
            <svg style="width:16px;height:16px" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a12.002 12.002 0 00-3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            实体资本承扣核保充值申报
          </h3>
          <button class="modal-header-close" @click="store.closeDepositModal">
            <svg style="width:16px;height:16px" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="ctrl-grp">
          <label class="ctrl-lbl">选择承保支付区块链协议</label>
          <div class="modal-network-grid">
            <button class="btn-net-opt" :class="{ selected: depositNetwork === 'TRC20' }" @click="depositNetwork = 'TRC20'">TRC20 (波场代兑)</button>
            <button class="btn-net-opt" :class="{ selected: depositNetwork === 'ERC20' }" @click="depositNetwork = 'ERC20'">ERC20 (以太坊保障)</button>
          </div>
        </div>

        <div class="ctrl-grp">
          <label class="ctrl-lbl">受托托管收金专属实体簿记地址</label>
          <div class="modal-address-block">
            <span class="modal-address-str">{{ modalAddress }}</span>
            <button class="btn-copy-address" @click="copyAddress">复制</button>
          </div>
          <p style="font-size:8.5px; color:var(--color-red-accent); font-weight:700; margin-top:2px;">⚠️ 务请充入核定等值 USDT 结算。差错或错链申报资本自负理赔外部责任</p>
        </div>

        <div class="ctrl-grp">
          <label class="ctrl-lbl">拟申报存入承保数数额 (USDT)</label>
          <div class="modal-amt-box">
            <input type="number" class="modal-amt-input" v-model="depositAmount" placeholder="请输入向物理托管行汇出完成的总数值" />
            <span class="modal-amt-suffix">USDT</span>
          </div>
        </div>

        <div class="modal-disclosure">
          本申报直接穿透联动受托托付行（LSEG保备池）。链上节点达成3个验证后，系统即刻承审充值下账，并自动将该笔资金计入保本资产安全范围。
        </div>

        <button class="btn-submit-deposit" @click="executeDeposit">我已物理汇出，向托管簿记申报</button>
      </div>
    </div>

    <!-- ==================== TOAST PORT MANAGER ==================== -->
    <div class="toast-box">
      <div v-for="toast in store.toasts" :key="toast.id" class="toast-bubble active">
        <div class="toast-icon">✓</div>
        <div class="toast-body">
          <div class="toast-title">系统审计反馈</div>
          <div class="toast-desc">{{ toast.msg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from './store';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const depositNetwork = ref('TRC20');
const depositAmount = ref('');

const modalAddress = computed(() => {
  return depositNetwork.value === 'TRC20' 
    ? 'TYu8G9gHJH86F3d98hJD8Gsdh978yHfdks' 
    : '0x9E3Fdb88b64D348873Fe6493baa53dd9';
});

const copyAddress = () => {
  navigator.clipboard.writeText(modalAddress.value);
  store.triggerToast('托管收金簿记物理账本地址复制成功：' + modalAddress.value);
};

const executeDeposit = () => {
  const amt = parseFloat(depositAmount.value);
  if (isNaN(amt) || amt <= 0) {
    store.triggerToast('⚠️ 请输入正确的实体承兑申报有效数值。');
    return;
  }
  
  // Update state!
  store.balances.funding = Number((store.balances.funding + amt).toFixed(2));
  
  // Append audit ledger!
  const record = {
    id: 'TX' + Math.floor(Math.random() * 900000 + 100000),
    time: new Date().toLocaleTimeString(),
    action: `物理承兑 ${depositNetwork.value}`,
    path: `LSEG保备池[链上审计: ${depositNetwork.value}]`,
    amount: amt,
    type: 'CONFIRMED'
  };
  store.ledger.unshift(record);
  
  store.triggerToast(`申报充值完成！受审资本汇入成功，$${amt.toLocaleString()} USDT 已经登记在册且锁定托管通道。`);
  store.closeDepositModal();
  depositAmount.value = '';
};
</script>

<style>
/* Vue Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
