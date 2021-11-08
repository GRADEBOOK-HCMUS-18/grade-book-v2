import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { find } from 'lodash';
import { centerHorizontal } from 'shared/styles';
import { classViewModel } from 'shared/view-models';
import { ClassTabItems } from './class-tab-item';
import './styles/index.css';

export const ClassTab = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const tokens = location.pathname.split('/');
    const name = tokens[tokens.length - 1];
    const item: any = find(ClassTabItems, { path: `/${name}` });
    if (item) {
      setSelectedItem(item.id);
    } else {
      setSelectedItem(0);
    }
  }, [history, location]);

  const handleSelectItem = (id: number, path: string) => {
    history.push(`/class/${classViewModel.getClassId()}${path}`);
    setSelectedItem(id);
  };

  return (
    <div style={centerHorizontal}>
      {ClassTabItems.map((item) => {
        let name;
        if (item.id === selectedItem) {
          name = 'class-tab-item-selected';
        } else {
          name = 'class-tab-item';
        }
        return (
          <div
            key={item.id}
            className={name}
            onClick={() => handleSelectItem(item.id, item.path)}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
