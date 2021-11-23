import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import { MemberInvitationViewModel } from './member-invitation-view-model';
import { Avatar, PopupAlert } from 'shared/components';
import { getRoleName } from './components';
import logo from 'assets/images/logo.png';
import './style/index.css';
import { LOCAL_URL } from 'shared/constants';

interface IProps {
  inviteID: string | null;
}

export const MemberInvitation = observer(({ inviteID }: IProps) => {
  const [viewModel] = useState(new MemberInvitationViewModel());
  const history = useHistory();

  const fn = useCallback(async () => {
    const { isError, isAlreadyInClass } = await viewModel.getClassInfo();
    if (!isError && isAlreadyInClass) {
      history.push(`/class/${viewModel.classInformation.id}`);
    }
  }, [history, viewModel]);

  useEffect(() => {
    viewModel.setInviteID(inviteID);
    fn();
  }, [viewModel, inviteID, fn]);

  const user = viewModel.getUser();
  const roleName = getRoleName(viewModel.isTeacherInvitation);

  const hidePopupAlert = () => {
    viewModel.deleteError();
    if (viewModel.isAlreadyInClass) history.push(viewModel.getClassDetailUrl);
    else history.push('/');
  };

  const joinClass = async () => {
    const result = await viewModel.joinClass();
    if (result) {
      window.location.href = `${LOCAL_URL}${viewModel.getClassDetailUrl}`;
    }
  };

  return (
    <div className="container pt-4">
      <div className="row d-flex justify-content-around">
        <div className="card col-9 col-lg-7 col-xl-5 p-0 ">
          <div className="card-header d-flex  flex-column pt-5 pb-4">
            <div className="card-title mx-auto text-center ">
              <img height="90" width="90" src={logo} alt="logo"></img>
              <br />
              <span className="card-brand text-muted">
                <strong>Grade</strong> Classroom
              </span>
            </div>
            <span className="text-title mt-3 text-center">
              Lời mời tham gia lớp học
              <br />
              <strong>{viewModel.classInformation.name}</strong>
            </span>
          </div>
          <div className="center">
            <Avatar user={user} size={80}></Avatar>
            <p className="text-email">{user.email}</p>
            <p className="text-display-name">{user.displayName}</p>
            <p className="text-role">
              Bạn đang tham gia với tư cách là {roleName}
            </p>
            <Button
              className="py-2 px-4 mx-3 text-white"
              variant="primary"
              onClick={joinClass}
            >
              Tham gia lớp học
            </Button>
          </div>
        </div>
      </div>
      <PopupAlert
        show={viewModel.isError}
        error={true}
        onHide={hidePopupAlert}
        message={viewModel.message}
      />
    </div>
  );
});
