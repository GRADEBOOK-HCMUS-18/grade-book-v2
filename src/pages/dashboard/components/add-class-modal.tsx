import {useState} from 'react'
import {observer} from 'mobx-react'
import{Modal, Form, Button} from 'react-bootstrap'
import '../style/add-class-modal.css';

const AddClassModal = observer(() => {
    const [showModal, setShowModal] = useState(false);
    const [classInfo, setClassInfo] = useState({
        title:"",
        room:"",
        description:""
    });


    const hideDialog=()=>{
        setShowModal(false);
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setClassInfo({...classInfo, [event.target.name]:event.target.value})
        console.log(classInfo);
    }

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    }

    return (
        <Modal show = {showModal} onHide = {hideDialog} className='d-flex justify-content-center align-items-center'>
            <Modal.Header closeButton>
                <Modal.Title>Tạo lớp học</Modal.Title>
            </Modal.Header>
            <Form className='fill-form' onSubmit = {handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type = 'text'
                            placeholder='Tên lớp học (bắt buộc)'
                            name ='title'
                            value = {classInfo.title}
                            onChange = {handleChange}
                            aria-describedby="title-help"
                            required
                            >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type = 'text'
                            placeholder='Phòng'
                            name ='room'
                            value = {classInfo.room}
                            onChange = {handleChange}
                            aria-describedby="title-help"
                            className = "mt-2"
                            required
                            >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as = 'textarea'
                            placeholder='Mô tả'
                            name ='description'
                            value = {classInfo.description}
                            onChange = {handleChange}
                            aria-describedby="title-help"
                            className = "mt-2"
                            required
                            >
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
            </Form>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideDialog}>
                    Cancel
                </Button>
                <Button variant="primary" type ='submit'>Tạo lớp</Button>
            </Modal.Footer>
        </Modal>
    )
})

export {AddClassModal}
