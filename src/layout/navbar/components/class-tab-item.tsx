type ItemArr = Array<{
  id: number;
  content: string;
  path: string;
}>;

export const ClassTabItems: ItemArr = [
  {
    id: 0,
    content: 'Bảng tin',
    path: '',
  },
  {
    id: 1,
    content: 'Bài tập trên lớp',
    path: '/homework',
  },
  {
    id: 2,
    content: 'Mọi người',
    path: '/people',
  },
];
