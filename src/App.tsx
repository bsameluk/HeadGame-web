import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamesList from './pages/GamesList';
import GamePage from './pages/GamePage';
import CreateGame from './pages/CreateGame';
import './App.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamesList />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/create-game" element={<CreateGame />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
