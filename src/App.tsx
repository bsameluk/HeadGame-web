import { MemoryRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';

// Layouts
import AppLayout from './layouts/AppLayout';

// Pages
import MainPage from './pages/MainPage/MainPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import CreateGamePage from './pages/CreateGamePage/CreateGamePage';
import PreviewRoundPage from './pages/PreviewRoundPage';
import PlayTurnPage from './pages/PlayTurnPage/PlayTurnPage';
import ResultsPage from './pages/ResultsPage';

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import TurnResultsPage from './pages/TurnResultsPage/TurnResultsPage';
import GamePageLayout from './layouts/GamePageLayout';


function App() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="create-game" >
            <Route index element={<CreateGamePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="game" element={<GamePageLayout />} >
            <Route path="turn/preview"  element={<PreviewRoundPage />} />
            <Route path="turn/play"     element={<PlayTurnPage />} />
            <Route path="turn/results"  element={<TurnResultsPage />} />
            <Route path="results"       element={<ResultsPage />} />
          </Route>
        </Route>
        </Routes>
      <ToastContainer />
    </MemoryRouter>
  );
}

export default App;
