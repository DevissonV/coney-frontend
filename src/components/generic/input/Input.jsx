import { TextField } from '@mui/material';

const Input = ({ value, onChange, label, type = 'text', ...props }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default Input;
