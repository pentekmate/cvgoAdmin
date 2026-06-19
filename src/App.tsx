import { Routes, Route } from 'react-router';
import './index.css';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
