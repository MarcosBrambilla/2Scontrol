import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login.tsx';
import Footer from './components/footer.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
    <Footer />
  </React.StrictMode>
);

