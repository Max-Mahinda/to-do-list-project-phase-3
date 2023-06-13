import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import './App.css';
import Nav from './components/Nav';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
       

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* Other routes */}
           <Route path="/TodoList" element={<TodoList />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
