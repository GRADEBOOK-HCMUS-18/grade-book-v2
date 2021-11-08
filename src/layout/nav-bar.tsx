import { Container, Navbar } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import { MdClass } from 'react-icons/md';

interface IProps {
  toggleSideBar: () => void;
}
export const NavBar = ({ toggleSideBar }: IProps) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={toggleSideBar}>
          <MdClass
            className="d-inline-block align-top"
            size={35}
            color="#41E0FD"
          />
          <Navbar.Brand>Grade Book</Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Brand>
          <BsPlusLg />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
