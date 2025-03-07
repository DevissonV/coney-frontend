import { Button as MuiButton } from '@mui/material';

/**
 * Button component that wraps the Material-UI Button component.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.label - The text to display inside the button.
 * @param {Object} [props] - Additional properties to pass to the Material-UI Button component.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({ onClick, label, ...props }) => {
  return (
    <MuiButton onClick={onClick} {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;
