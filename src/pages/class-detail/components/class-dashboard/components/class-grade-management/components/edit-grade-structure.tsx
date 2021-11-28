import { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import { classGradeViewModel } from './class-grade-view-model';
import { GradeCategory } from 'shared/models';
import { GradeStructureForm } from 'shared/components/form';

export const EditGradeStructure = observer(() => {
  useEffect(() => {
    classGradeViewModel.fetchGradeStructure();
  }, [classGradeViewModel]);

  const items = classGradeViewModel.gradeStructureList;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination === result.source) {
      return;
    }
    const startIndex = result.source.index;
    const finishIndex = result.destination.index;
    classGradeViewModel.reorderGradeStructure(startIndex, finishIndex);
  };

  const handleCreateNew = (value: GradeCategory) => {
    classGradeViewModel.addGradeCategory(value);
  };

  const handleDelete = (id: number) => {
    classGradeViewModel.deleteGradeCategory(id);
  };

  const handleUpdate = (id: number, value: GradeCategory) => {
    classGradeViewModel.updateGradeCategory(id, value);
  };

  return (
    <div className="container p-0 d-flex-block">
      <div className="row d-flex justify-content-center">
        <div className="col-9 col-lg-6">
          <Card className="p-0" style={{ background: 'white' }}>
            <Card.Header
              className="m-0"
              style={{ background: 'blue', height: '0.5rem' }}
            ></Card.Header>
            <Card.Body className="pt-3 px-3 pb-0 my-0">
              <h3>
                <strong className="text-uppercase">Cấu trúc điểm</strong>
              </h3>
              <span>Chỉnh sửa cấu trúc điểm của bạn</span>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gradeStructure">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
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
      <GradeStructureForm
        value={{ id: 0, title: '', grade: '' }}
        formType="create"
        handleCreateNew={handleCreateNew}
        handleDelete={handleDelete}
        handleUpdate={handleDelete}
      />
    </div>
  );
});
