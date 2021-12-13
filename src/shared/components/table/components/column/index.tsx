export interface ColumnProps {
  id: number | string;
  content: string | number | JSX.Element;
}

export const Column = ({ id, content }: ColumnProps) => {
  return <th>{content}</th>;
};
