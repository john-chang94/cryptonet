import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Space } from "antd";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        
      </div>
    </div>
  );
}

export default App;
