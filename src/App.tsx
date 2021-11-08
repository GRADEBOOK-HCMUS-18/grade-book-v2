import { useState } from 'react';
import { SideBar, NavBar } from 'layout';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="App">
      <NavBar toggleSideBar={toggleSideBar} />
      <SideBar show={showSidebar} toggle={toggleSideBar} />
    </div>
  );
}

export default App;
