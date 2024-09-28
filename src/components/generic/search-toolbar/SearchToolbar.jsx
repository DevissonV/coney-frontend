import PropTypes from 'prop-types';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchToolbar = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <Box mb={2} display="flex" justifyContent="flex-end">
      <TextField
        label={placeholder}
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{
          width: '300px',
          bgcolor: 'background.paper',
          borderRadius: '4px',
        }}
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
