import { observer } from 'mobx-react';
import { useState } from 'react';
import { AiOutlineFolderOpen, AiOutlineLink } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdAssignmentInd } from 'react-icons/md';
import { BsSave, BsThreeDotsVertical } from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { homeViewModel } from 'pages/home/home-view-model';
import { User } from 'shared/models';
import { PopUp } from 'shared/components';
import '../style/class-card.css';

interface IProps {
  id: number;
  roleOfCurrentUser: string;
  name: string;
  mainTeacher: User;
  room: string;
}

export const ClassCard = observer(
  ({ id, roleOfCurrentUser, name, room, mainTeacher }: IProps) => {
    const openInvitationModal = () => {
      homeViewModel.setClassID(id);
      homeViewModel.showInvitationLinkModal();
    };

    const [showPopUp, setShowPopUp] = useState(false);
    return (
      <Card className="class-card border-1 p-0 mx-2 my-3">
        <Card.Header className="class-header px-0 py-3">
          <Card.Title className="d-flex">
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
                {mainTeacher.firstName + ' ' + mainTeacher.lastName}
              </span>
            </div>
            <PopUp
              show={showPopUp}
              onHide={() => setShowPopUp(false)}
              placement="bottom-left"
              overlay={
                <div className="center-vertical">
                  {roleOfCurrentUser === 'student' ? (
                    <button
                      onClick={() => setShowPopUp(false)}
                      type="button"
                      className="pop-up-item"
                    >
                      <TiCancel style={{ marginRight: 10 }} size={20} />
                      <span> Hủy đăng kí</span>
                    </button>
                  ) : (
                    <div className="center-vertical">
                      <button
                        type="button"
                        className="pop-up-item"
                        onClick={() => {
                          setShowPopUp(false);
                          openInvitationModal();
                        }}
                      >
                        <AiOutlineLink style={{ marginRight: 10 }} size={20} />
                        <span> Link mời vào lớp</span>
                      </button>
                      <button
                        onClick={() => setShowPopUp(false)}
                        type="button"
                        className="pop-up-item"
                      >
                        <BsSave
                          style={{ marginRight: 13, marginLeft: 3 }}
                          scale={20}
                        />
                        <span>Lưu trữ</span>
                      </button>
                    </div>
                  )}
                </div>
              }
            >
              <button
                onClick={() => setShowPopUp(!showPopUp)}
                className="class-card-btn"
              >
                <BsThreeDotsVertical></BsThreeDotsVertical>
              </button>
            </PopUp>
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
