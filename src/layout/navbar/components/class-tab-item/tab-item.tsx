import { observer } from 'mobx-react';
import { Link, useLocation } from 'react-router-dom';
import { classDetailViewModel } from 'shared/view-models';
import './style/index.css';

export const TabItem = observer(() => {
  const location = useLocation();
  const id = classDetailViewModel.classInfo.id;
  const url = `/class/${id}`;
  const tokens = location.pathname.split('/');
  const currentLocation = tokens[tokens.length - 1];
  return (
    <div>
      {Items.map((item) => {
        let className = 'class-tab-item';
        if (item.path === currentLocation) {
          className = 'class-tab-item-selected';
        }
        if (currentLocation === id.toString() && item.path === '') {
          className = 'class-tab-item-selected';
        }
        return (
          <Link key={item.id} to={`${url}/${item.path}`}>
            <span className={`${className}`}>{item.content}</span>
          </Link>
        );
      })}
    </div>
  );
});

type ItemArr = Array<{
  id: number;
  content: string;
  path: string;
}>;

export const Items: ItemArr = [
  {
    id: 0,
    content: 'Bảng tin',

    path: '',
  },
  {
    id: 1,
    content: 'Bài tập',

    path: 'homework',
  },
  {
    id: 3,
    content: 'Mọi người',
    path: 'people',
  },
];
