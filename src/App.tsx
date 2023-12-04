import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Home } from './pages/home';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home user={storedUser} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App;