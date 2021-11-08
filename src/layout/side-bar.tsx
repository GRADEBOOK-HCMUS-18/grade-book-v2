import Offcanvas from 'react-bootstrap/esm/Offcanvas';

interface IProps {
  show: boolean;
  toggle: () => void;
}

export const SideBar = ({ show, toggle }: IProps) => {
  return (
    <Offcanvas show={show} onHide={toggle}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
};
