import { AiOutlineCheck } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { GradeReview } from 'shared/models';

interface IProps {
  data: GradeReview;
  isOwner: boolean;
  onChangeStatus: (type: 'rejected' | 'accepted') => void;
}

export const Header = ({ data, isOwner, onChangeStatus }: IProps) => {
  return (
    <div className="review-detail-header">
      <div className="review-detail-header-content">
        <span>
          <b>Cột điểm: </b>
          {data.assignment.name}
        </span>
        <span style={{ marginInline: 10 }}>
          <b>Điểm hiện tại: </b>
          {data.currentGrade.point}
        </span>
        <span>
          <b>Điểm yêu cầu: </b>
          {data.requestedNewPoint}
        </span>
      </div>
      {isOwner && (
        <div className="review-detail-header-button-container">
          {data.state !== 'Accepted' && (
            <div
              onClick={() => onChangeStatus('accepted')}
              className="review-detail-header-button"
            >
              <AiOutlineCheck
                style={{ marginRight: 5, color: 'var(--green)' }}
                size={25}
              />
              Đồng ý
            </div>
          )}
          {data.state !== 'Rejected' && (
            <div
              onClick={() => onChangeStatus('rejected')}
              className="review-detail-header-button"
            >
              <FcCancel style={{ marginRight: 5 }} size={25} />
              Từ chối
            </div>
          )}
        </div>
      )}
    </div>
  );
};
