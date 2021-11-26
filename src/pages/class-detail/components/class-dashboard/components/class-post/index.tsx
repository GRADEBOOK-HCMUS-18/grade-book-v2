import { Observer } from 'mobx-react-lite';
import { useState, Suspense, lazy } from 'react';
import { Button } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { Avatar } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import './style/index.css';
const ReactQuill = lazy(() => import('react-quill'));

export const ClassPost = () => {
  const [openEditor, setOpenEditor] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="post-creator">
      <Observer>
        {() => {
          const user = userViewModel.user;
          return (
            <div
              onClick={() => setOpenEditor(!openEditor)}
              className="post-editor-btn"
            >
              {!openEditor && (
                <>
                  <Avatar user={user} />
                  <span>Thông báo nội dung nào đó cho lớp học của bạn</span>
                </>
              )}
            </div>
          );
        }}
      </Observer>
      <Suspense fallback={<div>Loading...</div>}>
        {openEditor && (
          <div className="text-editor">
            <p>Tạo bài đăng</p>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <div className="text-editor-btn-group">
              <Button
                variant="secondary"
                onClick={() => {
                  setValue('');
                  setOpenEditor(!openEditor);
                }}
              >
                Hủy
              </Button>
              <Button disabled={value === ''}>Đăng</Button>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};
