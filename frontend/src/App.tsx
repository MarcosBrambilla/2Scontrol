import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import authService from "./services/authServices";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";

const ProtectedRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rota protegida */}
          {/* A rota '/' (Home) só será acessível se o ProtectedRoute permitir */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Opcional: Rota para 404 - Página Não Encontrada */}
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
