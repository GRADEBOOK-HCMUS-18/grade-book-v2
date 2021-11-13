import {AiOutlineFolderOpen} from 'react-icons/ai'
import {MdAssignmentInd} from 'react-icons/md'
import{BsThreeDotsVertical} from 'react-icons/bs'
import {Card,Col, Popover,  OverlayTrigger, Tooltip} from 'react-bootstrap'
import '../style/class-card.css';

interface IProps {
  classname: string;
    teacherName: string;
    room: string;
    classID:string, 
    role:string
}

export const ClassCard = ({classname,teacherName,room,classID,role}:IProps)=>{
  return(
      <Col className ='mb-3'>
        <Card className= 'class-card border-1 p-0'>
        <Card.Header className='class-header px-0 py-3'>
          <Card.Title className = 'd-flex'>
            <OverlayTrigger trigger="focus" placement = 'bottom-end' overlay = {
              <Popover>
                <Popover.Body className = 'p-0'>
                  <div className="list-group">
                    {(role==='student')
                      ?(
                        <button type="button" className="list-group-item list-group-item-action">
                        Hủy đăng ký
                        </button>
                      )
                      :(
                        <div>
                          <button type="button" className="list-group-item list-group-item-action">Sao chép đường liên kết lời mời</button>
                          <button type="button" className="list-group-item list-group-item-action">Lưu trữ</button>
                        </div>
                      )
                    }
                  </div>
                </Popover.Body>
              </Popover>
            }>
              <button className =  'btn-three-dot' >
                  <BsThreeDotsVertical ></BsThreeDotsVertical> 
              </button>
            </OverlayTrigger>
            <div className='ps-3'>
                <a className ='go-to-class d-block ' href='#/go-to-class'>
                  <div className = 'class-title text-white text-truncate'>{classname}</div>
                  <div className = 'class-room  text-white text-truncate'>{room}</div>
                </a>
                <span className = 'class-teacher-name  text-white text-truncate'>{teacherName}</span>
            </div>
          </Card.Title>
        </Card.Header>
        <Card.Body className = 'card-body'/>
        <Card.Footer className='card-footer bg-white d-flex flex-row-reverse'>
          <OverlayTrigger placement='bottom-end' overlay={<Tooltip>Mở folder cho {classname}</Tooltip>}>
            <button className = 'btn-floating'>
              <AiOutlineFolderOpen/>
            </button>
          </OverlayTrigger>
          <OverlayTrigger placement='bottom-end' overlay={<Tooltip>Mở bài tập cho {classname}</Tooltip>}>
            <button className = 'btn-floating'>
              <MdAssignmentInd/>
            </button>
          </OverlayTrigger>

        </Card.Footer>
      </Card>
  </Col>
    


  )

}

// export const ClassCard= ({ name, creatorName, creatorPhoto, id}:IProps)=> {
//   const history = useHistory();
//   const goToClass = () => {
//     history.push(`/class/${id}`);
//   };
//   return (
//     <div className="classCard" onClick={goToClass}>
//       <div className="classCard__upper">
//         <div className="classCard__className">{name}</div>
//         <div className="classCard__creatorName">{creatorName}</div>
//         <img src={creatorPhoto} className="classCard__creatorPhoto" />
//       </div>
//       <div className="classCard__middle"></div>
//       <div className="classCard__lower">
//           <AiOutlineFolderOpen/>
//           <MdAssignmentInd/>
//       </div>
//     </div>
//   );
// }
