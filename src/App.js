import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; //Used Hashrouter here to avoid issues with GitHub Pages
import Navbar from './components/Navbar';
import AgeCalculator from './components/AgeCalculator';
import TodoList from './components/ToDoList';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<AgeCalculator />} />
            <Route path="/todo" element={<TodoList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;