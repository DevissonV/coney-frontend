import ResponsiveAppBar from '../../generic/navbar/ResponsiveAppBar';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box component="main" sx={{ p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
