import { AiOutlineFolderOpen } from 'react-icons/ai';
import { MdAssignmentInd } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Card, Col, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../style/class-card.css';

interface IProps {
  id: number;
  roleOfCurrentUser: string;
  name: string;
  teacherName: string;
  room: string;
}

export const ClassCard = ({
  id,
  roleOfCurrentUser,
  name,
  teacherName,
  room,
}: IProps) => {
  return (
    <Col className="mb-3">
      <Card className="class-card border-1 p-0">
        <Card.Header className="class-header px-0 py-3">
          <Card.Title className="d-flex">
            <OverlayTrigger
              trigger="focus"
              placement="bottom-end"
              overlay={
                <Popover>
                  <Popover.Body className="p-0">
                    <div className="list-group">
                      {roleOfCurrentUser === 'student' ? (
                        <button
                          type="button"
                          className="list-group-item list-group-item-action"
                        >
                          Hủy đăng ký
                        </button>
                      ) : (
                        <div>
                          <button
                            type="button"
                            className="list-group-item list-group-item-action"
                          >
                            Sao chép đường liên kết lời mời
                          </button>
                          <button
                            type="button"
                            className="list-group-item list-group-item-action"
                          >
                            Lưu trữ
                          </button>
                        </div>
                      )}
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <button className="btn-three-dot">
                <BsThreeDotsVertical></BsThreeDotsVertical>
              </button>
            </OverlayTrigger>
            <div className="ps-3">
              <a className="go-to-class d-block " href="#/go-to-class">
                <div className="class-title text-white text-truncate">
                  {name}
                </div>
                <div className="class-room  text-white text-truncate">
                  {room}
                </div>
              </a>
              <span className="class-teacher-name  text-white text-truncate">
                {teacherName}
              </span>
            </div>
          </Card.Title>
        </Card.Header>
        <Card.Body className="card-body" />
        <Card.Footer className="card-footer bg-white d-flex flex-row-reverse">
          <OverlayTrigger
            placement="bottom-end"
            overlay={<Tooltip>Mở folder cho {name}</Tooltip>}
          >
            <button className="btn-floating">
              <AiOutlineFolderOpen />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom-end"
            overlay={<Tooltip>Mở bài tập cho {name}</Tooltip>}
          >
            <button className="btn-floating">
              <MdAssignmentInd />
            </button>
          </OverlayTrigger>
        </Card.Footer>
      </Card>
    </Col>
  );
};
