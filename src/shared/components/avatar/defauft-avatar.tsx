import './style/default.css';

interface IProps {
  username: string;
}

export const DefaultAvatar = ({ username }: IProps) => {
  return <div className="avatar-container"></div>;
};
