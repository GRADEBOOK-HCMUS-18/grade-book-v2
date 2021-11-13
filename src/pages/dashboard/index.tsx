import React, {useState, useEffect } from "react";
import { observer } from 'mobx-react';
import {ClassCard, AddClassModal, JoinClass} from "./components/index";
import { Loading } from 'shared/components';
import { Route, Switch, useRouteMatch,useHistory } from 'react-router-dom';
import {ClassListViewModel} from './class-list-view-model'
import {Row} from 'react-bootstrap'

interface IProps{
  userId:string,
}

export const DashboardPage = observer(({userId}:IProps)=> {
  const [viewModal] = useState(new ClassListViewModel())
  const [classes, setClasses] = useState(viewModal.Classes);
  
  return (
    <div className = 'my-4'>
      <JoinClass/>
      <AddClassModal/>
      <Row className = 'd-flex-block justify-content-start g-3 mx-auto'>
        {classes.map((item, index) => {
          const roleInClass:string= "student";
          return (<ClassCard 
                    key = {index}
                    teacherName={item.teacherName}
                    room ={item.room}
                    classname={item.className}
                    classID={item.classID}
                    role={roleInClass}
                  />
                  )
          })}
      </Row>
    </div>
  );
})
