import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/dashboard-components/layout/Layout'; 
import DashboardContainer from '../containers/dashboard/DashboardContainer';
import useAuthStore from '../stores/auth/useAuthStore';
import NotFoundPage from '../pages/generic/NotFoundPage';
import AuthContainer from '../containers/auth/AuthContainer';
import UsersContainer from '../containers/users/UsersContainer';
import CountriesContainer from '../containers/countries/CountriesContainer';
import RiffleContainer from '../containers/riffle/RiffleContainer';
import TicketsContainer from '../containers/tickets/TicketsContainer';
import ThankYouPage from '../pages/generic/ThankYouPage';

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
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />

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
          path="/tickets/:riffleId"
          element={
            <ProtectedRoute>
              <Layout>
                <TicketsContainer />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRouter;
