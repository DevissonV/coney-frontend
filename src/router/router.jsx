import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import PasswordChangePage from '../pages/users/PasswordChangePage';
import PaymentSuccessPage from '../pages/payments/PaymentSuccessPage';
import PaymentCancelPage from '../pages/payments/PaymentCancelPage';

/**
 * Component that protects routes by checking user authentication.
 * Redirects to the login page if the user is not authenticated.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} Protected children or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

/**
 * Component that allows access to anonymous users.
 * Currently does not enforce any restrictions.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.ReactNode} The provided children.
 */
const AnonymousRoute = ({ children }) => {
  return children;
};

/**
 * Main router configuration for the application.
 * Defines public, protected, and anonymous routes.
 * @component
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes open to everyone */}
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/password-change" element={<PasswordChangePage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />
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

        <Route path="/" element={<Navigate to="/dashboard" />} />

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
            <Layout>
              <TicketsContainer />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
