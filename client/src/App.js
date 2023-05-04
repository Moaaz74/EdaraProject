import { Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from "./component/Sidebar"
function App() {
  return (
    <div className="App">
      <div className="col-2"><Sidebar /></div>
      <div className="col-12 add-content">
      <Outlet />
      </div>
    </div>
  );
}

export default App;
