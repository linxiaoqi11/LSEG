import { reactive, watch } from 'vue';

const DEFAULT_BALANCES = {
  funding: 36701.78,
  trade: 953.49,
  futures: 582.64,
  insurance: 6493.70
};

const DEFAULT_COINS = [
  { code: "BTC", sfx: "USD", name: "比特币", price: 36701.78, change: -6.28, vol: "20.65亿", type: "main", insurance: true },
  { code: "ETH", sfx: "USD", name: "以太坊", price: 2629.70, change: 8.12, vol: "7.65亿", type: "main", insurance: true },
  { code: "DOGE", sfx: "USD", name: "狗狗币", price: 0.1624, change: 3.45, vol: "5.2亿", type: "sub" },
  { code: "SOL", sfx: "USD", name: "Solana", price: 142.80, change: -2.14, vol: "4.88亿", type: "sub" },
  { code: "XRP", sfx: "USD", name: "瑞波币", price: 0.5180, change: -0.92, vol: "3.75亿", type: "sub" },
  { code: "LC", sfx: "USD", name: "LC 代币", price: 175.76, change: -10.01, vol: "3.22亿", type: "main", insurance: true },
  { code: "ADA", sfx: "USD", name: "卡尔达诺", price: 0.4420, change: 1.80, vol: "2.1亿", type: "sub" },
  { code: "0x", sfx: "USD", name: "0x Protocol", price: 1.07, change: -10.75, vol: "1.58亿", type: "sub" },
  { code: "DOT", sfx: "USD", name: "波卡", price: 6.82, change: -4.30, vol: "1.44亿", type: "sub" },
  { code: "BAT", sfx: "USD", name: "基本注意力", price: 0.75, change: 10.35, vol: "1.02亿", type: "sub" },
  { code: "UNI", sfx: "USD", name: "Uniswap", price: 7.24, change: 5.62, vol: "9820万", type: "sub" },
  { code: "AVAX", sfx: "USD", name: "雪崩协议", price: 34.90, change: -1.55, vol: "8920万", type: "sub" },
  { code: "MANA", sfx: "USD", name: "Decentraland", price: 0.81, change: -11.48, vol: "7552万", type: "sub" },
  { code: "KNC", sfx: "USD", name: "Kyber Network", price: 2.18, change: -13.81, vol: "7410万", type: "sub" },
  { code: "LINK", sfx: "USD", name: "Chainlink", price: 28.48, change: 11.74, vol: "6450万", type: "sub" },
  { code: "MATIC", sfx: "USD", name: "Polygon", price: 0.6820, change: 2.38, vol: "6150万", type: "sub" },
  { code: "OXU", sfx: "USD", name: "OXU Token", price: 1.07, change: 10.75, vol: "4820万", type: "sub" },
  { code: "FIL", sfx: "USD", name: "文件币", price: 4.28, change: -7.20, vol: "3340万", type: "sub" },
  { code: "SOLAR", sfx: "RWA", name: "分布式太阳能池指数", price: 1.85, change: 5.62, vol: "4284万", type: "rwa" },
  { code: "WIND", sfx: "RWA", name: "风电发电对冲合约", price: 0.925, change: -0.45, vol: "1592万", type: "rwa" }
];

const loadCoins = () => {
  const stored = localStorage.getItem('lseg_coins');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // If our coins count doesn't match the new total pool, overwrite to populate fully
      if (parsed.length < DEFAULT_COINS.length) {
        return DEFAULT_COINS;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_COINS;
    }
  }
  return DEFAULT_COINS;
};

const DEFAULT_HOLDINGS = {
  SPOT: {
    USDT: 5400.000000,
    BTC: 0.06485400,
    LC: 20.000000,
    ETH: 1.18400000,
    LINK: 30.000000,
    MANA: 120.000000
  },
  FUTURES: {
    USDT: 3000.000000,
    BTC: 0.03000000,
    LC: 10.800000,
    ETH: 0.60000000,
    LINK: 20.000000,
    MANA: 100.000000
  },
  INSURANCE: {
    USDT: 4000.000000,
    BTC: 0.03000000,
    LC: 15.000000,
    ETH: 0.80000000,
    LINK: 30.000000,
    MANA: 100.000050
  }
};

