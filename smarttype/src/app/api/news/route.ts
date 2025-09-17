import { NextResponse } from 'next/server';

// Placeholder static items. Later replace with server-side fetch + sanitize.
const STATIC_NEWS: Record<string, string[]> = {
  综合: [
    '多地出台消费促进措施，文旅市场活力明显提升。',
    '公共服务数字化升级，办事效率与便利性同步提高。',
    '夏季汛期来临，各地加强城市排涝与应急演练。'
  ],
  科技: [
    '国产大模型加速应用落地，带动产业链协同创新。',
    '高校团队发布新算法成果，关键指标实现突破。',
    '智能终端迭代加快，人机交互体验持续优化。'
  ],
  社会: [
    '社区服务完善，养老助残保障水平稳步提升。',
    '暑期出行需求旺盛，交通运力与服务同步提升。',
    '志愿服务深入校园与社区，文明实践蔚然成风。'
  ],
  财经: [
    '支持民营经济发展的政策持续发力，市场信心回升。',
    '制造业投资保持较快增长，产业升级步伐加快。',
    '外贸结构持续优化，稳定外需举措有序推进。'
  ]
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || '综合';
  const items = STATIC_NEWS[category] || STATIC_NEWS['综合'];
  return NextResponse.json({ items });
}

