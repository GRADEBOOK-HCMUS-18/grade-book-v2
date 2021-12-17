import { observer } from 'mobx-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classDetailViewModel } from 'shared/view-models';
import './style/index.css';

export const TabItem = observer(() => {
  const location = useLocation();
  const id = classDetailViewModel.classInfo.id;
  const url = `/class/${id}`;
  const tokens = location.pathname.split('/');
  const currentLocation = tokens[tokens.length - 1];

  const isTeacher = classDetailViewModel.classInfo.isTeacher;

  const content = Items.map((item) => {
    let className = 'class-tab-item';
    if (item.path === currentLocation) {
      className = 'class-tab-item-selected';
    }
    if (currentLocation === id.toString() && item.path === '') {
      className = 'class-tab-item-selected';
    }
    if (item.path === 'grade' && !isTeacher) {
      return <React.Fragment key={10}></React.Fragment>;
    }

    return (
      <Link key={item.id} to={`${url}/${item.path}`}>
        <span className={`${className}`}>{item.content}</span>
      </Link>
    );
  });

  return <div>{content}</div>;
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
    content: 'Bảng điểm',

    path: 'grade-table',
  },
  {
    id: 3,
    content: 'Mọi người',
    path: 'people',
  },
  {
    id: 4,
    content: 'Điểm số',
    path: 'grade',
  },
];
