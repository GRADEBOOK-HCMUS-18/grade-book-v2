import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import { CreateClassModal, JoinClassModal } from 'shared/components';
import { ClassInfo } from 'shared/models';
import { ClassCard } from './components';

interface IProps {
  userId: string;
  allClass: ClassInfo[];
}

export const Dashboard = observer(({ userId, allClass }: IProps) => {
  return (
    <div className="container my-4">
      <Row className="d-flex-block justify-content-start g-3 mx-auto">
        {allClass.map((item, index) => {
          const roleInClass: string = 'student';
          return (
            <ClassCard
              key={item.id}
              teacherName={item.teacherName}
              room={item.room}
              name={item.name}
              id={item.id}
              roleOfCurrentUser={item.roleOfCurrentUser}
            />
          );
        })}
      </Row>
      <CreateClassModal />
      <JoinClassModal />
    </div>
  );
});
