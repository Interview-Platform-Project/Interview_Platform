import { Home, Search, Monitor, Clock3, MessageCircle, Award, User, Layers } from 'lucide-react';

type TSidebarMockData = Array<{ title: string; icon: React.ComponentType; linkTo: string }>;
export const sidebarNavMock: TSidebarMockData = [
  { title: 'Дашборд', icon: Home, linkTo: '/dashboard' },
  { title: 'Маркетплейс', icon: Search, linkTo: '/marketplace' },
  { title: 'Рабочая среда', icon: Monitor, linkTo: '/workspace' },
  { title: 'История', icon: Clock3, linkTo: '/history' },
  { title: 'Отзывы', icon: MessageCircle, linkTo: '/reviews' },
  { title: 'Лидеры', icon: Award, linkTo: '/leaders' },
  { title: 'Профиль', icon: User, linkTo: '/profile' },
  { title: 'UiKit', icon: Layers, linkTo: '/uikit' },
];
