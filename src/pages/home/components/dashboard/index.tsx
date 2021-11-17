import React, {useState, useEffect } from "react";
import { observer } from 'mobx-react';
import {ClassCard} from "./components/index";
//import { Loading } from 'shared/components';
//import { Route, Switch, useRouteMatch,useHistory } from 'react-router-dom';
import {ClassListViewModel} from './class-list-view-model'
import {Row} from 'react-bootstrap'
import { CreateClassModal, JoinClassModal } from 'shared/components';

interface IProps{
  userId:string,
}

export const DashboardPage = observer(({userId}:IProps)=> {
  const [viewModal] = useState(new ClassListViewModel())
  const [classes, setClasses] = useState(viewModal.Classes);
  
  useEffect(()=>{
    viewModal.getClasses();
    
  },[])

  return (
    <div className = 'container my-4'>
      <Row className = 'd-flex-block justify-content-start g-3 mx-auto'>
        {classes.map((item, index) => {
          const roleInClass:string= "student";
          return (<ClassCard 
                    key = {index}
                    teacherName={item.teacherName}
                    room ={item.room}
                    name={item.name}
                    id={item.id}
                    roleOfCurrentUser={item.roleOfCurrentUser}
                  />
                  )
          })}
      </Row>
      <CreateClassModal/>
      <JoinClassModal/>
    </div>
  );
})
