import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* <Route path="/game/:id" element={<GamePage />} />
        <Route path="/create-game" element={<CreateGame />} /> */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
