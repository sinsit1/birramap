import React from 'react';
import PropTypes from 'prop-types';

//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const MiniPopUp = ({title, subtitle}) => {

  return <Box sx={{m: 1, background: 'white'}}>
    <Typography sx={{color: 'secondary.main'}} variant="subtitle1" component='p'>{title}</Typography>
    <Stack direction='column'>
      <Typography variant='caption'>{subtitle}</Typography>
    </Stack>
  </Box>;
};

MiniPopUp.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default MiniPopUp;