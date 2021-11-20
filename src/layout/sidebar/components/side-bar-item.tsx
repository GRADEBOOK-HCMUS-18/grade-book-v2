import { BsHouseDoor, BsSave } from 'react-icons/bs';
import { AiOutlineCalendar, AiOutlineSetting } from 'react-icons/ai';

type ItemArr = Array<{
  id: number;
  content: string;
  icon: JSX.Element;
  path: string;
}>;
const iconSize = 20;

export const PathDisplay = ['/', '/calendar', '/archived', '/setting'];

export const SideBarItems: ItemArr = [
  {
    id: 0,
    content: 'Lớp học',
    icon: <BsHouseDoor size={iconSize} />,
    path: '/',
  },
  {
    id: 1,
    content: 'Lịch',
    icon: <AiOutlineCalendar size={iconSize} />,
    path: '/calendar',
  },
  {
    id: 3,
    content: 'Lớp học đã lưu trữ',
    icon: <BsSave size={iconSize} />,
    path: '/archived',
  },
  {
    id: 4,
    content: 'Cài đặt',
    icon: <AiOutlineSetting size={iconSize} />,
    path: '/setting',
  },
];
