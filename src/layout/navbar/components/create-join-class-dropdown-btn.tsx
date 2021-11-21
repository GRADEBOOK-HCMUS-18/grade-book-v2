import { AiOutlinePlus } from 'react-icons/ai';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { classActionViewModel } from 'shared/view-models';
import { observer } from 'mobx-react';

const CreateJoinClassDropDownButton = observer(() => {
  return (
    <OverlayTrigger
      trigger="focus"
      placement="bottom-end"
      overlay={
        <Popover>
          <Popover.Body className="p-0">
            <div className="list-group">
              <button
                type="button"
                onClick={() => classActionViewModel.setShowJoinClassModal(true)}
                className="list-group-item list-group-item-action"
              >
                Tham gia lớp học
              </button>
              <button
                type="button"
                onClick={() =>
                  classActionViewModel.setShowCreateClassModal(true)
                }
                className="list-group-item list-group-item-action"
              >
                Tạo lớp học
              </button>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <button className="btn-floating py-0 my-0">
        <AiOutlinePlus size={25} />
      </button>
    </OverlayTrigger>
  );
});

export { CreateJoinClassDropDownButton };
