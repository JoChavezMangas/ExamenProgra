import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const LogoBlanco = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      component="img"
          src="/logo/LogoMultiCredit.png"
      sx={{ width: 60, height: 60, ...sx }}
    />
  );


  return (
    <> {logo}</>

  );
});

LogoBlanco.propTypes = {
  sx: PropTypes.object,
};

export default LogoBlanco;
