import { TravelLocation } from '../types';

export const travelData: TravelLocation[] = [
  {
    id: 'tokyo',
    name: '东京',
    country: '日本',
    coordinates: [139.6917, 35.6895],
    visitDate: '2023-09-01',
    photos: ['/images/travel/tokyo1.jpg', '/images/travel/tokyo2.jpg'],
    description: '初到日本留学的第一站，繁华的都市生活让人印象深刻。在这里开始了我的留学生活，体验了地道的日本文化。',
    mood: '兴奋',
    color: '#FF6B6B'
  },
  {
    id: 'osaka',
    name: '大阪',
    country: '日本',
    coordinates: [135.5023, 34.6937],
    visitDate: '2023-10-15',
    photos: ['/images/travel/osaka1.jpg'],
    description: '关西地区的美食天堂，品尝了各种当地特色小吃，感受了关西人的热情。大阪城的樱花季节特别美丽。',
    mood: '满足',
    color: '#4ECDC4'
  },
  {
    id: 'kyoto',
    name: '京都',
    country: '日本',
    coordinates: [135.7681, 35.0116],
    visitDate: '2023-11-20',
    photos: ['/images/travel/kyoto1.jpg', '/images/travel/kyoto2.jpg', '/images/travel/kyoto3.jpg'],
    description: '古都京都的传统文化深深震撼了我，清水寺、金阁寺的美景让人流连忘返。红叶季节的京都格外迷人。',
    mood: '宁静',
    color: '#45B7D1'
  },
  {
    id: 'mount-fuji',
    name: '富士山',
    country: '日本',
    coordinates: [138.7274, 35.3606],
    visitDate: '2024-01-10',
    photos: ['/images/travel/fuji1.jpg'],
    description: '日本的象征，虽然没有登顶，但在山脚下看到的富士山依然让人震撼。冬日的富士山格外雄伟。',
    mood: '敬畏',
    color: '#96CEB4'
  },
  {
    id: 'shanghai',
    name: '上海',
    country: '中国',
    coordinates: [121.4737, 31.2304],
    visitDate: '2024-02-20',
    photos: ['/images/travel/shanghai1.jpg'],
    description: '回国探亲时经过的城市，现代化的天际线和传统的石库门形成鲜明对比，感受到了祖国的发展变化。',
    mood: '自豪',
    color: '#FFEAA7'
  },
  {
    id: 'hiroshima',
    name: '广岛',
    country: '日本',
    coordinates: [132.4596, 34.3853],
    visitDate: '2024-03-15',
    photos: ['/images/travel/hiroshima1.jpg'],
    description: '和平纪念公园让人深思，宫岛的大鸟居在夕阳下格外美丽。这次旅行让我对和平有了更深的理解。',
    mood: '沉思',
    color: '#DDA0DD'
  }
];