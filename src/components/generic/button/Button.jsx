import { Button as MuiButton } from '@mui/material';

const Button = ({ onClick, label, ...props }) => {
  return (
    <MuiButton onClick={onClick} {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;
