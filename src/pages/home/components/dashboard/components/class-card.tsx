import { observer } from 'mobx-react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdAssignmentInd } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Card, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { homeViewModel } from 'pages/home/home-view-model';
import { MainTeacher } from 'pages/home/models';
import '../style/class-card.css';

interface IProps {
  id: number;
  roleOfCurrentUser: string;
  name: string;
  mainTeacher: MainTeacher;
  room: string;
}

export const ClassCard = observer(
  ({ id, roleOfCurrentUser, name, room, mainTeacher }: IProps) => {
    const openInvitationModal = () => {
      homeViewModel.setClassID(id);
      homeViewModel.showInvitationLinkModal();
    };

    return (
      <Card className="class-card border-1 p-0 mx-2 my-3">
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
                            onClick={() => openInvitationModal()}
                          >
                            Link mời vào lớp
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
              <Link className="go-to-class d-block " to={`/class/${id}`}>
                <div className="class-title text-white text-truncate">
                  {name}
                </div>
                <div className="class-room  text-white text-truncate">
                  {room ? room : <br />}
                </div>
              </Link>
              <span className="class-teacher-name  text-white text-truncate">
                {mainTeacher.displayName}
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
    );
  }
);
