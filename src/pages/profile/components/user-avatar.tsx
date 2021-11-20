import { Avatar, ImagePicker } from 'shared/components';
import { User } from 'shared/models';

interface IProps {
  user: User;
  onUpdateAvatar: (data: any) => void;
}

export const UserAvatar = ({ user, onUpdateAvatar }: IProps) => {
  const finish = (data: any) => {
    onUpdateAvatar(data);
  };
  return (
    <div className="center-vertical">
      <Avatar user={user} size={100} />
      <div style={{ marginTop: 10 }}>
        <ImagePicker onFinish={finish} content="Đổi ảnh" />
      </div>
    </div>
  );
};
