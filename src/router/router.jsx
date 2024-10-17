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
    return <Navigate to="/login" />; 
  }

  return children;
};

const AnonymousRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes open to everyone */}
        <Route path="/login" element={<AuthContainer />} />

        <Route 
          path="/dashboard" 
          element={
            <AnonymousRoute>
              <Layout>
                <DashboardContainer />
              </Layout>
            </AnonymousRoute>
          } 
        />

        <Route 
          path="/riffle" 
          element={
            <AnonymousRoute>
              <Layout>
                <RiffleContainer />
              </Layout>
            </AnonymousRoute>
          } 
        />

        <Route 
          path="/" 
          element={<Navigate to="/dashboard" />} 
        />

        {/* Protected routes that require authentication */}
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

        {/* Route to handle 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
