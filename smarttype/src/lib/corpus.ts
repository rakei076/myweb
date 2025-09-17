export type Difficulty = 'easy' | 'medium' | 'hard';

const EASY_WORDS = [
  '今天', '我们', '大家', '可以', '应该', '一起', '学习', '提高', '效率', '时间', '习惯', '节奏', '健康', '快乐', '简单', '清晰', '稳定', '安全', '效果', '帮助', '成长', '计划', '目标', '记录', '练习', '输入', '中文', '速度', '准确', '方法', '注意', '看看', '开始', '结束', '完成', '继续', '选择', '保存', '分享', '提升', '体验', '新闻', '科技', '城市', '学生', '老师', '团队', '公司', '用户', '生活', '工作'
];

const MEDIUM_WORDS = [
  '数据', '分析', '反馈', '系统', '平台', '内容', '更新', '优化', '指标', '质量', '逻辑', '结构', '网络', '资源', '能力', '方案', '应用', '流程', '标准', '实践', '管理', '功能', '策略', '算法', '模型', '体验', '效果', '稳定性', '可靠性', '效率提升', '自动化', '多样性', '分类', '场景', '趋势', '热点', '角度', '机制', '协作', '工具', '操作', '界面', '布局', '策略', '程度', '阶段', '方式', '机制', '专题', '案例'
];

const HARD_WORDS = [
  '可持续性', '可观测性', '可解释性', '泛化能力', '鲁棒性', '一致性', '可扩展性', '可维护性', '并发控制', '访问延迟', '容错恢复', '异步事件', '边界条件', '序列建模', '语义关联', '统计分布', '概率估计', '非线性', '高维特征', '动态权重', '正负样本', '归一化', '特征选择', '多任务', '对齐机制', '性能瓶颈', '缓存命中', '吞吐率', '延迟抖动', '稳定收敛'
];

const PUNCT = ['，', '。', '、', '；', '：'];

export interface GenerateTextOptions {
  lengthChars?: number; // approximate
  ratio?: { easy: number; medium: number; hard: number };
  seed?: number;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateBalancedChineseText(options: GenerateTextOptions = {}): string {
  const {
    lengthChars = 1200,
    ratio = { easy: 0.6, medium: 0.3, hard: 0.1 },
    seed = Date.now() % 100000
  } = options;

  const rand = mulberry32(seed);

  const buckets: Record<Difficulty, string[]> = {
    easy: EASY_WORDS,
    medium: MEDIUM_WORDS,
    hard: HARD_WORDS
  };

  const targetCounts: Record<Difficulty, number> = {
    easy: Math.max(1, Math.floor((lengthChars / 2) * ratio.easy)),
    medium: Math.max(1, Math.floor((lengthChars / 2) * ratio.medium)),
    hard: Math.max(1, Math.floor((lengthChars / 2) * ratio.hard))
  };

  const picks: string[] = [];

  function pick(arr: string[]): string {
    return arr[Math.floor(rand() * arr.length)];
  }

  function maybePunct(): string {
    return rand() < 0.2 ? PUNCT[Math.floor(rand() * PUNCT.length)] : '';
  }

  const sentenceCount = Math.max(20, Math.floor(lengthChars / 24));
  for (let i = 0; i < sentenceCount; i++) {
    const words: string[] = [];
    const sentenceLen = 10 + Math.floor(rand() * 30); // 10-40 words tokens

    for (let j = 0; j < sentenceLen; j++) {
      let pool: Difficulty = 'easy';
      const r = rand();
      if (r < ratio.easy) pool = 'easy';
      else if (r < ratio.easy + ratio.medium) pool = 'medium';
      else pool = 'hard';

      if (targetCounts[pool] <= 0) {
        pool = 'easy';
      }
      const token = pick(buckets[pool]);
      targetCounts[pool] -= 1;
      words.push(token);
    }

    let sentence = words.join('');
    sentence = sentence.replace(/([\u4e00-\u9fa5]{2,5})/g, (m) => (rand() < 0.05 ? m + '的' : m));
    sentence += maybePunct();
    if (!/[。！？]$/.test(sentence)) {
      sentence += rand() < 0.7 ? '。' : '，';
    }
    picks.push(sentence);
  }

  let text = picks.join('');
  if (text.length > lengthChars) {
    text = text.slice(0, lengthChars);
    if (!/[。！？]$/.test(text)) text += '。';
  }
  return text;
}

export function sampleExamText(durationSec: number, seed?: number): string {
  const length = durationSec <= 60 ? 800 : durationSec <= 180 ? 1600 : 2400;
  return generateBalancedChineseText({ lengthChars: length, seed });
}

