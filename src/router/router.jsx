import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/dashboard-components/layout/Layout'; 
import DashboardContainer from '../containers/dashboard/DashboardContainer';
import useAuthStore from '../stores/auth/useAuthStore';
import NotFoundPage from '../pages/NotFoundPage'; 
import AuthContainer from '../containers/auth/AuthContainer';
import UsersContainer from '../containers/users/UsersContainer';
import CountriesContainer from '../containers/countries/CountriesContainer';
import RiffleContainer from '../containers/riffle/RiffleContainer';
import TicketsContainer from '../containers/tickets/TicketsContainer';


const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />; // Redirige a login si no hay token
  }

  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas abiertas */}
        <Route path="/login" element={<AuthContainer />} />
        
        {/* Redirigir la raíz "/" a "/dashboard" */}
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" />} 
        />

        {/* Ruta protegida para el Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardContainer />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Ruta protegida para Usuarios */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UsersContainer />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Ruta protegida para los paises */}
        <Route
          path="/countries"
          element={
            <ProtectedRoute>
              <Layout>
                <CountriesContainer />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para las rifas */}
        <Route
          path="/riffle"
          element={
            <ProtectedRoute>
              <Layout>
                <RiffleContainer />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para las boletas*/}
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Layout>
                <TicketsContainer />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Ruta para manejar 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
