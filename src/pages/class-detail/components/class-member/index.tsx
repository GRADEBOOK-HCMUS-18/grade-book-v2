import { Link } from 'react-router-dom';
import { ClassDetailInfo } from 'shared/models';
import { IoArrowBackOutline } from 'react-icons/io5';
import { ClassMemberStudent } from './class-member-student';
import { ClassMemberTeacher } from './class-member-teacher';
import { InsertEmailAddressModal } from './insert-email-address-modal';
import './style/index.css';
import React from 'react';

interface IProps {
  classInfo: ClassDetailInfo;
  backUrl: string;
}

export const ClassMember = ({ classInfo, backUrl }: IProps) => {
  return (
    <div>
      <div className="member-container">
        {classInfo.isTeacher ? (
          <>
            <ClassMemberTeacher classInfo={classInfo} />
            <InsertEmailAddressModal />
          </>
        ) : (
          <ClassMemberStudent classInfo={classInfo} />
        )}
      </div>
    </div>
  );
};
