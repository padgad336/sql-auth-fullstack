
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home-page';
import GetProfile from './pages/get-profile';

function App() {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={GetProfile} path="/profile" />
      </Routes>
    </>
  );
}

export default App;
