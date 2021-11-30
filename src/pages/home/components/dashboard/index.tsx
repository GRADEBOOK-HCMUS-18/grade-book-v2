import { useState } from 'react';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import { lineLoadingViewModel } from 'shared/view-models';
import { homeViewModel } from 'pages/home/home-view-model';
import { SingleClass } from 'pages/home/models';
import {
  CreateClassModal,
  EmptyData,
  JoinClassModal,
  PopupAlert,
} from 'shared/components';
import { ClassCard, InvitationLinkModal } from './components';
import './style/index.css';

interface IProps {
  allClass: SingleClass[];
}

export const Dashboard = observer(({ allClass }: IProps) => {
  return (
    <div className="container-fluid list-class-card">
      {lineLoadingViewModel.isLoading && allClass.length === 0 ? (
        <></>
      ) : (
        <Row className="d-flex-block  justify-content-start mx-auto">
          {allClass.map((item, index) => {
            return (
              <ClassCard
                key={index}
                mainTeacher={item.mainTeacher}
                room={item.room}
                name={item.name}
                id={item.id}
                roleOfCurrentUser={item.roleOfCurrentUser}
              />
            );
          })}
          {!allClass.length && <EmptyData message="Bạn chưa có lớp học nào" />}
        </Row>
      )}

      <CreateClassModal />
      <JoinClassModal />
      <InvitationLinkModal />
      <PopupAlert
        show={homeViewModel.isError}
        error={true}
        onHide={() => homeViewModel.deleteError()}
        message={homeViewModel.message}
      />
    </div>
  );
});
