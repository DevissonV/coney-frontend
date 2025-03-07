import PropTypes from 'prop-types';

// This component renders the value of a cell, allowing the content
// fits the available space.
const CellContent = ({ value }) => (
  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{value}</div>
);

CellContent.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CellContent;
