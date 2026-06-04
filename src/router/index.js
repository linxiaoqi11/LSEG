import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Affiliate from '../views/Affiliate.vue';
import Contract from '../views/Contract.vue';
import Copy from '../views/Copy.vue';
import Markets from '../views/Markets.vue';
import Spot from '../views/Spot.vue';
import Wallet from '../views/Wallet.vue';
import Download from '../views/Download.vue';
import NewsList from '../views/NewsList.vue';
import NewsDetail from '../views/NewsDetail.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: Index, name: 'home' },
  { path: '/index', component: Index },
  { path: '/index.html', component: Index },
  
  { path: '/login', component: Login, name: 'login' },
  { path: '/login.html', component: Login },
  { path: '/register', component: Register, name: 'register' },
  { path: '/register.html', component: Register },
  
  { path: '/affiliate', component: Affiliate, name: 'affiliate' },
  { path: '/affiliate.html', component: Affiliate },
  
  { path: '/contract', component: Contract, name: 'contract' },
  { path: '/contract.html', component: Contract },
  
  { path: '/copy', component: Copy, name: 'copy' },
  { path: '/copy.html', component: Copy },
  
  { path: '/markets', component: Markets, name: 'markets' },
  { path: '/markets.html', component: Markets },
  
  { path: '/spot', component: Spot, name: 'spot' },
  { path: '/spot.html', component: Spot },
  
  { path: '/wallet', component: Wallet, name: 'wallet' },
  { path: '/wallet.html', component: Wallet },

  { path: '/download', component: Download, name: 'download' },
  { path: '/download.html', component: Download },

  { path: '/news', component: NewsList, name: 'news-list' },
  { path: '/news.html', component: NewsList },
  { path: '/news/:id', component: NewsDetail, name: 'news-detail' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
