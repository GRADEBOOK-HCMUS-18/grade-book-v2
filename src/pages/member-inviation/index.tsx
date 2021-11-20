import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { MemberInvitationViewModel } from './member-invitation-view-model';
import { Avatar } from 'shared/components';
import logo from 'assets/images/logo.png';
import './style/index.css';

interface IProps {
  inviteID: string;
}

export const MemberInvitation = ({ inviteID }: IProps) => {
  const [viewModel] = useState(new MemberInvitationViewModel());

  const user = viewModel.getUser();
  const roleOfInviteID = viewModel.roleOfInviteID;

  useEffect(() => {
    viewModel.getUser();
    viewModel.setInviteID(inviteID);
  }, []);

  return (
    <div className="container col-12 col-lg-9">
      <Card className="class-card d-flex align-self-center">
        <Card.Header className="d-flex flex-column pt-5 pb-4">
          <Card.Title className="mx-auto text-center ">
            <img height="70" width="70" className="class-logo" src={logo}></img>
            <br />
            <span className="class-brand text-muted">
              <strong>Grade</strong> Classroom
            </span>
          </Card.Title>
          <Card.Text className="class-invitation mt-3 text-center">
            Lời mời tham gia lớp học
          </Card.Text>
        </Card.Header>
        <Card.Body className="pt-4 pb-3 text-center align-self-stretch">
          <Avatar user={user} size={50}></Avatar>
          <Card.Text>{user.email}</Card.Text>
          <Card.Text>{user.displayName}</Card.Text>
          <Card.Text>
            Bạn đang tham gia với tư cách là {roleOfInviteID}
          </Card.Text>
          <Button className="py-2 px-4 mx-3 text-white" variant="primary">
            Tham gia lớp học
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
