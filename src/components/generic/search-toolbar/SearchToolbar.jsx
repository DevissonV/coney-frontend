import PropTypes from 'prop-types';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchToolbar = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <Box width={{ xs: '100%', sm: '250px' }}>
      <TextField
        fullWidth
        label={placeholder}
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

SearchToolbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchToolbar;
