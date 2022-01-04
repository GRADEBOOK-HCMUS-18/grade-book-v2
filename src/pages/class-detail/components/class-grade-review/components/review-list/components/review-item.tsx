import { observer } from 'mobx-react-lite';
import { userViewModel } from 'shared/view-models';
import './style/index.css';
import { Avatar } from 'shared/components';

export const ReviewItem = observer(() => {
  const user = userViewModel.user;
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-logo">
          <Avatar user={user} />
        </div>
        <div className="review-card-title">
          <span>
            Sinh vien: {user.lastName} {user.firstName} phuc khao bai tap
          </span>
        </div>
      </div>
    </div>
  );
});
