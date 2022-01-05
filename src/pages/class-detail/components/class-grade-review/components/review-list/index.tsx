import { memo, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { GradeReview } from 'shared/models';
import { ReviewItem } from './components/review-item';
import './style/index.css';

interface IProps {
  reviewList: Array<GradeReview>;
  onSelect: (review: GradeReview) => void;
}

type FilterAction =
  | 'Sắp xếp theo tên tăng dần'
  | 'Sắp xếp theo MSSV tăng dần'
  | 'Sắp xếp theo ngày tăng dần'
  | 'Sắp xếp theo ngày giảm dần'
  | 'Sắp xếp theo trạng thái';

const statusWeight: any = {
  Waiting: 3,
  Accepted: 2,
  Rejected: 1,
};
const filterArray: Array<FilterAction> = [
  'Sắp xếp theo MSSV tăng dần',
  'Sắp xếp theo ngày giảm dần',
  'Sắp xếp theo ngày tăng dần',
  'Sắp xếp theo trạng thái',
  'Sắp xếp theo tên tăng dần',
];

export const ReviewList = memo(({ reviewList, onSelect }: IProps) => {
  const [selectedReview, setSelectedReview] = useState(0);

  const [list, setList] = useState<Array<GradeReview>>([]);

  const [filterValue, setFilterValue] = useState<FilterAction>(
    'Sắp xếp theo ngày tăng dần'
  );

  useEffect(() => {
    if (reviewList.length) setSelectedReview(reviewList[0].id);
    setList(reviewList);
  }, [reviewList]);

  const handleReviewClick = (item: GradeReview) => {
    setSelectedReview(item.id);
    onSelect(item);
  };

  const handleFilter = (type: FilterAction) => {
    const filterValue = filterList(type, list);
    setList(filterValue);
    setFilterValue(type);
  };
  return (
    <div className="review-list">
      <div className="review-list-header">
        <span>Danh sách phúc khảo</span>
        <Dropdown className="dropdown-custom">
          <Dropdown.Toggle>{filterValue}</Dropdown.Toggle>
          <Dropdown.Menu>
            {filterArray.map((item, id) => (
              <Dropdown.Item
                key={id}
                onClick={() => handleFilter(item)}
                as="button"
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {list.map((item) => (
        <ReviewItem
          onClick={handleReviewClick}
          key={item.id}
          selected={selectedReview}
          reviewItem={item}
        />
      ))}
    </div>
  );
});

const filterList = (
  type: FilterAction,
  list: Array<GradeReview>
): Array<GradeReview> => {
  switch (type) {
    case 'Sắp xếp theo MSSV tăng dần': {
      const filtered = [...list];
      filtered.sort((a, b) => {
        if (a.student.studentId > b.student.studentId) {
          return 1;
        }
        return -1;
      });
      return filtered;
    }
    case 'Sắp xếp theo tên tăng dần': {
      const filtered = [...list];
      filtered.sort((a, b) => {
        if (a.student.fullName > b.student.fullName) {
          return 1;
        }
        return -1;
      });
      return filtered;
    }

    case 'Sắp xếp theo ngày giảm dần': {
      const filtered = [...list];
      filtered.sort((a, b) => {
        if (new Date(a.dateCreated) < new Date(b.dateCreated)) {
          return 1;
        }
        return -1;
      });
      return filtered;
    }

    case 'Sắp xếp theo ngày tăng dần': {
      const filtered = [...list];
      filtered.sort((a, b) => {
        if (new Date(a.dateCreated) > new Date(b.dateCreated)) {
          return 1;
        }
        return -1;
      });
      return filtered;
    }

    case 'Sắp xếp theo trạng thái': {
      const filtered = [...list];
      filtered.sort((a, b) => {
        if (statusWeight[a.state] === statusWeight[b.state]) {
          return 0;
        }
        if (statusWeight[a.state] < statusWeight[b.state]) {
          return 1;
        }
        return -1;
      });
      return filtered;
    }
  }
};
