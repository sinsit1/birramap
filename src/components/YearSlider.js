import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

//STYLES
const slider = {
  '& .MuiSlider-rail': {
    opacity: 1
  },
  '& .MuiSlider-valueLabelOpen': {
    bgcolor: 'secondary.main'
  },
  '& .MuiSlider-thumb': {
    width: '14px',
    height: '14px',
    bgcolor: 'background.paper',
    border: 2,
    bordercolor: 'secondary.main'
  }
};
const sliderWrapper = {
  flexGrow: 1,
  position: 'absolute',
  bottom: '20px',
  left: {xs: '20px', sm: '20px', md: '20px', lg: '20px', xl: '40px'},
  height: 63,
  width: {xs: '245px', sm: '275px', md: '275px', lg: '275px'},
  px: 4,
  bordercolor: 'red',
  bgcolor: 'background.paper',
  opacity: 0.85,
  borderRadius: 0.5
};

const YearSlider = ({marks, onChange, value}) => {

  const min = Math.min(...marks);
  const max = Math.max(...marks);
  const getObjectFromArrayYears = (marks) =>
    marks && marks.map(mark => (
      {
        ['value']: mark,
        ['label']: '\'' + mark.toString().substring(2, 4)
      }
    )
    );

  const handleChange = (e) => onChange(e.target.value);

  return <Box sx={sliderWrapper}>
    <Slider
      sx={slider}
      min={min}
      max={max}
      step={null}
      valueLabelDisplay="auto"
      marks={getObjectFromArrayYears(marks)}
      color='secondary'
      onChange={handleChange}
      value={value}
      track={false}
    />
  </Box>;
};

YearSlider.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default YearSlider;