export const store = reactive({
  isLoggedIn: localStorage.getItem('is_logged_in') === 'true',
  userInfo: JSON.parse(localStorage.getItem('user_info')) || null,
  balances: JSON.parse(localStorage.getItem('lseg_balances')) || DEFAULT_BALANCES,
  coins: loadCoins(),
  holdings: JSON.parse(localStorage.getItem('lseg_assets_holdings')) || DEFAULT_HOLDINGS,
  positions: JSON.parse(localStorage.getItem('lseg_positions')) || [],
  follows: JSON.parse(localStorage.getItem('lseg_follows')) || [],
  orders: JSON.parse(localStorage.getItem('lseg_orders')) || [],
  ledger: JSON.parse(localStorage.getItem('lseg_ledger')) || [],
  insurancePurchases: JSON.parse(localStorage.getItem('lseg_insurance_purchases')) || [],
  
  news: [
    {
      id: "1",
      title: "英国伦敦证券交易所大宗碳配对冲保额核保额度调增公告",
      meta: "置顶 • LSEG官方公告部 • 10分钟前",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop",
      bannerImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      author: "LSEG官方公告部",
      time: "2026-06-03 20:33",
      views: 3842,
      category: "官方公告",
      summary: "为满足全球跨国实体企业在低碳转型过程中日益增长的前置风险对冲需求，以及应对近期国际碳汇信用配额市场发生的剧烈波动，核审调整高额核保配额安排。",
      content: `
        <p>为满足全球跨国实体企业在低碳转型过程中日益增长的前置风险对冲需求，以及应对近期国际碳汇信用配额市场发生的剧烈波动，经英国伦敦证券交易所集团（LSEG）核保委员会与绿色发展共同信托组织（GDCT）联合审议通过，正式发布本期大宗碳信用配对冲保额核保额度调增公告。</p>
        
        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">一、额度调增背景</h3>
        <p class="leading-relaxed mb-4">自2026年第二季度以来，全球主要合规碳市场（包括欧盟ETS、英国UK-ETS及国际自愿减排机制）的现货及远期衍生品交易规模创下历史新高。许多持有中长期碳信用资产的跨国能源企业、制造业集团面临着较大的估值对冲压力。为平抑由于地缘政策调整及配额总量缩紧带来的单边流动性波动风险，本基金池决定追加流动性储备，提供更充足的核保兜底支持。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">二、具体调增方案</h3>
        <ul class="list-disc pl-5 space-y-2 mb-4 leading-relaxed">
          <li><strong>首期保额追加：</strong>官方托管保备池将直接注入 <strong class="text-emerald-600 font-mono">120,000,000 USDT</strong> 作为额外信用兜底缓冲金。</li>
          <li><strong>单笔申报限额度：</strong>大型实体机构的单笔高额核保保单上限由先前的 5,000,000 USDT 阶段性调增至 <strong class="text-emerald-600 font-mono">12,500,000 USDT</strong>。</li>
          <li><strong>保护性杠杆参数：</strong>对于通过物理托管绿色碳凭证开展的防震荡套期保值交易，结算系数由 0.85 提高到 <strong class="text-emerald-600 font-mono">0.92</strong>，全方位向合规实体提供费率倾斜。</li>
        </ul>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">三、风险兜底与结算机制</h3>
        <p class="leading-relaxed mb-4">本次追加的核心备兑额度全部由英国大宗托付行（UK Clearing House）实施第三方闭环托管。当智能合约执行到预设波动对冲点位时，核保清算金将通过专属高速侧链通道在3个区块确认内，无缝划转至实体投资方的注册资产账户。全流程实行严格的实体链上双重审计，保障资金的透明性与刚性兑付性。</p>

        <p class="mt-8 text-sm text-slate-500 text-right leading-loose">
          <strong>英国伦敦证券交易所集团核保结算部</strong><br/>
          <strong>绿色发展共同信托委员会</strong><br/>
          <span class="font-mono text-xs">2026年6月3日</span>
        </p>
      `
    },
    {
      id: "2",
      title: "实体风能承兑联署行签批！离岸第一对冲保护池规则重审通过",
      meta: "置顶 • 托管信托委员会 • 25分钟前",
      img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=150&auto=format&fit=crop",
      bannerImg: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
      author: "托管信托委员会",
      time: "2026-06-03 20:18",
      views: 2951,
      category: "行业信托",
      summary: "七家跨国承兑联署行联合会签批复，第一期实体风能衍生品承兑保本方案正式生效，并完成了对该信托对冲基金资产安全及多签名授权合约的审计工作。",
      content: `
        <p>今日，离岸绿色金融创新保护池第一信托机制迎来重大政策利好：经七家跨国承兑联署行联合会签批复，第一期实体风能衍生品承兑保本方案正式生效。同时，托管信托委员会完成了对《离岸第一对冲保护池清算与多方确认规则》的年度重审工作，全票获得通过。</p>
        
        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">一、主要会签联署行</h3>
        <p class="leading-relaxed mb-4">本次联合签批的金融机构包括但不限于：巴克莱离岸信托部、苏格兰皇家绿色结算银行、远东绿色投融资合作社及托管信托清算行。联署行的集体签批标志着在岸高污染替代资产到离岸稳定套保体系的物理通路已获得全面的信用背书。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">二、重审通过的核心规则</h3>
        <ul class="list-disc pl-5 space-y-2 mb-4 leading-relaxed">
          <li><strong>多签托管执行（Multi-Sig Custody）：</strong>对冲保护池资金支出全面引入 4-of-7 多重签名机制。任何大额划发必须获得至少四家联署行的链上密钥共同授权，彻底杜绝单边道德风险。</li>
          <li><strong>气候因子流动机制：</strong>将离岸风力发电输出功率指数（WPOM）直接嵌入清算预警算法。若全球平均风力密度连续30个统计日低于常年基数，保护池将对风能套保合约自动开启1.5%的溢价补偿支付。</li>
          <li><strong>门槛调减：</strong>重审通过后，小微风力发电实体申请加入保护池的最低资金准入门槛降低 35%，费率全面下调至 1.2% 的历史低位，助力绿色能源转型高速起步。</li>
        </ul>

        <p class="leading-relaxed mb-4">托管信托委员会表示，通过重构这一离岸对冲池设计，可锁定多达数吉瓦时的清洁风能远期价格波动，在不确定的宏观市场中为清洁发电商提供全方位的抗周期波动底盾。本期重估工作自即日起全网实施。</p>

        <p class="mt-8 text-sm text-slate-500 text-right leading-loose">
          <strong>托管信托委员会秘书处</strong><br/>
          <strong>离岸第一对冲保护池理事会</strong><br/>
          <span class="font-mono text-xs">2026年6月3日</span>
        </p>
      `
    },
    {
      id: "3",
      title: "跨链波场代兑与以太坊保障承保池完成储备平衡调兑公告",
      meta: "新闻资讯 • 技术结算部 • 1小时前",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=150&auto=format&fit=crop",
      bannerImg: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
      author: "技术结算部",
      time: "2026-06-03 19:43",
      views: 1894,
      category: "技术更新",
      summary: "官方技术结算团队于今日完成跨链对冲保备池的周期性平衡结算。通过实时多链路证明协议，平补了TRON代兑池与Ethereum承保储备基金之间的额度分配。",
      content: `
        <p>为满足广大用户在进行不同智能合约链进行绿色承保申报时的瞬时流动性承载，经技术结算部与智能合约安全实验室联合论证，本周已顺利完成第二季度第12次跨链结算机制储备分配平衡对兑调减操作。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">一、资金储备分布详情</h3>
        <p class="leading-relaxed mb-4">基于多智能链运行规范，我部每日监控并在必要时通过去中心化保险保证金清算桥平移账目头寸。自上一次平衡发布后，TRON（TRC-20）通道和Ethereum（ERC-20）通道的资产池比例发生了暂时性偏离：</p>
        <ul class="list-disc pl-5 space-y-2 mb-4 leading-relaxed">
          <li><strong>TRC-20 (波场代兑保障池)：</strong>前序结算中连续涌入大型实体承保金 45,000,000 USDT，备兑流动性处于盈余充裕状态。</li>
          <li><strong>ERC-20 (以太坊承保准备金)：</strong>由于两个远期碳信用交割保备单进入行权索补阶段，该池暂时支出 15,200,000 USDT。</li>
        </ul>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">二、储备平衡对兑操作说明</h3>
        <p class="leading-relaxed mb-4">技术部实施了冷钱包间无滑点安全互兑。由两地物理银行托管行协同开户的多方安全多链见证节点监控下，已成功的将 <strong>15,000,000 USDT</strong> 从TRC-20保备备兑地址跨链平衡补充入以太坊保障结算地址，彻底抹平了流动性偏好倾斜带来的单向滑点风险。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">三、审计与透明性</h3>
        <p class="leading-relaxed mb-4">所有调兑哈希、两地物理收金登记账册、跨链审计报表已全部对各大联署行开放实时看板查询，并同步录入官方智能清算簿。本次调兑完成后，两地网络保障申领、物理托管申报可在1分钟内瞬时核销。</p>

        <p class="mt-8 text-sm text-slate-500 text-right leading-loose">
          <strong>技术结算中心特别工作组</strong><br/>
          <strong>多链承保智能合约联合实验室</strong><br/>
          <span class="font-mono text-xs">2026年6月3日</span>
        </p>
      `
    },
    {
      id: "4",
      title: "联合国绿色应对对冲基金、LSEG、欧盟生态碳排放特别工作机制进展报告",
      meta: "风险报告 • 合规稽查办 • 2小时前",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=150&auto=format&fit=crop",
      bannerImg: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
      author: "合规稽查办",
      time: "2026-06-03 18:43",
      views: 4510,
      category: "风险合规",
      summary: "三方合规披露报告，发布了跨国碳风险转移和气候救济在欧盟和联合国绿色基金框架下的最新适配性标准，降低多边清算的合规磨损率。",
      content: `
        <p>近期，联合国绿色应对对冲基金、伦敦证券交易所集团（LSEG）以及欧盟生态碳排放特别工作组举行联合三边审计会议，针对其联合主导建立、旨在平抑多边实体跨国气候配额对冲风险的保障金平台发布本期进展及合规披露报告。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">一、多国气候救济及衍生对冲框架合规要件</h3>
        <p class="leading-relaxed mb-4">报告强调，在全球供应链向碳中和快速演进的前景下，跨区域碳关税（如欧盟CBAM border adjustment）对发展中国家新能源实体的多边清算合规成本大幅上升。为抵御这一宏观非市场性风险，特别机制确立新指引，免除通过本保备池申报套保实体的 <strong>CBAM 重叠保证金 22%</strong>，旨在最大程度平抑多边法制壁垒产生的双重缴税负担。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">二、联合准备金机制第二阶段扩大论证</h3>
        <p class="leading-relaxed mb-4">当前由联合国绿色基金提供基石出资、LSEG 提供做市对手担保的保障框架运行状况极度稳定。自2025年以来，已接单绿色林业、分布式水电及生物质热解等三大重点资产包，平抑实体资产贬值总额近 <strong>3.4 亿美元</strong>。由于风控扎实，三方一致计划于2026年第三季度开展第二阶段规模扩大审批，通过增加绿色数字债券（Green Bond）等底层生息工具丰富保护池收益性。</p>

        <p class="leading-relaxed mb-4">合规稽查办指出，凡通过官方合规登记的物理核保单，均自动符合欧盟最新气候分类法（EU Taxonomy）的披露和审查标准，实体投资人可借此获取全额的ESG合规减免证明，无需第三方中介二次盖网。这极大缩短了审计链路，在跨国清算中具有重要战略意义。</p>

        <p class="mt-8 text-sm text-slate-500 text-right leading-loose">
          <strong>联合国绿色应对对冲基金多边稽查署</strong><br/>
          <strong>欧盟生态碳排放工作机制组</strong><br/>
          <span class="font-mono text-xs">2026年6月3日</span>
        </p>
      `
    },
    {
      id: "5",
      title: "全球新能源资产对该保单首次入库及审计工作顺利完成通报",
      meta: "审计公告 • 联合评估组 • 3小时前",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=150&auto=format&fit=crop",
      bannerImg: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
      author: "联合评估组",
      time: "2026-06-03 17:43",
      views: 2241,
      category: "财务审计",
      summary: "第三方权威审计机构对首次纳入大宗衍生保备保障的实体水电、太阳能厂基础设备和资产估值进行了精细的入网合账、盘点并锁闭存管通道。",
      content: `
        <p>为了保障实体核保用户申报资产的充足透明与刚性履约能力，由多国特许联合审计师事务所领衔、六大主要做市托管银行共同派驻组建的联合评估组宣布：本周已顺利完成对官方托管的第一批实体新能源资产首次入库及全方位物理对账审计工作，审计意见评定为“完全公允无保留意见”。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">一、入库审计新能源资产详情</h3>
        <p class="leading-relaxed mb-4">本次纳入大宗价格对冲保障的首期实体资产来自于中欧、南美三个跨国大型可再生能源基础设施。联合工作组进行了现场物探与链上智能双向实物核对：</p>
        <ul class="list-disc pl-5 space-y-2 mb-4 leading-relaxed">
          <li><strong>南美热带分布式光伏矩阵：</strong>总装机容量 180 兆瓦，首次估值 <strong>98,400,000 USDT</strong>。设备资产状态评级：特优（全新设备带锁运行中）。</li>
          <li><strong>中欧地热发电综合对冲池：</strong>核定远期结算配额 <strong>45,000,000 USDT</strong>，相关资产确权证书、特许经营权合约原件已正式存至位于苏黎世的联合托管行保险库物理存管。</li>
        </ul>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">二、保险保备刚性证明</h3>
        <p class="leading-relaxed mb-4">联合评估组通过多节点、物理仓单与可再生能源数字信用（REC）三维一体技术，对托管新能源基础设施与当前衍生品仓单池的波动率进行情景极限测试（Stress Test）。审计报告判定，即使面对极端年份（无风无光无水）的气候波动，入库资产估值的 <strong>85% 资本金</strong> 依然通过抵押凭证等机制受到刚性兜底，投资人本息兑付不受任何物理减产的冲击损失。</p>

        <p class="leading-relaxed mb-4">本次审计工作的圆满完成，在很大程度上降低了传统绿色资产因气候多变造成的评估波动，为金融理财和绿色信贷对冲筑牢了坚不可摧的底层安全基石。</p>

        <p class="mt-8 text-sm text-slate-500 text-right leading-loose">
          <strong>全球新能源联合评估审计组</strong><br/>
          <strong>特许绿色财富联合审计事务所</strong><br/>
          <span class="font-mono text-xs">2026年6月3日</span>
        </p>
      `
    },
    {
      id: "6",
      title: "绿色信贷配额对冲保护项目第四期清算与收益发放通告",
      meta: "清算公告 • 资金托管部 • 5小时前",
      img: "https://images.unsplash.com/photo-1621451537084-482c730e3a0a?q=80&w=150&auto=format&fit=crop",
      bannerImg: "https://images.unsplash.com/photo-1621451537084-482c730e3a0a?q=80&w=1200&auto=format&fit=crop",
      author: "资金托管部",
      time: "2026-06-03 15:43",
      views: 3120,
      category: "收益分配",
      summary: "绿色信贷配额对冲保障项目第四期清算工作执行完毕。相关的期权对冲溢价红利已按计划通过托管下账通道，向所有登记参与分润的全球物理保单账户如数发放。",
      content: `
        <p>本着公开、公平、透明的受托清算原则，英国绿色发展对冲保障基金（UK-GDF）第四期绿色信贷配额套保池已完成当期审计周期的对账清算。资金托管部依照平台服务条款，发布本期收益分配及已发出的溢价对冲红利最终确认通告。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">一、第四期项目运营综述</h3>
        <p class="leading-relaxed mb-4">在第四期存期结算日内，受到全球新能源补贴重组带来的利息下降和绿色碳信用高增红利的多重叠加，信贷汇兑及保护池整体套期保值交易获得极佳表现。本期实际跑赢宏观指数 <strong>4.82%</strong>，产生超额对冲结算清算盈余 <strong>24,195,450 USDT</strong>。</p>

        <h3 class="text-emerald-700 font-bold border-b border-emerald-100 pb-1 mt-6 mb-3 text-lg">二、清算收益发放方式</h3>
        <p class="leading-relaxed mb-4">根据大宗托付托管行的收益分配法，本期超额收益已根据实体的持有份额及参保时间，于北京时间今日下午15时通过智能清算系统完成了自动化红利划发。收益全部折算为等额稳定币保障代兑注入：</p>
        <ul class="list-disc pl-5 space-y-2 mb-4 leading-relaxed">
          <li><strong>自动累加：</strong>用户的信贷保障余额和可兑现资金已自动在“资产中心”完成簿记累加。</li>
          <li><strong>账本登记：</strong>您可在“个人资产-审计流水”中，查阅标记有 <strong>[GDF-P4 Dividend]</strong> 的账目返还详情，支持向监管及合规审计一键导出证明。</li>
        </ul>

        <p class="leading-relaxed mb-4">项目理事会衷心感谢各位实体申购人和信托合伙人对物理保障体系的信任，五期保单认购即将在本周五开启，期待与各位在不确定的宏观市场中继续实现常青的稳健避震。</p>

        <p class="mt-8 text-sm text-slate-500 text-right leading-loose">
          <strong>英国大宗托管行信托理算部</strong><br/>
          <strong>绿色发展对冲金托管部</strong><br/>
          <span class="font-mono text-xs">2026年6月3日</span>
        </p>
      `
    }
  ],

  setupModalOpen: false,
  selectedMasterId: '',
  selectedMasterName: '',
  toasts: [],
  tickerPrice: 36701.78,
  
  openDepositModal() {
    this.depositModalOpen = true;
  },
  closeDepositModal() {
    this.depositModalOpen = false;
  },
  triggerToast(msg) {
    const id = Date.now().toString() + Math.random();
    this.toasts.push({ id, msg });
    setTimeout(() => {
      this.dismissToast(id);
    }, 4000);
  },
  dismissToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
});

