import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import { Assignment } from 'shared/models';
import { GradeStructureForm } from './components';
import './style/index.css';

interface IProps {
  gradeStructure: Assignment[];
  reorderStructure: (startIndex: number, finishIndex: number) => void;
  addAssignment: (value: Assignment) => void;
  deleteAssignment: (id: number) => void;
  updateAssignment: (id: number, value: Assignment) => void;
}

export const EditGradeStructure = ({
  gradeStructure,
  reorderStructure,
  addAssignment,
  updateAssignment,
  deleteAssignment,
}: IProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination === result.source) {
      return;
    }
    const startIndex = result.source.index;
    const finishIndex = result.destination.index;
    reorderStructure(startIndex, finishIndex);
  };

  const handleCreateNew = (value: Assignment) => {
    addAssignment(value);
  };

  const handleDelete = (id: number) => {
    deleteAssignment(id);
  };

  const handleUpdate = (id: number, value: Assignment) => {
    updateAssignment(id, value);
  };

  return (
    <div className="container p-0 mt-5 d-flex-block">
      <div className="row d-flex justify-content-center">
        <div className="col-9  col-lg-6">
          <Card className="card-edit-grade p-0">
            <Card.Header className="card-title-header-edit-grade m-0"></Card.Header>
            <Card.Body className="pt-3 px-3 pb-0 my-0">
              <h3>
                <strong className="text-uppercase">Cấu trúc điểm</strong>
              </h3>
              <span>Chỉnh sửa cấu trúc điểm của bạn</span>
            </Card.Body>
          </Card>
        </div>
      </div>
      <GradeStructureForm
        value={{ id: 0, name: '', point: '' }}
        formType="create"
        handleCreateNew={handleCreateNew}
        handleDelete={handleDelete}
        handleUpdate={handleDelete}
      />
      <div className="row">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gradeStructure">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {gradeStructure.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <GradeStructureForm
                          key={index}
                          value={item}
                          formType="edit"
                          handleCreateNew={handleCreateNew}
                          handleDelete={handleDelete}
                          handleUpdate={handleUpdate}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
