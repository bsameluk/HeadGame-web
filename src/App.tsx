import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';

// Pages
import MainPage from './pages/MainPage/MainPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import CreateGamePage from './pages/CreateGamePage/CreateGamePage';

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (<BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="settings" element={<SettingsPage />} />

        <Route path="create-game" >
          <Route index element={<CreateGamePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
