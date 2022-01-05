import { AiOutlineCheck } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { GradeReview } from 'shared/models';

interface IProps {
  data: GradeReview;
}

export const Header = ({ data }: IProps) => {
  return (
    <div className="review-detail-header">
      <div>
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
      <div className="review-detail-header-button-container">
        <div className="review-detail-header-button">
          <AiOutlineCheck
            style={{ marginRight: 5, color: 'var(--green)' }}
            size={25}
          />
          Đồng ý
        </div>
        <div className="review-detail-header-button">
          <FcCancel style={{ marginRight: 5 }} size={25} />
          Từ chối
        </div>
      </div>
    </div>
  );
};
