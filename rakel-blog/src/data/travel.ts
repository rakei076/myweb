/**
 * 旅游数据
 */

import { TravelLocation } from '../types';

export const travelLocations: TravelLocation[] = [
  {
    id: 'tokyo',
    name: '东京',
    country: '日本',
    coordinates: {
      lat: 35.6762,
      lng: 139.6503,
    },
    date: '2023-09',
    description: '开始留学生活的地方，繁华的都市让我大开眼界',
    mood: '兴奋、期待',
    tags: ['留学', '城市', '初体验'],
  },
  {
    id: 'kyoto',
    name: '京都',
    country: '日本',
    coordinates: {
      lat: 35.0116,
      lng: 135.7681,
    },
    date: '2024-04',
    description: '樱花季的京都美得像画，古寺和现代完美融合',
    mood: '宁静、感动',
    tags: ['樱花', '古都', '文化'],
  },
  {
    id: 'osaka',
    name: '大阪',
    country: '日本',
    coordinates: {
      lat: 34.6937,
      lng: 135.5023,
    },
    date: '2024-08',
    description: '美食天堂，章鱼烧和大阪烧太好吃了！',
    mood: '快乐、满足',
    tags: ['美食', '购物', '夏日'],
  },
  {
    id: 'mount-fuji',
    name: '富士山',
    country: '日本',
    coordinates: {
      lat: 35.3606,
      lng: 138.7274,
    },
    date: '2024-07',
    description: '人生第一次登山，虽然很累但山顶的景色值得一切',
    mood: '成就感、震撼',
    tags: ['登山', '自然', '挑战'],
  },
  {
    id: 'hokkaido',
    name: '北海道',
    country: '日本',
    coordinates: {
      lat: 43.2203,
      lng: 142.8635,
    },
    date: '2025-02',
    description: '计划中的雪国之旅，期待看到白茫茫的世界',
    mood: '期待',
    tags: ['雪景', '温泉', '计划中'],
  },
];