// Sync triggers
watch(() => store.balances, (val) => {
  localStorage.setItem('lseg_balances', JSON.stringify(val));
}, { deep: true });

watch(() => store.coins, (val) => {
  localStorage.setItem('lseg_coins', JSON.stringify(val));
}, { deep: true });

watch(() => store.positions, (val) => {
  localStorage.setItem('lseg_positions', JSON.stringify(val));
}, { deep: true });

watch(() => store.follows, (val) => {
  localStorage.setItem('lseg_follows', JSON.stringify(val));
}, { deep: true });

watch(() => store.orders, (val) => {
  localStorage.setItem('lseg_orders', JSON.stringify(val));
}, { deep: true });

watch(() => store.ledger, (val) => {
  localStorage.setItem('lseg_ledger', JSON.stringify(val));
}, { deep: true });

watch(() => store.insurancePurchases, (val) => {
  localStorage.setItem('lseg_insurance_purchases', JSON.stringify(val));
}, { deep: true });

watch(() => store.holdings, (val) => {
  localStorage.setItem('lseg_assets_holdings', JSON.stringify(val));
}, { deep: true });

// Gentle fluctuation tick
setInterval(() => {
  store.coins.forEach(coin => {
    const pct = (Math.random() * 0.4 - 0.2) / 100;
    coin.price = Number((coin.price * (1 + pct)).toFixed(coin.price > 100 ? 2 : 4));
    coin.change = Number((coin.change + (Math.random() * 0.04 - 0.02)).toFixed(2));
    if (coin.code === 'BTC') {
      store.tickerPrice = coin.price;
    }
  });
}, 4000);
